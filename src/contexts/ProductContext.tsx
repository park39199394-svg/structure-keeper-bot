import { createContext, useContext } from "react";
import type { Product } from "@/data/types";

const ProductContext = createContext<Product | null>(null);

export const ProductProvider = ProductContext.Provider;

export function useProduct(): Product {
  const ctx = useContext(ProductContext);
  if (!ctx) throw new Error("useProduct must be used within ProductProvider");
  return ctx;
}
