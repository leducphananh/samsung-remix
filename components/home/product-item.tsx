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
  compact?: boolean;
}

const ProductItem = ({ product, onAddToCart, compact = false }: Props) => {
  const [selectedVariant, setSelectedVariant] = useState(
    product.variants.find(v => v.default) || product.variants[0],
  );
  const [selectedStorage, setSelectedStorage] = useState(product.storage[0]);

  return (
    <motion.div
      whileHover={{ y: -4 }}
      className={clsx(
        'bg-surface-container-lowest border-surface-container-highest flex flex-col rounded-xl border',
        compact ? 'p-4' : 'p-6',
      )}>
      <div
        className={clsx(
          'bg-surface-container-low relative aspect-square w-full',
          compact ? 'mb-4 rounded-md p-3' : 'mb-6 rounded-lg p-4',
        )}>
        <Image
          src={selectedVariant.img}
          alt={selectedVariant.name}
          layout="fill"
          objectFit="contain"
          className="mix-blend-multiply"
        />
        {product.isNew && (
          <span
            className={clsx(
              'bg-primary absolute top-3 left-3 rounded font-bold text-white uppercase',
              compact ? 'px-1.5 py-0.5 text-[9px]' : 'px-2 py-0.5 text-[10px]',
            )}>
            Mới
          </span>
        )}
      </div>

      <h3
        className={clsx(
          'font-bold',
          compact ? 'mb-1 text-base' : 'mb-2 text-xl',
        )}>
        {product.name}
      </h3>

      <div
        className={clsx('flex items-center gap-1', compact ? 'mb-3' : 'mb-4')}>
        <Star
          className={clsx(
            'fill-yellow-400 text-yellow-400',
            compact ? 'h-3.5 w-3.5' : 'h-4 w-4',
          )}
        />
        <span
          className={clsx('font-semibold', compact ? 'text-xs' : 'text-sm')}>
          {product.rating}
        </span>
        <span
          className={clsx('text-secondary', compact ? 'text-xs' : 'text-sm')}>
          ({product.reviews})
        </span>
      </div>

      <div className={clsx('flex gap-2', compact ? 'mb-4' : 'mb-6')}>
        {product.variants.map(variant => (
          <button
            key={variant.id}
            onClick={() => setSelectedVariant(variant)}
            className={clsx(
              'border-outline rounded-full border',
              compact ? 'h-4 w-4' : 'h-5 w-5',
              selectedVariant.id === variant.id &&
                'ring-primary ring-1 ring-offset-2',
            )}
            style={{ backgroundColor: variant.hex }}
          />
        ))}
      </div>

      <div className={clsx('flex flex-wrap gap-2', compact ? 'mb-4' : 'mb-6')}>
        {product.storage.map(s => (
          <span
            key={s}
            onClick={() => setSelectedStorage(s)}
            className={clsx(
              'rounded-full border font-semibold',
              compact ? 'px-2 py-0.5 text-[10px]' : 'px-3 py-1 text-xs',
              selectedStorage === s
                ? 'border-primary text-primary'
                : 'border-surface-container-highest text-secondary',
            )}>
            {s}
          </span>
        ))}
      </div>

      <div className={clsx('mt-auto', compact ? 'mb-4' : 'mb-6')}>
        <p className={clsx('font-bold', compact ? 'text-base' : 'text-xl')}>
          {product.price}
        </p>
      </div>

      <div className={clsx('flex flex-col', compact ? 'gap-2' : 'gap-3')}>
        <Link
          href={`/product/${product.id}`}
          className={clsx(
            'bg-primary w-full rounded-full text-center font-bold text-white transition-transform active:scale-95',
            compact ? 'py-2 text-xs' : 'py-3 text-sm',
          )}>
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
          className={clsx(
            'border-primary text-primary hover:bg-primary w-full rounded-full border font-bold transition-transform hover:text-white active:scale-95',
            compact ? 'py-2 text-xs' : 'py-3 text-sm',
          )}>
          Thêm vào giỏ hàng
        </button>
      </div>
    </motion.div>
  );
};

export default ProductItem;
