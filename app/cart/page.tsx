'use client';
import Checkbox from '@/components/common/checkbox';
import { useCart } from '@/providers/cart.provider';
import { Minus, Plus, ShoppingBag, Trash2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useMemo, useState } from 'react';

export default function CartPage() {
  const {
    updateQuantity: onUpdateQuantity,
    removeFromCart: onRemove,
    cartItems: items,
  } = useCart();

  const [selectedIds, setSelectedIds] = useState<string[]>(() =>
    items.map(item => item.id),
  );

  const selectedItems = useMemo(
    () => items.filter(item => selectedIds.includes(item.id)),
    [items, selectedIds],
  );

  const total = selectedItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );
  const totalQuantity = selectedItems.reduce(
    (acc, item) => acc + item.quantity,
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
    <div className="bg-surface-container-low min-h-screen pb-32">
      <div className="px-5 py-6">
        <h2 className="mb-6 text-lg font-bold">
          Bạn có {items.length} sản phẩm trong giỏ hàng
        </h2>

        <div className="space-y-6">
          {/* Main Item */}
          {items.map(item => (
            <div
              key={item.id}
              className="relative space-y-5 rounded-2xl bg-white p-5 shadow-sm">
              <Checkbox
                className="absolute top-4 left-4 z-10"
                checked={selectedIds.includes(item.id)}
                ariaLabel={`Chọn ${item.name}`}
                onChange={checked => {
                  setSelectedIds(prev =>
                    checked
                      ? [...prev, item.id]
                      : prev.filter(id => id !== item.id),
                  );
                }}
              />
              <div className="flex gap-4">
                <div className="bg-surface-container h-24 w-24 rounded-lg p-2">
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
        </div>
      </div>

      <div className="bg-surface border-surface-container-highest fixed right-0 bottom-0 left-0 z-60 border-t px-5 py-4">
        <div className="mb-2 flex items-center justify-between text-xs">
          <span className="text-secondary">Tổng số lượng</span>
          <span className="font-semibold">{totalQuantity}</span>
        </div>
        <div className="mb-3 flex items-center justify-between text-sm">
          <span className="text-primary font-bold">Tổng thanh toán</span>
          <span className="text-accent text-lg font-bold">
            {total.toLocaleString()} VNĐ
          </span>
        </div>
        <Link
          href="/checkout"
          className="bg-accent block w-full rounded-full py-4 text-center text-base font-bold text-white">
          Gửi đơn đặt hàng
        </Link>
      </div>
    </div>
  );
}
