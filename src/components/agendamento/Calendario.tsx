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
}

export function Calendario({
  ano,
  mes,
  resumo,
  dataSelecionada,
  carregando,
  onSelecionarData,
  onMudarMes,
}: CalendarioProps) {
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
    <div className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-100 sm:p-6">
      <div className="mb-4 flex items-center justify-between">
        <button
          type="button"
          onClick={mesAnterior}
          disabled={!podeVoltar}
          aria-label="Mês anterior"
          className="rounded-full p-2 text-slate-600 hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-30"
        >
          ←
        </button>
        <h3 className="text-lg font-semibold text-slate-900">
          {NOMES_MESES[mes - 1]} de {ano}
        </h3>
        <button
          type="button"
          onClick={proximoMes}
          aria-label="Próximo mês"
          className="rounded-full p-2 text-slate-600 hover:bg-slate-100"
        >
          →
        </button>
      </div>

      <div className="grid grid-cols-7 gap-1 text-center text-xs font-medium text-slate-500">
        {DIAS_SEMANA.map((d, i) => (
          <div key={`${d}-${i}`} className="py-1">
            {d}
          </div>
        ))}
      </div>

      <div className="mt-1 grid grid-cols-7 gap-1">
        {celulas.map((celula, i) => {
          if (!celula) return <div key={`vazio-${i}`} />;

          const passado = celula.dataISO < hoje;
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
              aria-label={`Dia ${celula.dia}${disponivel ? ", com horários disponíveis" : ", sem horários disponíveis"}`}
              className={`aspect-square rounded-lg text-sm font-medium transition-colors ${
                selecionado
                  ? "bg-brand-600 text-white"
                  : habilitado
                  ? "bg-accent-50 text-slate-900 hover:bg-accent-100"
                  : "text-slate-300"
              }`}
            >
              {celula.dia}
            </button>
          );
        })}
      </div>

      <p className="mt-4 flex items-center gap-2 text-xs text-slate-500">
        <span className="inline-block h-3 w-3 rounded bg-accent-50" aria-hidden="true" />
        Dias com horários disponíveis
      </p>
    </div>
  );
}
