export const agentSchema = {
  name:  "agent",
  title: "Corretor",
  type:  "document",
  fields: [
    { name: "name",     title: "Nome",         type: "string",  validation: (r: any) => r.required() },
    { name: "phone",    title: "Telefone",     type: "string",  validation: (r: any) => r.required() },
    { name: "whatsapp", title: "WhatsApp",     type: "string",  validation: (r: any) => r.required() },
    { name: "photo",    title: "Foto",         type: "image",   options: { hotspot: true } },
    { name: "creci",    title: "CRECI",        type: "string" },
    { name: "bio",      title: "Apresentação", type: "text",    rows: 3 },
  ],
  preview: {
    select: { title: "name", subtitle: "creci", media: "photo" },
  },
};
