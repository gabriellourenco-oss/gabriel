import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

export function Hero() {
  return (
    <section className="bg-gradient-to-b from-brand-50 to-white">
      <Container className="grid gap-10 py-16 sm:py-20 lg:grid-cols-2 lg:items-center lg:py-28">
        <div>
          <p className="mb-4 inline-block rounded-full bg-accent-100 px-4 py-1 text-sm font-semibold text-accent-700">
            Geriatria &amp; Medicina de Família
          </p>
          <h1 className="text-balance text-4xl font-bold leading-tight text-slate-900 sm:text-5xl">
            [NOME_MEDICA]
          </h1>
          <p className="mt-3 text-xl font-medium text-brand-700">
            Médica de Família e Comunidade — Pós-graduação em Geriatria (Albert Einstein)
          </p>
          <p className="mt-2 text-sm text-slate-500">CRM [CRM]</p>
          <p className="mt-6 max-w-xl text-lg text-slate-600">
            Cuidado humano e especializado para você e para quem você ama, em
            todas as fases do envelhecimento — com escuta atenta e
            acompanhamento contínuo.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <ButtonLink href="/agendar" variant="primary">
              Agendar consulta
            </ButtonLink>
            <ButtonLink href="#sobre" variant="secondary">
              Conhecer a especialista
            </ButtonLink>
          </div>
        </div>
        <div className="flex justify-center lg:justify-end">
          <div className="flex h-72 w-72 items-center justify-center rounded-3xl bg-brand-100 text-center text-brand-700 shadow-inner sm:h-96 sm:w-96">
            <span className="px-6 text-sm font-medium">
              [FOTO_MEDICA]
              <br />
              (substituir por foto profissional)
            </span>
          </div>
        </div>
      </Container>
    </section>
  );
}
