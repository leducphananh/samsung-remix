import { ProductDetailVariant } from '@/types/product.type';
import clsx from 'clsx';
import Image from 'next/image';
import { useRef, useState } from 'react';
import type { Swiper as SwiperType } from 'swiper';
import 'swiper/css';
import { Swiper, SwiperSlide } from 'swiper/react';

export function ProductHero({
  selectedVariant,
}: {
  selectedVariant: ProductDetailVariant;
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const swiperRef = useRef<SwiperType | null>(null);

  return (
    <section className="bg-surface-container relative mt-8 flex flex-col items-center py-12">
      <Swiper
        loop
        className="w-full"
        onSwiper={swiper => {
          swiperRef.current = swiper;
        }}
        onSlideChange={swiper => setActiveIndex(swiper.realIndex)}>
        {selectedVariant.slides.map(slide => (
          <SwiperSlide key={slide.alt}>
            <div className="flex items-center justify-center">
              <Image
                src={slide.src}
                alt={slide.alt}
                width={600}
                height={400}
                className="h-auto min-h-86 w-4/5 object-contain"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="mt-8 flex justify-center gap-2">
        {selectedVariant.slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => swiperRef.current?.slideToLoop(idx)}
            aria-label={`Chuyển tới ảnh ${idx + 1}`}
            className={clsx(
              'h-2 w-2 rounded-full',
              idx === activeIndex
                ? 'bg-primary'
                : 'bg-surface-container-highest',
            )}
          />
        ))}
      </div>
    </section>
  );
}
