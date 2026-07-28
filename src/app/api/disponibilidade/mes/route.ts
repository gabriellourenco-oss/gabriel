import { NextRequest, NextResponse } from "next/server";
import { gerarResumoDoMes } from "@/lib/disponibilidade";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const ano = Number(searchParams.get("ano"));
  const mes = Number(searchParams.get("mes"));

  if (
    !Number.isInteger(ano) ||
    !Number.isInteger(mes) ||
    mes < 1 ||
    mes > 12 ||
    ano < 2000 ||
    ano > 2100
  ) {
    return NextResponse.json({ erro: "Parâmetros ano/mes inválidos" }, { status: 400 });
  }

  const resumo = await gerarResumoDoMes(ano, mes);
  return NextResponse.json({ resumo });
}
