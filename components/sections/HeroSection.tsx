"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ChevronDown } from "lucide-react";
import SearchBar from "@/components/ui/SearchBar";

const HERO_WORDS = ["Encontre", "Seu", "Patrimônio"];
const HERO_SUB   = "Curadoria exclusiva dos imóveis mais sofisticados do Rio de Janeiro";

const wordVariants = {
  hidden: { opacity: 0, y: 60, rotateX: -20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: {
      delay: 0.3 + i * 0.15,
      duration: 0.9,
      ease: [0.16, 1, 0.3, 1],
    },
  }),
};

const lineVariants = {
  hidden: { scaleX: 0 },
  visible: {
    scaleX: 1,
    transition: { delay: 0.9, duration: 1.2, ease: [0.16, 1, 0.3, 1] },
  },
};

export default function HeroSection() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const bgY    = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <section
      ref={ref}
      className="relative min-h-dvh flex flex-col justify-end overflow-hidden"
      aria-label="Hero — Imóveis de Ultra Luxo"
    >
      {/* Parallax background */}
      <motion.div className="absolute inset-0 z-0" style={{ y: bgY }}>
        {/* Video background */}
        <video
          autoPlay
          muted
          loop
          playsInline
          poster="https://images.unsplash.com/photo-1613977257592-4871e5fcd7c4?w=1920&q=80"
          className="w-full h-full object-cover scale-105"
          aria-hidden="true"
        >
          <source src="/hero.webm" type="video/webm" />
        </video>

        {/* Radial overlay for text legibility */}
        <div className="absolute inset-0 bg-hero-overlay" />

        {/* Bottom gradient to merge with page */}
        <div className="absolute bottom-0 inset-x-0 h-64 bg-gradient-to-t from-stone-950 to-transparent" />
      </motion.div>

      {/* Animated ambient orbs */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <motion.div
          animate={{ x: [0, 40, 0], y: [0, -30, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-gold-400/5 blur-[80px]"
        />
        <motion.div
          animate={{ x: [0, -30, 0], y: [0, 40, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 3 }}
          className="absolute bottom-1/3 right-1/4 w-80 h-80 rounded-full bg-gold-400/4 blur-[100px]"
        />
      </div>

      {/* Content */}
      <motion.div
        style={{ opacity }}
        className="relative z-10 max-w-7xl mx-auto px-6 pb-24 pt-40 w-full"
      >
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center gap-4 mb-8"
        >
          <span className="h-px w-12 bg-gold-400" />
          <span className="font-sans text-xs tracking-[0.3em] uppercase text-gold-400">
            Ultra Luxo · Rio de Janeiro
          </span>
        </motion.div>

        {/* Main headline — word by word reveal */}
        <h1
          className="font-display text-[clamp(3.5rem,8vw,7rem)] font-700 leading-none tracking-tight text-stone-100 mb-6"
          style={{ perspective: "800px" }}
        >
          {HERO_WORDS.map((word, i) => (
            <motion.span
              key={word}
              custom={i}
              variants={wordVariants}
              initial="hidden"
              animate="visible"
              className="inline-block mr-[0.2em]"
            >
              {i === 2 ? (
                <span className="text-gold-gradient">{word}</span>
              ) : (
                word
              )}
            </motion.span>
          ))}
        </h1>

        {/* Gold line divider */}
        <motion.div
          variants={lineVariants}
          initial="hidden"
          animate="visible"
          className="gold-divider w-32 mb-8 origin-left"
        />

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="font-sans text-base md:text-lg text-stone-400 max-w-xl leading-relaxed tracking-wide mb-12"
        >
          {HERO_SUB}
        </motion.p>

        {/* Search bar */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          <SearchBar />
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="flex gap-10 mt-14"
        >
          {[
            { value: "320+",  label: "Imóveis Exclusivos" },
            { value: "R$ 2bi", label: "em Propriedades" },
            { value: "18 anos", label: "de Excelência" },
          ].map((stat) => (
            <div key={stat.label} className="flex flex-col">
              <span className="font-display text-2xl md:text-3xl font-600 text-gold-400">
                {stat.value}
              </span>
              <span className="font-sans text-xs tracking-[0.15em] uppercase text-stone-500 mt-1">
                {stat.label}
              </span>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
      >
        <span className="font-sans text-[10px] tracking-[0.3em] uppercase text-stone-500">
          Explorar
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown size={18} strokeWidth={1.0} className="text-gold-400" />
        </motion.div>
      </motion.div>
    </section>
  );
}
