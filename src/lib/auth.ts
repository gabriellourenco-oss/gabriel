import { createHmac, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";

const COOKIE_NAME = "admin_session";
const SESSION_DURATION_MS = 1000 * 60 * 60 * 8; // 8 horas

function getSecret(): string {
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!secret) {
    throw new Error("ADMIN_SESSION_SECRET não configurado no ambiente");
  }
  return secret;
}

function sign(payload: string): string {
  return createHmac("sha256", getSecret()).update(payload).digest("hex");
}

export function criarTokenSessao(): string {
  const expiraEm = Date.now() + SESSION_DURATION_MS;
  const payload = `${expiraEm}`;
  const assinatura = sign(payload);
  return `${payload}.${assinatura}`;
}

export function tokenSessaoValido(token: string | undefined): boolean {
  if (!token) return false;
  const [payload, assinatura] = token.split(".");
  if (!payload || !assinatura) return false;

  const assinaturaEsperada = sign(payload);
  const bufA = Buffer.from(assinatura);
  const bufB = Buffer.from(assinaturaEsperada);
  if (bufA.length !== bufB.length || !timingSafeEqual(bufA, bufB)) {
    return false;
  }

  const expiraEm = Number(payload);
  return Number.isFinite(expiraEm) && Date.now() < expiraEm;
}

export function validarSenhaAdmin(senha: string): boolean {
  const senhaEsperada = process.env.ADMIN_PASSWORD;
  if (!senhaEsperada) return false;
  const bufA = Buffer.from(senha);
  const bufB = Buffer.from(senhaEsperada);
  if (bufA.length !== bufB.length) return false;
  return timingSafeEqual(bufA, bufB);
}

export async function estaAutenticado(): Promise<boolean> {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;
  return tokenSessaoValido(token);
}

export { COOKIE_NAME, SESSION_DURATION_MS };
