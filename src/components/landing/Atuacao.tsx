import { Container } from "@/components/ui/Container";

const areas = [
  {
    titulo: "Avaliação geriátrica ampla",
    texto: "Rastreio de fragilidade, risco de quedas, memória e capacidade funcional.",
    path: (
      <>
        <circle cx="12" cy="8" r="3.4" stroke="#12302E" strokeWidth="1.6" />
        <path d="M5 20c1-3.5 4-5 7-5s6 1.5 7 5" stroke="#12302E" strokeWidth="1.6" strokeLinecap="round" />
      </>
    ),
  },
  {
    titulo: "Doenças crônicas",
    texto: "Acompanhamento de hipertensão, diabetes e ajuste seguro de múltiplos medicamentos.",
    path: (
      <path
        d="M4 12h4l1.5-4L12 17l2-8 1.5 3H20"
        stroke="#12302E"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    ),
  },
  {
    titulo: "Prevenção e promoção da saúde",
    texto: "Vacinação, exames de rotina e orientação sobre hábitos saudáveis.",
    path: (
      <path d="M12 3l7 3v6c0 5-3 8-7 9-4-1-7-4-7-9V6l7-3z" stroke="#12302E" strokeWidth="1.6" strokeLinejoin="round" />
    ),
  },
  {
    titulo: "Saúde cognitiva e emocional",
    texto: "Atenção à memória, ao humor e à qualidade do sono.",
    path: (
      <>
        <path d="M12 4c-4 0-7 3-7 7 0 3 2 4.5 2 7h10c0-2.5 2-4 2-7 0-4-3-7-7-7z" stroke="#12302E" strokeWidth="1.6" />
        <path d="M9.5 21h5" stroke="#12302E" strokeWidth="1.6" strokeLinecap="round" />
      </>
    ),
  },
  {
    titulo: "Autonomia e qualidade de vida",
    texto: "Estímulo à mobilidade, independência e prevenção de quedas no dia a dia.",
    path: (
      <path
        d="M12 21c-5-3-8-6-8-10a5 5 0 019-3 5 5 0 019 3c0 4-3 7-8 10z"
        stroke="#12302E"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    ),
  },
  {
    titulo: "Orientação à família",
    texto: "Apoio e orientação prática para filhos e cuidadores no cuidado diário.",
    path: (
      <>
        <circle cx="9" cy="8" r="3" stroke="#12302E" strokeWidth="1.6" />
        <circle cx="17" cy="9" r="2.4" stroke="#12302E" strokeWidth="1.6" />
        <path
          d="M3.5 19c.6-3 2.8-4.7 5.5-4.7s4.9 1.7 5.5 4.7M15 14.6c2.2.2 3.8 1.7 4.3 4.4"
          stroke="#12302E"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
      </>
    ),
  },
];

export function Atuacao() {
  return (
    <section id="atuacao" className="bg-brand-600 py-14 sm:py-16">
      <Container>
        <div className="mx-auto mb-9 max-w-xl text-center sm:mb-10">
          <span className="mb-3.5 inline-block text-[13px] font-semibold uppercase tracking-wide text-brand-300">
            Áreas de atuação
          </span>
          <h2 className="font-serif text-3xl font-semibold leading-tight text-cream-100 sm:text-4xl">
            Cuidado completo, pensado para cada etapa da terceira idade
          </h2>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {areas.map((area) => (
            <div
              key={area.titulo}
              className="rounded-2xl border border-white/10 bg-white/[0.04] p-7 transition-all hover:-translate-y-1.5 hover:border-brand-200/50 hover:bg-white/[0.07]"
            >
              <div className="mb-4.5 flex h-12 w-12 items-center justify-center rounded-xl bg-brand-200">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  {area.path}
                </svg>
              </div>
              <h3 className="mb-2.5 font-serif text-lg font-semibold text-cream-100">{area.titulo}</h3>
              <p className="text-[15px] leading-relaxed text-brand-200">{area.texto}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
