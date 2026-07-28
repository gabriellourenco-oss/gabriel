import { NextRequest, NextResponse } from "next/server";
import { gerarSlotsDoDia, parseDataISO } from "@/lib/disponibilidade";

const dataISORegex = /^\d{4}-\d{2}-\d{2}$/;

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const dataISO = searchParams.get("data") ?? "";

  if (!dataISORegex.test(dataISO)) {
    return NextResponse.json({ erro: "Parâmetro data inválido (esperado YYYY-MM-DD)" }, { status: 400 });
  }

  const data = parseDataISO(dataISO);
  if (Number.isNaN(data.getTime())) {
    return NextResponse.json({ erro: "Data inválida" }, { status: 400 });
  }

  const slots = await gerarSlotsDoDia(data);
  return NextResponse.json({ slots });
}
