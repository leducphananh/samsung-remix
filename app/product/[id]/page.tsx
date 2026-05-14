'use client';
import { useCart } from '@/providers/cart.provider';
import { formatPrice } from '@/utils/price.format';
import {
  BarChart3,
  CheckCircle,
  ChevronDown,
  ClipboardCheck,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Star,
  ArrowRightLeft as SwapIcon,
  ThumbsUp,
  Truck,
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
    ratingBreakdown: [
      { stars: 5, count: 936 },
      { stars: 4, count: 212 },
      { stars: 3, count: 74 },
      { stars: 2, count: 18 },
      { stars: 1, count: 8 },
    ],
    reviewHighlights: [
      'Camera zoom rất sắc nét',
      'Pin dùng trọn ngày',
      'Màn hình sáng ngoài trời',
      'Galaxy AI hữu ích',
    ],
    customerReviews: [
      {
        name: 'Minh Anh',
        rating: 5,
        date: '12/05/2026',
        title: 'Camera và màn hình đúng chất flagship',
        content:
          'Ảnh zoom xa vẫn chi tiết, màn hình ngoài nắng nhìn rõ. Máy cầm chắc tay hơn mình nghĩ.',
      },
      {
        name: 'Hoàng Nam',
        rating: 4,
        date: '08/05/2026',
        title: 'Hiệu năng mạnh, AI tiện',
        content:
          'Dịch cuộc gọi và tóm tắt ghi chú dùng được ngay trong công việc. Máy hơi lớn nhưng pin rất ổn.',
      },
    ],
  },
};

const tradeInSteps = [
  {
    title: 'Chọn thiết bị cũ',
    desc: 'Nhập dòng máy, dung lượng và tình trạng tổng thể để nhận giá trị tạm tính.',
    icon: Smartphone,
  },
  {
    title: 'Nhận báo giá',
    desc: 'Hệ thống cộng ưu đãi thu cũ đổi mới và hiển thị số tiền tiết kiệm dự kiến.',
    icon: BarChart3,
  },
  {
    title: 'Kiểm tra máy',
    desc: 'Kỹ thuật viên xác nhận ngoại hình, màn hình, pin và chức năng khi giao nhận.',
    icon: ClipboardCheck,
  },
  {
    title: 'Bù tiền lên đời',
    desc: 'Thanh toán phần chênh lệch và nhận Galaxy mới cùng hóa đơn bảo hành.',
    icon: Truck,
  },
];

const carePlusOptions = [
  {
    id: 'none',
    name: 'Không thêm Samsung Care+',
    term: 'Bảo hành tiêu chuẩn',
    price: 0,
    desc: 'Vẫn áp dụng bảo hành chính hãng theo điều kiện của Samsung.',
  },
  {
    id: '6m',
    name: 'Samsung Care+ 6 tháng',
    term: 'Bảo vệ rơi vỡ và vào nước',
    price: 1299000,
    desc: 'Phù hợp khi bạn muốn bảo vệ máy trong giai đoạn sử dụng đầu tiên.',
  },
  {
    id: '12m',
    name: 'Samsung Care+ 12 tháng',
    term: 'Bảo vệ toàn diện hơn',
    price: 2199000,
    desc: 'Khuyến nghị cho người dùng thường xuyên di chuyển hoặc làm việc ngoài trời.',
  },
];

export default function DetailPage() {
  const { addToCart: onAddToCart } = useCart();
  const { id } = useParams();
  const router = useRouter();
  const product =
    products[id as keyof typeof products] || products['s24-ultra'];

  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [selectedStorage, setSelectedStorage] = useState(product.storage[0]);
  const [selectedCare, setSelectedCare] = useState(carePlusOptions[0]);
  const [openAccordions, setOpenAccordions] = useState<string[]>([
    'Đánh giá & Xếp hạng',
  ]);

  const totalPrice = selectedStorage.price + selectedCare.price;
  const tradeInEstimate = 5000000;
  const ratingMax = Math.max(
    ...product.ratingBreakdown.map(item => item.count),
  );

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
        desc: 'Màn hình Dynamic AMOLED 2X sáng rõ ngay cả dưới ánh nắng gắt.',
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
              <Star
                key={i}
                className="h-4 w-4"
                strokeWidth={0}
                fill="#ffaa4e"
              />
            ))}
            <Star className="h-4 w-4" strokeWidth={0} fill="#ffaa4e" />
          </div>
          <span className="text-secondary text-xs font-medium">
            {product.rating} ({product.reviews} Đánh giá)
          </span>
        </div>
      </section>

      <section className="bg-surface-container relative mt-8 flex flex-col items-center py-12">
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

      <section className="mt-12 space-y-12 px-5">
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
                aria-label={color.name}
                className={`h-12 w-12 rounded-full border-2 p-0.5 transition-all ${selectedColor.name === color.name ? 'border-primary' : 'border-transparent'}`}>
                <div
                  className="h-full w-full rounded-full"
                  style={{ backgroundColor: color.value }}
                />
              </button>
            ))}
          </div>
        </div>

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
                  {formatPrice(s.price)}
                </span>
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-bold">
              4. Thu cũ đổi mới
            </label>
            <p className="text-secondary text-sm">
              Nhận trợ giá lên đến {formatPrice(tradeInEstimate)} khi thiết bị
              cũ đủ điều kiện.
            </p>
          </div>

          <div className="bg-surface-container-low rounded-xl p-5">
            <div className="mb-5 flex items-center gap-2">
              <SwapIcon className="h-5 w-5" />
              <span className="text-xl font-bold">Quy trình lên đời</span>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {tradeInSteps.map((step, index) => {
                const Icon = step.icon;
                return (
                  <div
                    key={step.title}
                    className="border-surface-container-highest rounded-xl border bg-white p-4">
                    <div className="mb-3 flex items-center gap-3">
                      <div className="bg-primary flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold text-white">
                        {index + 1}
                      </div>
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="text-sm font-bold">{step.title}</h3>
                    <p className="text-secondary mt-1 text-xs leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                );
              })}
            </div>
            <div className="bg-accent/5 border-accent/20 mt-4 rounded-xl border p-4">
              <p className="text-accent text-sm font-bold">
                Giá dự kiến sau thu cũ: từ{' '}
                {formatPrice(Math.max(totalPrice - tradeInEstimate, 0))}
              </p>
              <p className="text-secondary mt-1 text-xs">
                Giá cuối cùng được xác nhận sau bước kiểm tra thiết bị cũ.
              </p>
            </div>
          </div>
        </div>

        <div>
          <label className="mb-4 flex items-center gap-2 text-sm font-bold">
            <ShieldCheck className="h-4 w-4" />
            5. Chọn Samsung Care+
          </label>
          <div className="grid gap-3">
            {carePlusOptions.map(option => (
              <button
                key={option.id}
                onClick={() => setSelectedCare(option)}
                className={`flex items-start gap-4 rounded-xl border-2 p-4 text-left transition-all ${selectedCare.id === option.id ? 'border-primary bg-white shadow-sm' : 'border-surface-container-highest bg-surface'}`}>
                <div
                  className={`mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border ${selectedCare.id === option.id ? 'border-primary bg-primary' : 'border-surface-container-highest'}`}>
                  {selectedCare.id === option.id && (
                    <CheckCircle className="fill-primary h-4 w-4 text-white" />
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <p className="font-bold">{option.name}</p>
                    <p className="text-sm font-bold">
                      {option.price === 0
                        ? 'Miễn phí'
                        : formatPrice(option.price)}
                    </p>
                  </div>
                  <p className="text-accent mt-1 text-xs font-bold">
                    {option.term}
                  </p>
                  <p className="text-secondary mt-1 text-xs leading-relaxed">
                    {option.desc}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

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
                  {item === 'Tính năng nổi bật' &&
                    productFeatures['Tính năng nổi bật'].map((feature, idx) => (
                      <div key={idx} className="space-y-1">
                        <h4 className="text-primary text-sm font-bold">
                          {feature.title}
                        </h4>
                        <p className="text-secondary text-xs leading-relaxed">
                          {feature.desc}
                        </p>
                      </div>
                    ))}

                  {item === 'Đánh giá & Xếp hạng' && (
                    <div className="space-y-6">
                      <div className="rounded-xl bg-white p-5">
                        <div className="grid gap-6 sm:grid-cols-[140px_1fr]">
                          <div>
                            <p className="text-5xl font-extrabold">
                              {product.rating}
                            </p>
                            <div className="mt-2 flex">
                              {[1, 2, 3, 4, 5].map(star => (
                                <Star
                                  key={star}
                                  className="h-4 w-4"
                                  strokeWidth={0}
                                  fill="#ffaa4e"
                                />
                              ))}
                            </div>
                            <p className="text-secondary mt-2 text-xs">
                              {product.reviews.toLocaleString()} đánh giá đã xác
                              minh
                            </p>
                          </div>
                          <div className="space-y-2">
                            {product.ratingBreakdown.map(row => (
                              <div
                                key={row.stars}
                                className="grid grid-cols-[36px_1fr_44px] items-center gap-3 text-xs">
                                <span className="font-bold">
                                  {row.stars} sao
                                </span>
                                <div className="bg-surface-container h-2 overflow-hidden rounded-full">
                                  <div
                                    className="h-full rounded-full bg-[#ffaa4e]"
                                    style={{
                                      width: `${(row.count / ratingMax) * 100}%`,
                                    }}
                                  />
                                </div>
                                <span className="text-secondary text-right">
                                  {row.count}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        {product.reviewHighlights.map(highlight => (
                          <span
                            key={highlight}
                            className="bg-surface-container-low rounded-full px-3 py-2 text-xs font-bold">
                            {highlight}
                          </span>
                        ))}
                      </div>

                      <div className="space-y-3">
                        {product.customerReviews.map(review => (
                          <div
                            key={review.name}
                            className="rounded-xl bg-white p-4">
                            <div className="flex items-start justify-between gap-4">
                              <div>
                                <p className="font-bold">{review.name}</p>
                                <p className="text-secondary text-xs">
                                  Người mua đã xác minh • {review.date}
                                </p>
                              </div>
                              <div className="flex">
                                {Array.from({ length: review.rating }).map(
                                  (_, index) => (
                                    <Star
                                      key={index}
                                      fill="#ffaa4e"
                                      strokeWidth={0}
                                      className="h-4 w-4"
                                    />
                                  ),
                                )}
                              </div>
                            </div>
                            <h4 className="mt-3 text-sm font-bold">
                              {review.title}
                            </h4>
                            <p className="text-secondary mt-1 text-xs leading-relaxed">
                              {review.content}
                            </p>
                            <button className="text-secondary mt-4 flex items-center gap-2 text-xs font-bold">
                              <ThumbsUp className="h-4 w-4" />
                              Hữu ích
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {item !== 'Tính năng nổi bật' &&
                    item !== 'Đánh giá & Xếp hạng' && (
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

      <div className="border-surface-container-highest fixed bottom-0 left-0 z-60 w-full border-t bg-white/95 p-5 shadow-[0_-8px_30px_rgb(0,0,0,0.04)] backdrop-blur-md sm:relative sm:mt-12 sm:bg-transparent sm:p-0 sm:shadow-none">
        <div className="mx-auto max-w-md sm:max-w-full">
          <div className="mb-4 flex items-end justify-between sm:hidden">
            <div>
              <p className="text-secondary text-[10px] font-bold tracking-wider uppercase">
                Tổng cộng
              </p>
              <p className="text-2xl font-extrabold">
                {formatPrice(totalPrice)}
              </p>
            </div>
            <div className="text-right">
              <p className="text-secondary text-[10px] font-bold tracking-wider uppercase">
                Hoặc từ
              </p>
              <p className="text-base font-extrabold">
                {formatPrice(Math.round(totalPrice / 12))}/tháng
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
