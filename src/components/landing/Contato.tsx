"use client";

import { useState } from "react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";

const WHATSAPP_NUMERO = "5533988732087";
const WHATSAPP_TELEFONE = "(33) 9 8873-2087";
const WHATSAPP_MENSAGEM_PADRAO = "Olá, Dra. Juliana! Gostaria de agendar uma consulta.";

function linkWhatsapp(texto: string) {
  return `https://wa.me/${WHATSAPP_NUMERO}?text=${encodeURIComponent(texto)}`;
}

type Aba = "online" | "whatsapp";

export function Contato() {
  const [aba, setAba] = useState<Aba>("online");
  const [nome, setNome] = useState("");
  const [telefone, setTelefone] = useState("");
  const [mensagem, setMensagem] = useState("");

  function enviarWhatsapp() {
    let texto = `Olá, Dra. Juliana! Meu nome é ${nome || "(nome)"}`;
    texto += telefone ? `, telefone ${telefone}.` : ".";
    texto += mensagem ? ` ${mensagem}` : " Gostaria de agendar uma consulta.";
    window.open(linkWhatsapp(texto), "_blank", "noopener");
  }

  const tabBase =
    "flex-1 rounded-[10px] px-3.5 py-3 text-[14.5px] font-semibold transition-colors";

  return (
    <section id="contato" className="bg-brand-600 py-20 sm:py-24">
      <Container className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <span className="mb-3.5 inline-block text-[13px] font-semibold uppercase tracking-wide text-brand-300">
            Agende sua consulta
          </span>
          <h2 className="font-serif text-3xl font-semibold leading-tight text-cream-100 sm:text-4xl">
            Cuidar de quem você ama começa com uma conversa.
          </h2>
          <p className="mt-5 max-w-md text-[16.5px] leading-relaxed text-brand-200">
            Escolha agendar online em poucos cliques ou falar diretamente pelo
            WhatsApp.
          </p>

          <div className="mt-8 flex flex-wrap gap-3.5">
            <button
              type="button"
              onClick={() => setAba("online")}
              className="inline-flex items-center gap-2.5 rounded-xl bg-accent-500 px-6 py-4 text-base font-semibold text-cream-100 shadow-[0_4px_0_#8F3E1F] transition-transform hover:-translate-y-0.5"
            >
              <svg width="19" height="19" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <rect x="3" y="5" width="18" height="16" rx="2" stroke="currentColor" strokeWidth="1.6" />
                <path d="M3 9.5h18M8 3v4M16 3v4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
              </svg>
              Agendar online
            </button>
            <a
              href={linkWhatsapp(WHATSAPP_MENSAGEM_PADRAO)}
              target="_blank"
              rel="noopener"
              className="inline-flex items-center gap-2.5 rounded-xl border-[1.5px] border-cream-100/30 px-6 py-4 text-base font-semibold text-cream-100 transition-colors hover:bg-white/5"
            >
              <svg width="19" height="19" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path
                  d="M17 14.3c-.3-.2-1.8-.9-2.1-1-.3-.1-.5-.2-.7.2-.2.3-.8 1-.9 1.2-.2.2-.3.2-.6.1-1.6-.8-2.7-1.4-3.8-3.2-.3-.5.3-.5.8-1.6.1-.2 0-.4 0-.5-.1-.2-.7-1.7-1-2.3-.3-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5s1.1 2.9 1.2 3.1c.1.2 2.1 3.3 5.2 4.5 2.7 1.1 2.7.7 3.2.6.5-.1 1.6-.6 1.8-1.3.2-.6.2-1.1.2-1.3-.1-.1-.3-.2-.6-.3z"
                  fill="currentColor"
                />
                <path
                  d="M12 2C6.5 2 2 6.4 2 11.9c0 1.9.5 3.6 1.4 5.2L2 22l5-1.3c1.5.8 3.2 1.3 5 1.3 5.5 0 10-4.4 10-9.9S17.5 2 12 2z"
                  stroke="currentColor"
                  strokeWidth="1.4"
                />
              </svg>
              Chamar no WhatsApp
            </a>
          </div>

          <div className="mt-8 flex flex-col gap-4.5 border-t border-white/10 pt-2">
            <div className="flex items-start gap-3.5 pt-4.5">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="mt-0.5 flex-none" aria-hidden="true">
                <path
                  d="M12 21s-7.5-4.6-10-9.3C.6 8 2 4 6 4c2.4 0 4 1.4 6 4 2-2.6 3.6-4 6-4 4 0 5.4 4 4 7.7-2.5 4.7-10 9.3-10 9.3z"
                  stroke="#93A87D"
                  strokeWidth="1.6"
                />
              </svg>
              <div>
                <div className="text-[15px] font-semibold text-cream-100">Região de atendimento</div>
                <div className="text-[15px] text-brand-200">Sardoá, Governador Valadares, Ipatinga e Região</div>
              </div>
            </div>
            <div className="flex items-start gap-3.5">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="mt-0.5 flex-none" aria-hidden="true">
                <path
                  d="M4 5h4l2 5-2.5 1.5a11 11 0 005 5L14 14l5 2v4a2 2 0 01-2 2C9.6 22 2 14.4 2 7a2 2 0 012-2z"
                  stroke="#93A87D"
                  strokeWidth="1.6"
                />
              </svg>
              <div>
                <div className="text-[15px] font-semibold text-cream-100">Telefone / WhatsApp</div>
                <div className="text-[15px] text-brand-200">{WHATSAPP_TELEFONE}</div>
              </div>
            </div>
            <div className="flex items-start gap-3.5">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="mt-0.5 flex-none" aria-hidden="true">
                <circle cx="12" cy="12" r="9" stroke="#93A87D" strokeWidth="1.6" />
                <path d="M12 7v5l3.5 2" stroke="#93A87D" strokeWidth="1.6" strokeLinecap="round" />
              </svg>
              <div>
                <div className="text-[15px] font-semibold text-cream-100">Atendimento</div>
                <div className="text-[15px] text-brand-200">Segunda a sexta, mediante agendamento prévio</div>
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-[20px] bg-cream-100 p-2">
          <div className="mb-5.5 flex gap-1.5 rounded-[14px] bg-brand-600/[0.06] p-1.5">
            <button
              type="button"
              onClick={() => setAba("online")}
              className={`${tabBase} ${aba === "online" ? "bg-brand-600 text-cream-100" : "bg-transparent text-ink-500"}`}
            >
              Agendar online
            </button>
            <button
              type="button"
              onClick={() => setAba("whatsapp")}
              className={`${tabBase} ${aba === "whatsapp" ? "bg-brand-600 text-cream-100" : "bg-transparent text-ink-500"}`}
            >
              Pelo WhatsApp
            </button>
          </div>

          {aba === "online" ? (
            <div className="px-4 pb-7 pt-2 sm:px-7">
              <h3 className="mb-1.5 font-serif text-xl font-semibold text-brand-600">Escolha data e horário</h3>
              <p className="mb-6 text-[14.5px] text-ink-500">
                Agendamento online com nosso calendário de horários disponíveis.
              </p>
              <Link
                href="/agendar"
                className="inline-flex w-full items-center justify-center gap-2.5 rounded-xl bg-accent-500 px-6 py-4 text-base font-semibold text-cream-100 shadow-[0_4px_0_#8F3E1F] transition-transform hover:-translate-y-0.5"
              >
                Ver horários e agendar
              </Link>
              <p className="mt-2.5 text-center text-[12.5px] text-ink-400">
                Você escolhe o dia e o horário na próxima tela.
              </p>
            </div>
          ) : (
            <div className="px-4 pb-7 pt-2 sm:px-7">
              <h3 className="mb-1.5 font-serif text-xl font-semibold text-brand-600">
                Prefere que a gente te chame?
              </h3>
              <p className="mb-6 text-[14.5px] text-ink-500">Preencha os dados e envie direto para o WhatsApp.</p>
              <div className="flex flex-col gap-4">
                <div>
                  <label htmlFor="contato-nome" className="mb-1.5 block text-sm font-semibold text-ink-600">
                    Nome
                  </label>
                  <input
                    id="contato-nome"
                    type="text"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    placeholder="Seu nome"
                    className="w-full rounded-[10px] border-[1.5px] border-ink/15 bg-white px-4 py-3.5 text-base text-ink"
                  />
                </div>
                <div>
                  <label htmlFor="contato-telefone" className="mb-1.5 block text-sm font-semibold text-ink-600">
                    Telefone
                  </label>
                  <input
                    id="contato-telefone"
                    type="tel"
                    value={telefone}
                    onChange={(e) => setTelefone(e.target.value)}
                    placeholder="(33) 9 0000-0000"
                    className="w-full rounded-[10px] border-[1.5px] border-ink/15 bg-white px-4 py-3.5 text-base text-ink"
                  />
                </div>
                <div>
                  <label htmlFor="contato-mensagem" className="mb-1.5 block text-sm font-semibold text-ink-600">
                    Mensagem (opcional)
                  </label>
                  <textarea
                    id="contato-mensagem"
                    rows={3}
                    value={mensagem}
                    onChange={(e) => setMensagem(e.target.value)}
                    placeholder="Conte um pouco sobre o motivo da consulta"
                    className="w-full resize-y rounded-[10px] border-[1.5px] border-ink/15 bg-white px-4 py-3.5 text-base text-ink"
                  />
                </div>
                <button
                  type="button"
                  onClick={enviarWhatsapp}
                  className="mt-1.5 inline-flex items-center justify-center gap-2.5 rounded-xl bg-accent-500 px-6 py-4 text-base font-semibold text-cream-100 shadow-[0_4px_0_#8F3E1F] transition-transform hover:-translate-y-0.5"
                >
                  Enviar pelo WhatsApp
                </button>
              </div>
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}
