import { Container } from "@/components/ui/Container";

export function Localizacao() {
  return (
    <section id="contato" className="bg-slate-50 py-16 sm:py-24">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">
            Localização e contato
          </h2>
          <p className="mt-4 text-lg text-slate-600">
            Estamos prontos para atender você e sua família.
          </p>
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-2">
          <div className="space-y-6 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-100 sm:p-8">
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wide text-brand-700">
                Endereço
              </h3>
              <p className="mt-1 text-slate-700">[ENDERECO]</p>
            </div>
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wide text-brand-700">
                WhatsApp / Telefone
              </h3>
              <a
                href="https://wa.me/[TELEFONE]"
                className="mt-1 inline-block text-slate-700 underline decoration-brand-300 underline-offset-4 hover:text-brand-700"
              >
                [TELEFONE]
              </a>
            </div>
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wide text-brand-700">
                Convênios atendidos
              </h3>
              <p className="mt-1 text-slate-700">[CONVENIOS]</p>
            </div>
          </div>

          <div
            className="flex min-h-[280px] items-center justify-center rounded-2xl bg-slate-200 text-center text-slate-500 ring-1 ring-slate-100"
            role="img"
            aria-label="Mapa de localização do consultório (placeholder)"
          >
            <span className="px-6 text-sm">
              [MAPA]
              <br />
              (inserir mapa do Google Maps com o endereço do consultório)
            </span>
          </div>
        </div>
      </Container>
    </section>
  );
}
