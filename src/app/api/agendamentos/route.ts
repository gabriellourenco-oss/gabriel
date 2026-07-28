import { NextRequest, NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { gerarSlotsDoDia, parseDataISO } from "@/lib/disponibilidade";
import {
  agendamentoSchema,
  validarDataNaoPassada,
  validarDataNascimentoPassada,
} from "@/lib/validation";

export async function POST(request: NextRequest) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ erro: "Corpo da requisição inválido" }, { status: 400 });
  }

  const resultado = agendamentoSchema.safeParse(body);
  if (!resultado.success) {
    return NextResponse.json(
      { erro: "Dados inválidos", detalhes: resultado.error.flatten().fieldErrors },
      { status: 400 }
    );
  }

  const dados = resultado.data;

  if (!validarDataNaoPassada(dados.data)) {
    return NextResponse.json(
      { erro: "Não é possível agendar em uma data passada" },
      { status: 400 }
    );
  }

  if (!validarDataNascimentoPassada(dados.dataNascimento)) {
    return NextResponse.json(
      { erro: "Data de nascimento inválida" },
      { status: 400 }
    );
  }

  const data = parseDataISO(dados.data);

  // Revalida no servidor se o horário escolhido ainda está realmente disponível
  const slots = await gerarSlotsDoDia(data);
  const slotEscolhido = slots.find((s) => s.horaInicio === dados.horaInicio);
  if (!slotEscolhido || !slotEscolhido.disponivel) {
    return NextResponse.json(
      { erro: "Este horário não está mais disponível. Escolha outro horário." },
      { status: 409 }
    );
  }

  try {
    const agendamento = await prisma.agendamento.create({
      data: {
        data,
        horaInicio: slotEscolhido.horaInicio,
        horaFim: slotEscolhido.horaFim,
        nomePaciente: dados.nomePaciente,
        telefone: dados.telefone,
        email: dados.email,
        dataNascimento: parseDataISO(dados.dataNascimento),
        convenio: dados.convenio,
        motivo: dados.motivo || null,
        chaveSlot: `${dados.data}_${slotEscolhido.horaInicio}`,
      },
    });

    return NextResponse.json({ agendamento }, { status: 201 });
  } catch (erro) {
    if (erro instanceof Prisma.PrismaClientKnownRequestError && erro.code === "P2002") {
      return NextResponse.json(
        { erro: "Este horário acabou de ser reservado por outra pessoa. Escolha outro horário." },
        { status: 409 }
      );
    }
    console.error(erro);
    return NextResponse.json({ erro: "Erro interno ao criar agendamento" }, { status: 500 });
  }
}
