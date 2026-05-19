'use client';
import { useCart } from '@/providers/cart.provider';
import { ProductDetailVariant, ProductStorage } from '@/types/product.type';
import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import { AccordionsSection } from './_components/accordions';
import { ProductHeader } from './_components/header';
import { ProductHero } from './_components/hero';
import {
  CarePlusSection,
  ColorPicker,
  ProductSelector,
  StorageSelector,
} from './_components/selectors';
import { StickyAddToCart } from './_components/sticky-add-to-cart';
import type { CarePlusSelection } from './_data/product.data';
import { carePlusOptions, productDetail } from './_data/product.data';

export default function DetailPage() {
  const { addToCart: onAddToCart } = useCart();
  const { id } = useParams();
  const router = useRouter();

  const [selectedVariant, setSelectedVariant] = useState<ProductDetailVariant>(
    productDetail.variants.find(v => v.default) || productDetail.variants[0],
  );
  const [selectedStorage, setSelectedStorage] = useState<ProductStorage>(
    productDetail.storage[0],
  );
  const [selectedCare, setSelectedCare] = useState<CarePlusSelection | null>(
    null,
  );
  const [openAccordions, setOpenAccordions] = useState<string[]>([
    'Đánh giá & Xếp hạng',
  ]);

  const totalPrice = selectedStorage.price + (selectedCare?.price ?? 0);

  const handleAddToCart = () => {
    onAddToCart({
      id: `${id}-${selectedVariant.name}-${selectedStorage.size}-${selectedCare?.id ?? 'none'}`,
      name: productDetail.name,
      price: totalPrice,
      color: selectedVariant.name,
      storage: !selectedCare
        ? selectedStorage.size
        : `${selectedStorage.size} + ${selectedCare.label ?? selectedCare.title}`,
      image: selectedVariant.slides[0].src,
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
      <ProductHeader product={productDetail} />
      <ProductHero selectedVariant={selectedVariant} />

      <section className="mt-12 space-y-12 px-5">
        <ProductSelector product={productDetail} />
        <ColorPicker
          variants={productDetail.variants}
          selectedColor={selectedVariant}
          onSelect={setSelectedVariant}
        />
        <StorageSelector
          storage={productDetail.storage}
          selectedStorage={selectedStorage}
          onSelect={setSelectedStorage}
        />
        <CarePlusSection
          options={carePlusOptions}
          selectedCare={selectedCare}
          onSelect={setSelectedCare}
        />
      </section>

      <AccordionsSection
        product={productDetail}
        openAccordions={openAccordions}
        onToggle={toggleAccordion}
      />
      <StickyAddToCart totalPrice={totalPrice} onAddToCart={handleAddToCart} />
    </div>
  );
}
