// Sanity schema — Property
// Deploy: sanity deploy or sanity manage
export const propertySchema = {
  name:  "property",
  title: "Imóvel",
  type:  "document",
  fields: [
    { name: "title",        title: "Título",        type: "string",  validation: (r: any) => r.required() },
    { name: "slug",         title: "Slug (URL)",    type: "slug",    options: { source: "title" }, validation: (r: any) => r.required() },
    { name: "code",         title: "Código",        type: "string",  validation: (r: any) => r.required() },
    { name: "description",  title: "Descrição",     type: "text",    rows: 4 },
    {
      name: "propertyType", title: "Tipo",          type: "string",
      options: { list: ["apartamento","cobertura","casa","penthouse","terreno","comercial"] },
    },
    {
      name: "status",       title: "Finalidade",    type: "string",
      options: { list: ["venda","aluguel","lancamento"] },
    },
    {
      name: "tag",          title: "Badge",         type: "string",
      options: { list: ["DESTAQUE","NOVO","EXCLUSIVO","SIGNATURE"] },
    },
    { name: "price",        title: "Preço (R$)",    type: "number",  validation: (r: any) => r.required() },
    { name: "condoFee",     title: "Condomínio",    type: "number" },
    { name: "iptu",         title: "IPTU",          type: "number" },
    { name: "featured",     title: "Destaque",      type: "boolean", initialValue: false },
    {
      name: "address", title: "Endereço", type: "object",
      fields: [
        { name: "street",       type: "string", title: "Logradouro" },
        { name: "number",       type: "string", title: "Número" },
        { name: "neighborhood", type: "string", title: "Bairro", validation: (r: any) => r.required() },
        { name: "city",         type: "string", title: "Cidade",  validation: (r: any) => r.required() },
        { name: "state",        type: "string", title: "Estado" },
        { name: "zipCode",      type: "string", title: "CEP" },
        { name: "lat",          type: "number", title: "Latitude" },
        { name: "lng",          type: "number", title: "Longitude" },
      ],
    },
    {
      name: "specs", title: "Especificações", type: "object",
      fields: [
        { name: "totalArea",     type: "number", title: "Área Total (m²)" },
        { name: "usableArea",    type: "number", title: "Área Útil (m²)" },
        { name: "bedrooms",      type: "number", title: "Dormitórios" },
        { name: "suites",        type: "number", title: "Suítes" },
        { name: "bathrooms",     type: "number", title: "Banheiros" },
        { name: "parkingSpots",  type: "number", title: "Vagas" },
        { name: "floors",        type: "number", title: "Andares" },
        { name: "hasPool",       type: "boolean", title: "Piscina" },
        { name: "hasGym",        type: "boolean", title: "Academia" },
        { name: "hasHelipad",    type: "boolean", title: "Heliponto" },
        { name: "hasSeaView",    type: "boolean", title: "Vista Mar" },
        { name: "hasConcierge",  type: "boolean", title: "Concierge 24h" },
        { name: "hasSauna",      type: "boolean", title: "Sauna" },
        { name: "petFriendly",   type: "boolean", title: "Pet Friendly" },
      ],
    },
    {
      name: "images", title: "Galeria de Imagens", type: "array",
      of: [{
        type: "object",
        fields: [
          { name: "asset", type: "image", title: "Imagem", options: { hotspot: true } },
          { name: "alt",   type: "string", title: "Texto Alternativo", validation: (r: any) => r.required() },
        ],
      }],
    },
    { name: "videoUrl",        title: "URL do Vídeo",        type: "url" },
    { name: "virtualTourUrl",  title: "URL do Tour Virtual", type: "url" },
    { name: "agent",           title: "Corretor",            type: "reference", to: [{ type: "agent" }] },
  ],
  preview: {
    select: { title: "title", subtitle: "address.neighborhood", media: "images.0.asset" },
  },
};
