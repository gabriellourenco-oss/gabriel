import { Container } from "@/components/ui/Container";

const formas = [
  {
    titulo: "Consultório",
    indicado: "Indicado para: primeira consulta e exame físico completo",
    texto:
      "Ideal para avaliações iniciais, exames físicos, rastreios e situações que exigem exame presencial detalhado.",
    path: (
      <>
        <path d="M4 21V9l8-5 8 5v12" stroke="#F3EFE4" strokeWidth="1.6" strokeLinejoin="round" />
        <path d="M9 21v-7h6v7" stroke="#F3EFE4" strokeWidth="1.6" strokeLinejoin="round" />
      </>
    ),
  },
  {
    titulo: "Teleconsulta",
    indicado: "Indicado para: retornos e ajustes de rotina",
    texto:
      "Boa opção para retornos, dúvidas sobre medicação, resultados de exames e acompanhamento de quem tem dificuldade de deslocamento.",
    path: (
      <>
        <rect x="3" y="4" width="14" height="12" rx="2" stroke="#F3EFE4" strokeWidth="1.6" />
        <path d="M17 9l4-2v10l-4-2" stroke="#F3EFE4" strokeWidth="1.6" strokeLinejoin="round" />
      </>
    ),
  },
  {
    titulo: "Visita domiciliar",
    indicado: "Indicado para: mobilidade reduzida ou pós-alta",
    texto:
      "Sim, atendemos em casa. Para pacientes com mobilidade reduzida, acamados ou em recuperação pós-hospitalar, a consulta acontece no conforto do lar — basta agendar.",
    path: (
      <>
        <path
          d="M12 21s-6-4.4-6-9.5A6 6 0 0112 5a6 6 0 016 6.5c0 5.1-6 9.5-6 9.5z"
          stroke="#F3EFE4"
          strokeWidth="1.6"
        />
        <path d="M9 11.5l2 2 4-4" stroke="#F3EFE4" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      </>
    ),
  },
];

export function FormasAtendimento() {
  return (
    <section id="atendimento" className="bg-cream py-20 sm:py-24">
      <Container>
        <div className="mx-auto mb-12 max-w-xl text-center">
          <span className="mb-3.5 inline-block text-[13px] font-semibold uppercase tracking-wide text-brand-400">
            Formas de atendimento
          </span>
          <h2 className="font-serif text-3xl font-semibold leading-tight text-brand-600 sm:text-4xl">
            O formato certo para cada momento
          </h2>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {formas.map((forma) => (
            <div
              key={forma.titulo}
              className="rounded-2xl bg-brand-50 p-8 transition-all hover:-translate-y-1.5 hover:shadow-[0_18px_34px_-18px_rgba(15,45,43,0.2)]"
            >
              <div className="mb-4.5 flex h-12 w-12 items-center justify-center rounded-xl bg-brand-600">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  {forma.path}
                </svg>
              </div>
              <h3 className="mb-2 font-serif text-lg font-semibold text-brand-600">{forma.titulo}</h3>
              <p className="mb-2.5 text-sm font-semibold text-brand-400">{forma.indicado}</p>
              <p className="text-[15px] leading-relaxed text-ink-600">{forma.texto}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
