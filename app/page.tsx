import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/sections/HeroSection";
import FeaturedProperties from "@/components/sections/FeaturedProperties";
import StatsSection from "@/components/sections/StatsSection";
import WhatsAppConcierge from "@/components/ui/WhatsAppConcierge";

export const metadata: Metadata = {
  title: "Imóveis de Ultra Luxo | Coberturas, Penthouses e Mansões no Rio de Janeiro",
  description:
    "Curadoria exclusiva dos imóveis mais sofisticados do Rio de Janeiro. Coberturas em Ipanema, penthouses no Leblon, mansões na Barra. Atendimento personalizado 24h.",
  alternates: {
    canonical: "https://imobiliaria-luxo.com.br",
  },
};

export default function HomePage() {
  return (
    <main className="relative bg-stone-950">
      <Navbar />
      <HeroSection />
      <FeaturedProperties />
      <StatsSection />
      <Footer />
      <WhatsAppConcierge />
    </main>
  );
}
