'use client';

import { products as homeProducts } from '@/app/page';
import ProductItem from '@/components/home/product-item';
import { useCart } from '@/providers/cart.provider';
import { Product } from '@/types/product.type';
import { parsePrice } from '@/utils/price.util';
import { ArrowUpDown, Search } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import { useEffect, useMemo, useRef, useState } from 'react';

type ProductListItem = Product & {
  category: string;
};

const categories = ['Tất cả', 'Galaxy S', 'Galaxy Z', 'Galaxy A', 'Phụ kiện'];
const sortOptions = ['Mới nhất', 'Giá cao - thấp', 'Giá thấp - cao'];

const getCategory = (name: string) => {
  if (name.includes('Galaxy S')) return 'Galaxy S';
  if (name.includes('Galaxy Z')) return 'Galaxy Z';
  if (name.includes('Galaxy A')) return 'Galaxy A';
  return 'Phụ kiện';
};

const products: ProductListItem[] = homeProducts.map(product => ({
  ...product,
  category: getCategory(product.name),
}));

export default function ProductListPage() {
  const { addToCart: onAddToCart } = useCart();
  const searchParams = useSearchParams();
  const searchInputRef = useRef<HTMLInputElement>(null);
  const [selectedCategory, setSelectedCategory] = useState('Tất cả');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOption, setSortOption] = useState('Mới nhất');

  useEffect(() => {
    const category = searchParams.get('category');
    if (category && categories.includes(category)) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setSelectedCategory(category);
    }
  }, [searchParams]);

  useEffect(() => {
    if (searchParams.get('focusSearch') === '1') {
      requestAnimationFrame(() => searchInputRef.current?.focus());
    }
  }, [searchParams]);

  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const matchesSearch = product.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesCategory =
        selectedCategory === 'Tất cả' || product.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory]);

  const sortedProducts = useMemo(() => {
    const items = [...filteredProducts];
    if (sortOption === 'Giá cao - thấp') {
      return items.sort((a, b) => parsePrice(b.price) - parsePrice(a.price));
    }
    if (sortOption === 'Giá thấp - cao') {
      return items.sort((a, b) => parsePrice(a.price) - parsePrice(b.price));
    }
    return items;
  }, [filteredProducts, sortOption]);

  return (
    <div className="bg-surface min-h-screen pb-12">
      <div className="bg-surface-container-low border-surface-container-highest border-b px-5 pt-6 pb-4">
        <h1 className="text-2xl font-extrabold">Danh sách sản phẩm</h1>

        <div className="mt-4">
          <div className="relative">
            <Search className="text-secondary absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2" />
            <input
              ref={searchInputRef}
              value={searchTerm}
              onChange={event => setSearchTerm(event.target.value)}
              placeholder="Tìm kiếm sản phẩm..."
              className="border-surface-container-highest bg-surface-container-lowest mt-2 w-full rounded-xl border px-4 py-3 pl-10 text-sm"
            />
          </div>
        </div>

        <div className="hide-scrollbar mt-4 flex items-center gap-3 overflow-x-auto pb-1">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`rounded-full px-4 py-2 text-sm font-semibold whitespace-nowrap transition-all ${
                selectedCategory === category
                  ? 'bg-primary text-white'
                  : 'bg-surface-container-lowest text-secondary border-surface-container-highest border'
              }`}>
              {category}
            </button>
          ))}
        </div>

        <div className="text-secondary mt-3 flex items-center justify-end gap-2 text-sm font-semibold">
          <ArrowUpDown className="h-4 w-4" />
          <span className="text-secondary">Sắp xếp:</span>
          <select
            value={sortOption}
            onChange={event => setSortOption(event.target.value)}
            className="text-primary bg-transparent text-sm font-semibold outline-none">
            {sortOptions.map(option => (
              <option key={option} value={option} className="text-primary">
                {option}
              </option>
            ))}
          </select>
        </div>
      </div>

      <section className="px-5 pt-6">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {sortedProducts.map(product => (
            <ProductItem
              key={product.id}
              product={product}
              onAddToCart={onAddToCart}
              compact
            />
          ))}
        </div>
      </section>
    </div>
  );
}
