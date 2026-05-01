import { getSanityClient, isSanityConfigured } from "@/lib/sanity";
import { MOCK_PROPERTIES } from "@/lib/mock-data";
import type { Property } from "@/types/property";

const PROPERTY_FIELDS = `
  _id,
  "id": _id,
  "slug": slug.current,
  code, title, description,
  "type": propertyType, status, tag,
  price, condoFee, iptu, featured,
  address { street, number, neighborhood, city, state, zipCode, lat, lng },
  specs {
    totalArea, usableArea, bedrooms, suites, bathrooms, parkingSpots,
    floors, hasPool, hasGym, hasHelipad, hasSeaView, hasConcierge, hasSauna, petFriendly
  },
  "images": images[] {
    "url": asset->url, alt,
    "blurDataUrl": asset->metadata.lqip,
    "width": asset->metadata.dimensions.width,
    "height": asset->metadata.dimensions.height
  },
  videoUrl, virtualTourUrl,
  agent -> { "id": _id, name, phone, whatsapp, "photo": photo.asset->url, creci },
  "publishedAt": _createdAt,
  "updatedAt": _updatedAt
`;

async function sanityFetch<T>(query: string, params?: Record<string, string>): Promise<T | null> {
  const client = await getSanityClient();
  if (!client) return null;
  return client.fetch<T>(query, params ?? {});
}

export async function getAllProperties(): Promise<Property[]> {
  if (!isSanityConfigured) return MOCK_PROPERTIES;
  try {
    const data = await sanityFetch<Property[]>(
      `*[_type == "property"] | order(featured desc, _createdAt desc) { ${PROPERTY_FIELDS} }`
    );
    return data ?? MOCK_PROPERTIES;
  } catch { return MOCK_PROPERTIES; }
}

export async function getPropertyBySlug(slug: string): Promise<Property | null> {
  if (!isSanityConfigured) return MOCK_PROPERTIES.find((p) => p.slug === slug) ?? null;
  try {
    const data = await sanityFetch<Property>(
      `*[_type == "property" && slug.current == $slug][0] { ${PROPERTY_FIELDS} }`,
      { slug }
    );
    return data ?? (MOCK_PROPERTIES.find((p) => p.slug === slug) ?? null);
  } catch { return MOCK_PROPERTIES.find((p) => p.slug === slug) ?? null; }
}

export async function getFeaturedProperties(): Promise<Property[]> {
  if (!isSanityConfigured) return MOCK_PROPERTIES.filter((p) => p.featured);
  try {
    const data = await sanityFetch<Property[]>(
      `*[_type == "property" && featured == true] | order(_createdAt desc)[0...6] { ${PROPERTY_FIELDS} }`
    );
    return data ?? MOCK_PROPERTIES.filter((p) => p.featured);
  } catch { return MOCK_PROPERTIES.filter((p) => p.featured); }
}

export async function getRelatedProperties(slug: string, neighborhood: string): Promise<Property[]> {
  if (!isSanityConfigured) {
    return MOCK_PROPERTIES.filter((p) => p.slug !== slug && p.address.neighborhood === neighborhood).slice(0, 3);
  }
  try {
    const data = await sanityFetch<Property[]>(
      `*[_type == "property" && slug.current != $slug && address.neighborhood == $neighborhood] | order(_createdAt desc)[0...3] { ${PROPERTY_FIELDS} }`,
      { slug, neighborhood }
    );
    return data ?? MOCK_PROPERTIES.filter((p) => p.slug !== slug).slice(0, 3);
  } catch { return MOCK_PROPERTIES.filter((p) => p.slug !== slug).slice(0, 3); }
}

export async function getAllPropertySlugs(): Promise<string[]> {
  if (!isSanityConfigured) return MOCK_PROPERTIES.map((p) => p.slug);
  try {
    const data = await sanityFetch<{ slug: string }[]>(
      `*[_type == "property"]{ "slug": slug.current }`
    );
    return (data ?? []).map((r) => r.slug);
  } catch { return MOCK_PROPERTIES.map((p) => p.slug); }
}
