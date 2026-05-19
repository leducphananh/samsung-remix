'use client';
import ProductItem from '@/components/home/product-item';
import { useCart } from '@/providers/cart.provider';
import { useSearchQuery } from '@/providers/search-query.provider';
import { Product } from '@/types/product.type';
import { parsePrice } from '@/utils/price.util';
import { ChevronLeft, ChevronRight, Search } from 'lucide-react';
import { motion } from 'motion/react';
import Image from 'next/image';
import { useRef, useState } from 'react';
import type { Swiper as SwiperType } from 'swiper';
import 'swiper/css';
import { Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

const adBanners = [
  {
    id: 1,
    title: 'Galaxy S24 Ultra',
    subtitle: 'Quyền năng Galaxy AI',
    image:
      'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&q=80&w=1200',
    color: 'from-blue-900 to-black',
  },
  {
    id: 2,
    title: 'Galaxy Z Flip5',
    subtitle: 'Nhập hội linh hoạt',
    image:
      'https://images.unsplash.com/photo-1691238914619-354392408666?auto=format&fit=crop&q=80&w=1200',
    color: 'from-purple-900 to-black',
  },
  {
    id: 3,
    title: 'Galaxy Watch6',
    subtitle: 'Theo dõi sức khỏe thông minh',
    image:
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=1200',
    color: 'from-gray-800 to-black',
  },
  {
    id: 4,
    title: 'Galaxy Buds2 Pro',
    subtitle: 'Âm thanh chân thực',
    image:
      'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&q=80&w=1200',
    color: 'from-indigo-900 to-black',
  },
  {
    id: 5,
    title: 'Galaxy Tab S9 Ultra',
    subtitle: 'Sáng tạo không giới hạn',
    image:
      'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&q=80&w=1200',
    color: 'from-teal-900 to-black',
  },
];

const products: Product[] = [
  {
    id: 's26-ultra',
    name: 'Galaxy S26 Ultra',
    price: '33.990.000 VNĐ',
    rating: 4.8,
    reviews: 2342,
    variants: [
      {
        id: 1,
        name: 'Trắng Classic',
        hex: '#f3f4f5',
        img: 'https://images.samsung.com/is/image/samsung/p6pim/vn/s2602/gallery/vn-galaxy-s26-ultra-s948-sm-s948bzwcxxv-thumb-550804953?$Q90_330_330_F_PNG$',
      },
      {
        id: 2,
        name: 'Xanh Sky Blue',
        hex: '#b3cbd9',
        img: 'https://images.samsung.com/is/image/samsung/p6pim/vn/s2602/gallery/vn-galaxy-s26-ultra-s948-sm-s948blbcxxv-thumb-550804058?$Q90_330_330_F_PNG$',
      },
      {
        id: 3,
        name: 'Đen Classic',
        hex: '#494d53',
        img: 'https://images.samsung.com/is/image/samsung/p6pim/vn/s2602/gallery/vn-galaxy-s26-ultra-s948-sm-s948bzkcxxv-thumb-550804317?$Q90_330_330_F_PNG$',
      },
      {
        id: 4,
        name: 'Tím Cobalt',
        hex: '#686884',
        img: 'https://images.samsung.com/is/image/samsung/p6pim/vn/s2602/gallery/vn-galaxy-s26-ultra-s948-sm-s948bzvcxxv-thumb-550804756?$Q90_330_330_F_PNG$',
        default: true,
      },
    ],
    storage: ['256GB', '512GB', '1TB'],
    isNew: true,
  },
  {
    id: 's26-plus',
    name: 'Galaxy S26+',
    price: '26.990.000 VNĐ',
    rating: 4.7,
    reviews: 1215,
    variants: [
      {
        id: 1,
        name: 'Trắng Classic',
        hex: '#f3f4f5',
        img: 'https://images.samsung.com/is/image/samsung/p6pim/vn/s2602/gallery/vn-galaxy-s26-s947-578558-sm-s947bzwcxxv-thumb-551023857?$Q90_330_330_F_PNG$',
      },
      {
        id: 2,
        name: 'Xanh Sky Blue',
        hex: '#b3cbd9',
        img: 'https://images.samsung.com/is/image/samsung/p6pim/vn/s2602/gallery/vn-galaxy-s26-s947-578558-sm-s947blbcxxv-thumb-551023800?$Q90_330_330_F_PNG$',
      },
      {
        id: 3,
        name: 'Đen Classic',
        hex: '#494d53',
        img: 'https://images.samsung.com/is/image/samsung/p6pim/vn/s2602/gallery/vn-galaxy-s26-s947-578558-sm-s947bzkcxxv-thumb-551023819?$Q90_330_330_F_PNG$',
      },
      {
        id: 4,
        name: 'Tím Cobalt',
        hex: '#686884',
        img: 'https://images.samsung.com/is/image/samsung/p6pim/vn/s2602/gallery/vn-galaxy-s26-s947-578558-sm-s947bzvcxxv-thumb-551023838?$Q90_330_330_F_PNG$',
        default: true,
      },
    ],
    storage: ['256GB', '512GB'],
    isNew: false,
  },
  {
    id: 's26',
    name: 'Galaxy S26',
    price: '10.490.000 VNĐ',
    rating: 4.5,
    reviews: 876,
    variants: [
      {
        id: 1,
        name: 'Trắng Classic',
        hex: '#f3f4f5',
        img: 'https://images.samsung.com/is/image/samsung/p6pim/vn/s2602/gallery/vn-galaxy-s26-s942-sm-s942bzwqxxv-thumb-550887061?$Q90_330_330_F_PNG$',
      },
      {
        id: 2,
        name: 'Xanh Sky Blue',
        hex: '#b3cbd9',
        img: 'https://images.samsung.com/is/image/samsung/p6pim/vn/s2602/gallery/vn-galaxy-s26-s942-sm-s942blbqxxv-thumb-550886945?$Q90_330_330_F_PNG$',
      },
      {
        id: 3,
        name: 'Đen Classic',
        hex: '#494d53',
        img: 'https://images.samsung.com/is/image/samsung/p6pim/vn/s2602/gallery/vn-galaxy-s26-s942-sm-s942bzkqxxv-thumb-550886984?$Q90_330_330_F_PNG$',
      },
      {
        id: 4,
        name: 'Tím Cobalt',
        hex: '#686884',
        img: 'https://images.samsung.com/is/image/samsung/p6pim/vn/s2602/gallery/vn-galaxy-s26-s942-sm-s942bzvqxxv-thumb-550887023?$Q90_330_330_F_PNG$',
        default: true,
      },
    ],
    storage: ['128GB', '256GB'],
    isNew: false,
  },
];

export default function DiscoveryPage() {
  const { searchQuery } = useSearchQuery();
  const { addToCart: onAddToCart } = useCart();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState('Tất cả');
  const [priceRange, setPriceRange] = useState('Tất cả');
  const swiperRef = useRef<SwiperType | null>(null);

  const priceRanges = [
    { label: 'Tất cả', min: 0, max: Infinity },
    { label: 'Dưới 15tr', min: 0, max: 15000000 },
    { label: '15tr - 30tr', min: 15000000, max: 30000000 },
    { label: 'Trên 30tr', min: 30000000, max: Infinity },
  ];

  const filteredProducts = products.filter(p => {
    const matchesSearch = p.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === 'Tất cả' || p.name.includes(selectedCategory);

    const currentRange = priceRanges.find(r => r.label === priceRange);
    const pPrice = parsePrice(p.price);
    const matchesPrice =
      !currentRange ||
      (pPrice >= currentRange.min && pPrice < currentRange.max);

    return matchesSearch && matchesCategory && matchesPrice;
  });

  const nextSlide = () => swiperRef.current?.slideNext();
  const prevSlide = () => swiperRef.current?.slidePrev();

  return (
    <div className="bg-surface pb-12">
      {/* Hero Slider */}
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
              <div
                className={`relative flex h-125 items-center bg-linear-to-r ${banner.color}`}>
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

      {/* Filters Overlay */}
      <div className="bg-surface/95 border-surface-container-highest sticky top-14 z-40 border-b backdrop-blur-md">
        <div className="space-y-4 px-5 py-4">
          {/* Categories */}
          <div className="hide-scrollbar flex items-center gap-6 overflow-x-auto">
            <span className="text-secondary min-w-fit text-[10px] font-bold tracking-widest uppercase">
              Dòng máy:
            </span>
            {['Tất cả', 'Galaxy S', 'Galaxy Z', 'Galaxy A', 'Phụ kiện'].map(
              cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`pb-1 text-sm font-medium whitespace-nowrap transition-all ${selectedCategory === cat ? 'text-primary border-primary border-b-2' : 'text-secondary hover:text-primary'}`}>
                  {cat}
                </button>
              ),
            )}
          </div>

          {/* Price Filters */}
          <div className="hide-scrollbar flex items-center gap-3 overflow-x-auto">
            <span className="text-secondary min-w-fit text-[10px] font-bold tracking-widest uppercase">
              Mức giá:
            </span>
            {priceRanges.map(range => (
              <button
                key={range.label}
                onClick={() => setPriceRange(range.label)}
                className={`rounded-full px-4 py-1.5 text-xs font-bold whitespace-nowrap transition-all ${priceRange === range.label ? 'bg-primary text-white' : 'bg-surface-container-low text-secondary hover:bg-surface-container'}`}>
                {range.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Grid */}
      <section className="px-5 py-8">
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredProducts.map(product => (
              <ProductItem
                key={product.id}
                product={product}
                onAddToCart={onAddToCart}
              />
            ))}
          </div>
        ) : (
          <div className="py-20 text-center">
            <Search className="text-surface-container-highest mx-auto mb-4 h-12 w-12" />
            <p className="text-secondary">
              Không tìm thấy sản phẩm phù hợp với &quot;{searchQuery}&quot;
            </p>
          </div>
        )}
      </section>

      {/* Promo */}
      <section className="px-5 py-12">
        <div className="relative flex flex-col items-center overflow-hidden rounded-2xl bg-black p-8 text-center text-white">
          <div className="z-10">
            <h2 className="mb-4 text-2xl font-bold">
              Lên đời Galaxy - Nhận ngay ưu đãi
            </h2>
            <p className="mb-6 text-sm opacity-80">
              Thu cũ đổi mới hỗ trợ lên đến 5.000.000 VNĐ.
            </p>
            <button className="rounded-full bg-white px-8 py-3 text-sm font-bold text-black">
              Khám phá ngay
            </button>
          </div>
          <div className="absolute inset-0 opacity-30">
            <Image
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuC5qv2K0qxyYI37o2_7aJ32Wu__U_L-HwtnEPWa9Srf2uKXu2RJAvLZ26mjrkXQaRa3oA7_bygtclevpRrRhnAkXqbbaIT4JNKn80xW1dZR2VvDDgdH4lgRS3c28Q0cx3q189lHCazthkJcIOK4SuTejfrwKiHtNJ04GgEl3hGWkVRJ5_Y8JFmOX2c_FvM4V3DGAu6YtyW7i0fHW25EQzz_Zqu5WCr7cIGuvLWZyh7KLUoq6LgGm0Ezk8n7N1rl81GcOgHSALnK024"
              alt="Promo background"
              layout="fill"
              objectFit="cover"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
