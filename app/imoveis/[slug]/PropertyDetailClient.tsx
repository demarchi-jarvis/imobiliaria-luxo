"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  ArrowLeft, Bed, Bath, Car, Square, Maximize, MapPin,
  Phone, MessageCircle, Share2, Heart, CheckCircle2,
  Heater, Waves, Dumbbell, Wind, PawPrint, Building2
} from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PropertyGallery from "@/components/sections/PropertyGallery";
import PropertyMap from "@/components/ui/PropertyMap";
import PropertyCard from "@/components/ui/PropertyCard";
import SchedulingForm from "@/components/ui/SchedulingForm";
import WhatsAppConcierge from "@/components/ui/WhatsAppConcierge";
import type { Property } from "@/types/property";
import { cn, formatPrice, buildPropertyWhatsAppLink } from "@/lib/utils";

const AMENITY_ICONS: Record<string, React.ReactNode> = {
  hasPool:      <Waves     size={16} strokeWidth={1.0} />,
  hasGym:       <Dumbbell  size={16} strokeWidth={1.0} />,
  hasHelipad:   <Heater    size={16} strokeWidth={1.0} />,
  hasSauna:     <Wind      size={16} strokeWidth={1.0} />,
  hasConcierge: <Building2 size={16} strokeWidth={1.0} />,
  petFriendly:  <PawPrint  size={16} strokeWidth={1.0} />,
  hasSeaView:   <Maximize  size={16} strokeWidth={1.0} />,
};

const AMENITY_LABELS: Record<string, string> = {
  hasPool:      "Piscina Privativa",
  hasGym:       "Academia",
  hasHelipad:   "Heliponto",
  hasSauna:     "Sauna",
  hasConcierge: "Concierge 24h",
  petFriendly:  "Pet Friendly",
  hasSeaView:   "Vista Mar",
};

interface Props {
  property:  Property;
  related:   Property[];
  siteUrl:   string;
}

export default function PropertyDetailClient({ property, related, siteUrl }: Props) {
  const [liked, setLiked]     = useState(false);
  const [copied, setCopied]   = useState(false);
  const heroRef               = useRef<HTMLDivElement>(null);
  const { scrollYProgress }   = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const bgY                   = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const heroOpacity           = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  const propertyUrl    = `${siteUrl}/imoveis/${property.slug}`;
  const whatsappLink   = buildPropertyWhatsAppLink(
    property.agent?.whatsapp ?? "5521999999999",
    property.title,
    propertyUrl
  );

  const activeAmenities = Object.entries(AMENITY_LABELS).filter(
    ([key]) => property.specs[key as keyof typeof property.specs]
  );

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(propertyUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      if (navigator.share) {
        navigator.share({ title: property.title, url: propertyUrl });
      }
    }
  };

  return (
    <main className="bg-stone-950 min-h-screen">
      <Navbar />

      {/* ── Hero image ────────────────────────────────────────── */}
      <div ref={heroRef} className="relative h-[70vh] overflow-hidden">
        <motion.div className="absolute inset-0" style={{ y: bgY }}>
          {property.images[0] && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={property.images[0].url}
              alt={property.images[0].alt}
              className="w-full h-full object-cover scale-110"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/40 to-transparent" />
        </motion.div>

        {/* Breadcrumb + controls */}
        <motion.div
          style={{ opacity: heroOpacity }}
          className="absolute top-28 inset-x-0 z-10 max-w-7xl mx-auto px-6 flex items-center justify-between"
        >
          <Link
            href="/imoveis"
            className="flex items-center gap-2 glass border border-stone-700/60 px-4 py-2 text-stone-300 hover:text-gold-400 hover:border-gold-400/40 transition-all duration-300"
          >
            <ArrowLeft size={14} strokeWidth={1.25} />
            <span className="font-sans text-xs tracking-[0.15em] uppercase">Voltar</span>
          </Link>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setLiked((v) => !v)}
              aria-label="Favoritar"
              className="w-10 h-10 glass border border-stone-700/60 flex items-center justify-center hover:border-gold-400/40 transition-all duration-300"
            >
              <Heart size={15} strokeWidth={1.25} className={liked ? "fill-gold-400 text-gold-400" : "text-stone-300"} />
            </button>
            <button
              onClick={handleShare}
              aria-label="Compartilhar"
              className="w-10 h-10 glass border border-stone-700/60 flex items-center justify-center hover:border-gold-400/40 transition-all duration-300"
            >
              {copied
                ? <CheckCircle2 size={15} strokeWidth={1.25} className="text-gold-400" />
                : <Share2 size={15} strokeWidth={1.25} className="text-stone-300" />
              }
            </button>
          </div>
        </motion.div>

        {/* Tag + title overlay at bottom */}
        <div className="absolute bottom-0 inset-x-0 z-10 max-w-7xl mx-auto px-6 pb-10">
          <div className="flex items-center gap-3 mb-3">
            {property.tag && (
              <span className="font-sans text-[10px] tracking-[0.25em] uppercase px-3 py-1.5 bg-gold-400 text-stone-950">
                {property.tag}
              </span>
            )}
            <span className="font-sans text-[10px] tracking-[0.2em] uppercase text-stone-400">
              Cód: {property.code}
            </span>
          </div>
          <h1 className="font-display text-[clamp(1.5rem,3.5vw,2.8rem)] font-500 text-stone-100 leading-tight max-w-2xl">
            {property.title}
          </h1>
          <div className="flex items-center gap-2 mt-2">
            <MapPin size={13} strokeWidth={1.25} className="text-gold-400" />
            <span className="font-sans text-sm text-stone-400">
              {property.address.neighborhood} — {property.address.city}, {property.address.state}
            </span>
          </div>
        </div>
      </div>

      {/* ── Main content ──────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

          {/* Left col — main info */}
          <div className="lg:col-span-2 space-y-10">

            {/* Gallery */}
            <motion.section
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              <PropertyGallery images={property.images} title={property.title} />
            </motion.section>

            {/* Quick specs bar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.6 }}
              className="grid grid-cols-2 sm:grid-cols-4 gap-3"
            >
              {[
                { icon: <Bed size={18} strokeWidth={1.0} />,    label: "Dormitórios", value: property.specs.bedrooms },
                { icon: <Bath size={18} strokeWidth={1.0} />,   label: "Banheiros",   value: property.specs.bathrooms },
                { icon: <Car size={18} strokeWidth={1.0} />,    label: "Vagas",        value: property.specs.parkingSpots },
                { icon: <Square size={18} strokeWidth={1.0} />, label: "Área Útil",    value: `${property.specs.usableArea}m²` },
              ].map((spec) => (
                <div key={spec.label} className="flex flex-col items-center py-5 border border-stone-800 hover:border-gold-400/30 transition-colors duration-300 text-center gap-2">
                  <span className="text-gold-400">{spec.icon}</span>
                  <span className="font-display text-xl text-stone-100">{spec.value}</span>
                  <span className="font-sans text-[10px] tracking-[0.15em] uppercase text-stone-500">{spec.label}</span>
                </div>
              ))}
            </motion.div>

            {/* Description */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7 }}
            >
              <div className="flex items-center gap-4 mb-5">
                <span className="h-px w-8 bg-gold-400" />
                <h2 className="font-display text-2xl text-stone-100">Sobre o imóvel</h2>
              </div>
              <p className="font-sans text-base text-stone-400 leading-relaxed">
                {property.description}
              </p>
            </motion.section>

            {/* Amenities */}
            {activeAmenities.length > 0 && (
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.7 }}
              >
                <div className="flex items-center gap-4 mb-5">
                  <span className="h-px w-8 bg-gold-400" />
                  <h2 className="font-display text-2xl text-stone-100">Diferenciais</h2>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {activeAmenities.map(([key, label]) => (
                    <div
                      key={key}
                      className="flex items-center gap-3 p-4 border border-stone-800 hover:border-gold-400/30 transition-colors duration-300"
                    >
                      <span className="text-gold-400">{AMENITY_ICONS[key]}</span>
                      <span className="font-sans text-sm text-stone-300">{label}</span>
                    </div>
                  ))}
                </div>
              </motion.section>
            )}

            {/* Full specs */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7 }}
            >
              <div className="flex items-center gap-4 mb-5">
                <span className="h-px w-8 bg-gold-400" />
                <h2 className="font-display text-2xl text-stone-100">Especificações</h2>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: "Área total",    value: `${property.specs.totalArea}m²` },
                  { label: "Área útil",     value: `${property.specs.usableArea}m²` },
                  { label: "Dormitórios",   value: property.specs.bedrooms },
                  { label: "Suítes",        value: property.specs.suites },
                  { label: "Banheiros",     value: property.specs.bathrooms },
                  { label: "Vagas",         value: property.specs.parkingSpots },
                  ...(property.specs.floors ? [{ label: "Andares", value: property.specs.floors }] : []),
                  { label: "Finalidade",    value: property.status === "venda" ? "Venda" : "Aluguel" },
                  ...(property.condoFee ? [{ label: "Condomínio", value: formatPrice(property.condoFee) + "/mês" }] : []),
                  ...(property.iptu ? [{ label: "IPTU", value: formatPrice(property.iptu) + "/ano" }] : []),
                ].map((row) => (
                  <div key={row.label} className="flex justify-between items-center py-3 border-b border-stone-800/60">
                    <span className="font-sans text-sm text-stone-500">{row.label}</span>
                    <span className="font-sans text-sm text-stone-200 font-500">{String(row.value)}</span>
                  </div>
                ))}
              </div>
            </motion.section>

            {/* Map */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7 }}
            >
              <div className="flex items-center gap-4 mb-5">
                <span className="h-px w-8 bg-gold-400" />
                <h2 className="font-display text-2xl text-stone-100">Localização</h2>
              </div>
              <PropertyMap
                lat={property.address.lat ?? -22.9068}
                lng={property.address.lng ?? -43.1729}
                title={property.title}
                neighborhood={property.address.neighborhood}
              />
            </motion.section>

            {/* Scheduling */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7 }}
              id="agendar"
            >
              <div className="flex items-center gap-4 mb-5">
                <span className="h-px w-8 bg-gold-400" />
                <h2 className="font-display text-2xl text-stone-100">Agendar Visita</h2>
              </div>
              <SchedulingForm
                propertyTitle={property.title}
                agentWhatsapp={property.agent?.whatsapp ?? "5521999999999"}
                propertyUrl={propertyUrl}
              />
            </motion.section>
          </div>

          {/* Right col — sticky price card */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-4">
              {/* Price card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.7 }}
                className="glass-premium border border-stone-700/60 p-6"
              >
                <span className="font-sans text-[10px] tracking-[0.2em] uppercase text-stone-500 block mb-1">
                  {property.status === "venda" ? "Valor de venda" : "Aluguel mensal"}
                </span>
                <span className="font-display text-3xl font-500 text-gold-400 block mb-1">
                  {formatPrice(property.price)}
                </span>
                {property.status === "aluguel" && (
                  <span className="font-sans text-xs text-stone-500">/mês</span>
                )}

                <div className="gold-divider my-5" />

                {property.condoFee && (
                  <div className="flex justify-between mb-2">
                    <span className="font-sans text-xs text-stone-500">Condomínio</span>
                    <span className="font-sans text-xs text-stone-300">{formatPrice(property.condoFee)}/mês</span>
                  </div>
                )}
                {property.iptu && (
                  <div className="flex justify-between mb-5">
                    <span className="font-sans text-xs text-stone-500">IPTU</span>
                    <span className="font-sans text-xs text-stone-300">{formatPrice(property.iptu)}/ano</span>
                  </div>
                )}

                {/* CTAs */}
                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 bg-[#25D366] hover:bg-[#20ba58] text-white font-sans text-xs font-600 tracking-[0.2em] uppercase flex items-center justify-center gap-3 transition-colors duration-300 mb-3"
                >
                  <MessageCircle size={15} strokeWidth={1.5} />
                  Falar no WhatsApp
                </a>

                <a
                  href="#agendar"
                  className="w-full py-3.5 border border-gold-400/60 text-gold-400 hover:bg-gold-400/10 font-sans text-xs tracking-[0.2em] uppercase flex items-center justify-center gap-3 transition-all duration-300 mb-3"
                >
                  <Bed size={14} strokeWidth={1.25} />
                  Agendar Visita
                </a>

                <a
                  href={`tel:${property.agent?.phone ?? ""}`}
                  className="w-full py-3 border border-stone-700 text-stone-400 hover:border-stone-500 hover:text-stone-200 font-sans text-xs tracking-[0.2em] uppercase flex items-center justify-center gap-3 transition-all duration-300"
                >
                  <Phone size={14} strokeWidth={1.25} />
                  Ligar agora
                </a>
              </motion.div>

              {/* Agent card */}
              {property.agent && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.35, duration: 0.7 }}
                  className="glass border border-stone-800/60 p-5"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-stone-800 border border-stone-700 flex items-center justify-center text-gold-400 font-display text-xl">
                      {property.agent.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-sans text-sm font-500 text-stone-200">{property.agent.name}</p>
                      <p className="font-sans text-xs text-stone-500">{property.agent.creci}</p>
                    </div>
                  </div>
                  <p className="font-sans text-xs text-stone-500 leading-relaxed mb-4">
                    Especialista em imóveis de alto padrão no Rio de Janeiro. Disponível 7 dias por semana.
                  </p>
                  <a
                    href={whatsappLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-[#25D366] hover:text-[#20ba58] transition-colors duration-200 font-sans text-sm"
                  >
                    <MessageCircle size={14} strokeWidth={1.25} />
                    Enviar mensagem
                  </a>
                </motion.div>
              )}
            </div>
          </div>
        </div>

        {/* Related properties */}
        {related.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8 }}
            className="mt-20"
          >
            <div className="flex items-center gap-4 mb-8">
              <span className="h-px w-8 bg-gold-400" />
              <h2 className="font-display text-2xl text-stone-100">Imóveis relacionados</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {related.map((p, i) => (
                <PropertyCard key={p.id} property={p} index={i} />
              ))}
            </div>
          </motion.section>
        )}
      </div>

      <Footer />
      <WhatsAppConcierge />
    </main>
  );
}
