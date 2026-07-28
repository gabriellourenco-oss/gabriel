import { prisma } from "@/lib/prisma";

export interface Slot {
  horaInicio: string;
  horaFim: string;
  disponivel: boolean;
}

function paraMinutos(hora: string): number {
  const [h, m] = hora.split(":").map(Number);
  return h * 60 + m;
}

function paraHora(minutos: number): string {
  const h = Math.floor(minutos / 60)
    .toString()
    .padStart(2, "0");
  const m = (minutos % 60).toString().padStart(2, "0");
  return `${h}:${m}`;
}

/** Normaliza uma data para meia-noite UTC, descartando hora/fuso. */
export function normalizarData(data: Date): Date {
  return new Date(
    Date.UTC(data.getUTCFullYear(), data.getUTCMonth(), data.getUTCDate())
  );
}

export function parseDataISO(dataISO: string): Date {
  const [ano, mes, dia] = dataISO.split("-").map(Number);
  return new Date(Date.UTC(ano, mes - 1, dia));
}

export function formatarDataISO(data: Date): string {
  return normalizarData(data).toISOString().slice(0, 10);
}

function inicioDoDiaLocal(): Date {
  const agora = new Date();
  return new Date(Date.UTC(agora.getFullYear(), agora.getMonth(), agora.getDate()));
}

/**
 * Gera os slots de horário de um dia específico, cruzando as regras de
 * disponibilidade (por dia da semana) com bloqueios de data e agendamentos
 * já existentes. Datas passadas nunca retornam slots.
 */
export async function gerarSlotsDoDia(data: Date): Promise<Slot[]> {
  const dataNormalizada = normalizarData(data);
  const hoje = inicioDoDiaLocal();

  if (dataNormalizada.getTime() < hoje.getTime()) {
    return [];
  }

  const bloqueio = await prisma.bloqueioData.findUnique({
    where: { data: dataNormalizada },
  });
  if (bloqueio) {
    return [];
  }

  const diaSemana = dataNormalizada.getUTCDay();
  const regras = await prisma.disponibilidade.findMany({
    where: { diaSemana, ativo: true },
    orderBy: { horaInicio: "asc" },
  });

  if (regras.length === 0) {
    return [];
  }

  const agendamentos = await prisma.agendamento.findMany({
    where: { data: dataNormalizada, status: "CONFIRMADO" },
    select: { horaInicio: true },
  });
  const horariosOcupados = new Set(agendamentos.map((a) => a.horaInicio));

  const agora = new Date();
  const ehHoje = dataNormalizada.getTime() === hoje.getTime();

  const slots: Slot[] = [];
  for (const regra of regras) {
    const inicio = paraMinutos(regra.horaInicio);
    const fim = paraMinutos(regra.horaFim);
    for (let m = inicio; m + regra.duracaoMin <= fim; m += regra.duracaoMin) {
      const horaInicio = paraHora(m);
      const horaFim = paraHora(m + regra.duracaoMin);

      let disponivel = !horariosOcupados.has(horaInicio);

      // Se for hoje, não oferece horários que já passaram
      if (disponivel && ehHoje) {
        const [h, min] = horaInicio.split(":").map(Number);
        const horarioSlot = new Date(agora);
        horarioSlot.setHours(h, min, 0, 0);
        if (horarioSlot.getTime() <= agora.getTime()) {
          disponivel = false;
        }
      }

      slots.push({ horaInicio, horaFim, disponivel });
    }
  }

  return slots;
}

/**
 * Retorna, para cada dia do mês/ano informado, se existe pelo menos um
 * slot disponível — usado para pintar o calendário mensal.
 */
export async function gerarResumoDoMes(
  ano: number,
  mes: number // 1-12
): Promise<Record<string, boolean>> {
  const diasNoMes = new Date(Date.UTC(ano, mes, 0)).getUTCDate();
  const resumo: Record<string, boolean> = {};

  for (let dia = 1; dia <= diasNoMes; dia++) {
    const data = new Date(Date.UTC(ano, mes - 1, dia));
    const slots = await gerarSlotsDoDia(data);
    resumo[formatarDataISO(data)] = slots.some((s) => s.disponivel);
  }

  return resumo;
}
