"use client";

import { useEffect, useState } from "react";
import { Calendario } from "@/components/agendamento/Calendario";
import { SlotList } from "@/components/agendamento/SlotList";
import { FormularioPaciente } from "@/components/agendamento/FormularioPaciente";
import { ResumoConfirmacao } from "@/components/agendamento/ResumoConfirmacao";
import { Button } from "@/components/ui/Button";
import {
  AgendamentoConfirmado,
  FormularioAgendamento,
  ResumoMes,
  Slot,
} from "@/types/agendamento";

type Etapa = "calendario" | "formulario" | "confirmado";

function hoje() {
  const agora = new Date();
  return { ano: agora.getFullYear(), mes: agora.getMonth() + 1 };
}

interface AgendarClientProps {
  tamanho?: "compacto" | "grande";
}

export function AgendarClient({ tamanho = "compacto" }: AgendarClientProps) {
  const grande = tamanho === "grande";
  const [{ ano, mes }, setAnoMes] = useState(hoje());
  const [resumo, setResumo] = useState<ResumoMes>({});
  const [carregandoMes, setCarregandoMes] = useState(true);

  const [dataSelecionada, setDataSelecionada] = useState<string | null>(null);
  const [slots, setSlots] = useState<Slot[]>([]);
  const [carregandoSlots, setCarregandoSlots] = useState(false);
  const [slotSelecionado, setSlotSelecionado] = useState<string | null>(null);

  const [etapa, setEtapa] = useState<Etapa>("calendario");
  const [enviando, setEnviando] = useState(false);
  const [erroEnvio, setErroEnvio] = useState<string | null>(null);
  const [agendamento, setAgendamento] = useState<AgendamentoConfirmado | null>(null);

  useEffect(() => {
    setCarregandoMes(true);
    fetch(`/api/disponibilidade/mes?ano=${ano}&mes=${mes}`)
      .then((r) => r.json())
      .then((json) => setResumo(json.resumo ?? {}))
      .finally(() => setCarregandoMes(false));
  }, [ano, mes]);

  function selecionarData(dataISO: string) {
    setDataSelecionada(dataISO);
    setSlotSelecionado(null);
    setCarregandoSlots(true);
    fetch(`/api/disponibilidade/dia?data=${dataISO}`)
      .then((r) => r.json())
      .then((json) => setSlots(json.slots ?? []))
      .finally(() => setCarregandoSlots(false));
  }

  function irParaFormulario() {
    if (dataSelecionada && slotSelecionado) {
      setErroEnvio(null);
      setEtapa("formulario");
    }
  }

  async function enviarFormulario(dados: FormularioAgendamento) {
    if (!dataSelecionada || !slotSelecionado) return;

    setEnviando(true);
    setErroEnvio(null);

    try {
      const resposta = await fetch("/api/agendamentos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          data: dataSelecionada,
          horaInicio: slotSelecionado,
          ...dados,
        }),
      });

      const json = await resposta.json();

      if (!resposta.ok) {
        setErroEnvio(json.erro ?? "Não foi possível concluir o agendamento.");
        if (resposta.status === 409) {
          // horário não está mais disponível: recarrega os slots do dia
          selecionarData(dataSelecionada);
          setSlotSelecionado(null);
          setEtapa("calendario");
        }
        return;
      }

      setAgendamento({
        id: json.agendamento.id,
        data: dataSelecionada,
        horaInicio: json.agendamento.horaInicio,
        horaFim: json.agendamento.horaFim,
        nomePaciente: json.agendamento.nomePaciente,
        telefone: json.agendamento.telefone,
        email: json.agendamento.email,
        motivo: json.agendamento.motivo,
      });
      setEtapa("confirmado");
    } catch {
      setErroEnvio("Erro de conexão. Verifique sua internet e tente novamente.");
    } finally {
      setEnviando(false);
    }
  }

  if (etapa === "confirmado" && agendamento) {
    return <ResumoConfirmacao agendamento={agendamento} />;
  }

  const temSelecao = Boolean(dataSelecionada && slotSelecionado);
  const cardBase = `rounded-xl bg-cream-100 ring-1 ring-brand-600/10 ${
    grande ? "shadow-sm p-6" : "shadow-[0_20px_40px_-28px_rgba(15,45,43,0.35)] p-5"
  }`;

  return (
    <div className={grande ? "grid gap-8 lg:grid-cols-[3fr_2fr] lg:items-start" : "flex flex-col gap-5"}>
      <div className="space-y-4">
        <Calendario
          ano={ano}
          mes={mes}
          resumo={resumo}
          dataSelecionada={dataSelecionada}
          carregando={carregandoMes}
          onSelecionarData={selecionarData}
          onMudarMes={(novoAno, novoMes) => setAnoMes({ ano: novoAno, mes: novoMes })}
          tamanho={tamanho}
        />

        {dataSelecionada && (
          <div
            className={`mx-auto w-full rounded-xl bg-cream-100 ring-1 ring-brand-600/10 ${
              grande ? "max-w-[460px] shadow-sm p-5" : "max-w-[320px] shadow-[0_20px_40px_-28px_rgba(15,45,43,0.35)] p-4"
            }`}
          >
            <h3 className={`font-semibold text-brand-600 ${grande ? "mb-3 text-sm" : "mb-2.5 text-[13px]"}`}>
              Horários disponíveis
            </h3>
            <SlotList
              slots={slots}
              carregando={carregandoSlots}
              slotSelecionado={slotSelecionado}
              onSelecionarSlot={setSlotSelecionado}
              tamanho={tamanho}
            />
          </div>
        )}
      </div>

      {etapa === "calendario" ? (
        <div className={`${cardBase} ${grande ? "lg:sticky lg:top-24" : ""}`}>
          {!temSelecao ? (
            <div className="flex flex-col items-center gap-2 py-6 text-center">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" className="text-brand-300" aria-hidden="true">
                <rect x="3" y="5" width="18" height="16" rx="2" stroke="currentColor" strokeWidth="1.6" />
                <path d="M3 9.5h18M8 3v4M16 3v4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
              </svg>
              <p className="max-w-[220px] text-sm text-ink-400">
                Selecione uma data e um horário no calendário para continuar.
              </p>
            </div>
          ) : (
            <div className="flex flex-col items-center text-center">
              <h3 className="font-serif text-lg font-semibold text-brand-600">Confirme seu agendamento</h3>
              <div className="mt-3 rounded-lg bg-brand-50 px-4 py-2.5 text-sm font-semibold text-brand-600">
                {dataSelecionada!.split("-").reverse().join("/")} às {slotSelecionado}
              </div>
              <Button type="button" onClick={irParaFormulario} className="mt-5">
                Continuar para seus dados
              </Button>
              <p className="mt-3 max-w-[240px] text-xs text-ink-400">
                Você vai preencher seus dados de contato na próxima etapa.
              </p>
            </div>
          )}
        </div>
      ) : (
        <div className={cardBase}>
          <h3 className="mb-1 font-serif text-lg font-semibold text-brand-600">Seus dados</h3>
          <p className="mb-5 text-sm text-ink-500">
            {dataSelecionada && slotSelecionado
              ? `Consulta em ${dataSelecionada.split("-").reverse().join("/")} às ${slotSelecionado}`
              : ""}
          </p>
          <FormularioPaciente
            enviando={enviando}
            erroEnvio={erroEnvio}
            onEnviar={enviarFormulario}
            onVoltar={() => setEtapa("calendario")}
          />
        </div>
      )}
    </div>
  );
}
