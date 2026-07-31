import { Container } from "@/components/ui/Container";

const depoimentos = [
  {
    texto:
      "Sempre me senti ouvida. A Dra. Juliana explica tudo com calma, sem pressa, e isso faz toda diferença na minha idade.",
    autor: "Maria de L., 74 anos",
  },
  {
    texto: "Como filha, valorizo muito a atenção que ela dá à minha mãe e a clareza com que conversa comigo também.",
    autor: "Renata S., filha de paciente",
  },
  {
    texto:
      "Depois de anos tomando remédio sem entender direito, ela me ajudou a organizar tudo. Me sinto mais segura hoje.",
    autor: "Antônio P., 81 anos",
  },
];

export function Depoimentos() {
  return (
    <section id="depoimentos" className="bg-brand-50 py-14 sm:py-16">
      <Container>
        <div className="mx-auto mb-9 max-w-xl text-center">
          <span className="mb-3.5 inline-block text-[13px] font-semibold uppercase tracking-wide text-brand-400">
            Depoimentos
          </span>
          <h2 className="font-serif text-3xl font-semibold leading-tight text-brand-600 sm:text-4xl">
            O que dizem pacientes e famílias
          </h2>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {depoimentos.map((item) => (
            <div
              key={item.autor}
              className="rounded-2xl bg-cream p-8 shadow-[0_12px_28px_-18px_rgba(15,45,43,0.25)] transition-all hover:-translate-y-1 hover:shadow-[0_18px_34px_-18px_rgba(15,45,43,0.32)]"
            >
              <span className="font-serif text-4xl leading-none text-brand-200">&ldquo;</span>
              <p className="mb-5 mt-2 text-[16px] leading-relaxed text-ink-600">{item.texto}</p>
              <div className="text-[14.5px] font-semibold text-brand-600">{item.autor}</div>
            </div>
          ))}
        </div>

        <p className="mt-8 text-center text-[13px] text-brand-400">
          Depoimentos ilustrativos. Em breve, histórias reais de pacientes atendidos.
        </p>
      </Container>
    </section>
  );
}
