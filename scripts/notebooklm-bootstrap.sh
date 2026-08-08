#!/usr/bin/env bash
# Bootstrap do notebooklm-py em containers efêmeros (Claude Code na web).
#
# Instala as dependências Python — que não sobrevivem ao container — e valida a
# credencial do Google, sem nunca imprimir o conteúdo dela.
#
#   ./scripts/notebooklm-bootstrap.sh            instala + valida
#   ./scripts/notebooklm-bootstrap.sh --check    só valida (não instala)
#
# Saída: 0 pronto para uso | 2 instalado mas sem credencial | 1 falha de instalação
set -euo pipefail

CHECK_ONLY=false
[[ "${1:-}" == "--check" ]] && CHECK_ONLY=true

PY="$(command -v python3 || command -v python)"
STORAGE="${HOME}/.notebooklm/profiles/default/storage_state.json"

log() { printf '\n\033[1m==> %s\033[0m\n' "$1"; }

# ---------------------------------------------------------------- instalação
if [[ "$CHECK_ONLY" == false ]]; then
  log "Instalando notebooklm-py"

  # [browser] é obrigatório; erros devem propagar.
  pip install --quiet "notebooklm-py[browser]"

  # [cookies] (rookiepy) não compila no Python 3.13+. Pular deliberadamente ali
  # deixa falhas reais (typo, rede, PyPI fora) aparecerem nas demais versões.
  if "$PY" -c "import sys; sys.exit(0 if sys.version_info < (3, 13) else 1)"; then
    pip install --quiet "notebooklm-py[cookies]"
  else
    echo "  [cookies] pulado no Python 3.13+ (rookiepy indisponível)."
  fi

  echo "  $(notebooklm --version)"
fi

# ---------------------------------------------------------------- credencial
log "Verificando credencial"

# A credencial vem do env var (preferido: não toca o disco) ou do arquivo do perfil.
if [[ -n "${NOTEBOOKLM_AUTH_JSON:-}" ]]; then
  SOURCE="variável NOTEBOOKLM_AUTH_JSON"
  PAYLOAD="$NOTEBOOKLM_AUTH_JSON"
elif [[ -f "$STORAGE" ]]; then
  SOURCE="$STORAGE"
  PAYLOAD="$(cat "$STORAGE")"
  # Credencial de portador: só o dono pode ler.
  chmod 600 "$STORAGE"
else
  cat <<EOF
  Nenhuma credencial encontrada.

  O 'notebooklm login' precisa de navegador e de uma pessoa na frente da tela,
  então não roda neste container. Gere o arquivo na sua máquina:

      pip install "notebooklm-py[browser]"
      notebooklm login          # cria ~/.notebooklm/profiles/default/storage_state.json

  E traga-o para cá por uma das duas vias:

      export NOTEBOOKLM_AUTH_JSON="\$(cat storage_state.json)"     # preferido
      install -m 600 storage_state.json "$STORAGE"

  O conteúdo desse arquivo dá acesso à sua conta Google — configure-o como
  secret do ambiente, nunca cole no chat nem commite no repositório.
EOF
  exit 2
fi

echo "  origem: $SOURCE"

# Valida a forma do JSON e os cookies exigidos por cookie_policy.py, antes de
# gastar uma ida à rede. A credencial vai pelo stdin — nunca por argv, que é
# visível a qualquer processo via /proc.
printf '%s' "$PAYLOAD" | "$PY" "$(dirname "$0")/notebooklm_validate_auth.py"

# ---------------------------------------------------------- teste de verdade
log "Testando contra o Google"
notebooklm auth check --test
