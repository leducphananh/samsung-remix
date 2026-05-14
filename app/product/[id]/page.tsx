'use client';
import { useCart } from '@/providers/cart.provider';
import {
  CheckCircle,
  ChevronDown,
  Sparkles,
  Star,
  ArrowRightLeft as SwapIcon,
} from 'lucide-react';
import { motion } from 'motion/react';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';

const products = {
  's24-ultra': {
    name: 'Galaxy S24 Ultra',
    price: 33990000,
    rating: 4.7,
    reviews: 1248,
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuC1tJp-G6ehRlr--Sr4U4Z6wbXU6u5CEjdarbODlnXfH3jo1WZKUeRW5aDkdaGw0zVs9AJbJSMtYi_Ij_satv9N8tgyk8AT1mPCRjG7IY3Au39hheLPBSM5M1oUe-d4ufOTOoa-MMtAk0AFAQc-SSA9DK-p1QcTXLgg7eovnAWa_fazTgSrHwrvQDnzh8w2nmz8PZMNwQqcRy-qO-uop4m0O0XwHRvlJoLyfAqK74EuppjXdXJQ3A7A6a4zljhHIv0_vaWNrxL9rH0',
    colors: [
      { name: 'Xám Titanium', value: '#8E8E8E' },
      { name: 'Đen Titanium', value: '#1A1A1A' },
      { name: 'Tím Titanium', value: '#5C5070' },
      { name: 'Vàng Titanium', value: '#F3E5AB' },
    ],
    storage: [
      { size: '256 GB', price: 33990000 },
      { size: '512 GB', price: 37490000 },
      { size: '1 TB', price: 44490000 },
    ],
  },
};

export default function DetailPage() {
  const { addToCart: onAddToCart } = useCart();
  const { id } = useParams();
  const router = useRouter();
  const product =
    products[id as keyof typeof products] || products['s24-ultra'];

  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [selectedStorage, setSelectedStorage] = useState(product.storage[0]);

  const handleAddToCart = () => {
    onAddToCart({
      id: `${id}-${selectedColor.name}-${selectedStorage.size}`,
      name: product.name,
      price: selectedStorage.price,
      color: selectedColor.name,
      storage: selectedStorage.size,
      image: product.image,
    });
    router.push('/cart');
  };

  const [openAccordions, setOpenAccordions] = useState<string[]>([]);

  const toggleAccordion = (item: string) => {
    setOpenAccordions(prev =>
      prev.includes(item) ? prev.filter(i => i !== item) : [...prev, item],
    );
  };

  const productFeatures = {
    'Tính năng nổi bật': [
      {
        title: 'Quyền năng Galaxy AI',
        desc: 'Mở ra kỷ nguyên trí tuệ mới với Khoanh vùng search đa năng, Phiên dịch trực tiếp cuộc gọi và Trợ lý Note thông minh.',
      },
      {
        title: 'Chipset Snapdragon® 8 Gen 3',
        desc: 'Hiệu năng mạnh mẽ nhất từ trước đến nay trên dòng Galaxy, tối ưu cho chơi game và đa nhiệm mượt mà.',
      },
      {
        title: 'Màn hình 2600 nits',
        desc: 'Màn hình Dynamic AMOLED 2X sáng nhất thế giới, cho trải nghiệm nhìn rõ ràng ngay cả dưới ánh nắng gắt.',
      },
    ],
  };

  return (
    <div className="bg-surface min-h-screen pb-40">
      <section className="px-5 pt-8">
        <h1 className="text-2xl font-bold">{product.name}</h1>
        <div className="mt-1 flex items-center gap-4">
          <div className="flex">
            {[1, 2, 3, 4].map(i => (
              <Star key={i} className="fill-primary text-primary h-3 w-3" />
            ))}
            <Star className="text-primary h-3 w-3" />
          </div>
          <span className="text-secondary text-xs font-medium">
            {product.rating} ({product.reviews} Đánh giá)
          </span>
        </div>
      </section>

      {/* Hero Image */}
      <section className="bg-surface-container relative mt-8 flex flex-col items-center py-12">
        {/* <img
          src={product.image}
          alt={product.name}
          className="h-auto w-4/5 object-contain"
        /> */}
        <Image
          src={product.image}
          alt={product.name}
          width={600}
          height={400}
          className="h-auto w-4/5 object-contain"
        />
        <div className="mt-8 flex justify-center gap-2">
          <div className="bg-primary h-2 w-2 rounded-full" />
          <div className="bg-surface-container-highest h-2 w-2 rounded-full" />
          <div className="bg-surface-container-highest h-2 w-2 rounded-full" />
        </div>
      </section>

      {/* Configuration */}
      <section className="mt-12 space-y-12 px-5">
        {/* Model */}
        <div>
          <label className="mb-4 block text-sm font-bold">
            1. Chọn dòng máy
          </label>
          <div className="border-primary flex items-center justify-between rounded-xl border-2 bg-white p-4 shadow-sm">
            <div>
              <p className="font-bold">{product.name}</p>
              <p className="text-secondary text-xs">
                Màn hình 6.8 inch, Camera 200MP
              </p>
            </div>
            <CheckCircle className="fill-primary h-6 w-6 text-white" />
          </div>
        </div>

        {/* Colors */}
        <div>
          <label className="mb-1 block text-sm font-bold">
            2. Chọn màu sắc
          </label>
          <p className="mb-4 text-sm">{selectedColor.name}</p>
          <div className="flex gap-4">
            {product.colors.map(color => (
              <button
                key={color.name}
                onClick={() => setSelectedColor(color)}
                className={`h-12 w-12 rounded-full border-2 p-0.5 transition-all ${selectedColor.name === color.name ? 'border-primary' : 'border-transparent'}`}>
                <div
                  className="h-full w-full rounded-full"
                  style={{ backgroundColor: color.value }}
                />
              </button>
            ))}
          </div>
        </div>

        {/* Storage */}
        <div>
          <label className="mb-4 block text-sm font-bold">
            3. Dung lượng lưu trữ
          </label>
          <div className="grid grid-cols-1 gap-3">
            {product.storage.map(s => (
              <button
                key={s.size}
                onClick={() => setSelectedStorage(s)}
                className={`flex items-center justify-between rounded-xl border-2 p-4 transition-all ${selectedStorage.size === s.size ? 'border-primary bg-white' : 'border-surface-container-highest bg-surface'}`}>
                <span className="font-bold">{s.size}</span>
                <span className="text-sm font-bold">
                  {s.price.toLocaleString()}₫
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Trade-in */}
        <div className="bg-surface-container-low space-y-4 rounded-xl p-5">
          <div className="flex items-center gap-2">
            <SwapIcon className="h-5 w-5" />
            <span className="text-xl font-bold">Thu cũ đổi mới</span>
          </div>
          <p className="text-sm leading-relaxed">
            Nhận ngay ưu đãi trợ giá lên đến{' '}
            <span className="font-bold">5.000.000₫</span> khi thu cũ đổi mới
            thiết bị đủ điều kiện.
          </p>
          <button className="border-primary w-full rounded-full border py-3 text-sm font-bold transition-transform active:scale-95">
            Kiểm tra điều kiện
          </button>
        </div>
      </section>

      {/* Accordions */}
      <section className="border-surface-container-highest mt-12 border-t px-5">
        {[
          'Tính năng nổi bật',
          'Thông số kỹ thuật',
          'Trong hộp có gì',
          'Đánh giá & Xếp hạng',
        ].map(item => (
          <div key={item} className="border-surface-container-highest border-b">
            <div
              onClick={() => toggleAccordion(item)}
              className="flex cursor-pointer items-center justify-between py-5">
              <span className="text-sm font-bold">{item}</span>
              <motion.div
                animate={{ rotate: openAccordions.includes(item) ? 180 : 0 }}
                transition={{ duration: 0.2 }}>
                <ChevronDown className="text-secondary h-5 w-5" />
              </motion.div>
            </div>

            {openAccordions.includes(item) && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden">
                <div className="space-y-6 pb-6">
                  {item === 'Tính năng nổi bật' ? (
                    productFeatures['Tính năng nổi bật'].map((feature, idx) => (
                      <div key={idx} className="space-y-1">
                        <h4 className="text-primary text-sm font-bold">
                          {feature.title}
                        </h4>
                        <p className="text-secondary text-xs leading-relaxed">
                          {feature.desc}
                        </p>
                      </div>
                    ))
                  ) : (
                    <p className="text-secondary text-xs italic">
                      Thông tin đang được cập nhật...
                    </p>
                  )}
                </div>
              </motion.div>
            )}
          </div>
        ))}
      </section>

      {/* Galaxy AI Banner */}
      <section className="relative mx-5 my-12 flex min-h-40 flex-col justify-center overflow-hidden rounded-xl bg-black p-8 text-white">
        <div className="relative z-10">
          <h3 className="text-xl font-bold">Galaxy AI đã xuất hiện.</h3>
          <p className="mt-1 text-sm opacity-80">
            Trải nghiệm kỷ nguyên mới của trí tuệ di động.
          </p>
          <button className="mt-4 text-xs font-bold underline">
            Tìm hiểu thêm
          </button>
        </div>
        <Sparkles className="absolute -right-4 -bottom-4 h-40 w-40 rotate-12 opacity-20" />
      </section>

      {/* Sticky Bar */}
      <div className="border-surface-container-highest fixed bottom-0 left-0 z-60 w-full border-t bg-white/95 p-5 shadow-[0_-8px_30px_rgb(0,0,0,0.04)] backdrop-blur-md sm:relative sm:mt-12 sm:bg-transparent sm:p-0 sm:shadow-none">
        <div className="mx-auto max-w-md sm:max-w-full">
          <div className="mb-4 flex items-end justify-between sm:hidden">
            <div>
              <p className="text-secondary text-[10px] font-bold tracking-wider uppercase">
                Tổng cộng
              </p>
              <p className="text-2xl font-extrabold">
                {selectedStorage.price.toLocaleString()}₫
              </p>
            </div>
            <div className="text-right">
              <p className="text-secondary text-[10px] font-bold tracking-wider uppercase">
                Hoặc từ
              </p>
              <p className="text-base font-extrabold">
                {Math.round(selectedStorage.price / 12).toLocaleString()}₫/tháng
              </p>
            </div>
          </div>
          <button
            onClick={handleAddToCart}
            className="bg-primary w-full rounded-full py-4 text-sm font-bold text-white transition-all hover:bg-black/90 active:scale-[0.98]">
            Thêm vào giỏ hàng
          </button>
        </div>
      </div>
    </div>
  );
}
