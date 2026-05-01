# DOCS_ESTILO.md — Guia de Estilo Oficial
> **Single Source of Truth** para todos os componentes desta imobiliária de luxo.
> Consulte este arquivo antes de criar qualquer novo componente `.tsx`.

---

## 1. IDENTIDADE VISUAL

### Conceito
Luxo silencioso. Materiais premium. Espaço como status. A interface deve comunicar exclusividade sem gritar — cores contidas, animações elegantes, tipografia com autoridade.

---

## 2. DESIGN TOKENS — CORES

```ts
// tokens/colors.ts
export const colors = {
  // Ouro — cor principal de destaque
  gold: {
    DEFAULT:  "#C5A059",
    light:    "#D4B57A",
    dark:     "#9E7D3F",
    muted:    "#C5A05933", // 20% opacity
  },

  // Base — escuros (Tailwind Stone)
  stone: {
    950: "#0C0A09",  // fundo principal
    900: "#1C1917",  // cards, modais
    800: "#292524",  // bordas sutis
    700: "#44403C",  // separadores
    400: "#A8A29E",  // texto secundário
    200: "#E7E5E4",  // texto em fundos escuros
  },

  // Superfície glass
  glass: {
    white:  "rgba(255, 255, 255, 0.04)",
    gold:   "rgba(197, 160, 89, 0.08)",
    border: "rgba(197, 160, 89, 0.15)",
  },

  // Feedback
  success: "#4ADE80",
  error:   "#F87171",
}
```

### Regra de Uso
| Elemento            | Cor                        |
|---------------------|----------------------------|
| Fundo da página     | `stone.950` (#0C0A09)      |
| Cards / Modais      | `stone.900` (#1C1917)      |
| Bordas              | `glass.border`             |
| CTAs primários      | `gold.DEFAULT` (#C5A059)   |
| Texto principal     | `stone.200`                |
| Texto secundário    | `stone.400`                |
| Hover em CTAs       | `gold.light` (#D4B57A)     |

---

## 3. TIPOGRAFIA

```ts
// tokens/typography.ts
// Google Fonts: Cormorant Garamond + Inter

export const fonts = {
  display: "'Cormorant Garamond', serif",  // H1, H2, títulos de hero
  body:    "'Inter', sans-serif",           // Corpo, labels, UI
}

export const type = {
  hero:      { size: "clamp(3rem, 7vw, 6rem)", weight: 300, tracking: "-0.02em" },
  h1:        { size: "clamp(2rem, 4vw, 3.5rem)", weight: 400, tracking: "-0.015em" },
  h2:        { size: "clamp(1.5rem, 2.5vw, 2.25rem)", weight: 400 },
  h3:        { size: "1.25rem", weight: 500 },
  body:      { size: "1rem", weight: 400, lineHeight: 1.7 },
  caption:   { size: "0.75rem", weight: 400, tracking: "0.08em", transform: "uppercase" },
  price:     { size: "clamp(1.5rem, 3vw, 2.5rem)", weight: 300, family: "display" },
}
```

### Import no `layout.tsx`
```tsx
import { Cormorant_Garamond, Inter } from "next/font/google"

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-display",
})

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
})
```

---

## 4. MOTION GUIDELINES — FRAMER MOTION

> Todas as animações devem parecer físicas e intencionais. Nunca use `ease: "linear"` em elementos visíveis.

### Transições Padrão

```ts
// tokens/motion.ts
export const motion = {
  // Entrada de elementos de página
  pageEnter: {
    initial:   { opacity: 0, y: 24 },
    animate:   { opacity: 1, y: 0 },
    transition: { type: "spring", stiffness: 60, damping: 20, mass: 1 },
  },

  // Cards e itens de lista
  cardReveal: {
    initial:   { opacity: 0, y: 32, scale: 0.98 },
    animate:   { opacity: 1, y: 0, scale: 1 },
    transition: { type: "spring", stiffness: 80, damping: 22 },
  },

  // Hover em cards
  cardHover: {
    scale: 1.015,
    transition: { type: "spring", stiffness: 200, damping: 25 },
  },

  // Modal / overlay
  modal: {
    initial:   { opacity: 0, scale: 0.96, y: 16 },
    animate:   { opacity: 1, scale: 1, y: 0 },
    exit:      { opacity: 0, scale: 0.96, y: 16 },
    transition: { type: "spring", stiffness: 100, damping: 28 },
  },

  // Fade simples (texto, badges)
  fade: {
    initial:   { opacity: 0 },
    animate:   { opacity: 1 },
    transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
  },

  // Stagger para listas
  staggerContainer: {
    animate: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
  },
}
```

### Regras de Animação
- `stiffness` entre **60–120** para movimentos grandes (hero, page)
- `stiffness` entre **150–250** para feedback rápido (hover, toggle)
- `damping` nunca abaixo de **18** — evitar bounce excessivo
- Usar `whileInView` com `viewport={{ once: true, margin: "-80px" }}` em seções de scroll
- Nunca animar `width` ou `height` diretamente — usar `scaleX/scaleY` ou `layout`

---

## 5. LENIS SCROLL

```tsx
// providers/LenisProvider.tsx
"use client"

import Lenis from "lenis"
import { useEffect } from "react"

export function LenisProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const lenis = new Lenis({
      duration:  1.4,
      easing:    (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.5,
    })

    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)

    return () => lenis.destroy()
  }, [])

  return <>{children}</>
}
```

> **Regra:** Sempre encapsular `<LenisProvider>` no `layout.tsx` raiz. Nunca usar `overflow: hidden` em `<body>` com Lenis ativo.

---

## 6. GLASSMORPHISM — REGRAS

```ts
// Padrão Glass Card
const glassCard = {
  background:   "rgba(28, 25, 23, 0.6)",       // stone.900 com 60% opacity
  backdropFilter: "blur(16px) saturate(1.4)",
  border:       "1px solid rgba(197, 160, 89, 0.15)",
  borderRadius: "16px",
}

// Glass Premium (hero, featured)
const glassPremium = {
  background:   "rgba(197, 160, 89, 0.06)",
  backdropFilter: "blur(24px) saturate(1.8)",
  border:       "1px solid rgba(197, 160, 89, 0.25)",
  borderRadius: "20px",
}
```

### Regras
- `blur` mínimo: **12px**, máximo: **32px**
- Sempre adicionar `border` com `gold.border` — nunca glass sem borda
- Fundo atrás do glass deve ter profundidade (imagem, gradiente ou cor sólida escura)
- Não aninhar glass dentro de glass

---

## 7. COMPONENT SPECS

### Bento Grid — Listagem de Imóveis

```
Layout:
[ Card Grande (col-span-2, row-span-2) ][ Card Médio ]
                                         [ Card Médio ]
[ Card Médio ][ Card Médio ][ Card Grande (col-span-2) ]

Regras:
- Grid: 4 colunas no desktop, 2 no tablet, 1 no mobile
- Gap: 16px (gap-4)
- Card featured: badge "DESTAQUE" em gold, imagem com overlay gradiente
- Aspect ratio das imagens: 4/3 para médios, 16/9 para grandes
```

### Property Card
```tsx
interface PropertyCard {
  image:       string    // WebP obrigatório, fallback JPEG
  title:       string    // max 60 chars
  location:    string    // Bairro, Cidade
  price:       number    // formatado: "R$ 4.800.000"
  area:        number    // m²
  bedrooms:    number
  bathrooms:   number
  tag?:        "DESTAQUE" | "NOVO" | "EXCLUSIVO"
}
```

### Skeleton Loading
```tsx
// Sempre usar skeleton antes do conteúdo carregar
// Classe base para skeleton:
const skeletonClass = "animate-pulse bg-stone-800 rounded-lg"

// Duração do pulse: 1.5s (padrão Tailwind está bom)
// Cor: stone.800 (#292524) sobre stone.900
```

---

## 8. GRADIENTES PADRÃO

```ts
export const gradients = {
  // Overlay em imagens de imóveis
  imageOverlay: "linear-gradient(to top, rgba(12,10,9,0.9) 0%, rgba(12,10,9,0.2) 50%, transparent 100%)",

  // Hero section
  heroOverlay:  "linear-gradient(135deg, rgba(12,10,9,0.95) 0%, rgba(12,10,9,0.6) 100%)",

  // Gold accent
  goldShimmer:  "linear-gradient(90deg, transparent, rgba(197,160,89,0.15), transparent)",

  // Separador sutil
  divider:      "linear-gradient(90deg, transparent, #C5A059, transparent)",
}
```

---

## 9. SEO & ANALYTICS — CHECKLIST

### Tags Obrigatórias no `<head>`
```tsx
// app/layout.tsx — metadata
export const metadata: Metadata = {
  title:       { template: "%s | [Nome da Imobiliária]", default: "[Nome] — Imóveis de Luxo" },
  description: "...",
  openGraph: {
    type:   "website",
    locale: "pt_BR",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630 }],
  },
  twitter: { card: "summary_large_image" },
  robots:  { index: true, follow: true },
}
```

### JSON-LD por Imóvel
```tsx
// Adicionar em cada página de detalhe do imóvel
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "RealEstateListing",
  "name": property.title,
  "description": property.description,
  "url": `https://[dominio]/imoveis/${property.slug}`,
  "image": property.images,
  "offers": {
    "@type": "Offer",
    "price": property.price,
    "priceCurrency": "BRL",
  },
  "address": {
    "@type": "PostalAddress",
    "addressLocality": property.city,
    "addressRegion": property.state,
    "addressCountry": "BR",
  },
}
```

### Checklist de Integrações
- [ ] Google Tag Manager (GTM) instalado no `<head>` e `<body>`
- [ ] Meta Pixel (Facebook) via GTM
- [ ] Google Analytics 4 via GTM
- [ ] JSON-LD em todas as páginas de imóvel
- [ ] Sitemap dinâmico em `/sitemap.xml`
- [ ] Robots.txt configurado
- [ ] Open Graph image por imóvel (gerada via `next/og`)
- [ ] Core Web Vitals monitorados (LCP < 2.5s, CLS < 0.1)

---

## 10. REGRAS GERAIS — NÃO VIOLAR

1. **Nunca usar branco puro** (`#FFFFFF`) — usar `stone.200` no máximo
2. **Nunca usar preto puro** (`#000000`) — usar `stone.950`
3. **Imagens sempre em WebP** com `<Image>` do Next.js (`priority` no hero)
4. **Todo texto sobre imagem** deve ter `imageOverlay` aplicado
5. **Nunca animar opacity de 0→1 sem movimento** — sempre combinar com `y` ou `scale`
6. **Fontes de preço** sempre em `Cormorant Garamond` (display)
7. **Bordas arredondadas**: 8px (sm), 12px (md), 16px (lg), 20px (xl) — nunca valores aleatórios
8. **Responsividade mobile-first** — testar em 375px, 768px, 1280px, 1920px
