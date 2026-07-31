import { Logo } from "@/components/landing/Logo";
import { Container } from "@/components/ui/Container";

const navegacao = [
  { href: "#sobre", label: "Sobre" },
  { href: "#atuacao", label: "Áreas de atuação" },
  { href: "#diferenciais", label: "Diferenciais" },
  { href: "#contato", label: "Contato" },
];

export function Footer() {
  return (
    <footer className="bg-brand-700 px-6 pb-7 pt-12">
      <Container className="grid gap-8 border-b border-white/10 pb-7 sm:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <div className="mb-3">
            <Logo variant="light" size={36} />
          </div>
          <p className="max-w-xs text-sm leading-relaxed text-brand-200">
            Medicina de Família e Comunidade, com dedicação à saúde do idoso.
            CRM/MG 109990.
          </p>
          <div className="mt-3.5 inline-flex items-center gap-1.5 rounded-full border border-brand-300/30 bg-white/5 px-3 py-1.5 text-[12.5px] font-medium text-brand-200">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M12 4L3 8.5 12 13l9-4.5L12 4z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
              <path d="M7 10.5v4c0 1.4 2.2 2.5 5 2.5s5-1.1 5-2.5v-4" stroke="currentColor" strokeWidth="1.7" />
            </svg>
            Pós-graduanda em Geriatria, Instituto Israelita Albert Einstein
          </div>
        </div>

        <div>
          <div className="mb-3.5 text-sm font-semibold text-cream-100">Navegação</div>
          <div className="flex flex-col gap-2.5">
            {navegacao.map((item) => (
              <a key={item.href} href={item.href} className="text-[14.5px] text-brand-200 hover:text-cream-100">
                {item.label}
              </a>
            ))}
          </div>
        </div>

        <div>
          <div className="mb-3.5 text-sm font-semibold text-cream-100">Contato</div>
          <div className="flex flex-col gap-2.5">
            <a
              href="https://wa.me/5533988732087"
              target="_blank"
              rel="noopener"
              className="text-[14.5px] text-brand-200 hover:text-cream-100"
            >
              (33) 9 8873-2087
            </a>
            <span className="text-[14.5px] text-brand-200">Sardoá, Gov. Valadares, Ipatinga e Região</span>
          </div>
        </div>
      </Container>
      <p className="mx-auto mt-5 max-w-6xl text-center text-[13px] text-brand-300">
        © {new Date().getFullYear()} Dra. Juliana Trindade, CRM/MG 109990. Todos os direitos reservados.
      </p>
    </footer>
  );
}
