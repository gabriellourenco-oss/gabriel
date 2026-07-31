import type { Metadata } from "next";
import { Header } from "@/components/landing/Header";
import { Footer } from "@/components/landing/Footer";
import { Container } from "@/components/ui/Container";
import { AgendarClient } from "@/components/agendamento/AgendarClient";

export const metadata: Metadata = {
  title: "Agendar consulta | Dra. Juliana Trindade",
  description: "Escolha uma data e horário disponíveis para agendar sua consulta.",
};

export default function AgendarPage() {
  return (
    <>
      <Header />
      <main className="bg-cream py-12 sm:py-16">
        <Container>
          <div className="mx-auto max-w-4xl">
            <div className="mb-8 text-center">
              <h1 className="font-serif text-3xl font-semibold text-brand-600 sm:text-4xl">
                Agendar consulta
              </h1>
              <p className="mt-3 text-lg text-ink-600">
                Escolha a melhor data e horário para você.
              </p>
            </div>
            <AgendarClient tamanho="grande" />
          </div>
        </Container>
      </main>
      <Footer />
    </>
  );
}
