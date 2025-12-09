// src/pages/sitemap.xml.js
// Sitemap automático baseado nos arquivos em src/content/reviews

const BASE_URL = "https://www.bestsupplementstoday.com";

// Rotas estáticas principais
const STATIC_PATHS = [
  "/",
  "/reviews",
  "/reviews/category/weight-loss",
  "/reviews/category/brain-and-neuro",
  "/reviews/category/men-health",
  "/reviews/category/women-health",
  "/reviews/category/heart-and-circulation",
  "/reviews/category/liver-and-gut",
  "/reviews/category/dental-health",
  "/reviews/category/hearing-and-vision",
  "/reviews/category/pain-joint-muscle",
  "/reviews/category/blood-sugar",
  "/reviews/category/skin-hair-aging",
  "/reviews/category/other",
];

// Lê todos os .md dentro de src/content/reviews e converte em URLs públicas
function getReviewPathsFromContent() {
  // O Astro/Vite expande esse glob na build
  const modules = import.meta.glob("/src/content/reviews/**/*.md", {
    eager: true,
  });

  const paths = new Set();

  for (const rawPath of Object.keys(modules)) {
    // Normaliza separador de pasta
    const normalized = rawPath.replace(/\\/g, "/");

    // Remove o prefixo até "reviews/"
    // Ex: "src/content/reviews/Men-Health/prostadine/what-is.md"
    // vira "Men-Health/prostadine/what-is.md"
    const relative = normalized.replace("/src/content/reviews/", "");

    const segments = relative.split("/");

    // Último item é o arquivo ("index.md", "what-is.md", etc.)
    const fileName = segments.pop();      // ex: "what-is.md"
    const product = segments.pop();       // ex: "prostadine"
    if (!product || !fileName) continue;

    const baseName = fileName.replace(/\.md$/, ""); // "what-is" | "index"

    // Se for index.md => /reviews/prostadine
    if (baseName === "index") {
      paths.add(`/reviews/${product}`);
    } else {
      // Minis => /reviews/prostadine/what-is, /ingredients, etc.
      paths.add(`/reviews/${product}/${baseName}`);
    }
  }

  return Array.from(paths);
}

export async function GET() {
  const reviewPaths = getReviewPathsFromContent();
  const allPaths = [...STATIC_PATHS, ...reviewPaths];

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
