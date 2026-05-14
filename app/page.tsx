'use client';
import { useCart } from '@/providers/cart.provider';
import { useSearchQuery } from '@/providers/search-query.provider';
import { ChevronLeft, ChevronRight, Search, Star } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

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

const products = [
  {
    id: 's24-ultra',
    name: 'Galaxy S24 Ultra',
    price: '33.990.000 VNĐ',
    rating: 4.8,
    reviews: 2342,
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuD3ZmsC7FZ1WjuQZ3PGqK9oGfL69ON2VCWtx6g_vyE4Sw4eZSWmmnvQP4pK6EmiEiTNrckqgZI3T2XfXf-N8PA0hGHRbsDHsREe0hM0gEZOEIMGkIsgDqRWXozzwACZsnLFg5s0Bwf0iknHccaTOmgYNttoz99qN5qSbMHdWeNFMCExfGOJMo0QypWJI9jbDuMa60tRDQ-ttfT4J-ybTzokSNbaa2Mdxa0a12gLycLDO4d3s-Yg1eEP2HMmh-L0j0DSZGLTZTTvsvo',
    colors: ['#53565A', '#E3E4E6', '#3D3E42'],
    storage: ['256GB', '512GB', '1TB'],
    isNew: true,
  },
  {
    id: 's24-plus',
    name: 'Galaxy S24+',
    price: '26.990.000 VNĐ',
    rating: 4.7,
    reviews: 1215,
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBP6nzocz3mI5LkYvnfX3rKr7jBcc9WSEeSBZ26iLFz_yTz_Q14hOYajbYQkoEhVbOSxWwhO5qLq55dl-mqB_jfrLu-82zVW3xQM4NyBUlM_cx30RGdt4-WQHAENSBl0Csa9SXXcr3KnmY_mfrH4P2-JrQ6HEmqm7I6ZDGtkHXKXSF2LKBQtnr_KAC-NLuVHcYVMskiyUuNvKYz3QDAzU_D-iEUlKF_Tn36A64QhaGk0r2W7vyXqmDFMq9ZwZjSt9HMqXNFsTIKv3Q',
    colors: ['#53565A', '#E3E4E6', '#3D3E42'],
    storage: ['256GB', '512GB'],
    isNew: false,
  },
  {
    id: 'a54',
    name: 'Galaxy A54 5G',
    price: '10.490.000 VNĐ',
    rating: 4.5,
    reviews: 876,
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBeavh-9YaFxA6Ik8Fo22JyGOrVDrpJi7QKRYPBcIR_jekKV8XbeDshv2mIFTg-mXqIoKfpje4pjy4IFSgjqUJulb8xXpQ5YgI23rwN80ycWzMXOhg-_2TdxDaamOlEvBkVfOMR4I4hoemJ42Faez911lewp3WMV47jyVpy8NRsyVU1NpfckB9ELQd9rTS8t7e4P21KnNO4moOiu0T26X0UhjCdG9O7eWxKdtVL1DpTu_wRYCHxRBcrqHJxgUfYieURk46Mt17Fh6w',
    colors: ['#B3E5BE', '#202124', '#FFFFFF'],
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

  const handleAddToCartFromList = (product: (typeof products)[0]) => {
    onAddToCart({
      id: `${product.id}-default`,
      name: product.name,
      price: parsePrice(product.price),
      color: 'Mặc định',
      storage: product.storage[0],
      image: product.image,
    });
  };

  const priceRanges = [
    { label: 'Tất cả', min: 0, max: Infinity },
    { label: 'Dưới 15tr', min: 0, max: 15000000 },
    { label: '15tr - 30tr', min: 15000000, max: 30000000 },
    { label: 'Trên 30tr', min: 30000000, max: Infinity },
  ];

  const parsePrice = (priceStr: string) => {
    return parseInt(priceStr.replace(/\D/g, ''));
  };

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

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % adBanners.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () =>
    setCurrentSlide(prev => (prev + 1) % adBanners.length);
  const prevSlide = () =>
    setCurrentSlide(prev => (prev - 1 + adBanners.length) % adBanners.length);

  return (
    <div className="bg-surface pb-12">
      {/* Hero Slider */}
      <section className="group relative h-125 w-full overflow-hidden bg-black">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
            className={`absolute inset-0 flex items-center bg-linear-to-r ${adBanners[currentSlide].color}`}>
            <div className="absolute inset-0">
              <Image
                src={adBanners[currentSlide].image}
                alt={adBanners[currentSlide].title}
                layout="fill"
                objectFit="cover"
                className="opacity-60"
              />
              {/* <img
                src={adBanners[currentSlide].image}
                alt={adBanners[currentSlide].title}
                className="h-full w-full object-cover opacity-60"
              /> */}
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
                {adBanners[currentSlide].title}
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="mb-8 text-lg opacity-90 md:text-xl">
                {adBanners[currentSlide].subtitle}
              </motion.p>
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="rounded-full bg-white px-8 py-4 font-bold text-black transition-transform hover:scale-105">
                Khám phá ngay
              </motion.button>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Slide Indicators */}
        <div className="absolute bottom-8 left-1/2 z-20 flex -translate-x-1/2 gap-2">
          {adBanners.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
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
              <motion.div
                key={product.id}
                whileHover={{ y: -4 }}
                className="bg-surface-container-lowest border-surface-container-highest flex flex-col rounded-xl border p-6">
                <div className="bg-surface-container-low relative mb-6 aspect-square w-full rounded-lg p-4">
                  {/* <img
                    src={product.image}
                    alt={product.name}
                    className="h-full w-full object-contain mix-blend-multiply"
                  /> */}
                  <Image
                    src={product.image}
                    alt={product.name}
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
                  <span className="text-sm font-semibold">
                    {product.rating}
                  </span>
                  <span className="text-secondary text-sm">
                    ({product.reviews})
                  </span>
                </div>

                <div className="mb-6 flex gap-2">
                  {product.colors.map((color, idx) => (
                    <div
                      key={idx}
                      className={`border-outline h-5 w-5 rounded-full border ${idx === 0 ? 'ring-primary ring-1 ring-offset-2' : ''}`}
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>

                <div className="mb-6 flex flex-wrap gap-2">
                  {product.storage.map((s, idx) => (
                    <span
                      key={s}
                      className={`rounded-full border px-3 py-1 text-xs font-semibold ${idx === 0 ? 'border-primary text-primary' : 'border-surface-container-highest text-secondary'}`}>
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
                    onClick={() => handleAddToCartFromList(product)}
                    className="border-primary text-primary hover:bg-primary w-full rounded-full border py-3 text-sm font-bold transition-transform hover:text-white active:scale-95">
                    Thêm vào giỏ hàng
                  </button>
                </div>
              </motion.div>
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
            {/* <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuC5qv2K0qxyYI37o2_7aJ32Wu__U_L-HwtnEPWa9Srf2uKXu2RJAvLZ26mjrkXQaRa3oA7_bygtclevpRrRhnAkXqbbaIT4JNKn80xW1dZR2VvDDgdH4lgRS3c28Q0cx3q189lHCazthkJcIOK4SuTejfrwKiHtNJ04GgEl3hGWkVRJ5_Y8JFmOX2c_FvM4V3DGAu6YtyW7i0fHW25EQzz_Zqu5WCr7cIGuvLWZyh7KLUoq6LgGm0Ezk8n7N1rl81GcOgHSALnK024"
              className="h-full w-full object-cover"
            /> */}
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
