import Image from "next/image";
import { Container } from "@/components/ui/Container";

const trajetoria = [
  { periodo: "2025", texto: "Graduação em Medicina — Univale, Governador Valadares" },
  {
    periodo: "Atual",
    texto: "Médica na Atenção Primária à Saúde, com atendimento contínuo e longitudinal",
  },
  {
    periodo: "Em curso",
    texto: "Pós-graduação em Geriatria — Instituto Israelita Albert Einstein",
  },
];

export function Sobre() {
  return (
    <section id="sobre" className="bg-brand-50 py-20 sm:py-24">
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
            idoso — hoje aprofundado na pós-graduação em Geriatria pelo
            Instituto Israelita de Ensino e Pesquisa Albert Einstein. Sua
            abordagem une agilidade clínica, comunicação empática e decisões
            tomadas em conjunto com o paciente e a família.
          </p>

          <div className="mt-8 flex flex-col">
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
