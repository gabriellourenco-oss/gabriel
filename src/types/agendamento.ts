export interface Slot {
  horaInicio: string;
  horaFim: string;
  disponivel: boolean;
}

export type ResumoMes = Record<string, boolean>;

export interface FormularioAgendamento {
  nomePaciente: string;
  telefone: string;
  email: string;
  dataNascimento: string;
  convenio: string;
  motivo: string;
}

export interface AgendamentoConfirmado {
  id: string;
  data: string;
  horaInicio: string;
  horaFim: string;
  nomePaciente: string;
  telefone: string;
  email: string;
  convenio: string;
  motivo?: string | null;
}
