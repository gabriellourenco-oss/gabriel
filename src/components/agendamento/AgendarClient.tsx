"use client";

import { useEffect, useState } from "react";
import { Calendario } from "@/components/agendamento/Calendario";
import { SlotList } from "@/components/agendamento/SlotList";
import { FormularioPaciente } from "@/components/agendamento/FormularioPaciente";
import { ResumoConfirmacao } from "@/components/agendamento/ResumoConfirmacao";
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

export function AgendarClient() {
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
        convenio: json.agendamento.convenio,
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

  return (
    <div className="grid gap-8 lg:grid-cols-2 lg:items-start">
      <div className="space-y-6">
        <Calendario
          ano={ano}
          mes={mes}
          resumo={resumo}
          dataSelecionada={dataSelecionada}
          carregando={carregandoMes}
          onSelecionarData={selecionarData}
          onMudarMes={(novoAno, novoMes) => setAnoMes({ ano: novoAno, mes: novoMes })}
        />

        {dataSelecionada && (
          <div className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-100 sm:p-6">
            <h3 className="mb-3 text-sm font-semibold text-slate-700">
              Horários disponíveis
            </h3>
            <SlotList
              slots={slots}
              carregando={carregandoSlots}
              slotSelecionado={slotSelecionado}
              onSelecionarSlot={setSlotSelecionado}
            />
          </div>
        )}
      </div>

      <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-100 sm:p-8">
        {etapa === "calendario" ? (
          <div className="flex h-full flex-col items-start justify-center gap-4 text-slate-600">
            <p>
              Selecione uma data disponível no calendário e, em seguida, um
              horário para continuar com o agendamento.
            </p>
            {dataSelecionada && slotSelecionado && (
              <button
                type="button"
                onClick={irParaFormulario}
                className="inline-flex items-center justify-center rounded-full bg-brand-600 px-6 py-3 text-base font-semibold text-white hover:bg-brand-700"
              >
                Continuar para os dados do paciente
              </button>
            )}
          </div>
        ) : (
          <>
            <h3 className="mb-1 text-lg font-semibold text-slate-900">Seus dados</h3>
            <p className="mb-5 text-sm text-slate-500">
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
          </>
        )}
      </div>
    </div>
  );
}
