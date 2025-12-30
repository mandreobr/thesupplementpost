// src/pages/sitemap.xml.js
// Sitemap automático baseado nos arquivos em src/content/reviews
// ✅ Não inclui categorias vazias
// ✅ Gera URLs das minis no padrão do seu build: /reviews/produto-what-is

import { CATEGORY_CONFIG } from "../config/categories";

const BASE_URL = "https://www.thesupplementpost.com";

// Rotas estáticas principais (sem categorias hardcoded)
const STATIC_PATHS = ["/", "/reviews"];

// Lê todos os .md dentro de src/content/reviews e converte em URLs públicas
function getPathsFromContent() {
  // O Astro/Vite expande esse glob na build
  const modules = import.meta.glob("/src/content/reviews/**/*.md", { eager: true });

  const reviewPaths = new Set();       // /reviews/prostadine | /reviews/prostadine-what-is
  const categoryHasReviews = new Set(); // slugs que têm ao menos 1 review (index.md)

  for (const rawPath of Object.keys(modules)) {
    const normalized = rawPath.replace(/\\/g, "/");
    const relative = normalized.replace("/src/content/reviews/", ""); // "Men-Health/prostadine/what-is.md"
    const segments = relative.split("/");

    // Ex: ["Men-Health", "prostadine", "what-is.md"]
    const fileName = segments.pop();
    const product = segments.pop();
    const categoryFolder = segments.shift(); // "Men-Health" (pasta)

    if (!fileName || !product) continue;

    const baseName = fileName.replace(/\.md$/, ""); // "index" | "what-is" | "price" etc.

    // ✅ Detecta categoria "com review" apenas se existir index.md do produto
    if (baseName === "index" && categoryFolder) {
      // mapeia a pasta (ex: "Men-Health") para o slug do CATEGORY_CONFIG (ex: "men-health")
      const folderNorm = String(categoryFolder).trim().toLowerCase();
      const match = Object.entries(CATEGORY_CONFIG).find(([, cfg]) => {
        const slugNorm = String(cfg.slug).trim().toLowerCase();
        return slugNorm === folderNorm || slugNorm.replace(/-/g, "") === folderNorm.replace(/-/g, "");
      });

      if (match) categoryHasReviews.add(match[1].slug);
    }

    // ✅ URLs conforme seu build (você mostrou no npm run build):
    // index.md        => /reviews/prostadine
    // what-is.md      => /reviews/prostadine-what-is
    // pros-and-cons   => /reviews/prostadine-pros-and-cons
    if (baseName === "index") {
      reviewPaths.add(`/reviews/${product}`);
    } else {
      reviewPaths.add(`/reviews/${product}-${baseName}`);
    }
  }

  return { reviewPaths: Array.from(reviewPaths), categoryHasReviews };
}

export async function GET() {
  const { reviewPaths, categoryHasReviews } = getPathsFromContent();

  // ✅ Categorias: só entra no sitemap se tiver review
  const categoryPaths = Object.values(CATEGORY_CONFIG)
    .filter((cfg) => categoryHasReviews.has(cfg.slug))
    .map((cfg) => `/reviews/category/${cfg.slug}`);

  const allPaths = [...STATIC_PATHS, ...categoryPaths, ...reviewPaths];

  const urlsXml = allPaths
    .map(
      (path) => `
  <url>
    <loc>${BASE_URL}${path}</loc>
  </url>`
    )
    .join("");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlsXml}
</urlset>`;

  return new Response(xml, {
    headers: { "Content-Type": "application/xml" },
  });
}
