import { Star } from 'lucide-react';

import type { Product } from '../_data/product.data';

export function ProductHeader({ product }: { product: Product }) {
  return (
    <section className="px-5 pt-8">
      <h1 className="text-2xl font-bold">{product.name}</h1>
      <div className="mt-1 flex items-center gap-4">
        <div className="flex">
          {[1, 2, 3, 4].map(i => (
            <Star key={i} className="h-4 w-4" strokeWidth={0} fill="#ffaa4e" />
          ))}
          <Star className="h-4 w-4" strokeWidth={0} fill="#ffaa4e" />
        </div>
        <span className="text-secondary text-xs font-medium">
          {product.rating} ({product.reviews} Đánh giá)
        </span>
      </div>
    </section>
  );
}
