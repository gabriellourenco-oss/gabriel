import { Container } from "@/components/ui/Container";

const servicos = [
  {
    titulo: "Consulta geriátrica",
    descricao:
      "Avaliação completa da saúde do idoso, com foco em prevenção, diagnóstico e tratamento das condições próprias do envelhecimento.",
    icone: "🩺",
  },
  {
    titulo: "Avaliação cognitiva",
    descricao:
      "Rastreio e acompanhamento de memória e funções cognitivas, com testes validados para identificar sinais precoces de declínio.",
    icone: "🧠",
  },
  {
    titulo: "Revisão de medicações",
    descricao:
      "Análise detalhada de todos os medicamentos em uso para reduzir interações, efeitos colaterais e polifarmácia desnecessária.",
    icone: "💊",
  },
  {
    titulo: "Consulta domiciliar",
    descricao:
      "Atendimento no conforto de casa para pacientes com mobilidade reduzida ou dificuldade de locomoção até o consultório.",
    icone: "🏠",
  },
  {
    titulo: "Acompanhamento familiar",
    descricao:
      "Orientação e suporte contínuo para familiares e cuidadores no dia a dia do cuidado com a pessoa idosa.",
    icone: "🤝",
  },
];

export function Servicos() {
  return (
    <section id="servicos" className="bg-slate-50 py-16 sm:py-24">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">Serviços</h2>
          <p className="mt-4 text-lg text-slate-600">
            Cuidado completo, do consultório à sua casa.
          </p>
        </div>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {servicos.map((servico) => (
            <div
              key={servico.titulo}
              className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-100 transition-shadow hover:shadow-md"
            >
              <span className="text-3xl" aria-hidden="true">
                {servico.icone}
              </span>
              <h3 className="mt-4 text-lg font-semibold text-slate-900">
                {servico.titulo}
              </h3>
              <p className="mt-2 text-slate-600">{servico.descricao}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
