import {
  BarChart3,
  CheckCircle,
  ClipboardCheck,
  ShieldCheck,
  Smartphone,
  ArrowRightLeft as SwapIcon,
  Truck,
} from 'lucide-react';

import { formatPrice } from '@/utils/price.format';

import type {
  CarePlusOption,
  Product,
  ProductColor,
  ProductStorage,
} from '../_data/product.data';

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

export function ProductSelector({ product }: { product: Product }) {
  return (
    <div>
      <label className="mb-4 block text-sm font-bold">1. Chọn dòng máy</label>
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
  );
}

export function ColorPicker({
  colors,
  selectedColor,
  onSelect,
}: {
  colors: readonly ProductColor[];
  selectedColor: ProductColor;
  onSelect: (color: ProductColor) => void;
}) {
  return (
    <div>
      <label className="mb-1 block text-sm font-bold">2. Chọn màu sắc</label>
      <p className="mb-4 text-sm">{selectedColor.name}</p>
      <div className="flex gap-4">
        {colors.map(color => (
          <button
            key={color.name}
            onClick={() => onSelect(color)}
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
  );
}

export function StorageSelector({
  storage,
  selectedStorage,
  onSelect,
}: {
  storage: readonly ProductStorage[];
  selectedStorage: ProductStorage;
  onSelect: (storage: ProductStorage) => void;
}) {
  return (
    <div>
      <label className="mb-4 block text-sm font-bold">
        3. Dung lượng lưu trữ
      </label>
      <div className="grid grid-cols-1 gap-3">
        {storage.map(option => (
          <button
            key={option.size}
            onClick={() => onSelect(option)}
            className={`flex items-center justify-between rounded-xl border-2 p-4 transition-all ${selectedStorage.size === option.size ? 'border-primary bg-white' : 'border-surface-container-highest bg-surface'}`}>
            <span className="font-bold">{option.size}</span>
            <span className="text-sm font-bold">
              {formatPrice(option.price)}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

export function TradeInSection({
  tradeInEstimate,
  totalPrice,
}: {
  tradeInEstimate: number;
  totalPrice: number;
}) {
  return (
    <div className="space-y-4">
      <div>
        <label className="mb-1 block text-sm font-bold">
          4. Thu cũ đổi mới
        </label>
        <p className="text-secondary text-sm">
          Nhận trợ giá lên đến {formatPrice(tradeInEstimate)} khi thiết bị cũ đủ
          điều kiện.
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
  );
}

export function CarePlusSection({
  options,
  selectedCare,
  onSelect,
}: {
  options: readonly CarePlusOption[];
  selectedCare: CarePlusOption;
  onSelect: (option: CarePlusOption) => void;
}) {
  return (
    <div>
      <label className="mb-4 flex items-center gap-2 text-sm font-bold">
        <ShieldCheck className="h-4 w-4" />
        5. Chọn Samsung Care+
      </label>
      <div className="grid gap-3">
        {options.map(option => (
          <button
            key={option.id}
            onClick={() => onSelect(option)}
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
                  {option.price === 0 ? 'Miễn phí' : formatPrice(option.price)}
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
  );
}
