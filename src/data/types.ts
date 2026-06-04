export interface VariationOption {
  id: string;
  label: string;
  image?: string;
  checkoutUrl: string;
}

export interface VariationGroup {
  id: string;
  label: string; // ex: "Cor", "Tamanho"
  options: VariationOption[];
}

export interface ProductReview {
  initials: string;
  name: string;
  text: string;
  images: string[];
  date?: string; // ex: "2026-08-03 14:32"
  rating?: number; // 1-5, defaults to 5
}

export interface ProductFaq {
  q: string;
  a: string;
}

export interface ProductPrice {
  current: number;
  original: number;
  installments?: number;
  discountLabel?: string;
}

export interface Product {
  slug: string;
  name: string;
  storeName: string;
  storeInitial?: string;
  storeBadge?: string;
  rating: number;
  ratingCount: number;
  sold: string;
  socialProof?: string;
  price: ProductPrice;
  shippingDays?: string;
  buyButtonText?: string;
  images: string[];
  variationGroups: VariationGroup[];
  descriptionHtml: string;
  reviews: ProductReview[];
  faqs: ProductFaq[];
}

/** Legacy color shape kept for backward compatibility when reading old data. */
export interface LegacyColor {
  id: string;
  label: string;
  image: string;
  checkoutUrl: string;
}
