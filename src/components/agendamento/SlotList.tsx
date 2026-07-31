"use client";

import { Slot } from "@/types/agendamento";

interface SlotListProps {
  slots: Slot[];
  carregando: boolean;
  slotSelecionado: string | null;
  onSelecionarSlot: (horaInicio: string) => void;
  tamanho?: "compacto" | "grande";
}

export function SlotList({
  slots,
  carregando,
  slotSelecionado,
  onSelecionarSlot,
  tamanho = "compacto",
}: SlotListProps) {
  const grande = tamanho === "grande";

  if (carregando) {
    return <p className="text-sm text-ink-500">Carregando horários...</p>;
  }

  const disponiveis = slots.filter((s) => s.disponivel);

  if (disponiveis.length === 0) {
    return (
      <p className="text-sm text-ink-500">
        Nenhum horário disponível nesta data. Selecione outro dia no calendário.
      </p>
    );
  }

  return (
    <div className={`grid grid-cols-3 sm:grid-cols-4 ${grande ? "gap-2.5" : "gap-1.5"}`}>
      {disponiveis.map((slot) => {
        const selecionado = slot.horaInicio === slotSelecionado;
        return (
          <button
            key={slot.horaInicio}
            type="button"
            onClick={() => onSelecionarSlot(slot.horaInicio)}
            aria-pressed={selecionado}
            className={`min-h-11 rounded-lg border font-semibold transition-colors ${
              grande ? "px-3 py-2.5 text-sm" : "px-2.5 py-2 text-[13px]"
            } ${
              selecionado
                ? "border-accent-500 bg-accent-500 text-cream-100 shadow-sm"
                : "border-brand-600/15 text-brand-600 hover:border-brand-300 hover:bg-brand-50"
            }`}
          >
            {slot.horaInicio}
          </button>
        );
      })}
    </div>
  );
}
