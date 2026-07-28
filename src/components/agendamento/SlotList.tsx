"use client";

import { Slot } from "@/types/agendamento";

interface SlotListProps {
  slots: Slot[];
  carregando: boolean;
  slotSelecionado: string | null;
  onSelecionarSlot: (horaInicio: string) => void;
}

export function SlotList({
  slots,
  carregando,
  slotSelecionado,
  onSelecionarSlot,
}: SlotListProps) {
  if (carregando) {
    return <p className="text-sm text-slate-500">Carregando horários...</p>;
  }

  const disponiveis = slots.filter((s) => s.disponivel);

  if (disponiveis.length === 0) {
    return (
      <p className="text-sm text-slate-500">
        Nenhum horário disponível nesta data. Selecione outro dia no calendário.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
      {disponiveis.map((slot) => {
        const selecionado = slot.horaInicio === slotSelecionado;
        return (
          <button
            key={slot.horaInicio}
            type="button"
            onClick={() => onSelecionarSlot(slot.horaInicio)}
            aria-pressed={selecionado}
            className={`rounded-lg border px-3 py-2 text-sm font-medium transition-colors ${
              selecionado
                ? "border-brand-600 bg-brand-600 text-white"
                : "border-slate-200 text-slate-700 hover:border-brand-400 hover:bg-brand-50"
            }`}
          >
            {slot.horaInicio}
          </button>
        );
      })}
    </div>
  );
}
