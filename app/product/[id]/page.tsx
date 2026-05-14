'use client';
import { useCart } from '@/providers/cart.provider';
import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';

import { AccordionsSection } from './_components/accordions';
import { ProductHeader } from './_components/header';
import { ProductHero } from './_components/hero';
import { PromoSection } from './_components/promo-section';
import {
  CarePlusSection,
  ColorPicker,
  ProductSelector,
  StorageSelector,
  TradeInSection,
} from './_components/selectors';
import { StickyAddToCart } from './_components/sticky-add-to-cart';
import type {
  CarePlusOption,
  ProductColor,
  ProductStorage,
} from './_data/product.data';
import { carePlusOptions, products } from './_data/product.data';

export default function DetailPage() {
  const { addToCart: onAddToCart } = useCart();
  const { id } = useParams();
  const router = useRouter();
  const product =
    products[id as keyof typeof products] || products['s24-ultra'];

  const [selectedColor, setSelectedColor] = useState<ProductColor>(
    product.colors[0],
  );
  const [selectedStorage, setSelectedStorage] = useState<ProductStorage>(
    product.storage[0],
  );
  const [selectedCare, setSelectedCare] = useState<CarePlusOption>(
    carePlusOptions[0],
  );
  const [openAccordions, setOpenAccordions] = useState<string[]>([
    'Đánh giá & Xếp hạng',
  ]);

  const totalPrice = selectedStorage.price + selectedCare.price;

  const handleAddToCart = () => {
    onAddToCart({
      id: `${id}-${selectedColor.name}-${selectedStorage.size}-${selectedCare.id}`,
      name: product.name,
      price: totalPrice,
      color: selectedColor.name,
      storage:
        selectedCare.id === 'none'
          ? selectedStorage.size
          : `${selectedStorage.size} + ${selectedCare.name}`,
      image: product.image,
    });
    router.push('/cart');
  };

  const toggleAccordion = (item: string) => {
    setOpenAccordions(prev =>
      prev.includes(item) ? prev.filter(i => i !== item) : [...prev, item],
    );
  };

  return (
    <div className="bg-surface min-h-screen pb-40">
      <ProductHeader product={product} />
      <ProductHero product={product} />

      <section className="mt-12 space-y-12 px-5">
        <ProductSelector product={product} />
        <ColorPicker
          colors={product.colors}
          selectedColor={selectedColor}
          onSelect={setSelectedColor}
        />
        <StorageSelector
          storage={product.storage}
          selectedStorage={selectedStorage}
          onSelect={setSelectedStorage}
        />
        <TradeInSection />
        <CarePlusSection
          options={carePlusOptions}
          selectedCare={selectedCare}
          onSelect={setSelectedCare}
        />
      </section>

      <AccordionsSection
        product={product}
        openAccordions={openAccordions}
        onToggle={toggleAccordion}
      />
      <PromoSection />
      <StickyAddToCart totalPrice={totalPrice} onAddToCart={handleAddToCart} />
    </div>
  );
}
