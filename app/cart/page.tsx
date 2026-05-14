'use client';
import { useCart } from '@/providers/cart.provider';
import {
  ChevronRight,
  CreditCard,
  Info,
  Minus,
  Plus,
  ShieldCheck,
  ShoppingBag,
  Trash2,
  Zap,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function CartPage() {
  const {
    updateQuantity: onUpdateQuantity,
    removeFromCart: onRemove,
    cartItems: items,
  } = useCart();

  const subtotal = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );
  const carePlus = items.length > 0 ? 1299000 : 0;
  const tax = Math.round(subtotal * 0.1);
  const total = subtotal + carePlus + tax;

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
    <div className="bg-surface-container-low min-h-screen pb-12">
      <div className="px-5 py-6">
        <h2 className="mb-6 text-lg font-bold">
          Bạn có {items.length} sản phẩm trong giỏ hàng
        </h2>

        <div className="space-y-6">
          {/* Main Item */}
          {items.map(item => (
            <div
              key={item.id}
              className="space-y-6 rounded-2xl bg-white p-5 shadow-sm">
              <div className="flex gap-4">
                <div className="bg-surface-container h-24 w-24 rounded-lg p-2">
                  {/* <img
                    src={item.image}
                    alt={item.name}
                    className="h-full w-full object-contain"
                  /> */}
                  <Image
                    src={item.image}
                    alt={item.name}
                    className="h-full w-full object-contain"
                    width={96}
                    height={96}
                  />
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <h3 className="text-lg font-bold">{item.name}</h3>
                    <button onClick={() => onRemove(item.id)}>
                      <Trash2 className="text-secondary h-5 w-5" />
                    </button>
                  </div>
                  <p className="text-secondary mt-1 text-xs uppercase">
                    {item.color}, {item.storage}
                  </p>
                  <p className="text-accent mt-2 text-xs font-semibold">
                    Còn hàng
                  </p>

                  <div className="mt-4 flex items-center justify-between">
                    <div className="bg-surface-container flex items-center gap-4 rounded-full px-4 py-1">
                      <button onClick={() => onUpdateQuantity(item.id, -1)}>
                        <Minus className="h-4 w-4" />
                      </button>
                      <span className="text-sm font-bold">{item.quantity}</span>
                      <button onClick={() => onUpdateQuantity(item.id, 1)}>
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>
                    <div className="text-right">
                      <p className="text-accent text-lg font-bold">
                        {(item.price * item.quantity).toLocaleString()} VNĐ
                      </p>
                      <p className="text-secondary text-[10px] line-through">
                        {(
                          item.price * item.quantity +
                          2000000
                        ).toLocaleString()}{' '}
                        VNĐ
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-accent/5 border-accent/20 rounded-lg border p-3">
                <p className="text-accent text-xs font-bold">
                  Ưu đãi giảm giá được áp dụng.
                </p>
              </div>
            </div>
          ))}

          {/* Add-ons */}
          <div className="space-y-6 rounded-2xl bg-white p-5 shadow-sm">
            <div className="border-surface-container flex items-center justify-between border-b pb-6">
              <div className="flex items-center gap-3">
                <div className="bg-surface-container rounded-lg p-2">
                  <Zap className="h-5 w-5" />
                </div>
                <span className="font-bold">Thu cũ đổi mới</span>
              </div>
              <button className="text-xs font-bold underline">Tham gia</button>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-start gap-3">
                <ShieldCheck className="text-accent h-6 w-6" />
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold">Samsung Care+</span>
                    <span className="text-secondary text-xs">(6 Tháng)</span>
                  </div>
                  <p className="text-accent mt-1 text-xs font-bold tracking-tight">
                    Gói Samsung Care+ của bạn đã được thêm thành công
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-bold">1.299.000 VNĐ</p>
                <Trash2 className="text-secondary mt-2 ml-auto h-4 w-4" />
              </div>
            </div>
          </div>

          {/* Offers */}
          <div className="space-y-3">
            <div className="flex items-center justify-between rounded-xl bg-white p-4 shadow-sm">
              <div className="flex items-center gap-3">
                <CreditCard className="text-secondary h-5 w-5" />
                <span className="text-sm font-bold">Ưu đãi thanh toán</span>
              </div>
              <p className="text-secondary text-xs">
                - Thanh toán trước giảm thêm 1.5TR
              </p>
            </div>
          </div>

          {/* Cross-sell */}
          <div className="rounded-2xl bg-white p-5 shadow-sm">
            <div className="flex gap-4">
              <div className="bg-surface-container h-20 w-20 rounded-lg p-2">
                {/* <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBeavh-9YaFxA6Ik8Fo22JyGOrVDrpJi7QKRYPBcIR_jekKV8XbeDshv2mIFTg-mXqIoKfpje4pjy4IFSgjqUJulb8xXpQ5YgI23rwN80ycWzMXOhg-_2TdxDaamOlEvBkVfOMR4I4hoemJ42Faez911lewp3WMV47jyVpy8NRsyVU1NpfckB9ELQd9rTS8t7e4P21KnNO4moOiu0T26X0UhjCdG9O7eWxKdtVL1DpTu_wRYCHxRBcrqHJxgUfYieURk46Mt17Fh6w"
                  alt="Charger"
                  className="h-full w-full object-contain grayscale"
                /> */}
                <Image
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBeavh-9YaFxA6Ik8Fo22JyGOrVDrpJi7QKRYPBcIR_jekKV8XbeDshv2mIFTg-mXqIoKfpje4pjy4IFSgjqUJulb8xXpQ5YgI23rwN80ycWzMXOhg-_2TdxDaamOlEvBkVfOMR4I4hoemJ42Faez911lewp3WMV47jyVpy8NRsyVU1NpfckB9ELQd9rTS8t7e4P21KnNO4moOiu0T26X0UhjCdG9O7eWxKdtVL1DpTu_wRYCHxRBcrqHJxgUfYieURk46Mt17Fh6w"
                  alt="Charger"
                  className="h-full w-full object-contain grayscale"
                  width={80}
                  height={80}
                />
              </div>
              <div className="flex-1">
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="text-sm font-bold">
                      Củ Sạc Không Kèm Cáp 60W (Đen)
                    </h4>
                    <p className="text-secondary mt-1 text-[10px]">
                      ĐEN • EP-T6010NBEGWW
                    </p>
                  </div>
                  <span className="text-accent text-xs font-bold">
                    Miễn phí
                  </span>
                </div>
                <div className="mt-3 flex items-center justify-between">
                  <div className="bg-surface-container flex items-center gap-3 rounded-full px-3 py-1">
                    <Minus className="text-secondary h-3 w-3" />
                    <span className="text-xs font-bold">1</span>
                    <Plus className="text-secondary h-3 w-3" />
                  </div>
                  <span className="text-secondary text-xs line-through">
                    1.099.000 VNĐ
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Summary */}
          <div className="space-y-6 rounded-2xl bg-white p-6 shadow-sm">
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Nhập Voucher hoặc Gift Card"
                className="bg-surface-container flex-1 rounded-lg border-none px-4 py-3 text-sm focus:outline-none"
              />
              <button className="bg-primary rounded-lg px-6 py-3 text-sm font-bold text-white">
                ÁP DỤNG
              </button>
            </div>

            <div className="space-y-3">
              <h4 className="mb-4 text-lg font-bold">Bản tóm tắt</h4>
              <div className="flex justify-between text-sm">
                <span className="text-secondary">Tổng giá trước thuế</span>
                <span className="font-bold">
                  {subtotal.toLocaleString()} VNĐ
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-secondary">Samsung Care+</span>
                <span className="font-bold">
                  {carePlus.toLocaleString()} VNĐ
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-secondary">Thuế GTGT</span>
                <span className="font-bold">{tax.toLocaleString()} VNĐ</span>
              </div>
              <div className="border-surface-container flex items-center justify-between border-t pt-4">
                <div className="flex items-center gap-1">
                  <span className="text-sm font-bold">
                    Tổng số tiền tiết kiệm
                  </span>
                  <Info className="text-secondary h-3 w-3" />
                </div>
                <ChevronRight className="h-4 w-4" />
              </div>
            </div>

            <div className="flex items-end justify-between pt-6">
              <div>
                <h3 className="text-2xl font-bold">Tổng cộng</h3>
                <p className="text-secondary text-[10px]">
                  Đã bao gồm thuế GTGT
                </p>
              </div>
              <div className="text-right">
                <p className="text-accent text-2xl font-bold">
                  {total.toLocaleString()} VND
                </p>
              </div>
            </div>

            <div className="bg-surface-container-low space-y-3 rounded-xl p-4">
              <p className="text-secondary text-[11px] leading-relaxed italic">
                Đăng nhập để được cộng điểm Samsung Rewards và nhận các ưu đãi
                đặc quyền
              </p>
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold">
                  Tích điểm thưởng Samsung Rewards cho đơn hàng này
                </span>
                <Info className="text-secondary h-3 w-3" />
              </div>
            </div>

            <button className="bg-accent shadow-accent/20 w-full rounded-full py-4 text-base font-bold text-white shadow-lg transition-transform active:scale-[0.98]">
              Thanh Toán
            </button>

            <p className="text-secondary px-4 text-center text-[10px] leading-relaxed">
              Bằng cách gửi đơn đặt hàng, bạn đồng ý với{' '}
              <Link href="#" className="font-bold underline">
                Điều khoản & điều kiện
              </Link>{' '}
              và chúng tôi sẽ sử dụng dữ liệu cá nhân của bạn theo{' '}
              <Link href="#" className="font-bold underline">
                Chính sách quyền riêng tư
              </Link>{' '}
              của chúng tôi.
            </p>

            <div className="border-surface-container space-y-4 border-t pt-6">
              <div className="flex items-center gap-3">
                <div className="bg-surface-container rounded-lg p-2">
                  <ShoppingBag className="h-4 w-4" />
                </div>
                <span className="text-secondary text-xs">
                  Giao hàng miễn phí toàn quốc
                </span>
                <Info className="text-secondary h-3 w-3" />
              </div>
              <div className="flex items-center gap-3">
                <div className="bg-surface-container rounded-lg p-2">
                  <CreditCard className="h-4 w-4" />
                </div>
                <span className="text-secondary text-xs">
                  Đổi sản phẩm theo chính sách quy định trong vòng 15 ngày
                </span>
                <Info className="text-secondary h-3 w-3" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
