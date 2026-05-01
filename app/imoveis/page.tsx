import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import FeaturedProperties from "@/components/sections/FeaturedProperties";
import WhatsAppConcierge from "@/components/ui/WhatsAppConcierge";

export const metadata: Metadata = {
  title: "Imóveis | Catálogo Completo",
  description: "Explore nossa curadoria exclusiva de imóveis de ultra luxo no Rio de Janeiro. Coberturas, penthouses, mansões e apartamentos de alto padrão.",
};

export default function ImoveisPage() {
  return (
    <main className="bg-stone-950 min-h-screen">
      <Navbar />
      <div className="pt-28">
        <div className="max-w-7xl mx-auto px-6 py-10">
          <div className="mb-2">
            <span className="font-sans text-xs tracking-[0.3em] uppercase text-gold-400">Catálogo</span>
          </div>
          <h1 className="font-display text-[clamp(2rem,4vw,3.5rem)] font-400 text-stone-100 leading-tight mb-2">
            Todos os Imóveis
          </h1>
          <p className="font-sans text-stone-500 text-sm max-w-md">
            Curadoria exclusiva de propriedades de alto padrão selecionadas por nossos especialistas.
          </p>
        </div>
        <FeaturedProperties />
      </div>
      <Footer />
      <WhatsAppConcierge />
    </main>
  );
}
