import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { estaAutenticado } from "@/lib/auth";

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  if (!(await estaAutenticado())) {
    return NextResponse.json({ erro: "Não autenticado" }, { status: 401 });
  }

  const existente = await prisma.agendamento.findUnique({ where: { id: params.id } });
  if (!existente) {
    return NextResponse.json({ erro: "Agendamento não encontrado" }, { status: 404 });
  }

  const agendamento = await prisma.agendamento.update({
    where: { id: params.id },
    data: { status: "CANCELADO", chaveSlot: null },
  });

  return NextResponse.json({ agendamento });
}
