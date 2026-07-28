import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { COOKIE_NAME, SESSION_DURATION_MS, criarTokenSessao, validarSenhaAdmin } from "@/lib/auth";

export async function POST(request: NextRequest) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ erro: "Corpo da requisição inválido" }, { status: 400 });
  }

  const senha = typeof (body as { senha?: unknown })?.senha === "string"
    ? (body as { senha: string }).senha
    : "";

  if (!senha || !validarSenhaAdmin(senha)) {
    return NextResponse.json({ erro: "Senha incorreta" }, { status: 401 });
  }

  const token = criarTokenSessao();
  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: Math.floor(SESSION_DURATION_MS / 1000),
    path: "/",
  });

  return NextResponse.json({ ok: true });
}
