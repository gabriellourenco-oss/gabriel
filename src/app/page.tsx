import { Header } from "@/components/landing/Header";
import { Hero } from "@/components/landing/Hero";
import { Sobre } from "@/components/landing/Sobre";
import { Atuacao } from "@/components/landing/Atuacao";
import { FormasAtendimento } from "@/components/landing/FormasAtendimento";
import { Diferenciais } from "@/components/landing/Diferenciais";
import { ParaQuem } from "@/components/landing/ParaQuem";
import { Depoimentos } from "@/components/landing/Depoimentos";
import { FAQ } from "@/components/landing/FAQ";
import { Contato } from "@/components/landing/Contato";
import { Footer } from "@/components/landing/Footer";
import { WhatsAppFloat } from "@/components/landing/WhatsAppFloat";

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Sobre />
        <Atuacao />
        <FormasAtendimento />
        <Diferenciais />
        <ParaQuem />
        <Depoimentos />
        <FAQ />
        <Contato />
      </main>
      <Footer />
      <WhatsAppFloat />
    </>
  );
}
