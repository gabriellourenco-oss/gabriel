import { Container } from "@/components/ui/Container";

const perguntas = [
  {
    pergunta: "Atende convênio ou é só particular?",
    resposta:
      "As consultas são exclusivamente particulares. Valores e formas de pagamento podem ser confirmados diretamente pelo WhatsApp.",
  },
  {
    pergunta: "Como funciona a primeira consulta?",
    resposta:
      "A primeira consulta reúne uma avaliação completa da saúde, histórico de doenças, medicamentos em uso e uma escuta cuidadosa das queixas do paciente e da família.",
  },
  {
    pergunta: "Existe atendimento domiciliar?",
    resposta:
      "Sim, realizamos visita domiciliar. É a melhor opção para quem tem mobilidade reduzida, está acamado ou em recuperação — só precisa agendar pelo WhatsApp.",
  },
  {
    pergunta: "Posso levar um familiar para acompanhar?",
    resposta:
      "Sim, e é muito recomendado. A presença de um familiar ou cuidador ajuda na troca de informações e no acompanhamento do plano de cuidado.",
  },
];

export function FAQ() {
  return (
    <section id="faq" className="bg-cream py-20 sm:py-24">
      <Container className="mx-auto max-w-2xl">
        <div className="mb-12 text-center">
          <span className="mb-3.5 inline-block text-[13px] font-semibold uppercase tracking-wide text-brand-400">
            Dúvidas frequentes
          </span>
          <h2 className="font-serif text-3xl font-semibold leading-tight text-brand-600 sm:text-4xl">
            Perguntas antes da consulta
          </h2>
        </div>

        <div className="flex flex-col gap-px overflow-hidden rounded-2xl bg-ink/10">
          {perguntas.map((item) => (
            <details key={item.pergunta} className="group bg-cream">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-6 py-[22px] font-semibold text-brand-600 marker:content-none">
                {item.pergunta}
                <span className="flex h-[26px] w-[26px] flex-none items-center justify-center rounded-full bg-brand-50 text-base text-brand-600 transition-transform group-open:rotate-45">
                  +
                </span>
              </summary>
              <p className="px-6 pb-6 text-[15px] leading-relaxed text-ink-600">{item.resposta}</p>
            </details>
          ))}
        </div>
      </Container>
    </section>
  );
}
