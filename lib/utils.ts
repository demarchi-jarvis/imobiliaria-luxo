import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(value: number): string {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
}

export function formatArea(value: number): string {
  return `${value.toLocaleString("pt-BR")}m²`;
}

export function buildWhatsAppLink(phone: string, message: string): string {
  const cleaned = phone.replace(/\D/g, "");
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${cleaned}?text=${encoded}`;
}

export function buildPropertyWhatsAppLink(
  phone: string,
  propertyTitle: string,
  propertyUrl: string
): string {
  const message = `Olá! Tenho interesse no imóvel: *${propertyTitle}*\n\n🔗 ${propertyUrl}\n\nPoderia me dar mais informações?`;
  return buildWhatsAppLink(phone, message);
}
