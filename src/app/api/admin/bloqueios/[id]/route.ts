import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { estaAutenticado } from "@/lib/auth";

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  if (!(await estaAutenticado())) {
    return NextResponse.json({ erro: "Não autenticado" }, { status: 401 });
  }

  const existente = await prisma.bloqueioData.findUnique({ where: { id: params.id } });
  if (!existente) {
    return NextResponse.json({ erro: "Bloqueio não encontrado" }, { status: 404 });
  }

  await prisma.bloqueioData.delete({ where: { id: params.id } });
  return NextResponse.json({ ok: true });
}
