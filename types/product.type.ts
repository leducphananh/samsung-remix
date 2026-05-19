export interface Product {
  id: string;
  name: string;
  price: string;
  rating: number;
  reviews: number;
  variants: {
    id: number;
    name: string;
    hex: string;
    img: string;
    default?: boolean;
  }[];
  storage: string[];
  isNew: boolean;
}
