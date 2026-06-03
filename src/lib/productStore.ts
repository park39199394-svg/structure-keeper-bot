import type { Product } from "@/data/types";
import { defaultProducts } from "@/data/defaultProducts";

const STORAGE_KEY = "lovable.products.v1";

function readCustom(): Product[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function getAllProducts(): Product[] {
  const custom = readCustom();
  const merged = [...defaultProducts];
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
  const items: Product[] = Array.isArray(data) ? data : [data];
  for (const item of items) saveCustomProduct(item);
}
