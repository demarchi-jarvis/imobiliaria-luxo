"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, MapPin, DollarSign, Home, SlidersHorizontal, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

type Tab = "comprar" | "alugar";

const PROPERTY_TYPES = ["Todos", "Apartamento", "Cobertura", "Penthouse", "Casa", "Terreno"];
const CITIES = ["Rio de Janeiro", "São Paulo", "Brasília", "Belo Horizonte"];
const NEIGHBORHOODS = ["Ipanema", "Leblon", "Barra da Tijuca", "Recreio", "São Conrado", "Jardins"];
const BEDROOMS = ["Todos", "1+", "2+", "3+", "4+", "5+"];
const PRICE_RANGES = [
  { label: "Sem limite", value: "" },
  { label: "R$ 500 mil",  value: "500000" },
  { label: "R$ 1 milhão", value: "1000000" },
  { label: "R$ 2 milhões", value: "2000000" },
  { label: "R$ 5 milhões", value: "5000000" },
  { label: "R$ 10 milhões", value: "10000000" },
  { label: "R$ 20 milhões", value: "20000000" },
];

interface SelectFieldProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  options: string[];
  onChange: (v: string) => void;
  className?: string;
}

function SelectField({ icon, label, value, options, onChange, className }: SelectFieldProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className={cn("relative", className)}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center gap-3 px-4 py-3.5 text-left transition-colors duration-200 hover:bg-white/5 group"
      >
        <span className="text-gold-400/70 group-hover:text-gold-400 transition-colors">
          {icon}
        </span>
        <div className="flex-1 min-w-0">
          <span className="block font-sans text-[10px] tracking-[0.2em] uppercase text-stone-500 mb-0.5">
            {label}
          </span>
          <span className="block font-sans text-sm text-stone-200 truncate">
            {value || "Todos"}
          </span>
        </div>
        <ChevronDown
          size={14}
          strokeWidth={1.25}
          className={cn("text-stone-500 transition-transform duration-200", open && "rotate-180")}
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8, scaleY: 0.95 }}
            animate={{ opacity: 1, y: 0, scaleY: 1 }}
            exit={{ opacity: 0, y: -8, scaleY: 0.95 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="absolute top-full left-0 right-0 z-50 mt-1 glass border border-stone-800 shadow-card overflow-hidden"
            style={{ transformOrigin: "top" }}
          >
            {options.map((opt) => (
              <button
                key={opt}
                type="button"
                onClick={() => { onChange(opt); setOpen(false); }}
                className={cn(
                  "w-full px-4 py-2.5 text-left font-sans text-sm transition-colors duration-150 hover:bg-gold-400/10 hover:text-gold-400",
                  value === opt ? "text-gold-400 bg-gold-400/5" : "text-stone-300"
                )}
              >
                {opt}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function SearchBar() {
  const [tab, setTab] = useState<Tab>("comprar");
  const [expanded, setExpanded] = useState(false);
  const [filters, setFilters] = useState({
    type: "Todos",
    city: "",
    neighborhood: "",
    minPrice: "",
    maxPrice: "",
    bedrooms: "Todos",
    query: "",
  });

  const set = (key: keyof typeof filters) => (v: string) =>
    setFilters((f) => ({ ...f, [key]: v }));

  return (
    <div className="glass-premium rounded-none w-full max-w-5xl">
      {/* Tabs */}
      <div className="flex border-b border-white/10">
        {(["comprar", "alugar"] as Tab[]).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={cn(
              "relative px-8 py-3.5 font-sans text-xs tracking-[0.25em] uppercase transition-colors duration-300",
              tab === t ? "text-gold-400" : "text-stone-500 hover:text-stone-300"
            )}
          >
            {t === "comprar" ? "Comprar" : "Alugar"}
            {tab === t && (
              <motion.div
                layoutId="tab-underline"
                className="absolute bottom-0 inset-x-0 h-0.5 bg-gold-400"
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              />
            )}
          </button>
        ))}
      </div>

      {/* Main filters row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-white/10">
        {/* Free text / location */}
        <div className="flex items-center gap-3 px-4 py-3.5 col-span-1 lg:col-span-1">
          <MapPin size={16} strokeWidth={1.25} className="text-gold-400/70 shrink-0" />
          <div className="flex-1">
            <span className="block font-sans text-[10px] tracking-[0.2em] uppercase text-stone-500 mb-0.5">
              Onde
            </span>
            <input
              type="text"
              value={filters.query}
              onChange={(e) => set("query")(e.target.value)}
              placeholder="Cidade, bairro, código..."
              className="w-full bg-transparent font-sans text-sm text-stone-200 placeholder:text-stone-600 outline-none"
            />
          </div>
        </div>

        <SelectField
          icon={<Home size={16} strokeWidth={1.25} />}
          label="Tipo"
          value={filters.type}
          options={PROPERTY_TYPES}
          onChange={set("type")}
        />

        <SelectField
          icon={<DollarSign size={16} strokeWidth={1.25} />}
          label="Valor Mínimo"
          value={PRICE_RANGES.find((p) => p.value === filters.minPrice)?.label ?? "Sem limite"}
          options={PRICE_RANGES.map((p) => p.label)}
          onChange={(v) => set("minPrice")(PRICE_RANGES.find((p) => p.label === v)?.value ?? "")}
        />

        <SelectField
          icon={<DollarSign size={16} strokeWidth={1.25} />}
          label="Valor Máximo"
          value={PRICE_RANGES.find((p) => p.value === filters.maxPrice)?.label ?? "Sem limite"}
          options={PRICE_RANGES.map((p) => p.label)}
          onChange={(v) => set("maxPrice")(PRICE_RANGES.find((p) => p.label === v)?.value ?? "")}
        />
      </div>

      {/* Expanded filters */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden border-t border-white/10"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-white/10">
              <SelectField
                icon={<MapPin size={16} strokeWidth={1.25} />}
                label="Cidade"
                value={filters.city}
                options={CITIES}
                onChange={set("city")}
              />
              <SelectField
                icon={<MapPin size={16} strokeWidth={1.25} />}
                label="Bairro"
                value={filters.neighborhood}
                options={NEIGHBORHOODS}
                onChange={set("neighborhood")}
              />
              <SelectField
                icon={<Home size={16} strokeWidth={1.25} />}
                label="Dormitórios"
                value={filters.bedrooms}
                options={BEDROOMS}
                onChange={set("bedrooms")}
              />
            </div>

            {/* Checkboxes */}
            <div className="flex gap-6 px-4 py-3 border-t border-white/10">
              {[
                { label: "Visita Virtual", key: "virtualTour" },
                { label: "Vídeo", key: "video" },
                { label: "Vista Mar", key: "seaView" },
                { label: "Heliponto", key: "helipad" },
              ].map((item) => (
                <label key={item.key} className="flex items-center gap-2 cursor-pointer group">
                  <span className="w-4 h-4 border border-stone-700 group-hover:border-gold-400 transition-colors duration-200 flex items-center justify-center">
                    <span className="hidden group-hover:block w-2 h-2 bg-gold-400" />
                  </span>
                  <span className="font-sans text-xs text-stone-400 group-hover:text-stone-200 transition-colors duration-200 tracking-wide">
                    {item.label}
                  </span>
                </label>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Actions */}
      <div className="flex items-center justify-between border-t border-white/10 px-4 py-3">
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          className="flex items-center gap-2 font-sans text-xs tracking-[0.15em] uppercase text-stone-500 hover:text-gold-400 transition-colors duration-200"
        >
          <SlidersHorizontal size={14} strokeWidth={1.25} />
          {expanded ? "Menos filtros" : "Mais filtros"}
        </button>

        <button
          type="submit"
          className="flex items-center gap-3 bg-gold-400 hover:bg-gold-300 text-stone-950 px-8 py-3 font-sans text-xs font-600 tracking-[0.25em] uppercase transition-all duration-300 group"
        >
          <Search size={14} strokeWidth={2} />
          Buscar
        </button>
      </div>
    </div>
  );
}
