import { defineCollection, z } from "astro:content";

const reviews = defineCollection({
  type: "content",
  schema: z.object({
    // Texto do topo do review (H1 + intro)
    title: z.string(),
    description: z.string(),

    // SEO
    pageTitle: z.string(),
    metaDescription: z.string(),

    // Slug usado na URL /reviews/[slug]
    slug: z.string(),

    // Campos de hero (opcionais, se você quiser usar depois no layout)
    heroImage: z.string().optional(),
    heroAlt: z.string().optional(),
    heroCaption: z.string().optional(),

    // CTA principal (opcional)
    primaryCtaLabel: z.string().optional(),
    primaryCtaUrl: z.string().optional(),

    reviewCategory: z.string().optional(),
  }),
});

export const collections = { reviews };
