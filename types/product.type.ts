export interface Product {
  id: string;
  name: string;
  price: string;
  rating: number;
  reviews: number;
  variants: ProductVariant[];
  storage: string[];
  isNew: boolean;
}

export interface ProductVariant {
  id: number;
  name: string;
  hex: string;
  img: string;
  default?: boolean;
}

export interface ProductStorage {
  size: string;
  price: number;
}

export interface ProductDetailVariant {
  id: number;
  name: string;
  hex: string;
  slides: {
    src: string;
    alt: string;
  }[];
  default?: boolean;
}

export interface ProductDetail {
  id: string;
  name: string;
  price: number;
  rating: number;
  reviews: number;
  variants: ProductDetailVariant[];
  storage: ProductStorage[];
  ratingBreakdown: {
    stars: number;
    count: number;
  }[];
  reviewHighlights: string[];
  customerReviews: {
    name: string;
    rating: number;
    date: string;
    title: string;
    content: string;
  }[];
}
