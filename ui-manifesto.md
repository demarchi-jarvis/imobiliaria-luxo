# UI MANIFESTO — Imobiliária de Luxo
> Princípios filosóficos e decisões arquiteturais de design.
> Este documento define o **porquê** por trás de cada escolha visual.

---

## FILOSOFIA

> *"O luxo não é sobre ostentação. É sobre a ausência de ruído."*

Esta interface não vende imóveis. Ela **apresenta patrimônio**.
Cada pixel carrega o peso de uma experiência que começa antes da visita presencial.
O comprador de alto padrão chega ao site com ceticismo — a interface deve convertê-lo em confiança antes da primeira palavra.

---

## OS 5 PILARES

### 1. SILÊNCIO VISUAL
Espaço em branco (negativo) é o material mais caro desta interface.
Não preenchemos telas — deixamos o imóvel respirar.
- Padding generoso: mínimo `80px` vertical entre seções
- Nunca mais de 3 elementos visuais competindo na mesma área
- Hero com **uma** mensagem principal, não quatro

### 2. MATÉRIA PRIMA DOURADA
O ouro (`#C5A059`) é usado como acentuação cirúrgica — não como cor de fundo.
- Aparece em: bordas de destaque, ícones ativos, separadores, CTAs, preços
- Nunca cobre mais que **15% da área visual** de qualquer tela
- Efeito shimmer apenas em momentos de conversão (CTA principal, formulário de contato)

### 3. MOVIMENTO COM PROPÓSITO
Nenhuma animação existe para impressionar. Cada uma existe para **guiar o olhar**.
- Entradas revelam hierarquia (o mais importante anima primeiro)
- Hover confirma interatividade sem distrair
- Transições de página criam sensação de profundidade, não de velocidade

### 4. FOTOGRAFIA COMO PRODUTO
O imóvel é vendido pela imagem antes do texto.
- Fotos ocupam no mínimo **60% do viewport** nas páginas de detalhe
- Galeria com zoom suave (Framer Motion `layoutId` para transição hero→galeria)
- Nunca comprimir imagens abaixo de qualidade 85 (WebP)
- Sempre carregar a imagem hero com `priority={true}`

### 5. CONFIANÇA ATRAVÉS DE DADOS
Compradores de luxo pesquisam antes de agir.
- Exibir métricas reais: m², dormitórios, vagas, IPTU, condomínio
- Localização com mapa integrado (Mapbox ou Google Maps estilizado em dark)
- Badge de verificação visível em corretores cadastrados
- Tempo de resposta do corretor exibido no card de contato

---

## STACK TECNOLÓGICA

| Camada         | Tecnologia              | Motivo                                      |
|----------------|-------------------------|---------------------------------------------|
| Framework      | Next.js 14+ (App Router)| RSC, ISR, image optimization nativos        |
| Estilo         | Tailwind CSS + CSS Vars | Utilidade + tokens customizados             |
| Animação       | Framer Motion           | Spring physics, layoutId, shared layouts    |
| Scroll         | Lenis                   | Suavidade premium, compatível com Framer    |
| Fontes         | Next/Font (Google)      | Zero layout shift, self-hosted              |
| Imagens        | Next/Image              | WebP automático, lazy loading, blur placeholder |
| Formulários    | React Hook Form + Zod   | Performance + validação tipada              |
| Mapas          | Mapbox GL JS            | Estilo dark customizável, performático      |
| CMS            | Sanity ou Notion API    | Gerenciamento de imóveis sem deploy         |
| Analytics      | GTM + GA4 + Meta Pixel  | Rastreamento completo via Tag Manager       |

---

## ARQUITETURA DE PÁGINAS

```
/                          → Home (Hero + Destaques + Sobre + CTA)
/imoveis                   → Listagem com filtros (Bento Grid)
/imoveis/[slug]            → Detalhe do imóvel (Galeria + Specs + Mapa + Contato)
/sobre                     → Institucional (Equipe + Valores + Números)
/contato                   → Formulário + Mapa + Redes Sociais
/blog/[slug]?              → Conteúdo editorial (opcional, SEO)
```

---

## PADRÕES DE LAYOUT

### Hero Principal
```
┌─────────────────────────────────────────────────────────┐
│  [Imagem de fundo em tela cheia com overlay]            │
│                                                         │
│     [Logo]                          [Nav links]  [CTA] │
│                                                         │
│                                                         │
│         TÍTULO EM CORMORANT GARAMOND                   │
│         Subtítulo em Inter light                        │
│                                                         │
│         [Botão CTA Gold]  [Buscar Imóveis]             │
│                                                         │
│  [Scroll indicator animado]                             │
└─────────────────────────────────────────────────────────┘
```

### Card de Imóvel
```
┌──────────────────────┐
│  [Imagem 4:3]        │  ← WebP, object-cover
│  [BADGE EXCLUSIVO]   │  ← gold bg, uppercase, letra pequena
├──────────────────────┤
│  Título do Imóvel    │  ← Cormorant, 20px
│  Bairro, Cidade      │  ← Inter, stone.400, 13px
│                      │
│  🛏 4   🚿 5   📐 420m²  │  ← ícones minimalistas
│                      │
│  R$ 8.500.000        │  ← Cormorant, gold, 22px
└──────────────────────┘
```

---

## MICRO-INTERAÇÕES OBRIGATÓRIAS

| Elemento          | Interação                                              |
|-------------------|--------------------------------------------------------|
| Card de imóvel    | Scale 1.015 + sombra gold sutil no hover               |
| Botão CTA         | Background shimmer dourado da esq. para dir. no hover  |
| Link de nav       | Underline dourado animado (scaleX 0→1) no hover        |
| Imagem na galeria | Zoom suave (scale 1.05) com cursor crosshair           |
| Formulário input  | Borda gold ao focar, transição 200ms                   |
| Preloader         | Logo animado + barra de progresso gold                 |
| Scroll to top     | Aparece após 300px de scroll, some suavemente          |

---

## ACESSIBILIDADE (NUNCA IGNORAR)

- Contraste mínimo **4.5:1** em todo texto sobre fundo (verificar gold sobre stone)
- Todos os `<Image>` com `alt` descritivo
- Navegação 100% funcional por teclado (`focus-visible` estilizado em gold)
- `aria-label` em todos os ícones sem texto
- `prefers-reduced-motion`: todas as animações devem ter fallback estático
- Semântica HTML: `<main>`, `<nav>`, `<section>`, `<article>`, `<footer>` corretos

```tsx
// Sempre aplicar no CSS global:
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## PERFORMANCE — METAS

| Métrica          | Meta      | Crítico se |
|------------------|-----------|------------|
| LCP              | < 2.0s    | > 4.0s     |
| CLS              | < 0.05    | > 0.25     |
| FID / INP        | < 100ms   | > 300ms    |
| TTFB             | < 600ms   | > 1.8s     |
| Lighthouse Score | > 90      | < 70       |

### Estratégias
- ISR com `revalidate: 3600` nas páginas de listagem
- `loading="lazy"` em todas as imagens fora do viewport inicial
- Fontes com `display: swap`
- Bundle splitting automático do Next.js — não importar bibliotecas pesadas no cliente sem necessidade

---

## VOCABULÁRIO DE MARCA

### Usar
- "Imóvel", "Residência", "Empreendimento", "Propriedade"
- "Exclusivo", "Selecionado", "Curado", "Refinado"
- "Patrimônio", "Investimento", "Legado"
- "Localização privilegiada", "Vista panorâmica", "Acabamento de alto padrão"

### Evitar
- "Casa", "Apartamento simples", "Barato", "Promoção"
- "Clique aqui", "Saiba mais" sem contexto
- Exclamações excessivas
- Emojis fora de contexto digital (WhatsApp, redes sociais OK)

---

## VERSIONAMENTO DESTE DOCUMENTO

| Versão | Data       | Alteração                          |
|--------|------------|------------------------------------|
| 1.0    | 2026-05-01 | Criação inicial do manifesto       |

> Qualquer mudança nos tokens de design ou na stack deve ser refletida aqui **antes** de ser implementada no código.
