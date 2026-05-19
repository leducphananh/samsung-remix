import {
  ProductDetail,
  ProductDetailVariant,
  ProductStorage,
} from '@/types/product.type';
import { formatPrice } from '@/utils/price.util';
import clsx from 'clsx';
import { CheckCircle, ShieldCheck } from 'lucide-react';
import { useState } from 'react';
import type { CarePlusOption, CarePlusSelection } from '../_data/product.data';
import SamsungCareModal from './samsung-care-modal';

export function ProductSelector({ product }: { product: ProductDetail }) {
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
  variants,
  selectedColor,
  onSelect,
}: {
  variants: ProductDetailVariant[];
  selectedColor: ProductDetailVariant;
  onSelect: (color: ProductDetailVariant) => void;
}) {
  return (
    <div>
      <label className="mb-1 block text-sm font-bold">2. Chọn màu sắc</label>
      <p className="mb-4 text-sm">{selectedColor.name}</p>
      <div className="flex gap-4">
        {variants.map(variant => (
          <button
            key={variant.name}
            onClick={() => onSelect(variant)}
            aria-label={variant.name}
            className={clsx(
              'h-12 w-12 rounded-full border-2 p-0.5 transition-all',
              selectedColor.name === variant.name
                ? 'border-primary'
                : 'border-transparent',
            )}>
            <div
              className="h-full w-full rounded-full border border-[#ddd]"
              style={{ backgroundColor: variant.hex }}
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
  storage: ProductStorage[];
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

export function CarePlusSection({
  options,
  selectedCare,
  onSelect,
}: {
  options: readonly CarePlusOption[];
  selectedCare: CarePlusSelection | null;
  onSelect: (option: CarePlusSelection | null) => void;
}) {
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(
    selectedCare?.id ?? null,
  );
  const [selectedCareOption, setSelectedCareOption] = useState<number | null>(
    null,
  );
  const [selectedPaymentOption, setSelectedPaymentOption] = useState<{
    label: string;
    price: number;
  } | null>(null);
  const [isCareModalOpen, setIsCareModalOpen] = useState(false);
  const selectedGroup = options.find(option => option.id === selectedOptionId);
  const selectedOptions = selectedGroup?.options || [];

  return (
    <>
      <div>
        <label className="mb-4 flex items-center gap-2 text-sm font-bold">
          <ShieldCheck className="h-4 w-4" />
          4. Chọn Samsung Care+
        </label>
        <div className="text-secondary mb-4 space-y-1 text-xs">
          <p>Mua kèm bảo hiểm MIC - 0 đồng</p>
          <p>Phí vận chuyển - 0d</p>
          <p>Bảo hành - 0d</p>
        </div>

        <ul className="mt-4 grid grid-cols-1 gap-2 md:grid-cols-4 md:gap-4">
          {options.map(option => {
            const isSimple = !option.details?.length;
            const isSelected = option.id === selectedOptionId;

            return (
              <li key={option.id} className="col-span-1">
                <button
                  type="button"
                  onClick={() => {
                    setSelectedOptionId(option.id);
                    setSelectedCareOption(null);

                    if (isSimple) {
                      onSelect(null);
                    }
                  }}
                  className={clsx(
                    'flex h-full w-full cursor-pointer rounded-[5px] border p-4 md:p-6',
                    isSimple ? 'items-center' : 'flex-col',
                    isSelected
                      ? 'ring-accent border-[#006bea] ring-1 ring-inset'
                      : 'border-[#ddd] hover:border-[#555]',
                  )}>
                  <div className={clsx(isSimple ? '' : 'space-y-1')}>
                    <p className="text-left text-[16px] font-bold md:text-[18px]">
                      {option.title}
                    </p>
                    {option.price && (
                      <p className="text-left text-[14px] md:text-[16px]">
                        {option.price}
                      </p>
                    )}
                  </div>
                  {option.details?.length && (
                    <>
                      <div className="mt-4 mb-3 h-px w-full bg-[#ddd]" />
                      <ul className="text-left text-[12px]">
                        {option.details.map(detail => (
                          <li
                            key={detail}
                            className="relative mt-1 pl-3.5 before:absolute before:top-1/2 before:left-0 before:h-1 before:w-1 before:-translate-y-1/2 before:rounded-full before:bg-black">
                            {detail}
                          </li>
                        ))}
                      </ul>
                    </>
                  )}
                </button>
              </li>
            );
          })}
        </ul>

        {selectedOptions.length > 0 && (
          <div className="mt-2 rounded-md bg-[#f5f7fe] p-4 md:mt-4 md:px-6 md:py-5.5">
            <div className="mb-4 text-[13px] font-bold md:text-[14px]">
              Thanh toán
            </div>
            <ul className="grid grid-cols-1 gap-2 md:grid-cols-3 md:gap-4">
              {selectedOptions.map(option => (
                <li key={option.id}>
                  <button
                    type="button"
                    className={clsx(
                      'flex h-full w-full cursor-pointer items-center justify-between gap-4 rounded-md border bg-white p-4 md:px-5 md:py-4',
                      selectedCareOption === option.id
                        ? 'ring-accent border-[#006bea] ring-1 ring-inset'
                        : 'border-[#ddd] hover:border-[#555]',
                    )}
                    onClick={() => {
                      setSelectedCareOption(option.id);
                      setSelectedPaymentOption({
                        label: option.label,
                        price: option.price,
                      });
                      setIsCareModalOpen(true);
                    }}>
                    <div className="flex-auto text-left text-[12px] font-bold md:flex-1 md:text-[14px]">
                      {option.label}
                    </div>
                    <div className="flex-auto text-right text-[12px] md:flex-1 md:text-[14px]">
                      {formatPrice(option.price)}
                    </div>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <SamsungCareModal
        isOpen={isCareModalOpen}
        option={selectedPaymentOption}
        onClose={() => {
          setIsCareModalOpen(false);
          setSelectedOptionId('none');
        }}
        onAccept={() => {
          setIsCareModalOpen(false);

          if (selectedGroup) {
            const option = selectedOptions.find(
              opt => opt.id === selectedCareOption,
            );

            if (option) {
              onSelect({
                id: selectedGroup.id,
                title: selectedGroup.title,
                price: option.price,
                label: option.label,
              });
            }
          }
        }}
      />
    </>
  );
}
