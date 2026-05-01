// Run: npx sanity@latest init --env
// Then: npx sanity@latest dev
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { propertySchema } from "./schemas/property";
import { agentSchema } from "./schemas/agent";

export default defineConfig({
  name:    "imobiliaria-luxo",
  title:   "Imobiliária de Ultra Luxo",
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "",
  dataset:   process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production",
  plugins: [structureTool(), visionTool()],
  schema:  { types: [propertySchema, agentSchema] },
});
