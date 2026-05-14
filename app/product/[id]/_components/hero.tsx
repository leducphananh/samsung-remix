import Image from 'next/image';

import type { Product } from '../_data/product.data';

export function ProductHero({ product }: { product: Product }) {
  return (
    <section className="bg-surface-container relative mt-8 flex flex-col items-center py-12">
      <Image
        src={product.image}
        alt={product.name}
        width={600}
        height={400}
        className="h-auto w-4/5 object-contain"
      />
      <div className="mt-8 flex justify-center gap-2">
        <div className="bg-primary h-2 w-2 rounded-full" />
        <div className="bg-surface-container-highest h-2 w-2 rounded-full" />
        <div className="bg-surface-container-highest h-2 w-2 rounded-full" />
      </div>
    </section>
  );
}
