import imageUrlBuilder from "@sanity/image-url";

export const isSanityConfigured =
  !!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID &&
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID.length > 4;

// Lazy client — only created when Sanity is configured
let _client: ReturnType<typeof import("@sanity/client").createClient> | null = null;

export async function getSanityClient() {
  if (!isSanityConfigured) return null;
  if (_client) return _client;
  const { createClient } = await import("@sanity/client");
  _client = createClient({
    projectId:  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
    dataset:    process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production",
    apiVersion: "2024-01-01",
    useCdn:     process.env.NODE_ENV === "production",
    token:      process.env.SANITY_API_TOKEN,
  });
  return _client;
}

export function urlFor(source: Parameters<ReturnType<typeof imageUrlBuilder>["image"]>[0], client: ReturnType<typeof import("@sanity/client").createClient>) {
  return imageUrlBuilder(client).image(source);
}
