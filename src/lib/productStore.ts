import type { Product, VariationGroup, LegacyColor } from "@/data/types";
import { defaultProducts } from "@/data/defaultProducts";

const STORAGE_KEY = "lovable.products.v1";

/** Migrate older saved products (with `colors`) to the new `variationGroups` shape. */
function normalizeProduct(raw: any): Product {
  const p = { ...raw } as Product & { colors?: LegacyColor[] };
  if (!p.variationGroups || !Array.isArray(p.variationGroups)) {
    const colors = (raw as any).colors as LegacyColor[] | undefined;
    p.variationGroups = colors && colors.length
      ? [{
          id: "cor",
          label: "Cor",
          options: colors.map((c) => ({
            id: c.id,
            label: c.label,
            image: c.image,
            checkoutUrl: c.checkoutUrl,
          })),
        }]
      : [];
  }
  if (!p.buyButtonText) p.buyButtonText = "COMPRAR AGORA — FRETE GRÁTIS";
  delete (p as any).colors;
  return p;
}

function readCustom(): Product[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.map(normalizeProduct);
  } catch {
    return [];
  }
}

export function getAllProducts(): Product[] {
  const custom = readCustom();
  const merged = [...defaultProducts.map(normalizeProduct)];
  for (const p of custom) {
    const idx = merged.findIndex((m) => m.slug === p.slug);
    if (idx >= 0) merged[idx] = p;
    else merged.push(p);
  }
  return merged;
}

export function getProductBySlug(slug: string): Product | undefined {
  return getAllProducts().find((p) => p.slug === slug);
}

export function saveCustomProduct(product: Product) {
  const custom = readCustom();
  const idx = custom.findIndex((p) => p.slug === product.slug);
  if (idx >= 0) custom[idx] = product;
  else custom.push(product);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(custom));
}

export function deleteCustomProduct(slug: string) {
  const custom = readCustom().filter((p) => p.slug !== slug);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(custom));
}

export function importProductsJson(json: string) {
  const data = JSON.parse(json);
  const items: Product[] = (Array.isArray(data) ? data : [data]).map(normalizeProduct);
  for (const item of items) saveCustomProduct(item);
}
