"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Bed, Bath, Car, Square, Heart, ExternalLink, Plane } from "lucide-react";
import { cn, formatPrice } from "@/lib/utils";
import type { Property } from "@/types/property";

const TAG_STYLES: Record<string, string> = {
  SIGNATURE:  "bg-gold-400 text-stone-950",
  DESTAQUE:   "border border-gold-400/60 text-gold-400",
  EXCLUSIVO:  "border border-stone-200/30 text-stone-200",
  NOVO:       "bg-stone-200/10 text-stone-200",
};

interface PropertyCardProps {
  property: Property;
  size?: "default" | "large" | "small";
  index?: number;
}

export default function PropertyCard({ property, size = "default", index = 0 }: PropertyCardProps) {
  const [liked, setLiked] = useState(false);
  const [hovered, setHovered] = useState(false);

  const image = property.images[0];
  const isLarge = size === "large";

  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{
        delay: index * 0.08,
        duration: 0.7,
        ease: [0.16, 1, 0.3, 1],
      }}
      whileHover={{ y: -4 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className={cn(
        "group relative flex flex-col bg-stone-900 overflow-hidden cursor-pointer",
        "border border-stone-800/60 hover:border-gold-400/30",
        "shadow-card hover:shadow-card-hover transition-all duration-700"
      )}
    >
      {/* Image */}
      <div
        className={cn(
          "relative overflow-hidden",
          isLarge ? "aspect-[16/9]" : "aspect-[4/3]"
        )}
      >
        {image && (
          <motion.div
            animate={{ scale: hovered ? 1.08 : 1 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="w-full h-full"
          >
            <Image
              src={image.url}
              alt={image.alt}
              fill
              sizes={isLarge ? "(max-width: 768px) 100vw, 66vw" : "(max-width: 768px) 100vw, 33vw"}
              className="object-cover"
              placeholder={image.blurDataUrl ? "blur" : "empty"}
              blurDataURL={image.blurDataUrl}
            />
          </motion.div>
        )}

        {/* Overlay — always present, intensifies on hover */}
        <div className="absolute inset-0 bg-card-overlay transition-opacity duration-500 opacity-70 group-hover:opacity-90" />

        {/* Specs reveal from bottom */}
        <motion.div
          initial={{ y: "100%", opacity: 0 }}
          animate={hovered ? { y: 0, opacity: 1 } : { y: "100%", opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="absolute bottom-0 inset-x-0 p-5 pb-4"
        >
          <div className="flex items-center gap-4 text-stone-200">
            <span className="flex items-center gap-1.5 font-sans text-xs tracking-wide">
              <Bed size={13} strokeWidth={1.25} className="text-gold-400" />
              {property.specs.suites} Suítes
            </span>
            <span className="flex items-center gap-1.5 font-sans text-xs tracking-wide">
              <Car size={13} strokeWidth={1.25} className="text-gold-400" />
              {property.specs.parkingSpots} Vagas
            </span>
            {property.specs.hasHelipad && (
              <span className="flex items-center gap-1.5 font-sans text-xs tracking-wide">
                <Plane size={13} strokeWidth={1.25} className="text-gold-400" />
                Heliponto
              </span>
            )}
          </div>
          <div className="h-px bg-gold-400/30 my-3" />
          <p className="font-sans text-xs text-stone-400 leading-relaxed line-clamp-2">
            {property.description.slice(0, 90)}...
          </p>
        </motion.div>

        {/* Top controls */}
        <div className="absolute top-4 inset-x-4 flex justify-between items-start z-10">
          {/* Tag */}
          {property.tag && (
            <span
              className={cn(
                "font-sans text-[10px] tracking-[0.25em] uppercase px-3 py-1.5",
                TAG_STYLES[property.tag] ?? TAG_STYLES.DESTAQUE
              )}
            >
              {property.tag}
            </span>
          )}

          {/* Status badge */}
          <span className="ml-auto mr-2 font-sans text-[10px] tracking-[0.2em] uppercase px-3 py-1.5 bg-stone-950/70 text-stone-300">
            {property.status === "venda" ? "Venda" : property.status === "aluguel" ? "Aluguel" : "Lançamento"}
          </span>

          {/* Favourite */}
          <button
            onClick={(e) => { e.preventDefault(); setLiked((v) => !v); }}
            aria-label={liked ? "Remover dos favoritos" : "Adicionar aos favoritos"}
            className="w-8 h-8 flex items-center justify-center bg-stone-950/60 hover:bg-stone-950/90 transition-colors duration-200"
          >
            <Heart
              size={14}
              strokeWidth={1.25}
              className={cn("transition-colors duration-200", liked ? "fill-gold-400 text-gold-400" : "text-stone-300")}
            />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-5">
        {/* Code */}
        <span className="font-sans text-[10px] tracking-[0.25em] uppercase text-stone-600 mb-2">
          Cód.: {property.code}
        </span>

        {/* Title */}
        <h3 className={cn(
          "font-display font-500 text-stone-100 leading-snug mb-2 line-clamp-2 group-hover:text-gold-400 transition-colors duration-300",
          isLarge ? "text-xl" : "text-base"
        )}>
          {property.title}
        </h3>

        {/* Address */}
        <p className="font-sans text-xs text-stone-500 tracking-wide mb-4">
          {property.address.neighborhood} — {property.address.city}
        </p>

        <div className="gold-divider mb-4" />

        {/* Specs row */}
        <div className="flex items-center gap-5 mb-5">
          <span className="flex items-center gap-1.5 font-sans text-xs text-stone-400">
            <Bed size={13} strokeWidth={1.0} className="text-gold-400/70" />
            {property.specs.bedrooms}
          </span>
          <span className="flex items-center gap-1.5 font-sans text-xs text-stone-400">
            <Bath size={13} strokeWidth={1.0} className="text-gold-400/70" />
            {property.specs.bathrooms}
          </span>
          <span className="flex items-center gap-1.5 font-sans text-xs text-stone-400">
            <Square size={13} strokeWidth={1.0} className="text-gold-400/70" />
            {property.specs.usableArea}m²
          </span>
          <span className="flex items-center gap-1.5 font-sans text-xs text-stone-400">
            <Car size={13} strokeWidth={1.0} className="text-gold-400/70" />
            {property.specs.parkingSpots}
          </span>
        </div>

        {/* Price + CTA */}
        <div className="flex items-end justify-between mt-auto">
          <div>
            <span className="block font-sans text-[10px] tracking-[0.15em] uppercase text-stone-600 mb-0.5">
              {property.status === "aluguel" ? "Aluguel" : "Valor"}
            </span>
            <span className={cn(
              "font-display font-600 text-gold-400",
              isLarge ? "text-2xl" : "text-xl"
            )}>
              {formatPrice(property.price)}
            </span>
            {property.status === "aluguel" && (
              <span className="font-sans text-xs text-stone-500">/mês</span>
            )}
          </div>

          <Link
            href={`/imoveis/${property.slug}`}
            className="flex items-center gap-2 px-4 py-2 border border-stone-700 hover:border-gold-400 text-stone-400 hover:text-gold-400 transition-all duration-300 group/btn"
          >
            <span className="font-sans text-xs tracking-[0.2em] uppercase">Detalhes</span>
            <ExternalLink size={11} strokeWidth={1.25} className="transition-transform duration-200 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
          </Link>
        </div>
      </div>
    </motion.article>
  );
}
