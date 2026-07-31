import { z } from "zod";

const dataISORegex = /^\d{4}-\d{2}-\d{2}$/;
const horaRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;

export const agendamentoSchema = z.object({
  data: z.string().regex(dataISORegex, "Data inválida"),
  horaInicio: z.string().regex(horaRegex, "Horário inválido"),
  nomePaciente: z
    .string()
    .trim()
    .min(3, "Informe o nome completo")
    .max(120, "Nome muito longo"),
  telefone: z
    .string()
    .trim()
    .min(10, "Informe um telefone/WhatsApp válido com DDD")
    .max(20, "Telefone inválido")
    .regex(/^[\d\s()+-]+$/, "Use apenas números, espaços e símbolos (), +, -"),
  email: z.string().trim().email("Informe um e-mail válido").max(160),
  dataNascimento: z.string().regex(dataISORegex, "Data de nascimento inválida"),
  motivo: z.string().trim().max(500).optional().or(z.literal("")),
});

export type AgendamentoInput = z.infer<typeof agendamentoSchema>;

export function validarDataNaoPassada(dataISO: string): boolean {
  const hoje = new Date();
  const hojeISO = new Date(Date.UTC(hoje.getFullYear(), hoje.getMonth(), hoje.getDate()))
    .toISOString()
    .slice(0, 10);
  return dataISO >= hojeISO;
}

export function validarDataNascimentoPassada(dataISO: string): boolean {
  const hoje = new Date();
  const hojeISO = new Date(Date.UTC(hoje.getFullYear(), hoje.getMonth(), hoje.getDate()))
    .toISOString()
    .slice(0, 10);
  return dataISO < hojeISO;
}
