import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { estaAutenticado } from "@/lib/auth";

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  if (!(await estaAutenticado())) {
    return NextResponse.json({ erro: "Não autenticado" }, { status: 401 });
  }

  const existente = await prisma.disponibilidade.findUnique({ where: { id: params.id } });
  if (!existente) {
    return NextResponse.json({ erro: "Regra de disponibilidade não encontrada" }, { status: 404 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ erro: "Corpo da requisição inválido" }, { status: 400 });
  }

  const { ativo } = body as { ativo?: unknown };
  if (typeof ativo !== "boolean") {
    return NextResponse.json({ erro: "Campo 'ativo' inválido" }, { status: 400 });
  }

  const disponibilidade = await prisma.disponibilidade.update({
    where: { id: params.id },
    data: { ativo },
  });

  return NextResponse.json({ disponibilidade });
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  if (!(await estaAutenticado())) {
    return NextResponse.json({ erro: "Não autenticado" }, { status: 401 });
  }

  const existente = await prisma.disponibilidade.findUnique({ where: { id: params.id } });
  if (!existente) {
    return NextResponse.json({ erro: "Regra de disponibilidade não encontrada" }, { status: 404 });
  }

  await prisma.disponibilidade.delete({ where: { id: params.id } });
  return NextResponse.json({ ok: true });
}
