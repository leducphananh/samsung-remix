import { CheckCircle, ShieldCheck } from 'lucide-react';

import { formatPrice } from '@/utils/price.format';

import clsx from 'clsx';
import { useState } from 'react';
import type {
  CarePlusOption,
  Product,
  ProductColor,
  ProductStorage,
} from '../_data/product.data';
import { tradeOptions } from '../_data/trade.data';
import TradeInModal from './trade-in-modal/trade-in-modal';

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

export function TradeInSection() {
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [isTradeInModalOpen, setIsTradeInModalOpen] = useState(false);

  return (
    <>
      <div className="space-y-4">
        <div>
          <label className="mb-1 block text-sm font-bold">
            4. Thu cũ đổi mới
          </label>
          <p className="text-primary text-sm">
            Tiết kiệm lên đến <b>18 TRIỆU đồng</b> khi bạn tham gia thu cũ một
            thiết bị đủ điều kiện!{'\n'}Áp dụng thu cũ đổi mới nhiều thiết bị di
            động khác nhau từ nhiều thương hiệu khác nhau
          </p>
        </div>

        <ul className="mt-6 grid grid-cols-1 gap-2 md:grid-cols-2 md:gap-4">
          {tradeOptions.map(option => {
            const isSelected = option.id === selectedOptionId;

            return (
              <li key={option.id} className="col-span-1">
                <button
                  type="button"
                  className={clsx(
                    'flex h-full w-full items-center justify-between rounded-xl border-2 p-4 text-left transition-all md:p-5.5',
                    isSelected
                      ? 'border-primary bg-white shadow-sm'
                      : 'border-surface-container-highest bg-surface',
                  )}
                  onClick={() => {
                    setSelectedOptionId(option.id);

                    if (option.id === 'trade-in') {
                      setIsTradeInModalOpen(true);
                    }
                  }}>
                  <div className="text-[16px] font-bold md:text-[18px]">
                    {option.label}
                  </div>
                  {option.detailTitle && (
                    <div className="space-y-1">
                      <div className="text-right text-[12px] text-[#757575] md:text-[14px]">
                        {option.detailTitle}
                      </div>
                      <p className="text-[12px] text-[#757575] md:text-[14px]">
                        <em className="text-[14px] text-[#006bea] not-italic md:text-[16px]">
                          {option.detailRange?.start}
                        </em>{' '}
                        đến{' '}
                        <em className="text-[14px] text-[#006bea] not-italic md:text-[16px]">
                          {option.detailRange?.end}
                        </em>
                      </p>
                    </div>
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      <TradeInModal
        isOpen={isTradeInModalOpen}
        onClose={() => {
          setIsTradeInModalOpen(false);
          setSelectedOptionId('no-thanks');
        }}
      />
    </>
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
