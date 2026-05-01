"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, LayoutGrid } from "lucide-react";
import PropertyCard from "@/components/ui/PropertyCard";
import { MOCK_PROPERTIES } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

type Filter = "todos" | "venda" | "aluguel" | "lancamento";

const FILTERS: { label: string; value: Filter }[] = [
  { label: "Todos",       value: "todos" },
  { label: "À Venda",     value: "venda" },
  { label: "Aluguel",     value: "aluguel" },
  { label: "Lançamentos", value: "lancamento" },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07 } },
};

export default function FeaturedProperties() {
  const [activeFilter, setActiveFilter] = useState<Filter>("todos");

  const filtered = activeFilter === "todos"
    ? MOCK_PROPERTIES
    : MOCK_PROPERTIES.filter((p) => p.status === activeFilter);

  return (
    <section className="py-24 bg-stone-950" aria-label="Imóveis em Destaque">
      <div className="max-w-7xl mx-auto px-6">

        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12"
        >
          <div>
            <div className="flex items-center gap-4 mb-4">
              <LayoutGrid size={14} strokeWidth={1.25} className="text-gold-400" />
              <span className="font-sans text-xs tracking-[0.3em] uppercase text-gold-400">
                Curadoria
              </span>
            </div>
            <h2 className="font-display text-[clamp(2rem,4vw,3.5rem)] font-400 text-stone-100 leading-tight tracking-tight">
              Imóveis em Destaque
            </h2>
            <p className="font-sans text-stone-500 text-sm mt-2 max-w-md leading-relaxed">
              Selecionados por nossos especialistas. Cada propriedade, uma obra de arte.
            </p>
          </div>

          <Link
            href="/imoveis"
            className="flex items-center gap-3 font-sans text-sm tracking-[0.15em] uppercase text-gold-400 hover:text-gold-300 transition-colors duration-300 group shrink-0"
          >
            Ver todos os imóveis
            <ArrowRight size={14} strokeWidth={1.25} className="transition-transform duration-300 group-hover:translate-x-1.5" />
          </Link>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex gap-1 mb-10 border-b border-stone-800"
        >
          {FILTERS.map((f) => (
            <button
              key={f.value}
              onClick={() => setActiveFilter(f.value)}
              className={cn(
                "relative px-6 py-3 font-sans text-xs tracking-[0.2em] uppercase transition-colors duration-300",
                activeFilter === f.value
                  ? "text-gold-400"
                  : "text-stone-500 hover:text-stone-300"
              )}
            >
              {f.label}
              {activeFilter === f.value && (
                <motion.div
                  layoutId="filter-bar"
                  className="absolute bottom-0 inset-x-0 h-0.5 bg-gold-400"
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                />
              )}
            </button>
          ))}
        </motion.div>

        {/* Bento Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeFilter}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit={{ opacity: 0 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-4"
          >
            {filtered.map((property, i) => {
              const isSignature = property.tag === "SIGNATURE";
              const isFirstFeatured = property.featured && i === 0;

              const colSpan = isSignature || isFirstFeatured
                ? "lg:col-span-8"
                : i % 5 === 1
                  ? "lg:col-span-4"
                  : i % 5 === 2
                    ? "lg:col-span-6"
                    : i % 5 === 3
                      ? "lg:col-span-6"
                      : "lg:col-span-4";

              return (
                <div key={property.id} className={cn("col-span-1 md:col-span-1", colSpan)}>
                  <PropertyCard
                    property={property}
                    size={isSignature || isFirstFeatured ? "large" : "default"}
                    index={i}
                  />
                </div>
              );
            })}
          </motion.div>
        </AnimatePresence>

        {/* Load more */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="text-center mt-14"
        >
          <button className="group inline-flex items-center gap-4 border border-stone-700 hover:border-gold-400 px-10 py-4 font-sans text-xs tracking-[0.3em] uppercase text-stone-400 hover:text-gold-400 transition-all duration-400">
            Carregar Mais Imóveis
            <ArrowRight size={13} strokeWidth={1.25} className="transition-transform duration-300 group-hover:translate-x-1.5" />
          </button>
        </motion.div>
      </div>
    </section>
  );
}
