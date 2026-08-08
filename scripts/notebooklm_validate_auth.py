#!/usr/bin/env python3
"""Valida a forma de um storage_state.json do notebooklm-py, lido do stdin.

Imprime apenas nomes de cookies e a conta — nunca valores, que são credenciais
de portador. Chamado por scripts/notebooklm-bootstrap.sh.

Saída: 0 válido | 1 inválido (JSON quebrado ou cookies obrigatórios ausentes).
"""

import json
import sys
import time

# Espelha notebooklm/_auth/cookie_policy.py: MINIMUM_REQUIRED_COOKIES.
REQUIRED = {"SID", "__Secure-1PSIDTS"}


def main() -> int:
    try:
        data = json.loads(sys.stdin.read())
    except json.JSONDecodeError as exc:
        print(f"  JSON inválido: {exc}", file=sys.stderr)
        return 1

    cookies = data.get("cookies", [])
    if not isinstance(cookies, list):
        print("  Campo 'cookies' ausente ou não é uma lista.", file=sys.stderr)
        return 1

    names = {c.get("name") for c in cookies if isinstance(c, dict)}
    if missing := REQUIRED - names:
        print(
            f"  Cookies obrigatórios ausentes: {', '.join(sorted(missing))}\n"
            "  Extração parcial (Chrome 127+ App-Bound Encryption) causa isso.\n"
            "  Rode 'notebooklm login' de novo na máquina de origem.",
            file=sys.stderr,
        )
        return 1

    if email := data.get("notebooklm", {}).get("account", {}).get("email"):
        print(f"  conta: {email}")
    print(f"  cookies obrigatórios: OK ({len(names)} no total)")

    # Um cookie expirado autentica mal e falha de forma confusa mais adiante.
    now = time.time()
    expired = sorted(
        c["name"]
        for c in cookies
        if isinstance(c, dict)
        and c.get("name") in REQUIRED
        and 0 < c.get("expires", 0) < now
    )
    if expired:
        print(f"  AVISO: já expirado(s): {', '.join(expired)} — refaça o login.")

    return 0


if __name__ == "__main__":
    sys.exit(main())
