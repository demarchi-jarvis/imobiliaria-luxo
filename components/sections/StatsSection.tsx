"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Award, MapPin, Users, TrendingUp } from "lucide-react";

const STATS = [
  { icon: Award,     value: "18",   suffix: " anos", label: "de Excelência no Mercado" },
  { icon: MapPin,    value: "320",  suffix: "+",     label: "Imóveis em Carteira" },
  { icon: Users,     value: "2.4",  suffix: "k",     label: "Clientes Satisfeitos" },
  { icon: TrendingUp, value: "R$ 2", suffix: "bi+",  label: "em Transações Realizadas" },
];

export default function StatsSection() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <section ref={ref} className="relative py-32 overflow-hidden" aria-label="Nossos números">
      {/* Parallax image */}
      <motion.div
        className="absolute inset-0 z-0"
        style={{ y: bgY }}
      >
        <div
          className="w-full h-full bg-cover bg-center scale-110"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1920&q=60')" }}
        />
        <div className="absolute inset-0 bg-stone-950/80" />
      </motion.div>

      {/* Gold line top */}
      <div className="absolute top-0 inset-x-0 h-px gold-divider" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-4 mb-4">
            <span className="h-px w-12 bg-gold-400" />
            <span className="font-sans text-xs tracking-[0.3em] uppercase text-gold-400">
              Nossa Trajetória
            </span>
            <span className="h-px w-12 bg-gold-400" />
          </div>
          <h2 className="font-display text-[clamp(2rem,4vw,3.5rem)] font-400 text-stone-100 leading-tight">
            Números que<br />
            <span className="italic text-gold-400">definem</span> nossa excelência
          </h2>
        </motion.div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {STATS.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{
                  delay: i * 0.12,
                  duration: 0.8,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="flex flex-col items-center text-center p-8 glass border border-stone-800/60 hover:border-gold-400/30 transition-all duration-500 group"
              >
                <div className="mb-6 w-12 h-12 flex items-center justify-center border border-gold-400/30 group-hover:border-gold-400 group-hover:bg-gold-400/10 transition-all duration-400">
                  <Icon size={20} strokeWidth={1.0} className="text-gold-400" />
                </div>
                <div className="font-display text-4xl font-300 text-stone-100 mb-1">
                  {stat.value}
                  <span className="text-gold-400">{stat.suffix}</span>
                </div>
                <p className="font-sans text-xs tracking-[0.1em] uppercase text-stone-500 mt-2">
                  {stat.label}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Gold line bottom */}
      <div className="absolute bottom-0 inset-x-0 h-px gold-divider" />
    </section>
  );
}
