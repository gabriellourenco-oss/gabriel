"use client";

import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";

interface AgendamentoAdmin {
  id: string;
  data: string;
  horaInicio: string;
  horaFim: string;
  nomePaciente: string;
  telefone: string;
  email: string;
  convenio: string;
  motivo: string | null;
  status: string;
}

interface BloqueioAdmin {
  id: string;
  data: string;
  motivo: string | null;
}

function hojeISO(): string {
  const hoje = new Date();
  return new Date(Date.UTC(hoje.getFullYear(), hoje.getMonth(), hoje.getDate()))
    .toISOString()
    .slice(0, 10);
}

export function AdminDashboard() {
  const router = useRouter();
  const [dataConsulta, setDataConsulta] = useState(hojeISO());
  const [agendamentos, setAgendamentos] = useState<AgendamentoAdmin[]>([]);
  const [carregandoAgendamentos, setCarregandoAgendamentos] = useState(false);

  const [bloqueios, setBloqueios] = useState<BloqueioAdmin[]>([]);
  const [novoBloqueioData, setNovoBloqueioData] = useState("");
  const [novoBloqueioMotivo, setNovoBloqueioMotivo] = useState("");
  const [erroBloqueio, setErroBloqueio] = useState<string | null>(null);
  const [enviandoBloqueio, setEnviandoBloqueio] = useState(false);

  function carregarAgendamentos(data: string) {
    setCarregandoAgendamentos(true);
    fetch(`/api/admin/agendamentos?data=${data}`)
      .then((r) => r.json())
      .then((json) => setAgendamentos(json.agendamentos ?? []))
      .finally(() => setCarregandoAgendamentos(false));
  }

  function carregarBloqueios() {
    fetch("/api/admin/bloqueios")
      .then((r) => r.json())
      .then((json) => setBloqueios(json.bloqueios ?? []));
  }

  useEffect(() => {
    carregarAgendamentos(dataConsulta);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataConsulta]);

  useEffect(() => {
    carregarBloqueios();
  }, []);

  async function cancelarAgendamento(id: string) {
    if (!window.confirm("Cancelar este agendamento?")) return;
    await fetch(`/api/admin/agendamentos/${id}`, { method: "PATCH" });
    carregarAgendamentos(dataConsulta);
  }

  async function adicionarBloqueio(e: FormEvent) {
    e.preventDefault();
    if (!novoBloqueioData) return;
    setEnviandoBloqueio(true);
    setErroBloqueio(null);

    const resposta = await fetch("/api/admin/bloqueios", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ data: novoBloqueioData, motivo: novoBloqueioMotivo }),
    });

    if (!resposta.ok) {
      const json = await resposta.json().catch(() => ({}));
      setErroBloqueio(json.erro ?? "Não foi possível bloquear esta data");
    } else {
      setNovoBloqueioData("");
      setNovoBloqueioMotivo("");
      carregarBloqueios();
    }
    setEnviandoBloqueio(false);
  }

  async function removerBloqueio(id: string) {
    await fetch(`/api/admin/bloqueios/${id}`, { method: "DELETE" });
    carregarBloqueios();
  }

  async function sair() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.refresh();
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-900">Painel administrativo</h1>
        <Button variant="secondary" onClick={sair} className="px-4 py-2 text-sm">
          Sair
        </Button>
      </div>

      <section className="mb-10 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-100">
        <h2 className="mb-4 text-lg font-semibold text-slate-900">Agendamentos por data</h2>
        <label htmlFor="dataConsulta" className="block text-sm font-medium text-slate-700">
          Data
        </label>
        <input
          id="dataConsulta"
          type="date"
          value={dataConsulta}
          onChange={(e) => setDataConsulta(e.target.value)}
          className="mt-1 w-full max-w-xs rounded-lg border border-slate-300 px-3 py-2 focus:border-brand-500"
        />

        <div className="mt-6 space-y-3">
          {carregandoAgendamentos ? (
            <p className="text-sm text-slate-500">Carregando...</p>
          ) : agendamentos.length === 0 ? (
            <p className="text-sm text-slate-500">Nenhum agendamento nesta data.</p>
          ) : (
            agendamentos.map((ag) => (
              <div
                key={ag.id}
                className={`flex flex-col justify-between gap-3 rounded-xl border p-4 sm:flex-row sm:items-center ${
                  ag.status === "CANCELADO"
                    ? "border-slate-100 bg-slate-50 text-slate-400"
                    : "border-slate-200"
                }`}
              >
                <div>
                  <p className="font-semibold text-slate-900">
                    {ag.horaInicio} – {ag.horaFim} · {ag.nomePaciente}
                  </p>
                  <p className="text-sm text-slate-500">
                    {ag.telefone} · {ag.email} · {ag.convenio}
                  </p>
                  {ag.motivo && <p className="text-sm text-slate-500">Motivo: {ag.motivo}</p>}
                  {ag.status === "CANCELADO" && (
                    <p className="text-sm font-medium text-red-500">Cancelado</p>
                  )}
                </div>
                {ag.status !== "CANCELADO" && (
                  <Button
                    variant="secondary"
                    onClick={() => cancelarAgendamento(ag.id)}
                    className="px-4 py-2 text-sm"
                  >
                    Cancelar
                  </Button>
                )}
              </div>
            ))
          )}
        </div>
      </section>

      <section className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-100">
        <h2 className="mb-4 text-lg font-semibold text-slate-900">
          Bloquear datas (férias/feriados)
        </h2>

        <form onSubmit={adicionarBloqueio} className="flex flex-wrap items-end gap-4">
          <div>
            <label htmlFor="novoBloqueioData" className="block text-sm font-medium text-slate-700">
              Data
            </label>
            <input
              id="novoBloqueioData"
              type="date"
              required
              min={hojeISO()}
              value={novoBloqueioData}
              onChange={(e) => setNovoBloqueioData(e.target.value)}
              className="mt-1 rounded-lg border border-slate-300 px-3 py-2 focus:border-brand-500"
            />
          </div>
          <div className="flex-1">
            <label htmlFor="novoBloqueioMotivo" className="block text-sm font-medium text-slate-700">
              Motivo <span className="font-normal text-slate-400">(opcional)</span>
            </label>
            <input
              id="novoBloqueioMotivo"
              type="text"
              placeholder="Férias, feriado..."
              value={novoBloqueioMotivo}
              onChange={(e) => setNovoBloqueioMotivo(e.target.value)}
              className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 focus:border-brand-500"
            />
          </div>
          <Button type="submit" disabled={enviandoBloqueio} className="px-4 py-2 text-sm">
            Bloquear
          </Button>
        </form>
        {erroBloqueio && (
          <p role="alert" className="mt-3 text-sm text-red-600">
            {erroBloqueio}
          </p>
        )}

        <div className="mt-6 space-y-2">
          {bloqueios.length === 0 ? (
            <p className="text-sm text-slate-500">Nenhuma data bloqueada futuramente.</p>
          ) : (
            bloqueios.map((b) => (
              <div
                key={b.id}
                className="flex items-center justify-between rounded-xl border border-slate-200 p-3"
              >
                <span className="text-sm text-slate-700">
                  {b.data.slice(0, 10).split("-").reverse().join("/")}
                  {b.motivo ? ` — ${b.motivo}` : ""}
                </span>
                <Button
                  variant="secondary"
                  onClick={() => removerBloqueio(b.id)}
                  className="px-3 py-1 text-xs"
                >
                  Remover
                </Button>
              </div>
            ))
          )}
        </div>
      </section>
    </div>
  );
}
