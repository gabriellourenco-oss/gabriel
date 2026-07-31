"use client";

import { ResumoMes } from "@/types/agendamento";

const DIAS_SEMANA = ["D", "S", "T", "Q", "Q", "S", "S"];
const NOMES_MESES = [
  "Janeiro",
  "Fevereiro",
  "Março",
  "Abril",
  "Maio",
  "Junho",
  "Julho",
  "Agosto",
  "Setembro",
  "Outubro",
  "Novembro",
  "Dezembro",
];

function hojeISO(): string {
  const hoje = new Date();
  return new Date(Date.UTC(hoje.getFullYear(), hoje.getMonth(), hoje.getDate()))
    .toISOString()
    .slice(0, 10);
}

interface CalendarioProps {
  ano: number;
  mes: number; // 1-12
  resumo: ResumoMes;
  dataSelecionada: string | null;
  carregando: boolean;
  onSelecionarData: (dataISO: string) => void;
  onMudarMes: (ano: number, mes: number) => void;
  tamanho?: "compacto" | "grande";
}

export function Calendario({
  ano,
  mes,
  resumo,
  dataSelecionada,
  carregando,
  onSelecionarData,
  onMudarMes,
  tamanho = "compacto",
}: CalendarioProps) {
  const grande = tamanho === "grande";
  const primeiroDiaSemana = new Date(Date.UTC(ano, mes - 1, 1)).getUTCDay();
  const diasNoMes = new Date(Date.UTC(ano, mes, 0)).getUTCDate();
  const hoje = hojeISO();

  const celulas: Array<{ dia: number; dataISO: string } | null> = [];
  for (let i = 0; i < primeiroDiaSemana; i++) celulas.push(null);
  for (let dia = 1; dia <= diasNoMes; dia++) {
    const dataISO = `${ano}-${String(mes).padStart(2, "0")}-${String(dia).padStart(2, "0")}`;
    celulas.push({ dia, dataISO });
  }

  function mesAnterior() {
    if (mes === 1) onMudarMes(ano - 1, 12);
    else onMudarMes(ano, mes - 1);
  }

  function proximoMes() {
    if (mes === 12) onMudarMes(ano + 1, 1);
    else onMudarMes(ano, mes + 1);
  }

  const anoMesAtual = hoje.slice(0, 7);
  const anoMesExibido = `${ano}-${String(mes).padStart(2, "0")}`;
  const podeVoltar = anoMesExibido > anoMesAtual;

  return (
    <div
      className={`mx-auto w-full overflow-hidden rounded-xl bg-cream-100 ring-1 ring-brand-600/10 ${
        grande ? "max-w-[460px] shadow-sm" : "max-w-[320px] shadow-[0_20px_40px_-28px_rgba(15,45,43,0.35)]"
      }`}
    >
      <div className="h-[2px] w-full bg-gradient-to-r from-brand-600 via-brand-300 to-accent-500" />

      <div className={grande ? "p-6" : "p-4"}>
        <div className={`flex items-center justify-between ${grande ? "mb-5" : "mb-3.5"}`}>
          <button
            type="button"
            onClick={mesAnterior}
            disabled={!podeVoltar}
            aria-label="Mês anterior"
            className={`flex items-center justify-center rounded-full border border-brand-600/15 text-brand-600 transition-colors hover:bg-brand-50 disabled:cursor-not-allowed disabled:opacity-30 ${
              grande ? "h-9 w-9 text-sm" : "h-7 w-7 text-xs"
            }`}
          >
            ←
          </button>
          <h3 className={`font-serif font-semibold text-brand-600 ${grande ? "text-lg" : "text-[15px]"}`}>
            {NOMES_MESES[mes - 1]} de {ano}
          </h3>
          <button
            type="button"
            onClick={proximoMes}
            aria-label="Próximo mês"
            className={`flex items-center justify-center rounded-full border border-brand-600/15 text-brand-600 transition-colors hover:bg-brand-50 ${
              grande ? "h-9 w-9 text-sm" : "h-7 w-7 text-xs"
            }`}
          >
            →
          </button>
        </div>

        <div
          className={`grid grid-cols-7 text-center font-semibold uppercase tracking-wide text-ink-400 ${
            grande ? "gap-1 text-xs" : "gap-0.5 text-[10.5px]"
          }`}
        >
          {DIAS_SEMANA.map((d, i) => (
            <div key={`${d}-${i}`} className={grande ? "py-1.5" : "py-0.5"}>
              {d}
            </div>
          ))}
        </div>

        <div className={`grid grid-cols-7 ${grande ? "mt-1 gap-2" : "mt-0.5 gap-1"}`}>
          {celulas.map((celula, i) => {
            if (!celula) return <div key={`vazio-${i}`} />;

            const passado = celula.dataISO < hoje;
            const ehHoje = celula.dataISO === hoje;
            const disponivel = resumo[celula.dataISO] === true;
            const selecionado = celula.dataISO === dataSelecionada;
            const habilitado = !passado && disponivel && !carregando;

            return (
              <button
                key={celula.dataISO}
                type="button"
                disabled={!habilitado}
                onClick={() => onSelecionarData(celula.dataISO)}
                aria-pressed={selecionado}
                aria-current={ehHoje ? "date" : undefined}
                aria-label={`Dia ${celula.dia}${disponivel ? ", com horários disponíveis" : ", sem horários disponíveis"}${ehHoje ? " (hoje)" : ""}`}
                className={`relative w-full rounded-lg font-semibold transition-all ${
                  grande ? "h-11 text-sm" : "h-9 text-[12.5px]"
                } ${
                  selecionado
                    ? "bg-accent-500 text-cream-100 shadow-sm"
                    : habilitado
                    ? "bg-brand-50 text-brand-600 hover:-translate-y-px hover:bg-brand-100"
                    : "text-ink-400/50"
                } ${ehHoje && !selecionado ? "ring-2 ring-inset ring-brand-300" : ""}`}
              >
                {celula.dia}
                {habilitado && !selecionado && (
                  <span
                    className={`absolute left-1/2 -translate-x-1/2 rounded-full bg-brand-300 ${
                      grande ? "bottom-1.5 h-1 w-1" : "bottom-1 h-[3px] w-[3px]"
                    }`}
                  />
                )}
              </button>
            );
          })}
        </div>

        <p
          className={`flex items-center text-ink-500 ${
            grande ? "mt-5 gap-2 text-xs" : "mt-3.5 gap-1.5 text-[11px]"
          } font-medium`}
        >
          <span
            className={`inline-block rounded-full bg-brand-50 ring-1 ring-inset ring-brand-200 ${
              grande ? "h-2.5 w-2.5" : "h-2 w-2"
            }`}
            aria-hidden="true"
          />
          Dias com horários disponíveis
        </p>
      </div>
    </div>
  );
}
