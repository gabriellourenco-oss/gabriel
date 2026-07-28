import { Container } from "@/components/ui/Container";

const pontos = [
  {
    titulo: "Formação",
    texto:
      "Graduação em Medicina, Residência em Medicina de Família e Comunidade e Pós-graduação em Geriatria pelo Hospital Israelita Albert Einstein.",
  },
  {
    titulo: "Abordagem",
    texto:
      "Cuidado centrado na pessoa idosa e em sua família, com visão integral da saúde física, cognitiva, emocional e social.",
  },
  {
    titulo: "Experiência",
    texto:
      "Atuação em consultório, atendimento domiciliar e acompanhamento longitudinal de pacientes e cuidadores.",
  },
];

export function Sobre() {
  return (
    <section id="sobre" className="py-16 sm:py-24">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">
            Sobre [NOME_MEDICA]
          </h2>
          <p className="mt-4 text-lg text-slate-600">
            Uma abordagem cuidadosa e humana, dedicada à qualidade de vida na
            terceira idade.
          </p>
        </div>
        <div className="mt-12 grid gap-8 sm:grid-cols-3">
          {pontos.map((ponto) => (
            <div
              key={ponto.titulo}
              className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm"
            >
              <h3 className="text-lg font-semibold text-brand-700">{ponto.titulo}</h3>
              <p className="mt-2 text-slate-600">{ponto.texto}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
