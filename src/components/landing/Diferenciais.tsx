import { Container } from "@/components/ui/Container";

const diferenciais = [
  {
    numero: "01",
    titulo: "Consulta sem pressa",
    texto: "Tempo dedicado para ouvir, explicar com clareza e responder cada dúvida do paciente e da família.",
  },
  {
    numero: "02",
    titulo: "Visão clínica completa",
    texto: "Experiência em Atenção Primária e Urgência/Emergência, com agilidade para reconhecer riscos precocemente.",
  },
  {
    numero: "03",
    titulo: "Formação específica em Geriatria",
    texto: "Pós-graduação em andamento pelo Instituto Israelita Albert Einstein, voltada às particularidades do paciente idoso.",
  },
  {
    numero: "04",
    titulo: "Decisão compartilhada",
    texto: "Comunicação clara com paciente e família, para decisões tomadas em conjunto e com confiança.",
  },
];

export function Diferenciais() {
  return (
    <section id="diferenciais" className="bg-cream py-14 sm:py-16">
      <Container>
        <div className="mx-auto mb-9 max-w-xl text-center sm:mb-10">
          <span className="mb-3.5 inline-block text-[13px] font-semibold uppercase tracking-wide text-brand-400">
            Por que escolher esse atendimento
          </span>
          <h2 className="font-serif text-3xl font-semibold leading-tight text-brand-600 sm:text-4xl">
            Diferenciais no cuidado
          </h2>
        </div>

        <div className="grid gap-px overflow-hidden rounded-[20px] bg-ink/10 sm:grid-cols-2">
          {diferenciais.map((item) => (
            <div key={item.numero} className="bg-cream p-9 transition-colors hover:bg-cream-100">
              <span className="font-serif text-[34px] font-semibold text-brand-200">{item.numero}</span>
              <h3 className="mb-2.5 mt-3.5 font-serif text-xl font-semibold text-brand-600">{item.titulo}</h3>
              <p className="text-[15.5px] leading-relaxed text-ink-600">{item.texto}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
