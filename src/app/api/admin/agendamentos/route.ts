import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { estaAutenticado } from "@/lib/auth";
import { parseDataISO } from "@/lib/disponibilidade";

const dataISORegex = /^\d{4}-\d{2}-\d{2}$/;

export async function GET(request: NextRequest) {
  if (!(await estaAutenticado())) {
    return NextResponse.json({ erro: "Não autenticado" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const dataISO = searchParams.get("data") ?? "";

  if (!dataISORegex.test(dataISO)) {
    return NextResponse.json({ erro: "Parâmetro data inválido (esperado YYYY-MM-DD)" }, { status: 400 });
  }

  const data = parseDataISO(dataISO);
  const agendamentos = await prisma.agendamento.findMany({
    where: { data },
    orderBy: { horaInicio: "asc" },
  });

  return NextResponse.json({ agendamentos });
}
