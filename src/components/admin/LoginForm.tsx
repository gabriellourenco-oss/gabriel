"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";

export function LoginForm() {
  const router = useRouter();
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState<string | null>(null);
  const [enviando, setEnviando] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setEnviando(true);
    setErro(null);

    try {
      const resposta = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ senha }),
      });

      if (!resposta.ok) {
        const json = await resposta.json().catch(() => ({}));
        setErro(json.erro ?? "Senha incorreta");
        return;
      }

      router.refresh();
    } catch {
      setErro("Erro de conexão. Tente novamente.");
    } finally {
      setEnviando(false);
    }
  }

  return (
    <div className="mx-auto flex min-h-screen max-w-sm flex-col justify-center px-4">
      <h1 className="mb-6 text-center text-2xl font-bold text-slate-900">
        Painel administrativo
      </h1>
      <form onSubmit={handleSubmit} className="space-y-4 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-100">
        <div>
          <label htmlFor="senha" className="block text-sm font-medium text-slate-700">
            Senha
          </label>
          <input
            id="senha"
            name="senha"
            type="password"
            required
            autoFocus
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            aria-invalid={!!erro}
            aria-describedby={erro ? "erro-senha" : undefined}
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 focus:border-brand-500"
          />
        </div>
        {erro && (
          <p id="erro-senha" role="alert" className="text-sm text-red-600">
            {erro}
          </p>
        )}
        <Button type="submit" disabled={enviando} className="w-full">
          {enviando ? "Entrando..." : "Entrar"}
        </Button>
      </form>
    </div>
  );
}
