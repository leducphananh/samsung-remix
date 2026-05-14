'use client';

import Modal from '@/components/modal';
import { formatPrice } from '@/utils/price.util';
import clsx from 'clsx';
import { Check } from 'lucide-react';
import { useState } from 'react';

interface SamsungCarePaymentOption {
  label: string;
  price: number;
}

interface SamsungCareModalProps {
  isOpen: boolean;
  option: SamsungCarePaymentOption | null;
  onClose: () => void;
  onAccept: () => void;
}

const includedServices = [
  'Bảo vệ rơi vỡ vào nước',
  'Miễn phí sửa chữa',
  'Bảo vệ không giới hạn',
  'Nhận thiết bị mới khi hư hại trên 85%',
  'Giao nhận tận nhà, hỗ trợ 24/7',
  'Dịch vụ và linh kiện chính hãng',
  'Dịch vụ toàn cầu',
  'Bảo hành linh kiện 90 ngày',
];

const SamsungCareModal = ({
  isOpen,
  option,
  onClose,
  onAccept,
}: SamsungCareModalProps) => {
  const [isAccepted, setIsAccepted] = useState(false);

  const handleClose = () => {
    setIsAccepted(false);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title="Samsung Care+"
      className="max-w-245"
      footer={
        <div className="mx-auto flex max-w-106 gap-3">
          <button
            type="button"
            className="h-10 flex-1 cursor-pointer rounded-full border-2 border-black text-[14px] font-bold md:h-12 md:text-[18px]"
            onClick={handleClose}>
            Thu gọn
          </button>
          <button
            type="button"
            disabled={!isAccepted}
            className={clsx(
              'h-10 flex-1 rounded-full text-[14px] font-bold text-white md:h-12 md:text-[18px]',
              isAccepted
                ? 'cursor-pointer bg-[#2589ff] hover:bg-[#006bea]'
                : 'cursor-not-allowed bg-[#cfe3ff]',
            )}
            onClick={onAccept}>
            Xác nhận
          </button>
        </div>
      }>
      <div className="pb-6">
        <h3 className="mb-7 text-[14px] font-bold md:text-[18px]">
          Tối ưu chi phí, nhẹ ví về sau
        </h3>

        {option && (
          <div className="mb-8 flex items-center justify-between gap-6 rounded-[5px] border border-[#9a9a9a] px-5 py-8 text-[13px] font-bold">
            <span>{option.label}</span>
            <span className="shrink-0">{formatPrice(option.price)}</span>
          </div>
        )}

        <section className="mb-8">
          <h4 className="mb-5 text-[13px] font-bold md:text-[15px]">
            Dịch vụ nhận được
          </h4>
          <ul className="space-y-3">
            {includedServices.map(service => (
              <li
                key={service}
                className="flex items-center gap-4 text-[13px] md:text-[15px]">
                <Check
                  size={18}
                  strokeWidth={3}
                  className="shrink-0 text-[#58b957]"
                />
                <span>{service}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="mb-8">
          <h4 className="mb-5 text-[13px] font-bold md:text-[15px]">
            Dịch vụ không nhận được
          </h4>
          <div className="space-y-1 text-[13px] md:text-[15px]">
            <p>(*) Áp dụng phí sửa với Galaxy Z Fold | Z Flip và Gói tháng</p>
            <p>(**) Tổng giá trị bảo vệ lên đến 2 lần giá niêm yết</p>
          </div>
        </section>

        <section>
          <h4 className="mb-5 text-[13px] font-bold md:text-[15px]">
            Điều khoản &amp; Điều kiện của Samsung Care+
          </h4>
          <label className="flex cursor-pointer items-start gap-3 text-[13px] md:text-[15px]">
            <span className="text-[#ef3434]">*</span>
            <input
              type="checkbox"
              checked={isAccepted}
              className="mt-0.5 size-5 shrink-0 accent-[#006bea]"
              onChange={event => setIsAccepted(event.target.checked)}
            />
            <span>
              Tôi đã đọc và đồng ý với các{' '}
              <a href="#" className="text-[#006bea] underline">
                Điều khoản và điều kiện↗
              </a>{' '}
              của Samsung Care+
              {!isAccepted && (
                <span className="mt-3 block text-[#ef3434]">
                  * Trường bắt buộc
                </span>
              )}
            </span>
          </label>
        </section>
      </div>
    </Modal>
  );
};

export default SamsungCareModal;
