"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { DayPicker } from "react-day-picker";
import { ptBR } from "date-fns/locale";
import { format, addDays, isSunday, isBefore, startOfToday } from "date-fns";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Calendar, Clock, User, Phone, Mail, MessageSquare, CheckCircle, ChevronRight, ChevronLeft } from "lucide-react";
import { cn, buildWhatsAppLink } from "@/lib/utils";

// ─── Zod schema ────────────────────────────────────────────────────────────────

const schema = z.object({
  name:    z.string().min(3, "Nome muito curto"),
  phone:   z.string().min(10, "Telefone inválido").regex(/^[\d\s()\-+]+$/, "Formato inválido"),
  email:   z.string().email("E-mail inválido"),
  message: z.string().optional(),
});
type FormData = z.infer<typeof schema>;

// ─── Time slots ────────────────────────────────────────────────────────────────

const TIME_SLOTS = [
  "09:00", "10:00", "11:00", "12:00",
  "14:00", "15:00", "16:00", "17:00", "18:00",
];

// Mock booked slots (in production, fetch from API)
const BOOKED_SLOTS: Record<string, string[]> = {
  [format(addDays(new Date(), 1), "yyyy-MM-dd")]: ["10:00", "14:00"],
  [format(addDays(new Date(), 2), "yyyy-MM-dd")]: ["09:00", "15:00", "16:00"],
};

// ─── Steps ─────────────────────────────────────────────────────────────────────

type Step = "date" | "time" | "form" | "confirm";

const STEPS: { key: Step; label: string }[] = [
  { key: "date",    label: "Data" },
  { key: "time",    label: "Horário" },
  { key: "form",    label: "Seus dados" },
  { key: "confirm", label: "Confirmado" },
];

interface SchedulingFormProps {
  propertyTitle: string;
  agentWhatsapp: string;
  propertyUrl: string;
}

export default function SchedulingForm({ propertyTitle, agentWhatsapp, propertyUrl }: SchedulingFormProps) {
  const [step, setStep]         = useState<Step>("date");
  const [selectedDay, setDay]   = useState<Date | undefined>();
  const [selectedTime, setTime] = useState<string | undefined>();

  const { register, handleSubmit, formState: { errors }, getValues } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const today   = startOfToday();
  const stepIdx = STEPS.findIndex((s) => s.key === step);

  const bookedForDay = selectedDay
    ? BOOKED_SLOTS[format(selectedDay, "yyyy-MM-dd")] ?? []
    : [];

  const isDisabled = (day: Date) => isBefore(day, today) || isSunday(day);

  const buildConfirmationMessage = (data: FormData) => {
    const dayStr  = selectedDay ? format(selectedDay, "EEEE, dd 'de' MMMM 'de' yyyy", { locale: ptBR }) : "";
    return `Olá! Gostaria de agendar uma visita.\n\n` +
      `🏠 *Imóvel:* ${propertyTitle}\n` +
      `🔗 ${propertyUrl}\n\n` +
      `📅 *Data:* ${dayStr}\n` +
      `⏰ *Horário:* ${selectedTime}\n\n` +
      `👤 *Nome:* ${data.name}\n` +
      `📞 *Telefone:* ${data.phone}\n` +
      `📧 *E-mail:* ${data.email}\n` +
      (data.message ? `\n💬 *Observações:* ${data.message}` : "");
  };

  const onSubmit = (data: FormData) => {
    const msg  = buildConfirmationMessage(data);
    const link = buildWhatsAppLink(agentWhatsapp, msg);
    window.open(link, "_blank", "noopener,noreferrer");
    setStep("confirm");
  };

  // Variants
  const slide = {
    initial: { opacity: 0, x: 24 },
    animate: { opacity: 1, x: 0 },
    exit:    { opacity: 0, x: -24 },
    transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] },
  };

  return (
    <div className="bg-stone-900 border border-stone-800">
      {/* Step indicator */}
      <div className="flex border-b border-stone-800">
        {STEPS.map((s, i) => (
          <div
            key={s.key}
            className={cn(
              "flex-1 py-3 flex flex-col items-center gap-1 border-b-2 transition-all duration-300",
              i < stepIdx
                ? "border-gold-400/60 opacity-60"
                : i === stepIdx
                  ? "border-gold-400"
                  : "border-transparent opacity-30"
            )}
          >
            <span className={cn(
              "w-6 h-6 rounded-full border flex items-center justify-center font-sans text-xs transition-all duration-300",
              i < stepIdx ? "border-gold-400/60 text-gold-400/60 bg-gold-400/10" :
              i === stepIdx ? "border-gold-400 text-gold-400 bg-gold-400/15" :
              "border-stone-700 text-stone-600"
            )}>
              {i < stepIdx ? "✓" : i + 1}
            </span>
            <span className="font-sans text-[10px] tracking-[0.15em] uppercase hidden sm:block">
              {s.label}
            </span>
          </div>
        ))}
      </div>

      {/* Step content */}
      <div className="p-6 min-h-[380px]">
        <AnimatePresence mode="wait">

          {/* Step 1: Date */}
          {step === "date" && (
            <motion.div key="date" {...slide}>
              <div className="flex items-center gap-3 mb-5">
                <Calendar size={16} strokeWidth={1.25} className="text-gold-400" />
                <h3 className="font-display text-xl text-stone-100">Escolha uma data</h3>
              </div>

              <DayPicker
                mode="single"
                selected={selectedDay}
                onSelect={setDay}
                locale={ptBR}
                disabled={isDisabled}
                fromDate={today}
                toDate={addDays(today, 90)}
                showOutsideDays={false}
                classNames={{
                  months:  "flex flex-col",
                  month:   "space-y-3",
                  caption: "flex justify-between items-center px-1 mb-2",
                  caption_label: "font-display text-base text-stone-200 capitalize",
                  nav:     "flex gap-2",
                  nav_button: "w-8 h-8 border border-stone-700 hover:border-gold-400/50 flex items-center justify-center text-stone-400 hover:text-gold-400 transition-all duration-200",
                  table:   "w-full border-collapse",
                  head_row: "flex mb-1",
                  head_cell: "flex-1 text-center font-sans text-[10px] tracking-[0.15em] uppercase text-stone-600 py-1",
                  row:     "flex mb-1",
                  cell:    "flex-1 text-center",
                  day:     cn(
                    "w-full aspect-square flex items-center justify-center font-sans text-sm",
                    "hover:bg-gold-400/10 hover:text-gold-400 transition-all duration-150 rounded-none"
                  ),
                  day_selected: "bg-gold-400 text-stone-950 hover:bg-gold-400 hover:text-stone-950 font-600",
                  day_today:    "text-gold-400 font-600",
                  day_disabled: "text-stone-700 cursor-not-allowed hover:bg-transparent hover:text-stone-700",
                  day_outside:  "text-stone-800",
                }}
              />

              <button
                onClick={() => selectedDay && setStep("time")}
                disabled={!selectedDay}
                className={cn(
                  "mt-4 w-full py-3.5 font-sans text-xs tracking-[0.25em] uppercase flex items-center justify-center gap-3 transition-all duration-300",
                  selectedDay
                    ? "bg-gold-400 text-stone-950 hover:bg-gold-300"
                    : "bg-stone-800 text-stone-600 cursor-not-allowed"
                )}
              >
                {selectedDay
                  ? `Continuar — ${format(selectedDay, "dd/MM/yyyy")}`
                  : "Selecione uma data"}
                {selectedDay && <ChevronRight size={14} strokeWidth={2} />}
              </button>
            </motion.div>
          )}

          {/* Step 2: Time */}
          {step === "time" && (
            <motion.div key="time" {...slide}>
              <div className="flex items-center gap-3 mb-2">
                <Clock size={16} strokeWidth={1.25} className="text-gold-400" />
                <h3 className="font-display text-xl text-stone-100">Escolha o horário</h3>
              </div>
              {selectedDay && (
                <p className="font-sans text-xs text-stone-500 mb-5">
                  {format(selectedDay, "EEEE, dd 'de' MMMM", { locale: ptBR })}
                </p>
              )}

              <div className="grid grid-cols-3 gap-2">
                {TIME_SLOTS.map((slot) => {
                  const isBooked = bookedForDay.includes(slot);
                  return (
                    <button
                      key={slot}
                      disabled={isBooked}
                      onClick={() => setTime(slot)}
                      className={cn(
                        "py-3 font-sans text-sm transition-all duration-200",
                        isBooked
                          ? "bg-stone-800/40 text-stone-700 cursor-not-allowed line-through"
                          : selectedTime === slot
                            ? "bg-gold-400 text-stone-950 font-600"
                            : "border border-stone-700 text-stone-300 hover:border-gold-400/50 hover:text-gold-400"
                      )}
                    >
                      {slot}
                    </button>
                  );
                })}
              </div>

              <div className="flex gap-3 mt-5">
                <button onClick={() => setStep("date")} className="flex items-center gap-2 px-5 py-3 border border-stone-700 text-stone-400 hover:border-stone-500 transition-all duration-200 font-sans text-xs tracking-wider">
                  <ChevronLeft size={13} strokeWidth={1.5} /> Voltar
                </button>
                <button
                  onClick={() => selectedTime && setStep("form")}
                  disabled={!selectedTime}
                  className={cn(
                    "flex-1 py-3 font-sans text-xs tracking-[0.25em] uppercase flex items-center justify-center gap-3 transition-all duration-300",
                    selectedTime ? "bg-gold-400 text-stone-950 hover:bg-gold-300" : "bg-stone-800 text-stone-600 cursor-not-allowed"
                  )}
                >
                  Continuar {selectedTime && <ChevronRight size={14} strokeWidth={2} />}
                </button>
              </div>
            </motion.div>
          )}

          {/* Step 3: Form */}
          {step === "form" && (
            <motion.div key="form" {...slide}>
              <div className="flex items-center gap-3 mb-5">
                <User size={16} strokeWidth={1.25} className="text-gold-400" />
                <h3 className="font-display text-xl text-stone-100">Seus dados</h3>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                {/* Name */}
                <div>
                  <label className="block font-sans text-[10px] tracking-[0.2em] uppercase text-stone-500 mb-1.5">
                    Nome completo *
                  </label>
                  <div className="flex items-center border border-stone-700 focus-within:border-gold-400/60 transition-colors duration-200">
                    <User size={14} strokeWidth={1.25} className="ml-3 text-stone-600 shrink-0" />
                    <input
                      {...register("name")}
                      placeholder="Seu nome completo"
                      className="w-full bg-transparent px-3 py-3 font-sans text-sm text-stone-200 placeholder:text-stone-700 outline-none"
                    />
                  </div>
                  {errors.name && <p className="font-sans text-xs text-red-400 mt-1">{errors.name.message}</p>}
                </div>

                {/* Phone */}
                <div>
                  <label className="block font-sans text-[10px] tracking-[0.2em] uppercase text-stone-500 mb-1.5">
                    Telefone / WhatsApp *
                  </label>
                  <div className="flex items-center border border-stone-700 focus-within:border-gold-400/60 transition-colors duration-200">
                    <Phone size={14} strokeWidth={1.25} className="ml-3 text-stone-600 shrink-0" />
                    <input
                      {...register("phone")}
                      placeholder="(21) 99999-9999"
                      type="tel"
                      className="w-full bg-transparent px-3 py-3 font-sans text-sm text-stone-200 placeholder:text-stone-700 outline-none"
                    />
                  </div>
                  {errors.phone && <p className="font-sans text-xs text-red-400 mt-1">{errors.phone.message}</p>}
                </div>

                {/* Email */}
                <div>
                  <label className="block font-sans text-[10px] tracking-[0.2em] uppercase text-stone-500 mb-1.5">
                    E-mail *
                  </label>
                  <div className="flex items-center border border-stone-700 focus-within:border-gold-400/60 transition-colors duration-200">
                    <Mail size={14} strokeWidth={1.25} className="ml-3 text-stone-600 shrink-0" />
                    <input
                      {...register("email")}
                      placeholder="seu@email.com"
                      type="email"
                      className="w-full bg-transparent px-3 py-3 font-sans text-sm text-stone-200 placeholder:text-stone-700 outline-none"
                    />
                  </div>
                  {errors.email && <p className="font-sans text-xs text-red-400 mt-1">{errors.email.message}</p>}
                </div>

                {/* Message */}
                <div>
                  <label className="block font-sans text-[10px] tracking-[0.2em] uppercase text-stone-500 mb-1.5">
                    Observações
                  </label>
                  <div className="flex border border-stone-700 focus-within:border-gold-400/60 transition-colors duration-200">
                    <MessageSquare size={14} strokeWidth={1.25} className="ml-3 mt-3 text-stone-600 shrink-0" />
                    <textarea
                      {...register("message")}
                      placeholder="Alguma preferência de horário ou dúvida..."
                      rows={3}
                      className="w-full bg-transparent px-3 py-3 font-sans text-sm text-stone-200 placeholder:text-stone-700 outline-none resize-none"
                    />
                  </div>
                </div>

                {/* Summary */}
                <div className="glass border border-stone-700/60 p-4 space-y-1.5">
                  <p className="font-sans text-xs text-stone-500 tracking-wide">Resumo do agendamento</p>
                  <p className="font-sans text-sm text-stone-300">
                    📅 {selectedDay && format(selectedDay, "dd/MM/yyyy")} às {selectedTime}
                  </p>
                  <p className="font-sans text-xs text-stone-500 truncate">🏠 {propertyTitle}</p>
                </div>

                <div className="flex gap-3">
                  <button type="button" onClick={() => setStep("time")} className="flex items-center gap-2 px-5 py-3 border border-stone-700 text-stone-400 hover:border-stone-500 transition-all duration-200 font-sans text-xs tracking-wider">
                    <ChevronLeft size={13} strokeWidth={1.5} /> Voltar
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-3 bg-gold-400 hover:bg-gold-300 text-stone-950 font-sans text-xs font-600 tracking-[0.25em] uppercase flex items-center justify-center gap-2 transition-all duration-300"
                  >
                    Confirmar via WhatsApp
                  </button>
                </div>
              </form>
            </motion.div>
          )}

          {/* Step 4: Confirmed */}
          {step === "confirm" && (
            <motion.div key="confirm" {...slide} className="flex flex-col items-center justify-center py-10 text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 120, damping: 20, delay: 0.1 }}
                className="w-20 h-20 border-2 border-gold-400 flex items-center justify-center mb-6"
              >
                <CheckCircle size={36} strokeWidth={1.0} className="text-gold-400" />
              </motion.div>
              <h3 className="font-display text-2xl text-stone-100 mb-2">Agendamento enviado!</h3>
              <p className="font-sans text-sm text-stone-400 max-w-xs leading-relaxed mb-6">
                Sua solicitação foi enviada via WhatsApp. Nosso corretor confirmará em breve.
              </p>
              <div className="glass border border-stone-700/60 px-6 py-4 text-left w-full max-w-xs">
                <p className="font-sans text-xs text-stone-500 mb-2">Detalhes</p>
                <p className="font-sans text-sm text-stone-300">
                  {selectedDay && format(selectedDay, "dd 'de' MMMM", { locale: ptBR })} · {selectedTime}
                </p>
                <p className="font-sans text-xs text-stone-500 mt-1 truncate">{propertyTitle}</p>
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </div>
  );
}
