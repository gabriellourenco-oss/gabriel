import { Container } from "@/components/ui/Container";

const sinais = [
  "Idade a partir de 60 anos, mesmo sem queixas, para acompanhamento preventivo",
  "Uso de vários medicamentos ao mesmo tempo (polifarmácia)",
  "Esquecimentos frequentes ou mudanças de comportamento",
  "Quedas recentes ou perda de equilíbrio",
  "Perda de peso, apetite ou força muscular sem causa aparente",
  "Dificuldade para realizar atividades do dia a dia com autonomia",
  "Necessidade de um olhar integrado entre diversas especialidades",
];

export function ParaQuem() {
  return (
    <section id="para-quem" className="py-16 sm:py-24">
      <Container className="grid gap-10 lg:grid-cols-2 lg:items-start">
        <div>
          <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">
            Para quem é e quando procurar um geriatra
          </h2>
          <p className="mt-4 text-lg text-slate-600">
            O geriatra é o médico especializado em cuidar da saúde de pessoas
            idosas de forma integral, considerando aspectos físicos,
            cognitivos, emocionais e sociais. Buscar acompanhamento cedo ajuda
            a prevenir complicações e manter qualidade de vida e
            independência.
          </p>
        </div>
        <ul className="space-y-3">
          {sinais.map((sinal) => (
            <li key={sinal} className="flex items-start gap-3 rounded-xl bg-accent-50 p-4">
              <span className="mt-0.5 text-accent-600" aria-hidden="true">
                ✓
              </span>
              <span className="text-slate-700">{sinal}</span>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
