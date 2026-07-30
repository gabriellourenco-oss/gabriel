"use client";

import { useState } from "react";
import Link from "next/link";
import { Logo } from "@/components/landing/Logo";
import { Container } from "@/components/ui/Container";

const links = [
  { href: "#sobre", label: "Sobre" },
  { href: "#atuacao", label: "Atuação" },
  { href: "#atendimento", label: "Atendimento" },
  { href: "#diferenciais", label: "Diferenciais" },
  { href: "#depoimentos", label: "Depoimentos" },
  { href: "#faq", label: "FAQ" },
];

export function Header() {
  const [menuAberto, setMenuAberto] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-ink/5 bg-cream/90 backdrop-blur">
      <div className="h-1 w-full bg-gradient-to-r from-brand-600 via-brand-300 to-accent-500" />
      <Container className="flex h-[72px] items-center justify-between gap-4">
        <Link href="/">
          <Logo />
        </Link>

        <nav aria-label="Navegação principal" className="hidden items-center gap-7 lg:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-[15px] font-medium text-ink hover:text-brand-600"
            >
              {link.label}
            </a>
          ))}
          <Link
            href="/agendar"
            className="inline-flex items-center justify-center rounded-xl bg-accent-500 px-[22px] py-3 text-[15px] font-semibold text-cream-100 shadow-[0_3px_0_#8F3E1F] transition-transform hover:-translate-y-0.5"
          >
            Agendar consulta
          </Link>
        </nav>

        <button
          type="button"
          onClick={() => setMenuAberto((v) => !v)}
          aria-label={menuAberto ? "Fechar menu" : "Abrir menu"}
          aria-expanded={menuAberto}
          className="flex h-11 w-11 flex-none items-center justify-center rounded-lg border border-ink/15 bg-white lg:hidden"
        >
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
            <path
              d="M2 5H20M2 11H20M2 17H20"
              stroke="#12302E"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </button>
      </Container>

      {menuAberto && (
        <div className="flex flex-col gap-1 border-t border-ink/5 bg-cream px-4 pb-5 pt-2 lg:hidden">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMenuAberto(false)}
              className="border-b border-ink/5 py-3 px-1 text-[17px] font-medium text-ink"
            >
              {link.label}
            </a>
          ))}
          <Link
            href="/agendar"
            onClick={() => setMenuAberto(false)}
            className="mt-2.5 inline-flex items-center justify-center rounded-xl bg-accent-500 px-[22px] py-3.5 text-base font-semibold text-cream-100"
          >
            Agendar consulta
          </Link>
        </div>
      )}
    </header>
  );
}
