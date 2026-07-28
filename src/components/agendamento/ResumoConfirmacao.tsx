import { AgendamentoConfirmado } from "@/types/agendamento";
import { ButtonLink } from "@/components/ui/Button";

function formatarDataExtenso(dataISO: string): string {
  const [ano, mes, dia] = dataISO.split("-").map(Number);
  const data = new Date(Date.UTC(ano, mes - 1, dia));
  return data.toLocaleDateString("pt-BR", {
    weekday: "long",
    day: "2-digit",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}

export function ResumoConfirmacao({ agendamento }: { agendamento: AgendamentoConfirmado }) {
  return (
    <div className="mx-auto max-w-lg rounded-2xl bg-white p-8 text-center shadow-sm ring-1 ring-slate-100">
      <div
        className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-accent-100 text-2xl text-accent-700"
        aria-hidden="true"
      >
        ✓
      </div>
      <h2 className="mt-4 text-2xl font-bold text-slate-900">Consulta agendada!</h2>
      <p className="mt-2 text-slate-600">
        Enviamos os detalhes para o e-mail informado. Anote o resumo abaixo:
      </p>

      <dl className="mt-6 space-y-3 rounded-xl bg-slate-50 p-5 text-left text-sm">
        <div className="flex justify-between gap-4">
          <dt className="font-medium text-slate-500">Data</dt>
          <dd className="text-right capitalize text-slate-900">
            {formatarDataExtenso(agendamento.data)}
          </dd>
        </div>
        <div className="flex justify-between gap-4">
          <dt className="font-medium text-slate-500">Horário</dt>
          <dd className="text-slate-900">
            {agendamento.horaInicio} – {agendamento.horaFim}
          </dd>
        </div>
        <div className="flex justify-between gap-4">
          <dt className="font-medium text-slate-500">Paciente</dt>
          <dd className="text-right text-slate-900">{agendamento.nomePaciente}</dd>
        </div>
        <div className="flex justify-between gap-4">
          <dt className="font-medium text-slate-500">Convênio</dt>
          <dd className="text-right text-slate-900">{agendamento.convenio}</dd>
        </div>
        <div className="flex justify-between gap-4">
          <dt className="font-medium text-slate-500">Código</dt>
          <dd className="text-right font-mono text-xs text-slate-500">{agendamento.id}</dd>
        </div>
      </dl>

      <p className="mt-6 text-sm text-slate-500">
        Precisa reagendar ou cancelar? Entre em contato pelo WhatsApp [TELEFONE].
      </p>

      <ButtonLink href="/" variant="secondary" className="mt-6">
        Voltar para o início
      </ButtonLink>
    </div>
  );
}
