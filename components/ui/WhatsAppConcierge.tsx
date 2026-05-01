"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, ChevronRight } from "lucide-react";
import { buildWhatsAppLink } from "@/lib/utils";

const WHATSAPP_NUMBER = "5521999887766";
const DEFAULT_MESSAGE = "Olá! Gostaria de informações sobre os imóveis de luxo disponíveis.";

const QUICK_OPTIONS = [
  { label: "Quero comprar um imóvel",  msg: "Olá! Tenho interesse em comprar um imóvel de luxo. Pode me ajudar?" },
  { label: "Quero alugar um imóvel",   msg: "Olá! Tenho interesse em alugar um imóvel de luxo. Pode me ajudar?" },
  { label: "Quero avaliar meu imóvel", msg: "Olá! Gostaria de avaliar meu imóvel para venda. Como funciona?" },
  { label: "Falar com um especialista", msg: DEFAULT_MESSAGE },
];

export default function WhatsAppConcierge() {
  const [open, setOpen] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 3000);
    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {/* Panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="glass-premium border border-white/10 w-80 shadow-gold overflow-hidden"
          >
            {/* Header */}
            <div className="bg-[#128C7E]/20 border-b border-white/10 px-5 py-4 flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 bg-[#128C7E]/30 border border-[#128C7E]/50 flex items-center justify-center">
                  <MessageCircle size={18} strokeWidth={1.25} className="text-[#25D366]" />
                </div>
                <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-[#25D366] rounded-full border-2 border-stone-900" />
              </div>
              <div>
                <p className="font-sans text-sm font-500 text-stone-100">Concierge Digital</p>
                <p className="font-sans text-[11px] text-stone-400">Respondemos em minutos</p>
              </div>
            </div>

            {/* Greeting bubble */}
            <div className="px-5 py-4">
              <div className="bg-stone-800/60 rounded-none p-3 mb-4">
                <p className="font-sans text-sm text-stone-300 leading-relaxed">
                  Olá! 👋 Sou seu concierge digital.<br />
                  Como posso ajudá-lo hoje?
                </p>
                <span className="font-sans text-[10px] text-stone-600 mt-1 block">agora</span>
              </div>

              {/* Quick options */}
              <div className="flex flex-col gap-2">
                {QUICK_OPTIONS.map((opt) => (
                  <a
                    key={opt.label}
                    href={buildWhatsAppLink(WHATSAPP_NUMBER, opt.msg)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between px-4 py-3 border border-stone-700/60 hover:border-gold-400/50 hover:bg-gold-400/5 text-stone-300 hover:text-gold-400 transition-all duration-200 group"
                  >
                    <span className="font-sans text-xs leading-snug">{opt.label}</span>
                    <ChevronRight size={13} strokeWidth={1.25} className="shrink-0 ml-2 transition-transform duration-200 group-hover:translate-x-0.5" />
                  </a>
                ))}
              </div>
            </div>

            {/* Footer */}
            <div className="px-5 pb-4">
              <p className="font-sans text-[10px] text-stone-600 text-center tracking-wide">
                Powered by WhatsApp Business
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating button */}
      <div className="relative">
        {/* Ripple rings */}
        {!open && (
          <>
            <motion.span
              animate={{ scale: [1, 1.8], opacity: [0.3, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
              className="absolute inset-0 rounded-full bg-[#25D366]/30"
            />
            <motion.span
              animate={{ scale: [1, 2.2], opacity: [0.2, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeOut", delay: 0.5 }}
              className="absolute inset-0 rounded-full bg-[#25D366]/20"
            />
          </>
        )}

        {/* Tooltip */}
        <AnimatePresence>
          {!open && (
            <motion.div
              initial={{ opacity: 0, x: 8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 8 }}
              transition={{ delay: 1, duration: 0.4 }}
              className="absolute right-full mr-3 top-1/2 -translate-y-1/2 glass border border-stone-700 px-3 py-2 whitespace-nowrap pointer-events-none"
            >
              <p className="font-sans text-xs text-stone-200">Fale com nosso concierge</p>
              <span className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-full border-4 border-transparent border-l-stone-700/60" />
            </motion.div>
          )}
        </AnimatePresence>

        <motion.button
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.94 }}
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Fechar concierge" : "Abrir concierge WhatsApp"}
          className="relative w-14 h-14 bg-[#25D366] hover:bg-[#20ba58] flex items-center justify-center shadow-[0_4px_24px_rgba(37,211,102,0.35)] transition-colors duration-300"
        >
          <AnimatePresence mode="wait">
            {open ? (
              <motion.div
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <X size={22} strokeWidth={2} className="text-white" />
              </motion.div>
            ) : (
              <motion.div
                key="whatsapp"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <MessageCircle size={24} strokeWidth={1.5} className="text-white" />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>
      </div>
    </div>
  );
}
