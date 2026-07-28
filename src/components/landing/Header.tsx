import Link from "next/link";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

const links = [
  { href: "#sobre", label: "Sobre" },
  { href: "#servicos", label: "Serviços" },
  { href: "#para-quem", label: "Para quem é" },
  { href: "#contato", label: "Contato" },
  { href: "#faq", label: "FAQ" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-100 bg-white/90 backdrop-blur">
      <Container className="flex h-16 items-center justify-between">
        <Link href="/" className="text-lg font-bold text-brand-700">
          [NOME_MEDICA]
        </Link>
        <nav aria-label="Navegação principal" className="hidden gap-6 md:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-slate-600 hover:text-brand-700"
            >
              {link.label}
            </a>
          ))}
        </nav>
        <ButtonLink href="/agendar" className="px-4 py-2 text-sm">
          Agendar consulta
        </ButtonLink>
      </Container>
    </header>
  );
}
