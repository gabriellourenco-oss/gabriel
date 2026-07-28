import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { estaAutenticado } from "@/lib/auth";
import { parseDataISO } from "@/lib/disponibilidade";

const dataISORegex = /^\d{4}-\d{2}-\d{2}$/;

export async function GET() {
  if (!(await estaAutenticado())) {
    return NextResponse.json({ erro: "Não autenticado" }, { status: 401 });
  }

  const bloqueios = await prisma.bloqueioData.findMany({
    orderBy: { data: "asc" },
    where: { data: { gte: new Date(new Date().toISOString().slice(0, 10)) } },
  });

  return NextResponse.json({ bloqueios });
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

  const { data: dataISO, motivo } = body as { data?: unknown; motivo?: unknown };

  if (typeof dataISO !== "string" || !dataISORegex.test(dataISO)) {
    return NextResponse.json({ erro: "Data inválida (esperado YYYY-MM-DD)" }, { status: 400 });
  }

  const data = parseDataISO(dataISO);

  try {
    const bloqueio = await prisma.bloqueioData.create({
      data: { data, motivo: typeof motivo === "string" && motivo.trim() ? motivo.trim() : null },
    });
    return NextResponse.json({ bloqueio }, { status: 201 });
  } catch {
    return NextResponse.json({ erro: "Esta data já está bloqueada" }, { status: 409 });
  }
}
