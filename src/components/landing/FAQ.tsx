import { Container } from "@/components/ui/Container";

const perguntas = [
  {
    pergunta: "Preciso de encaminhamento para consultar com a geriatra?",
    resposta:
      "Não. Você pode agendar diretamente, seja para uma primeira avaliação ou para acompanhamento contínuo.",
  },
  {
    pergunta: "A consulta domiciliar tem custo adicional?",
    resposta:
      "Sim, a consulta domiciliar possui condições específicas. Entre em contato pelo WhatsApp para mais detalhes.",
  },
  {
    pergunta: "Quais documentos devo levar na primeira consulta?",
    resposta:
      "Documento de identidade, carteirinha do convênio (se houver) e, se possível, uma lista com os medicamentos em uso e exames recentes.",
  },
  {
    pergunta: "Posso remarcar ou cancelar minha consulta?",
    resposta:
      "Sim. Entre em contato pelo WhatsApp com antecedência para reagendar ou cancelar seu horário.",
  },
  {
    pergunta: "O consultório atende por convênio?",
    resposta: "Atendemos os convênios: [CONVENIOS], além de consultas particulares.",
  },
];

export function FAQ() {
  return (
    <section id="faq" className="py-16 sm:py-24">
      <Container className="mx-auto max-w-3xl">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">
            Perguntas frequentes
          </h2>
        </div>
        <div className="mt-10 space-y-4">
          {perguntas.map((item) => (
            <details
              key={item.pergunta}
              className="group rounded-xl border border-slate-200 bg-white p-5 open:shadow-sm"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between font-semibold text-slate-900 marker:content-none">
                {item.pergunta}
                <span
                  className="ml-4 shrink-0 text-brand-600 transition-transform group-open:rotate-45"
                  aria-hidden="true"
                >
                  +
                </span>
              </summary>
              <p className="mt-3 text-slate-600">{item.resposta}</p>
            </details>
          ))}
        </div>
      </Container>
    </section>
  );
}
