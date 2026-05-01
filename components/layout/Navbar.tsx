"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { Menu, X, Phone } from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { label: "Comprar",      href: "/imoveis?status=venda" },
  { label: "Alugar",       href: "/imoveis?status=aluguel" },
  { label: "Lançamentos",  href: "/imoveis?status=lancamento" },
  { label: "Sobre",        href: "/sobre" },
  { label: "Blog",         href: "/blog" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled]  = useState(false);
  const { scrollY } = useScroll();

  useEffect(() => {
    const unsub = scrollY.on("change", (v) => setScrolled(v > 60));
    return () => unsub();
  }, [scrollY]);

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={cn(
          "fixed top-0 inset-x-0 z-50 transition-all duration-500",
          scrolled
            ? "py-3 glass shadow-glass"
            : "py-5 bg-transparent"
        )}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex flex-col leading-none group">
            <span className="font-display text-xl font-700 tracking-widest text-gold-400 uppercase transition-opacity group-hover:opacity-80">
              LUXO
            </span>
            <span className="font-sans text-[9px] tracking-[0.35em] text-stone-400 uppercase">
              Imóveis de Ultra Luxo
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="relative text-sm font-sans font-400 tracking-wider text-stone-300 uppercase transition-colors duration-300 hover:text-gold-400 group"
              >
                {link.label}
                <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-gold-400 transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </nav>

          {/* CTA + Mobile toggle */}
          <div className="flex items-center gap-4">
            <a
              href="tel:+552199999999"
              className="hidden md:flex items-center gap-2 text-sm text-stone-300 hover:text-gold-400 transition-colors duration-300"
            >
              <Phone size={14} strokeWidth={1.25} />
              <span className="font-sans tracking-wide">(21) 9999-9999</span>
            </a>

            <Link
              href="/contato"
              className="hidden md:inline-flex items-center px-5 py-2.5 text-xs font-sans font-500 tracking-widest uppercase border border-gold-400/60 text-gold-400 hover:bg-gold-400 hover:text-stone-950 transition-all duration-300 rounded-none"
            >
              Contato
            </Link>

            <button
              onClick={() => setMenuOpen((v) => !v)}
              className="lg:hidden text-stone-300 hover:text-gold-400 transition-colors"
              aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
            >
              {menuOpen ? <X size={22} strokeWidth={1.25} /> : <Menu size={22} strokeWidth={1.25} />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile menu */}
      <motion.div
        initial={false}
        animate={menuOpen ? { opacity: 1, x: 0 } : { opacity: 0, x: "100%" }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="fixed inset-0 z-40 lg:hidden glass-premium flex flex-col justify-center px-8"
      >
        <nav className="flex flex-col gap-6">
          {NAV_LINKS.map((link, i) => (
            <motion.div
              key={link.href}
              initial={{ opacity: 0, x: 30 }}
              animate={menuOpen ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
              transition={{ delay: i * 0.06, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              <Link
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="font-display text-3xl font-400 text-stone-200 hover:text-gold-400 transition-colors duration-300"
              >
                {link.label}
              </Link>
            </motion.div>
          ))}
        </nav>

        <div className="gold-divider mt-10 mb-8" />

        <a
          href="tel:+552199999999"
          className="flex items-center gap-3 text-stone-400 hover:text-gold-400 transition-colors"
        >
          <Phone size={16} strokeWidth={1.25} />
          <span className="font-sans text-sm tracking-wider">(21) 9999-9999</span>
        </a>
      </motion.div>
    </>
  );
}
