import { Header } from "@/components/landing/Header";
import { Hero } from "@/components/landing/Hero";
import { Sobre } from "@/components/landing/Sobre";
import { Servicos } from "@/components/landing/Servicos";
import { ParaQuem } from "@/components/landing/ParaQuem";
import { Localizacao } from "@/components/landing/Localizacao";
import { FAQ } from "@/components/landing/FAQ";
import { Footer } from "@/components/landing/Footer";

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Sobre />
        <Servicos />
        <ParaQuem />
        <Localizacao />
        <FAQ />
      </main>
      <Footer />
    </>
  );
}
