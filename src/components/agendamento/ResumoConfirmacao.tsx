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
    <div className="mx-auto max-w-lg overflow-hidden rounded-2xl bg-cream-100 shadow-[0_20px_40px_-28px_rgba(15,45,43,0.35)] ring-1 ring-brand-600/10">
      <div className="h-[3px] w-full bg-gradient-to-r from-brand-600 via-brand-300 to-accent-500" />
      <div className="p-8 text-center">
        <div
          className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-brand-100 text-2xl text-brand-600"
          aria-hidden="true"
        >
          ✓
        </div>
        <h2 className="mt-4 font-serif text-2xl font-semibold text-brand-600">
          Consulta agendada!
        </h2>
        <p className="mt-2 text-ink-600">
          Enviamos os detalhes para o e-mail informado. Anote o resumo abaixo:
        </p>

        <dl className="mt-6 space-y-3 rounded-xl bg-brand-50 p-5 text-left text-sm">
          <div className="flex justify-between gap-4">
            <dt className="font-medium text-ink-500">Data</dt>
            <dd className="text-right capitalize text-ink">{formatarDataExtenso(agendamento.data)}</dd>
          </div>
          <div className="flex justify-between gap-4">
            <dt className="font-medium text-ink-500">Horário</dt>
            <dd className="text-ink">
              {agendamento.horaInicio} às {agendamento.horaFim}
            </dd>
          </div>
          <div className="flex justify-between gap-4">
            <dt className="font-medium text-ink-500">Paciente</dt>
            <dd className="text-right text-ink">{agendamento.nomePaciente}</dd>
          </div>
          <div className="flex justify-between gap-4">
            <dt className="font-medium text-ink-500">Código</dt>
            <dd className="text-right font-mono text-xs text-ink-500">{agendamento.id}</dd>
          </div>
        </dl>

        <p className="mt-6 text-sm text-ink-500">
          Precisa reagendar ou cancelar? Entre em contato pelo WhatsApp{" "}
          <a
            href="https://wa.me/5533988732087"
            target="_blank"
            rel="noopener"
            className="font-semibold text-accent-500 hover:text-accent-600"
          >
            (33) 9 8873-2087
          </a>
          .
        </p>

        <ButtonLink href="/" variant="secondary" className="mt-6">
          Voltar para o início
        </ButtonLink>
      </div>
    </div>
  );
}
