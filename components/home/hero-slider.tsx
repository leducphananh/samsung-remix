import { Banner } from '@/types/banner.type';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from 'motion/react';
import Image from 'next/image';
import { useRef, useState } from 'react';
import type { Swiper as SwiperType } from 'swiper';
import 'swiper/css';
import { Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

interface Props {
  adBanners: Banner[];
}

const HeroSlider = ({ adBanners }: Props) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const swiperRef = useRef<SwiperType | null>(null);

  const nextSlide = () => swiperRef.current?.slideNext();
  const prevSlide = () => swiperRef.current?.slidePrev();

  return (
    <section className="group relative h-125 w-full overflow-hidden bg-black">
      <Swiper
        modules={[Autoplay]}
        loop
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        speed={600}
        onSwiper={swiper => {
          swiperRef.current = swiper;
        }}
        onSlideChange={swiper => setCurrentSlide(swiper.realIndex)}
        className="h-full w-full">
        {adBanners.map(banner => (
          <SwiperSlide key={banner.id}>
            <div className="relative flex h-125 items-center bg-linear-to-r from-blue-900 to-black">
              <div className="absolute inset-0">
                <Image
                  src={banner.image}
                  alt={banner.title}
                  layout="fill"
                  objectFit="cover"
                  className="opacity-60"
                />
              </div>

              <div className="relative z-10 max-w-2xl px-10 text-white md:px-20">
                <motion.span
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="mb-4 inline-block rounded-full bg-white/20 px-3 py-1 text-xs font-bold tracking-wider uppercase backdrop-blur-md">
                  Galaxy Vision Exclusive
                </motion.span>
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="mb-4 text-4xl font-extrabold md:text-6xl">
                  {banner.title}
                </motion.h1>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="mb-8 text-lg opacity-90 md:text-xl">
                  {banner.subtitle}
                </motion.p>
                <motion.button
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="rounded-full bg-white px-8 py-4 font-bold text-black transition-transform hover:scale-105">
                  Khám phá ngay
                </motion.button>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 z-20 flex -translate-x-1/2 gap-2">
        {adBanners.map((_, idx) => (
          <button
            key={idx}
            onClick={() => swiperRef.current?.slideToLoop(idx)}
            className={`h-1.5 rounded-full transition-all duration-300 ${idx === currentSlide ? 'w-8 bg-white' : 'w-2 bg-white/40'}`}
          />
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-4 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white opacity-0 backdrop-blur-md transition-opacity group-hover:opacity-100">
        <ChevronLeft className="h-6 w-6" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-4 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white opacity-0 backdrop-blur-md transition-opacity group-hover:opacity-100">
        <ChevronRight className="h-6 w-6" />
      </button>
    </section>
  );
};

export default HeroSlider;
