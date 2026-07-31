"use client";

import { FormEvent, useState } from "react";
import { FormularioAgendamento } from "@/types/agendamento";
import { Button } from "@/components/ui/Button";

interface FormularioPacienteProps {
  enviando: boolean;
  erroEnvio: string | null;
  onEnviar: (dados: FormularioAgendamento) => void;
  onVoltar: () => void;
}

type Erros = Partial<Record<keyof FormularioAgendamento, string>>;

function hojeISO(): string {
  const hoje = new Date();
  return new Date(Date.UTC(hoje.getFullYear(), hoje.getMonth(), hoje.getDate()))
    .toISOString()
    .slice(0, 10);
}

function validar(dados: FormularioAgendamento): Erros {
  const erros: Erros = {};

  if (dados.nomePaciente.trim().length < 3) {
    erros.nomePaciente = "Informe o nome completo";
  }
  if (!/^[\d\s()+-]{10,20}$/.test(dados.telefone.trim())) {
    erros.telefone = "Informe um telefone/WhatsApp válido com DDD";
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(dados.email.trim())) {
    erros.email = "Informe um e-mail válido";
  }
  if (!dados.dataNascimento) {
    erros.dataNascimento = "Informe a data de nascimento";
  } else if (dados.dataNascimento >= hojeISO()) {
    erros.dataNascimento = "Data de nascimento deve estar no passado";
  }

  return erros;
}

export function FormularioPaciente({
  enviando,
  erroEnvio,
  onEnviar,
  onVoltar,
}: FormularioPacienteProps) {
  const [dados, setDados] = useState<FormularioAgendamento>({
    nomePaciente: "",
    telefone: "",
    email: "",
    dataNascimento: "",
    motivo: "",
  });
  const [erros, setErros] = useState<Erros>({});

  function atualizar<K extends keyof FormularioAgendamento>(campo: K, valor: string) {
    setDados((atual) => ({ ...atual, [campo]: valor }));
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const errosValidacao = validar(dados);
    setErros(errosValidacao);
    if (Object.keys(errosValidacao).length === 0) {
      onEnviar(dados);
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      <div>
        <label htmlFor="nomePaciente" className="block text-sm font-medium text-slate-700">
          Nome completo
        </label>
        <input
          id="nomePaciente"
          name="nomePaciente"
          type="text"
          required
          value={dados.nomePaciente}
          onChange={(e) => atualizar("nomePaciente", e.target.value)}
          aria-invalid={!!erros.nomePaciente}
          aria-describedby={erros.nomePaciente ? "erro-nomePaciente" : undefined}
          className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 focus:border-brand-500"
        />
        {erros.nomePaciente && (
          <p id="erro-nomePaciente" className="mt-1 text-sm text-red-600">
            {erros.nomePaciente}
          </p>
        )}
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="telefone" className="block text-sm font-medium text-slate-700">
            Telefone / WhatsApp
          </label>
          <input
            id="telefone"
            name="telefone"
            type="tel"
            required
            placeholder="(11) 91234-5678"
            value={dados.telefone}
            onChange={(e) => atualizar("telefone", e.target.value)}
            aria-invalid={!!erros.telefone}
            aria-describedby={erros.telefone ? "erro-telefone" : undefined}
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 focus:border-brand-500"
          />
          {erros.telefone && (
            <p id="erro-telefone" className="mt-1 text-sm text-red-600">
              {erros.telefone}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-slate-700">
            E-mail
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            value={dados.email}
            onChange={(e) => atualizar("email", e.target.value)}
            aria-invalid={!!erros.email}
            aria-describedby={erros.email ? "erro-email" : undefined}
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 focus:border-brand-500"
          />
          {erros.email && (
            <p id="erro-email" className="mt-1 text-sm text-red-600">
              {erros.email}
            </p>
          )}
        </div>
      </div>

      <div>
        <label htmlFor="dataNascimento" className="block text-sm font-medium text-slate-700">
          Data de nascimento
        </label>
        <input
          id="dataNascimento"
          name="dataNascimento"
          type="date"
          required
          max={hojeISO()}
          value={dados.dataNascimento}
          onChange={(e) => atualizar("dataNascimento", e.target.value)}
          aria-invalid={!!erros.dataNascimento}
          aria-describedby={erros.dataNascimento ? "erro-dataNascimento" : undefined}
          className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 focus:border-brand-500"
        />
        {erros.dataNascimento && (
          <p id="erro-dataNascimento" className="mt-1 text-sm text-red-600">
            {erros.dataNascimento}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="motivo" className="block text-sm font-medium text-slate-700">
          Motivo da consulta <span className="font-normal text-slate-400">(opcional)</span>
        </label>
        <textarea
          id="motivo"
          name="motivo"
          rows={3}
          value={dados.motivo}
          onChange={(e) => atualizar("motivo", e.target.value)}
          className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 focus:border-brand-500"
        />
      </div>

      {erroEnvio && (
        <p role="alert" className="rounded-lg bg-red-50 p-3 text-sm text-red-700">
          {erroEnvio}
        </p>
      )}

      <div className="flex flex-wrap gap-3">
        <Button type="submit" disabled={enviando}>
          {enviando ? "Enviando..." : "Confirmar agendamento"}
        </Button>
        <Button type="button" variant="secondary" onClick={onVoltar} disabled={enviando}>
          Voltar
        </Button>
      </div>
    </form>
  );
}
