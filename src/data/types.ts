export interface ProductColor {
  id: string;
  label: string;
  image: string;
  checkoutUrl: string;
}

export interface ProductReview {
  initials: string;
  name: string;
  text: string;
  images: string[];
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
  images: string[]; // URLs or data URIs
  colors: ProductColor[];
  descriptionHtml: string; // accepts HTML (img/video tags allowed)
  reviews: ProductReview[];
  faqs: ProductFaq[];
}
