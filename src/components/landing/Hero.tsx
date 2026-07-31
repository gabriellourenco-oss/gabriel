import Image from "next/image";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { LogoMark } from "@/components/landing/Logo";

const credenciais = ["CRM/MG 109990", "Formação Univale", "ACLS certificada"];

export function Hero() {
  return (
    <section id="topo" className="relative overflow-hidden bg-gradient-to-b from-brand-50 to-cream">
      <Container className="grid gap-14 py-12 sm:py-16 lg:grid-cols-2 lg:items-center lg:py-16">
        <div>
          <span className="mb-5 inline-flex items-center gap-2 rounded-full bg-brand-50 px-3.5 py-2 text-[13px] font-semibold text-brand-500">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path
                d="M12 21s-7.5-4.6-10-9.3C.6 8 2 4 6 4c2.4 0 4 1.4 6 4 2-2.6 3.6-4 6-4 4 0 5.4 4 4 7.7-2.5 4.7-10 9.3-10 9.3z"
                stroke="currentColor"
                strokeWidth="1.6"
              />
            </svg>
            Medicina de Família e Comunidade · Pós-graduanda em Geriatria
          </span>

          <h1 className="text-balance font-serif text-4xl font-semibold leading-[1.15] text-brand-600 sm:text-5xl">
            Cuidado atento para viver a terceira idade com{" "}
            <span className="relative whitespace-nowrap">
              autonomia
              <svg
                width="100%"
                height="12"
                viewBox="0 0 220 12"
                preserveAspectRatio="none"
                className="absolute -bottom-1.5 left-0 w-full"
                aria-hidden="true"
              >
                <path
                  d="M2 9c40-8 140-8 216 0"
                  stroke="#C1552B"
                  strokeWidth="4"
                  fill="none"
                  strokeLinecap="round"
                />
              </svg>
            </span>{" "}
            e dignidade.
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-600">
            Sou a Dra. Juliana Trindade, médica com atuação na Atenção Primária
            à Saúde, dedicada a acompanhar de perto a saúde de pacientes
            idosos e suas famílias com escuta, tempo e respeito.
          </p>

          <div className="mt-8 flex flex-wrap gap-3.5">
            <ButtonLink href="#contato" variant="primary">
              <svg width="19" height="19" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path
                  d="M17 14.3c-.3-.2-1.8-.9-2.1-1-.3-.1-.5-.2-.7.2-.2.3-.8 1-.9 1.2-.2.2-.3.2-.6.1-1.6-.8-2.7-1.4-3.8-3.2-.3-.5.3-.5.8-1.6.1-.2 0-.4 0-.5-.1-.2-.7-1.7-1-2.3-.3-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5s1.1 2.9 1.2 3.1c.1.2 2.1 3.3 5.2 4.5 2.7 1.1 2.7.7 3.2.6.5-.1 1.6-.6 1.8-1.3.2-.6.2-1.1.2-1.3-.1-.1-.3-.2-.6-.3z"
                  fill="currentColor"
                />
                <path
                  d="M12 2C6.5 2 2 6.4 2 11.9c0 1.9.5 3.6 1.4 5.2L2 22l5-1.3c1.5.8 3.2 1.3 5 1.3 5.5 0 10-4.4 10-9.9S17.5 2 12 2z"
                  stroke="currentColor"
                  strokeWidth="1.4"
                />
              </svg>
              Agendar consulta pelo WhatsApp
            </ButtonLink>
            <ButtonLink href="#sobre" variant="secondary">
              Conhecer o atendimento
            </ButtonLink>
          </div>

          <div className="mt-9 flex flex-wrap items-center gap-3.5 border-t border-ink/10 pt-6">
            <div className="inline-flex items-center gap-1.5 rounded-full border border-accent-500/40 bg-accent-50 px-3 py-1.5 text-[13px] font-semibold text-accent-600">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M12 4L3 8.5 12 13l9-4.5L12 4z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
                <path d="M7 10.5v4c0 1.4 2.2 2.5 5 2.5s5-1.1 5-2.5v-4" stroke="currentColor" strokeWidth="1.7" />
              </svg>
              Pós-graduanda em Geriatria · Albert Einstein
            </div>
            {credenciais.map((item) => (
              <div key={item} className="flex items-center gap-2 text-[13.5px] font-medium text-ink-500">
                <span className="h-1.5 w-1.5 rounded-full bg-brand-300" />
                {item}
              </div>
            ))}
          </div>
        </div>

        <div className="relative mx-auto max-w-[430px] justify-self-center px-6 pb-8 pt-6">
          <div className="pointer-events-none absolute -right-12 -top-10 h-48 w-48 rounded-full bg-brand-300/40 blur-2xl" />
          <div className="relative rounded-[18px] shadow-[0_4px_18px_rgba(0,0,0,0.25)]">
            <Image
              src="/images/dra-hero.jpeg"
              alt="Dra. Juliana Trindade, médica, sorrindo de jaleco branco"
              width={430}
              height={538}
              priority
              className="aspect-[4/5] w-full rounded-[18px] object-cover object-[50%_22%]"
            />
            <div className="pointer-events-none absolute inset-0 rounded-[18px] bg-gradient-to-b from-transparent via-transparent to-brand-700/50" />
            <div className="pointer-events-none absolute inset-0 rounded-[18px] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.35)]" />
          </div>

          <div className="relative z-10 -mt-12 ml-1.5 inline-flex items-center gap-3 rounded-xl bg-cream-100 p-3.5 shadow-[0_12px_24px_-10px_rgba(0,0,0,0.35)]">
            <LogoMark size={36} />
            <div>
              <div className="font-serif text-[14.5px] font-semibold leading-tight text-brand-600">
                Dra. Juliana Trindade
              </div>
              <div className="text-xs font-medium text-brand-400">CRM/MG 109990</div>
            </div>
          </div>

          <div className="absolute right-1.5 top-9 z-10 flex items-center gap-1.5 rounded-full bg-accent-500 px-3.5 py-2 shadow-[0_10px_22px_-8px_rgba(0,0,0,0.4)]">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path
                d="M12 21c-5-3-8-6-8-10a5 5 0 019-3 5 5 0 019 3c0 4-3 7-8 10z"
                fill="#FFF8F1"
              />
            </svg>
            <span className="text-xs font-semibold text-cream-100">Cuidado humanizado</span>
          </div>
        </div>
      </Container>

      <svg
        viewBox="0 0 1200 60"
        preserveAspectRatio="none"
        className="block h-12 w-full"
        aria-hidden="true"
      >
        <path d="M0 30 Q300 60 600 30 T1200 30 V60 H0 Z" fill="#EDF0E4" />
      </svg>
    </section>
  );
}
