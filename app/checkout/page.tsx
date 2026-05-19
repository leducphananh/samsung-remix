'use client';
import Checkbox from '@/components/common/checkbox';
import FormInput from '@/components/common/form-input';
import FormSelect from '@/components/common/form-select';
import { useCart } from '@/providers/cart.provider';
import { ShoppingBag } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import Payment from './_components/payment';
import SignatureModal from './_components/signature-modal';
import Terms from './_components/terms';

export default function CheckoutPage() {
  const { cartItems: items } = useCart();
  const [isSignatureOpen, setIsSignatureOpen] = useState(false);

  const total = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );

  if (items.length === 0) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center p-12 text-center">
        <ShoppingBag className="text-surface-container-highest mb-4 h-16 w-16" />
        <h2 className="mb-2 text-xl font-bold">Giỏ hàng của bạn đang trống</h2>
        <p className="text-secondary mb-8 text-sm">
          Hãy chọn cho mình một chiếc Galaxy yêu thích nhé!
        </p>
        <Link
          href="/"
          className="bg-primary rounded-full px-8 py-3 text-sm font-bold text-white">
          Tiếp tục mua sắm
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-surface-container-low min-h-screen pb-28">
      <div className="px-5 py-6">
        <h2 className="mb-6 text-2xl font-bold">Thông tin đơn hàng</h2>

        <div className="space-y-5">
          <div className="space-y-2 rounded-2xl bg-white p-4 shadow-sm">
            {items.map(item => (
              <div key={item.id} className="flex gap-4">
                <div className="bg-surface-container h-20 w-20 rounded-lg p-2">
                  <Image
                    src={item.image}
                    alt={item.name}
                    className="h-full w-full object-contain"
                    width={80}
                    height={80}
                  />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold">
                    {item.name} {item.color ? `| ${item.color}` : ''}
                  </p>
                  <p className="text-secondary mt-1 text-xs">
                    x{item.quantity}
                  </p>
                  <p className="text-accent mt-2 text-base font-bold">
                    {(item.price * item.quantity).toLocaleString()} đ
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="border-accent/20 bg-accent/5 rounded-2xl border p-4 text-sm text-red-500">
            Mọi thắc mắc cần giải đáp, Quý khách vui lòng liên hệ Hotline{' '}
            <span className="font-bold underline">
              024 6688 5784 – 024 6688 5764
            </span>{' '}
            để được nhân viên tư vấn và hỗ trợ nhanh nhất
          </div>

          <div className="rounded-2xl bg-white p-5 shadow-sm">
            <h3 className="text-lg font-bold">Địa chỉ nhận hàng</h3>
            <div className="mt-4 flex items-center gap-3">
              <Checkbox checked={false} onChange={() => {}} />
              <span className="text-secondary text-sm">
                Sử dụng địa chỉ mặc định
              </span>
            </div>

            <div className="mt-4 space-y-4">
              <FormInput label="Mã bưu chính" placeholder="Nhập mã bưu chính" />
              <div className="grid grid-cols-2 gap-3">
                <FormSelect label="Tỉnh / TP" requiredMark>
                  <option>Chọn Tỉnh/TP</option>
                </FormSelect>
                <FormSelect label="Quận / Huyện" requiredMark>
                  <option>Chọn Tỉnh/TP trước</option>
                </FormSelect>
              </div>
              <FormSelect label="Phường / Xã" requiredMark>
                <option>Chọn Quận/Huyện trước</option>
              </FormSelect>
              <FormInput
                label="Địa chỉ (Số nhà, đường)"
                requiredMark
                placeholder="Nhập địa chỉ"
              />
            </div>
          </div>

          <div className="rounded-2xl bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold">Thông tin xuất hóa đơn</h3>
              <label className="relative inline-flex cursor-pointer items-center">
                <input type="checkbox" className="peer sr-only" />
                <span className="bg-surface-container-highest peer-checked:bg-accent h-7 w-12 rounded-full" />
                <span className="absolute top-1 left-1 h-5 w-5 rounded-full bg-white transition-transform peer-checked:translate-x-5" />
              </label>
            </div>
          </div>

          <Terms />

          <Payment />
        </div>
      </div>

      <div className="bg-surface border-surface-container-highest fixed right-0 bottom-0 left-0 z-60 border-t px-5 py-4">
        <div className="mb-3 flex items-center justify-between text-sm">
          <span className="text-secondary">Tổng thanh toán</span>
          <span className="text-accent text-lg font-bold">
            {total.toLocaleString()} đ
          </span>
        </div>
        <button
          onClick={() => setIsSignatureOpen(true)}
          className="bg-accent w-full rounded-full py-4 text-base font-bold text-white">
          Đặt hàng ngay
        </button>
      </div>

      <SignatureModal
        isOpen={isSignatureOpen}
        onClose={() => setIsSignatureOpen(false)}
        onConfirm={() => {
          setIsSignatureOpen(false);
        }}
      />
    </div>
  );
}
