import { Container } from "@/components/ui/Container";

const perfis = [
  {
    titulo: "Idoso independente",
    texto: "Quer manter a saúde em dia, prevenir doenças e seguir ativo por mais tempo.",
    path: (
      <>
        <circle cx="12" cy="8" r="3.4" stroke="#F3EFE4" strokeWidth="1.6" />
        <path d="M5 20c1-3.5 4-5 7-5s6 1.5 7 5" stroke="#F3EFE4" strokeWidth="1.6" strokeLinecap="round" />
      </>
    ),
  },
  {
    titulo: "Família cuidadora",
    texto: "Busca orientação e apoio para cuidar bem de um pai, mãe ou familiar idoso.",
    path: (
      <>
        <circle cx="9" cy="8" r="3" stroke="#F3EFE4" strokeWidth="1.6" />
        <circle cx="17" cy="9" r="2.4" stroke="#F3EFE4" strokeWidth="1.6" />
        <path
          d="M3.5 19c.6-3 2.8-4.7 5.5-4.7s4.9 1.7 5.5 4.7M15 14.6c2.2.2 3.8 1.7 4.3 4.4"
          stroke="#F3EFE4"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
      </>
    ),
  },
  {
    titulo: "Pós-alta ou múltiplas condições",
    texto: "Precisa reorganizar tratamentos após internação ou lidar com várias doenças crônicas.",
    path: (
      <path
        d="M4 12h4l1.5-4L12 17l2-8 1.5 3H20"
        stroke="#F3EFE4"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    ),
  },
];

export function ParaQuem() {
  return (
    <section id="para-quem" className="bg-cream py-20 sm:py-24">
      <Container>
        <div className="mx-auto mb-12 max-w-xl text-center">
          <span className="mb-3.5 inline-block text-[13px] font-semibold uppercase tracking-wide text-brand-400">
            Para quem é esse cuidado
          </span>
          <h2 className="font-serif text-3xl font-semibold leading-tight text-brand-600 sm:text-4xl">
            Encontre o motivo que combina com você
          </h2>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {perfis.map((perfil) => (
            <div
              key={perfil.titulo}
              className="rounded-2xl bg-brand-50 p-8 transition-all hover:-translate-y-1.5 hover:shadow-[0_18px_34px_-18px_rgba(15,45,43,0.2)]"
            >
              <div className="mb-4.5 flex h-12 w-12 items-center justify-center rounded-xl bg-brand-600">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  {perfil.path}
                </svg>
              </div>
              <h3 className="mb-2.5 font-serif text-lg font-semibold text-brand-600">{perfil.titulo}</h3>
              <p className="text-[15px] leading-relaxed text-ink-600">{perfil.texto}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
