"use client";

import { useState, useCallback, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, Grid3X3, Maximize2 } from "lucide-react";
import type { PropertyImage } from "@/types/property";
import { cn } from "@/lib/utils";

interface PropertyGalleryProps {
  images: PropertyImage[];
  title: string;
}

export default function PropertyGallery({ images, title }: PropertyGalleryProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [gridOpen, setGridOpen] = useState(false);

  const total = images.length;

  const prev = useCallback(() => setActiveIndex((i) => (i - 1 + total) % total), [total]);
  const next = useCallback(() => setActiveIndex((i) => (i + 1) % total), [total]);

  useEffect(() => {
    if (!lightboxOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft")  prev();
      if (e.key === "ArrowRight") next();
      if (e.key === "Escape")     setLightboxOpen(false);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [lightboxOpen, prev, next]);

  const openLightbox = (i: number) => {
    setActiveIndex(i);
    setLightboxOpen(true);
    setGridOpen(false);
  };

  return (
    <>
      {/* Gallery grid */}
      <div className="grid grid-cols-4 grid-rows-2 gap-2 h-[520px]">
        {/* Main image */}
        <motion.div
          layoutId={`gallery-img-0`}
          className="col-span-2 row-span-2 relative overflow-hidden cursor-pointer group"
          onClick={() => openLightbox(0)}
        >
          <Image
            src={images[0]?.url ?? ""}
            alt={images[0]?.alt ?? title}
            fill
            priority
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            placeholder={images[0]?.blurDataUrl ? "blur" : "empty"}
            blurDataURL={images[0]?.blurDataUrl}
          />
          <div className="absolute inset-0 bg-stone-950/0 group-hover:bg-stone-950/20 transition-colors duration-500" />
        </motion.div>

        {/* Secondary images */}
        {images.slice(1, 4).map((img, i) => (
          <motion.div
            key={i + 1}
            layoutId={`gallery-img-${i + 1}`}
            className="relative overflow-hidden cursor-pointer group"
            onClick={() => openLightbox(i + 1)}
          >
            <Image
              src={img.url}
              alt={img.alt}
              fill
              sizes="25vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              placeholder={img.blurDataUrl ? "blur" : "empty"}
              blurDataURL={img.blurDataUrl}
            />
            <div className="absolute inset-0 bg-stone-950/0 group-hover:bg-stone-950/20 transition-colors duration-500" />

            {/* "Ver todas" overlay on last visible */}
            {i === 2 && total > 4 && (
              <button
                onClick={(e) => { e.stopPropagation(); setGridOpen(true); }}
                className="absolute inset-0 flex flex-col items-center justify-center bg-stone-950/70 hover:bg-stone-950/80 transition-colors duration-300 group/btn"
              >
                <Grid3X3 size={22} strokeWidth={1.25} className="text-gold-400 mb-2" />
                <span className="font-sans text-sm text-stone-200 tracking-[0.15em]">
                  Ver todas
                </span>
                <span className="font-sans text-xs text-stone-400 mt-0.5">
                  +{total - 4} fotos
                </span>
              </button>
            )}
          </motion.div>
        ))}

        {/* Expand button */}
        <button
          onClick={() => openLightbox(0)}
          className="absolute bottom-4 right-4 z-10 flex items-center gap-2 glass border border-stone-700 px-3 py-2 text-stone-300 hover:text-gold-400 hover:border-gold-400/50 transition-all duration-300"
          aria-label="Ver em tela cheia"
        >
          <Maximize2 size={14} strokeWidth={1.25} />
          <span className="font-sans text-xs tracking-[0.15em]">Tela cheia</span>
        </button>
      </div>

      {/* Thumbnails strip */}
      <div className="flex gap-2 mt-2 overflow-x-auto pb-1 scrollbar-hide">
        {images.map((img, i) => (
          <button
            key={i}
            onClick={() => openLightbox(i)}
            className={cn(
              "relative shrink-0 w-16 h-12 overflow-hidden border-2 transition-all duration-200",
              activeIndex === i ? "border-gold-400" : "border-transparent hover:border-stone-600"
            )}
          >
            <Image src={img.url} alt={img.alt} fill className="object-cover" sizes="64px" />
          </button>
        ))}
      </div>

      {/* Full-screen lightbox */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="fixed inset-0 z-[100] bg-stone-950/97 flex flex-col"
          >
            {/* Lightbox header */}
            <div className="flex items-center justify-between px-6 py-4 shrink-0">
              <span className="font-sans text-sm text-stone-400">
                <span className="text-gold-400 font-500">{activeIndex + 1}</span>
                <span className="mx-2">/</span>
                {total}
              </span>
              <span className="font-sans text-xs tracking-[0.2em] uppercase text-stone-500 text-center flex-1">
                {title}
              </span>
              <button
                onClick={() => setLightboxOpen(false)}
                aria-label="Fechar"
                className="w-9 h-9 border border-stone-700 hover:border-gold-400/50 flex items-center justify-center text-stone-400 hover:text-gold-400 transition-all duration-200"
              >
                <X size={16} strokeWidth={1.25} />
              </button>
            </div>

            {/* Main image */}
            <div className="relative flex-1 flex items-center justify-center px-16">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  layoutId={`gallery-img-${activeIndex}`}
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  className="relative w-full h-full max-h-[72vh]"
                >
                  <Image
                    src={images[activeIndex]?.url ?? ""}
                    alt={images[activeIndex]?.alt ?? ""}
                    fill
                    className="object-contain"
                    sizes="100vw"
                    priority
                  />
                </motion.div>
              </AnimatePresence>

              {/* Nav arrows */}
              <button
                onClick={prev}
                aria-label="Foto anterior"
                className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 glass border border-stone-700 hover:border-gold-400/50 flex items-center justify-center text-stone-400 hover:text-gold-400 transition-all duration-200"
              >
                <ChevronLeft size={20} strokeWidth={1.25} />
              </button>
              <button
                onClick={next}
                aria-label="Próxima foto"
                className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 glass border border-stone-700 hover:border-gold-400/50 flex items-center justify-center text-stone-400 hover:text-gold-400 transition-all duration-200"
              >
                <ChevronRight size={20} strokeWidth={1.25} />
              </button>
            </div>

            {/* Thumbnail strip */}
            <div className="flex gap-2 justify-center px-6 py-4 overflow-x-auto shrink-0">
              {images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveIndex(i)}
                  className={cn(
                    "relative shrink-0 w-16 h-11 overflow-hidden border-2 transition-all duration-200",
                    i === activeIndex ? "border-gold-400" : "border-stone-800 hover:border-stone-600"
                  )}
                >
                  <Image src={img.url} alt="" fill className="object-cover" sizes="64px" />
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Grid view */}
      <AnimatePresence>
        {gridOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-stone-950/97 overflow-y-auto"
          >
            <div className="sticky top-0 z-10 flex items-center justify-between px-6 py-4 bg-stone-950/90 backdrop-blur-sm border-b border-stone-800">
              <span className="font-sans text-sm text-stone-400">{total} fotos</span>
              <button
                onClick={() => setGridOpen(false)}
                className="w-9 h-9 border border-stone-700 hover:border-gold-400/50 flex items-center justify-center text-stone-400 hover:text-gold-400 transition-all"
              >
                <X size={16} strokeWidth={1.25} />
              </button>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2 p-4">
              {images.map((img, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.04 }}
                  className="relative aspect-[4/3] overflow-hidden cursor-pointer group"
                  onClick={() => openLightbox(i)}
                >
                  <Image
                    src={img.url}
                    alt={img.alt}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="33vw"
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
