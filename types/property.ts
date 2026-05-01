export type PropertyType =
  | "apartamento"
  | "cobertura"
  | "casa"
  | "penthouse"
  | "terreno"
  | "comercial";

export type PropertyStatus = "venda" | "aluguel" | "lancamento";

export type PropertyTag = "DESTAQUE" | "NOVO" | "EXCLUSIVO" | "SIGNATURE";

export interface PropertyAgent {
  id: string;
  name: string;
  phone: string;
  whatsapp: string;
  photo?: string;
  creci: string;
}

export interface PropertyImage {
  url: string;
  alt: string;
  blurDataUrl?: string;
  width: number;
  height: number;
}

export interface PropertyAddress {
  street: string;
  number?: string;
  neighborhood: string;
  city: string;
  state: string;
  zipCode?: string;
  lat?: number;
  lng?: number;
}

export interface PropertySpecs {
  totalArea: number;
  usableArea: number;
  bedrooms: number;
  suites: number;
  bathrooms: number;
  parkingSpots: number;
  floors?: number;
  hasPool?: boolean;
  hasGym?: boolean;
  hasHelipad?: boolean;
  hasSeaView?: boolean;
  hasConcierge?: boolean;
  hasSauna?: boolean;
  petFriendly?: boolean;
}

export interface Property {
  id: string;
  slug: string;
  code: string;
  title: string;
  description: string;
  type: PropertyType;
  status: PropertyStatus;
  tag?: PropertyTag;
  price: number;
  condoFee?: number;
  iptu?: number;
  address: PropertyAddress;
  specs: PropertySpecs;
  images: PropertyImage[];
  videoUrl?: string;
  virtualTourUrl?: string;
  agent: PropertyAgent;
  featured: boolean;
  publishedAt: string;
  updatedAt: string;
}

export interface SearchFilters {
  type?: PropertyType | "todos";
  status?: PropertyStatus | "todos";
  city?: string;
  neighborhood?: string;
  minPrice?: number;
  maxPrice?: number;
  bedrooms?: number | "todos";
  suites?: number;
  bathrooms?: number;
  parkingSpots?: number;
  minArea?: number;
  maxArea?: number;
  hasVirtualTour?: boolean;
  hasVideo?: boolean;
}
