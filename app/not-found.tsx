import Link from "next/link";
import { ArrowLeft, Search } from "lucide-react";

export default function NotFound() {
  return (
    <main className="min-h-dvh bg-stone-950 flex items-center justify-center px-6">
      <div className="text-center max-w-lg">
        <span className="font-display text-[8rem] font-300 text-gold-400/20 leading-none block">
          404
        </span>
        <div className="gold-divider w-24 mx-auto mb-8" />
        <h1 className="font-display text-3xl text-stone-100 mb-3">
          Imóvel não encontrado
        </h1>
        <p className="font-sans text-sm text-stone-500 leading-relaxed mb-10">
          O imóvel que você procura pode ter sido vendido, alugado ou o link pode estar desatualizado.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/imoveis"
            className="flex items-center justify-center gap-2 px-8 py-3.5 bg-gold-400 hover:bg-gold-300 text-stone-950 font-sans text-xs font-semibold tracking-[0.25em] uppercase transition-all duration-300"
          >
            <Search size={14} strokeWidth={2} />
            Ver todos os imóveis
          </Link>
          <Link
            href="/"
            className="flex items-center justify-center gap-2 px-8 py-3.5 border border-stone-700 hover:border-gold-400/50 text-stone-400 hover:text-gold-400 font-sans text-xs tracking-[0.25em] uppercase transition-all duration-300"
          >
            <ArrowLeft size={14} strokeWidth={1.25} />
            Página inicial
          </Link>
        </div>
      </div>
    </main>
  );
}
