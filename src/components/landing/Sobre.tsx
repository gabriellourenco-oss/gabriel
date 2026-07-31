import Image from "next/image";
import { Container } from "@/components/ui/Container";

const trajetoria = [
  { periodo: "2025", texto: "Graduação em Medicina pela Univale, Governador Valadares" },
  {
    periodo: "Atual",
    texto: "Médica na Atenção Primária à Saúde, com atendimento contínuo e longitudinal",
  },
  {
    periodo: "Em curso",
    texto: "Pós-graduação em Geriatria pelo Instituto Israelita Albert Einstein",
  },
];

export function Sobre() {
  return (
    <section id="sobre" className="bg-brand-50 py-14 sm:py-16">
      <Container className="grid items-start gap-14 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="relative mx-auto w-full max-w-[420px]">
          <Image
            src="/images/dra-sobre.jpeg"
            alt="Dra. Juliana Trindade sorrindo"
            width={420}
            height={525}
            className="aspect-[4/5] w-full rounded-[20px] object-cover object-[50%_25%] shadow-[0_20px_40px_-16px_rgba(15,45,43,0.25)]"
          />
        </div>

        <div>
          <span className="mb-3.5 inline-block text-[13px] font-semibold uppercase tracking-wide text-brand-400">
            Sobre a Dra. Juliana
          </span>
          <h2 className="text-balance font-serif text-3xl font-semibold leading-tight text-brand-600 sm:text-4xl">
            Uma trajetória construída ao lado do paciente da urgência à
            atenção contínua.
          </h2>
          <p className="mt-5 text-[17px] leading-relaxed text-ink-600">
            Formada em Medicina pela Univale, em Governador Valadares, a Dra.
            Juliana já viveu os dois lados do cuidado: o ritmo intenso da
            urgência e emergência no Hospital de Sardoá, e a escuta próxima e
            contínua da Atenção Primária à Saúde, onde atua atualmente em
            posto de saúde da região.
          </p>
          <p className="mt-4 text-[17px] leading-relaxed text-ink-600">
            Essa experiência despertou um interesse especial pela saúde do
            idoso, hoje aprofundado na pós-graduação em Geriatria que cursa
            atualmente pelo Instituto Israelita de Ensino e Pesquisa Albert
            Einstein. Sua abordagem une agilidade clínica, comunicação
            empática e decisões tomadas em conjunto com o paciente e a
            família.
          </p>

          <div className="mt-7 flex items-start gap-4 rounded-xl border-l-4 border-accent-500 bg-cream p-5 shadow-sm">
            <div className="flex h-12 w-12 flex-none items-center justify-center rounded-full bg-brand-600">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path
                  d="M12 4L3 8.5 12 13l9-4.5L12 4z"
                  stroke="#F3EFE4"
                  strokeWidth="1.6"
                  strokeLinejoin="round"
                />
                <path
                  d="M7 10.5v4c0 1.4 2.2 2.5 5 2.5s5-1.1 5-2.5v-4"
                  stroke="#F3EFE4"
                  strokeWidth="1.6"
                />
                <path d="M21 8.5V14" stroke="#F3EFE4" strokeWidth="1.6" strokeLinecap="round" />
              </svg>
            </div>
            <div>
              <span className="text-[11px] font-semibold uppercase tracking-wide text-accent-500">
                Formação em andamento
              </span>
              <h3 className="font-serif text-lg font-semibold text-brand-600">
                Pós-graduanda em Geriatria
              </h3>
              <p className="text-sm font-semibold text-ink">Instituto Israelita Albert Einstein</p>
              <p className="mt-1.5 text-sm leading-relaxed text-ink-500">
                Cursando atualmente uma pós-graduação no Instituto Israelita
                Albert Einstein, uma das instituições de saúde mais
                respeitadas do Brasil, referência nacional em ensino e
                pesquisa médica.
              </p>
            </div>
          </div>

          <div className="mt-7 flex flex-col">
            {trajetoria.map((item) => (
              <div
                key={item.periodo}
                className="flex gap-4 border-t border-ink/10 py-4.5"
              >
                <span className="w-24 flex-none font-serif text-sm font-semibold text-brand-300">
                  {item.periodo}
                </span>
                <span className="text-[15.5px] text-ink">{item.texto}</span>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
