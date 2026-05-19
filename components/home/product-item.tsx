'use client';
import { CartItem } from '@/types/cart.type';
import { Product } from '@/types/product.type';
import { parsePrice } from '@/utils/price.util';
import clsx from 'clsx';
import { Star } from 'lucide-react';
import { motion } from 'motion/react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

interface Props {
  product: Product;
  onAddToCart: (cartItem: Omit<CartItem, 'quantity'>) => void;
}

const ProductItem = ({ product, onAddToCart }: Props) => {
  const [selectedVariant, setSelectedVariant] = useState(
    product.variants.find(v => v.default) || product.variants[0],
  );
  const [selectedStorage, setSelectedStorage] = useState(product.storage[0]);

  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="bg-surface-container-lowest border-surface-container-highest flex flex-col rounded-xl border p-6">
      <div className="bg-surface-container-low relative mb-6 aspect-square w-full rounded-lg p-4">
        <Image
          src={selectedVariant.img}
          alt={selectedVariant.name}
          layout="fill"
          objectFit="contain"
          className="mix-blend-multiply"
        />
        {product.isNew && (
          <span className="bg-primary absolute top-3 left-3 rounded px-2 py-0.5 text-[10px] font-bold text-white uppercase">
            Mới
          </span>
        )}
      </div>

      <h3 className="mb-2 text-xl font-bold">{product.name}</h3>

      <div className="mb-4 flex items-center gap-1">
        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
        <span className="text-sm font-semibold">{product.rating}</span>
        <span className="text-secondary text-sm">({product.reviews})</span>
      </div>

      <div className="mb-6 flex gap-2">
        {product.variants.map(variant => (
          <button
            key={variant.id}
            onClick={() => setSelectedVariant(variant)}
            className={clsx(
              'border-outline h-5 w-5 rounded-full border',
              selectedVariant.id === variant.id &&
                'ring-primary ring-1 ring-offset-2',
            )}
            style={{ backgroundColor: variant.hex }}
          />
        ))}
      </div>

      <div className="mb-6 flex flex-wrap gap-2">
        {product.storage.map(s => (
          <span
            key={s}
            onClick={() => setSelectedStorage(s)}
            className={clsx(
              'rounded-full border px-3 py-1 text-xs font-semibold',
              selectedStorage === s
                ? 'border-primary text-primary'
                : 'border-surface-container-highest text-secondary',
            )}>
            {s}
          </span>
        ))}
      </div>

      <div className="mt-auto mb-6">
        <p className="text-xl font-bold">{product.price}</p>
      </div>

      <div className="flex flex-col gap-3">
        <Link
          href={`/product/${product.id}`}
          className="bg-primary w-full rounded-full py-3 text-center text-sm font-bold text-white transition-transform active:scale-95">
          Mua ngay
        </Link>
        <button
          onClick={() =>
            onAddToCart({
              id: `${product.id}-${selectedVariant.id}-${selectedStorage}`,
              name: product.name,
              price: parsePrice(product.price),
              color: selectedVariant.name,
              storage: selectedStorage,
              image: selectedVariant.img,
            })
          }
          className="border-primary text-primary hover:bg-primary w-full rounded-full border py-3 text-sm font-bold transition-transform hover:text-white active:scale-95">
          Thêm vào giỏ hàng
        </button>
      </div>
    </motion.div>
  );
};

export default ProductItem;
