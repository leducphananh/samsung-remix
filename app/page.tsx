'use client';
import { getBanners } from '@/api/banner.api';
import { getProducts } from '@/api/products.api';
import HeroSlider from '@/components/home/hero-slider';
import ProductList from '@/components/home/product-list';
import { useCart } from '@/providers/cart.provider';
import { useSearchQuery } from '@/providers/search-query.provider';
import { Banner } from '@/types/banner.type';
import { Product } from '@/types/product.type';
import { parsePrice } from '@/utils/price.util';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function DiscoveryPage() {
  const { searchQuery } = useSearchQuery();
  const { addToCart: onAddToCart } = useCart();
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState('Tất cả');
  const [priceRange, setPriceRange] = useState('Tất cả');
  const { data: products = [] } = useQuery<Product[]>({
    queryKey: ['products'],
    queryFn: getProducts,
  });
  const { data: banners = [] } = useQuery<Banner[]>({
    queryKey: ['banners'],
    queryFn: getBanners,
  });

  const handleCategoryClick = (category: string) => {
    if (['Galaxy S', 'Galaxy Z', 'Galaxy A', 'Phụ kiện'].includes(category)) {
      router.push(`/product-list?category=${encodeURIComponent(category)}`);
      return;
    }
    setSelectedCategory(category);
  };

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

  return (
    <div className="bg-surface pb-12">
      {/* Hero Slider */}
      <HeroSlider adBanners={banners} />

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
                  onClick={() => handleCategoryClick(cat)}
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
      <ProductList products={filteredProducts} onAddToCart={onAddToCart} />
    </div>
  );
}
