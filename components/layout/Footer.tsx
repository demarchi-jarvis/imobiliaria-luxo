import Link from "next/link";
import { MapPin, Phone, Mail, Instagram, Linkedin, Youtube } from "lucide-react";

const FOOTER_LINKS = {
  Imóveis: [
    { label: "À Venda",       href: "/imoveis?status=venda" },
    { label: "Para Alugar",   href: "/imoveis?status=aluguel" },
    { label: "Lançamentos",   href: "/imoveis?status=lancamento" },
    { label: "Mapa de Imóveis", href: "/mapa" },
  ],
  Empresa: [
    { label: "Sobre Nós",     href: "/sobre" },
    { label: "Nossa Equipe",  href: "/equipe" },
    { label: "Blog",          href: "/blog" },
    { label: "Contato",       href: "/contato" },
  ],
  Serviços: [
    { label: "Avaliação Gratuita", href: "/avaliacao" },
    { label: "Financiamento",      href: "/financiamento" },
    { label: "Consultoria",        href: "/consultoria" },
    { label: "Documentação",       href: "/documentacao" },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-stone-950 border-t border-stone-800" aria-label="Rodapé">
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="mb-6">
              <span className="font-display text-2xl font-700 tracking-widest text-gold-400 uppercase block">
                LUXO
              </span>
              <span className="font-sans text-[10px] tracking-[0.35em] text-stone-500 uppercase">
                Imóveis de Ultra Luxo
              </span>
            </div>

            <p className="font-sans text-sm text-stone-500 leading-relaxed max-w-xs mb-8">
              Há 18 anos apresentando os imóveis mais exclusivos do Rio de Janeiro. Excelência, discrição e resultados.
            </p>

            <div className="space-y-3">
              <a href="tel:+552199999999" className="flex items-center gap-3 text-stone-400 hover:text-gold-400 transition-colors duration-300 group">
                <Phone size={14} strokeWidth={1.25} className="text-gold-400/50 group-hover:text-gold-400 transition-colors" />
                <span className="font-sans text-sm">(21) 9999-9999</span>
              </a>
              <a href="mailto:contato@imobiliarialuxo.com.br" className="flex items-center gap-3 text-stone-400 hover:text-gold-400 transition-colors duration-300 group">
                <Mail size={14} strokeWidth={1.25} className="text-gold-400/50 group-hover:text-gold-400 transition-colors" />
                <span className="font-sans text-sm">contato@imobiliarialuxo.com.br</span>
              </a>
              <div className="flex items-start gap-3 text-stone-400">
                <MapPin size={14} strokeWidth={1.25} className="text-gold-400/50 mt-0.5 shrink-0" />
                <span className="font-sans text-sm">Av. das Américas, 3434 — Barra da Tijuca, RJ</span>
              </div>
            </div>
          </div>

          {/* Links */}
          {Object.entries(FOOTER_LINKS).map(([title, links]) => (
            <div key={title}>
              <h4 className="font-sans text-xs tracking-[0.25em] uppercase text-gold-400 mb-6">
                {title}
              </h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="font-sans text-sm text-stone-500 hover:text-stone-200 transition-colors duration-300"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="gold-divider my-12" />

        {/* Bottom */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="font-sans text-xs text-stone-600">
            © {new Date().getFullYear()} Imobiliária Luxo RJ. CRECI-RJ 00000. Todos os direitos reservados.
          </p>

          {/* Socials */}
          <div className="flex items-center gap-4">
            {[
              { Icon: Instagram, href: "#", label: "Instagram" },
              { Icon: Linkedin,  href: "#", label: "LinkedIn" },
              { Icon: Youtube,   href: "#", label: "YouTube" },
            ].map(({ Icon, href, label }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="w-9 h-9 border border-stone-800 hover:border-gold-400/60 flex items-center justify-center text-stone-500 hover:text-gold-400 transition-all duration-300"
              >
                <Icon size={15} strokeWidth={1.25} />
              </a>
            ))}
          </div>

          <div className="flex gap-6">
            {["Privacidade", "Termos", "LGPD"].map((item) => (
              <Link key={item} href="#" className="font-sans text-xs text-stone-600 hover:text-stone-400 transition-colors duration-300">
                {item}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
