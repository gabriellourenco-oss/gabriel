#!/usr/bin/env bash
# Health check da sessão do NotebookLM: valida o secret e confirma com o Google
# que a sessão ainda é aceita — o que a validação estrutural sozinha não prova.
#
#   ./scripts/notebooklm-healthcheck.sh --check
#
# Requer egress para notebooklm.google.com. Em ambientes com proxy restritivo
# (o container do Claude Code na web bloqueia google.com) a sonda sai com 14;
# para validar só a forma do secret, use notebooklm-bootstrap.sh --check.
set -euo pipefail

PROBE_URL="${NOTEBOOKLM_PROBE_URL:-https://notebooklm.google.com/}"
PROBE_TIMEOUT="${NOTEBOOKLM_PROBE_TIMEOUT:-20}"

# 0 ok | 2 dependência | 10 secret ausente | 11 JSON inválido
# 12 expirado | 13 sessão rejeitada | 14 rede | 15 resposta inesperada

# Cookies exigidos por notebooklm/_auth/cookie_policy.py.
REQUIRED_COOKIES=("SID" "__Secure-1PSIDTS")

JAR=""
# EXIT, não RETURN: o jar guarda os valores dos cookies em claro e as saídas de
# erro são via exit, que nunca dispara um trap RETURN.
# O 'return 0' é obrigatório: um handler de EXIT que termina não-zero sobrescreve
# o código de saída do script, achatando todos os nossos códigos em 1.
cleanup() { [[ -n "$JAR" ]] && rm -f "$JAR"; return 0; }
trap cleanup EXIT

die() { printf '%s\n' "$2" >&2; exit "$1"; }

require_deps() {
  for bin in jq curl; do
    command -v "$bin" >/dev/null 2>&1 || die 2 "dependência ausente: $bin"
  done
}

load_auth() {
  [[ -n "${NOTEBOOKLM_AUTH_JSON:-}" ]] \
    || die 10 "NOTEBOOKLM_AUTH_JSON não definido. Gere o estado na sua máquina e cadastre como secret."

  jq -e 'type == "object" and (.cookies | type == "array") and (.cookies | length > 0)' \
    <<<"$NOTEBOOKLM_AUTH_JSON" >/dev/null 2>&1 \
    || die 11 "NOTEBOOKLM_AUTH_JSON não é um storage state válido (esperado objeto com .cookies não vazio)."

  # Um jar não vazio mas incompleto falha na rede como se fosse sessão
  # rejeitada; conferir aqui separa "extração parcial" de "sessão morta".
  local present
  present=$(jq -r '[.cookies[].name] | join(" ")' <<<"$NOTEBOOKLM_AUTH_JSON")
  for name in "${REQUIRED_COOKIES[@]}"; do
    [[ " $present " == *" $name "* ]] \
      || die 11 "cookie obrigatório ausente: $name. Extração parcial (Chrome 127+ App-Bound Encryption) causa isso; refaça o login local."
  done
}

check_expiry() {
  local now exp
  now=$(date +%s)
  exp=$(jq -r '
    [ .cookies[]
      | select(.name == "SID" or .name == "__Secure-1PSID")
      | .expires
      | select(. != null and . > 0)
    ] | min // empty' <<<"$NOTEBOOKLM_AUTH_JSON")

  # sem expires => cookie de sessão; só a sonda de rede decide
  [[ -z "$exp" ]] && return 0

  exp=${exp%.*}
  if (( exp < now )); then
    die 12 "sessão expirada em $(date -d "@$exp" '+%F %H:%M'). Refaça o login local e atualize o secret."
  fi
  printf 'cookies válidos até %s\n' "$(date -d "@$exp" '+%F %H:%M')"
}

write_cookie_jar() {
  JAR=$(mktemp)
  chmod 600 "$JAR"
  jq -r '
    .cookies[]
    | ( if .httpOnly then "#HttpOnly_" else "" end )
      + .domain
      + "\t" + ( if (.domain | startswith(".")) then "TRUE" else "FALSE" end )
      + "\t" + .path
      + "\t" + ( if .secure then "TRUE" else "FALSE" end )
      + "\t" + ( (.expires // 0) | if . <= 0 then 0 else floor end | tostring )
      + "\t" + .name
      + "\t" + .value
  ' <<<"$NOTEBOOKLM_AUTH_JSON" >"$JAR"
}

probe() {
  local status code redirect rc
  write_cookie_jar

  set +e
  status=$(curl -sS -o /dev/null --no-location \
                -w '%{http_code} %{redirect_url}' \
                --max-time "$PROBE_TIMEOUT" \
                -b "$JAR" "$PROBE_URL")
  rc=$?
  set -e

  (( rc != 0 )) && die 14 "falha de rede ao alcançar $PROBE_URL (curl rc=$rc). Não é problema de credencial."

  code=${status%% *}
  redirect=${status#* }

  case "$code" in
    200)
      printf 'sessão válida (%s)\n' "$PROBE_URL"; return 0 ;;
    301|302|303|307|308)
      if [[ "$redirect" == *accounts.google.com* ]]; then
        die 13 "sessão rejeitada: redirect para login. O secret está estruturalmente ok, mas o Google invalidou a sessão. Refaça o login local."
      fi
      die 15 "redirect inesperado para: $redirect" ;;
    401|403)
      die 13 "sessão rejeitada com HTTP $code. Refaça o login local e atualize o secret." ;;
    *)
      die 15 "resposta inesperada: HTTP $code" ;;
  esac
}

cmd_check() {
  require_deps
  load_auth
  check_expiry
  probe
}

case "${1:-}" in
  --check) cmd_check ;;
  *) die 2 "uso: $0 --check" ;;
esac
