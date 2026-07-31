import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { estaAutenticado } from "@/lib/auth";

const horaRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;

export async function GET() {
  if (!(await estaAutenticado())) {
    return NextResponse.json({ erro: "Não autenticado" }, { status: 401 });
  }

  const disponibilidades = await prisma.disponibilidade.findMany({
    orderBy: [{ diaSemana: "asc" }, { horaInicio: "asc" }],
  });

  return NextResponse.json({ disponibilidades });
}

export async function POST(request: NextRequest) {
  if (!(await estaAutenticado())) {
    return NextResponse.json({ erro: "Não autenticado" }, { status: 401 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ erro: "Corpo da requisição inválido" }, { status: 400 });
  }

  const { diaSemana, horaInicio, horaFim, duracaoMin } = body as {
    diaSemana?: unknown;
    horaInicio?: unknown;
    horaFim?: unknown;
    duracaoMin?: unknown;
  };

  if (typeof diaSemana !== "number" || !Number.isInteger(diaSemana) || diaSemana < 0 || diaSemana > 6) {
    return NextResponse.json({ erro: "Dia da semana inválido" }, { status: 400 });
  }
  if (typeof horaInicio !== "string" || !horaRegex.test(horaInicio)) {
    return NextResponse.json({ erro: "Horário de início inválido (esperado HH:mm)" }, { status: 400 });
  }
  if (typeof horaFim !== "string" || !horaRegex.test(horaFim)) {
    return NextResponse.json({ erro: "Horário de fim inválido (esperado HH:mm)" }, { status: 400 });
  }
  if (horaFim <= horaInicio) {
    return NextResponse.json({ erro: "O horário de fim deve ser depois do início" }, { status: 400 });
  }

  const duracao = duracaoMin === undefined ? 30 : duracaoMin;
  if (typeof duracao !== "number" || !Number.isInteger(duracao) || duracao <= 0) {
    return NextResponse.json({ erro: "Duração da consulta inválida" }, { status: 400 });
  }

  const [hIni, mIni] = horaInicio.split(":").map(Number);
  const [hFim, mFim] = horaFim.split(":").map(Number);
  const minutos = hFim * 60 + mFim - (hIni * 60 + mIni);
  if (duracao > minutos) {
    return NextResponse.json(
      { erro: "A duração da consulta não cabe na faixa de horário informada" },
      { status: 400 }
    );
  }

  const disponibilidade = await prisma.disponibilidade.create({
    data: { diaSemana, horaInicio, horaFim, duracaoMin: duracao },
  });

  return NextResponse.json({ disponibilidade }, { status: 201 });
}
