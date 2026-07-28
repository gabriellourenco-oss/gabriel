import type { Metadata } from "next";
import { Header } from "@/components/landing/Header";
import { Footer } from "@/components/landing/Footer";
import { Container } from "@/components/ui/Container";
import { AgendarClient } from "@/components/agendamento/AgendarClient";

export const metadata: Metadata = {
  title: "Agendar consulta | [NOME_MEDICA]",
  description: "Escolha uma data e horário disponíveis para agendar sua consulta.",
};

export default function AgendarPage() {
  return (
    <>
      <Header />
      <main className="bg-slate-50 py-12 sm:py-16">
        <Container>
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl">
              Agendar consulta
            </h1>
            <p className="mt-3 text-lg text-slate-600">
              Escolha a melhor data e horário para você.
            </p>
          </div>
          <AgendarClient />
        </Container>
      </main>
      <Footer />
    </>
  );
}
