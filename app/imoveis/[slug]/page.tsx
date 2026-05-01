import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPropertyBySlug, getAllPropertySlugs, getRelatedProperties } from "@/lib/queries";
import PropertyDetailClient from "./PropertyDetailClient";
import { formatPrice } from "@/lib/utils";

// ─── Static generation ────────────────────────────────────────────────────────

export async function generateStaticParams() {
  const slugs = await getAllPropertySlugs();
  return slugs.map((slug) => ({ slug }));
}

// ─── Dynamic metadata ─────────────────────────────────────────────────────────

export async function generateMetadata(
  { params }: { params: { slug: string } }
): Promise<Metadata> {
  const property = await getPropertyBySlug(params.slug);
  if (!property) return { title: "Imóvel não encontrado" };

  const title       = `${property.title} | ${property.address.neighborhood}, ${property.address.city}`;
  const description = `${property.specs.bedrooms} dormitórios · ${property.specs.usableArea}m² úteis · ${formatPrice(property.price)}. ${property.description.slice(0, 120)}`;
  const ogImage     = property.images[0]?.url ?? "/og-image.jpg";
  const url         = `${process.env.NEXT_PUBLIC_SITE_URL}/imoveis/${property.slug}`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type:        "website",
      locale:      "pt_BR",
      url,
      title,
      description,
      images: [{
        url:    ogImage,
        width:  1200,
        height: 800,
        alt:    property.title,
      }],
    },
    twitter: { card: "summary_large_image", title, description, images: [ogImage] },
  };
}

// ─── JSON-LD ──────────────────────────────────────────────────────────────────

function buildJsonLd(property: Awaited<ReturnType<typeof getPropertyBySlug>>) {
  if (!property) return null;
  const url = `${process.env.NEXT_PUBLIC_SITE_URL}/imoveis/${property.slug}`;
  return {
    "@context": "https://schema.org",
    "@type":    "RealEstateListing",
    name:        property.title,
    description: property.description,
    url,
    image:       property.images.map((i) => i.url),
    datePosted:  property.publishedAt,
    floorSize: {
      "@type":    "QuantitativeValue",
      value:       property.specs.usableArea,
      unitCode:    "MTK",
    },
    numberOfRooms: property.specs.bedrooms,
    offers: {
      "@type":        "Offer",
      price:           property.price,
      priceCurrency:   "BRL",
      availability:    "https://schema.org/InStock",
    },
    address: {
      "@type":              "PostalAddress",
      streetAddress:         `${property.address.street}, ${property.address.number ?? ""}`.trim(),
      addressLocality:       property.address.city,
      addressRegion:         property.address.state,
      addressCountry:        "BR",
    },
    ...(property.agent && {
      agent: {
        "@type": "RealEstateAgent",
        name:    property.agent.name,
        telephone: property.agent.phone,
      },
    }),
  };
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function PropertyDetailPage({ params }: { params: { slug: string } }) {
  const [property, related] = await Promise.all([
    getPropertyBySlug(params.slug),
    getPropertyBySlug(params.slug).then((p) =>
      p ? getRelatedProperties(params.slug, p.address.neighborhood) : []
    ),
  ]);

  if (!property) notFound();

  const jsonLd = buildJsonLd(property);
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

  return (
    <>
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}
      <PropertyDetailClient
        property={property}
        related={related}
        siteUrl={siteUrl}
      />
    </>
  );
}
