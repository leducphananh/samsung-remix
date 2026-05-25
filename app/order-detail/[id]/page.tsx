'use client';
import { getOrder } from '@/api/order.api';
import BottomSheet from '@/components/common/bottom-sheet';
import Modal from '@/components/common/modal';
import { OrderDetail } from '@/types/order.type';
import { useQuery } from '@tanstack/react-query';
import { ChevronRight } from 'lucide-react';
import { motion } from 'motion/react';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { useState } from 'react';

export default function OrderDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [isCancelOpen, setIsCancelOpen] = useState(false);
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);

  const { data: order = {} as OrderDetail } = useQuery<OrderDetail>({
    queryKey: ['order-detail', id],
    queryFn: () => getOrder(id),
  });

  return (
    <div className="bg-surface min-h-screen pb-12">
      <div className="mx-auto max-w-2xl space-y-6 px-5 pt-8">
        {/* Header Card */}
        <div className="border-surface-container-highest space-y-6 rounded-3xl border bg-white p-6 shadow-sm">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-primary text-xl font-extrabold tracking-tight">
                {order.id}
              </h1>
              <p className="text-secondary mt-1 text-sm font-medium opacity-60">
                Ngày đặt: {order.date}
              </p>
            </div>
            <span className="bg-surface-container-highest text-secondary rounded-full px-4 py-2 text-xs font-bold">
              {order.status}
            </span>
          </div>

          <button
            type="button"
            onClick={() => setIsPaymentOpen(true)}
            className="border-surface-container group flex w-full items-center justify-between border-t py-4 text-left">
            <span className="text-accent font-bold">
              Xem chi tiết thông tin thanh toán
            </span>
            <ChevronRight className="text-accent h-5 w-5 transition-transform group-hover:translate-x-1" />
          </button>
        </div>

        {/* Customer Info */}
        <div className="border-surface-container-highest bg-surface-container-lowest space-y-6 overflow-hidden rounded-2xl border p-6 shadow-sm">
          <h2 className="text-xl font-bold">Thông tin Người Đặt hàng</h2>
          <div className="space-y-4">
            <div className="flex justify-between text-sm">
              <span className="text-secondary font-medium opacity-60">
                Họ và tên
              </span>
              <span className="text-primary font-bold">
                {order.customer?.name}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-secondary font-medium opacity-60">
                Số điện thoại
              </span>
              <span className="text-primary font-bold">
                {order.customer?.phone}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-secondary font-medium opacity-60">
                Email
              </span>
              <span className="text-primary font-bold">
                {order.customer?.email}
              </span>
            </div>
          </div>
        </div>

        {/* Shipping Info */}
        <div className="border-surface-container-highest bg-surface-container-lowest space-y-6 overflow-hidden rounded-2xl border p-6 shadow-sm">
          <h2 className="text-xl font-bold">Thông tin Địa chỉ Lắp đặt</h2>
          <div className="space-y-4">
            <div className="flex justify-between text-sm">
              <span className="text-secondary font-medium opacity-60">
                Người nhận
              </span>
              <span className="text-primary font-bold">
                {order.shipping?.recipient}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-secondary font-medium opacity-60">
                Số điện thoại
              </span>
              <span className="text-primary font-bold">
                {order.shipping?.phone}
              </span>
            </div>
            <div className="flex items-start justify-between text-sm">
              <span className="text-secondary shrink-0 font-medium opacity-60">
                Địa chỉ
              </span>
              <span className="text-primary max-w-50 text-right font-bold">
                {order.shipping?.address}
              </span>
            </div>
          </div>
        </div>

        {/* Product List */}
        <div className="space-y-4">
          <h2 className="px-2 text-xl font-bold">Danh sách Sản phẩm Đã Đặt</h2>
          {order.products?.map((product, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="border-surface-container-highest bg-surface-container-lowest rounded-2xl border p-6 shadow-sm">
              <div className="flex gap-4">
                <div className="bg-surface-container-low flex h-24 w-24 shrink-0 items-center justify-center rounded-xl p-2">
                  <Image
                    src={product.image}
                    alt={product.name}
                    width={96}
                    height={96}
                    className="h-full w-full object-contain"
                  />
                </div>
                <div className="flex flex-1 flex-col justify-between">
                  <h4 className="line-clamp-2 text-sm leading-tight font-bold">
                    {product.name}
                  </h4>
                  <div className="flex items-end justify-between">
                    <span className="text-secondary text-xs font-medium opacity-60">
                      x{product.quantity}
                    </span>
                    <div className="text-right">
                      <p className="text-secondary text-xs line-through opacity-40">
                        {product.originalPrice.toLocaleString()} đ
                      </p>
                      <p className="text-primary text-lg font-extrabold">
                        {product.price.toLocaleString()} đ
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="pt-8">
          <button
            onClick={() => setIsCancelOpen(true)}
            className="border-surface-container-highest bg-surface-container-lowest w-full rounded-2xl border py-4 font-bold text-red-500 shadow-sm transition-colors hover:bg-red-50">
            Hủy đơn
          </button>
        </div>
      </div>

      <Modal
        isOpen={isCancelOpen}
        onClose={() => setIsCancelOpen(false)}
        contentClassName="px-8 pb-10 pt-2 text-center md:px-12">
        <p className="text-primary text-base leading-relaxed">
          Để bảo vệ quyền lợi tài chính của quý khách, chúng tôi xin thông báo
          như sau: Khi hủy đơn hàng, có thể phát sinh lãi hoặc chi phí liên quan
          đến khoản vay hoặc khoản trả góp. Quý khách vui lòng gọi hotline
          18001503 để được hỗ trợ và xác nhận hủy đơn.
        </p>
        <div className="mt-6">
          <button
            onClick={() => setIsCancelOpen(false)}
            className="bg-accent w-full rounded-full py-3 text-sm font-bold text-white">
            Đóng
          </button>
        </div>
      </Modal>

      <BottomSheet
        isOpen={isPaymentOpen}
        onClose={() => setIsPaymentOpen(false)}
        title="Lịch sử thanh toán hàng tháng">
        <div className="rounded-2xl bg-red-50 p-5">
          <p className="text-secondary text-sm">
            Tổng tiền cần trả kỳ tiếp theo:
          </p>
          <p className="mt-2 text-3xl font-extrabold text-red-600">0 đ/tháng</p>
        </div>

        <div className="mt-5 flex items-center gap-3">
          <span className="text-primary text-sm font-semibold">Năm:</span>
          <div className="border-surface-container-highest bg-surface-container-low flex items-center gap-2 rounded-full border px-4 py-2">
            <span className="text-secondary text-sm font-semibold">2026</span>
            <ChevronRight className="text-secondary h-4 w-4 rotate-90" />
          </div>
        </div>

        <p className="text-secondary mt-8 text-center text-sm">
          Không có lịch thanh toán
        </p>
      </BottomSheet>
    </div>
  );
}
