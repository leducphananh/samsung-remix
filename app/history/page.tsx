'use client';
import { Calendar, ChevronDown, Search } from 'lucide-react';
import { motion } from 'motion/react';
import Image from 'next/image';
import Link from 'next/link';

const orders = [
  {
    id: '#ORD-2026-00724',
    date: '13/05/2026',
    status: 'Dự thảo',
    product: {
      name: 'Tủ chăm sóc quần áo thông minh LG Styler 5 móc Màu be | SC5MBR80H',
      image:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuD3ZmsC7FZ1WjuQZ3PGqK9oGfL69ON2VCWtx6g_vyE4Sw4eZSWmmnvQP4pK6EmiEiTNrckqgZI3T2XfXf-N8PA0hGHRbsDHsREe0hM0gEZOEIMGkIsgDqRWXozzwACZsnLFg5s0Bwf0iknHccaTOmgYNttoz99qN5qSbMHdWeNFMCExfGOJMo0QypWJI9jbDuMa60tRDQ-ttfT4J-ybTzokSNbaa2Mdxa0a12gLycLDO4d3s-Yg1eEP2HMmh-L0j0DSZGLTZTTvsvo',
      quantity: 1,
      duration: '12 tháng',
    },
    total: 49179100,
  },
  {
    id: '#ORD-2026-00718',
    date: '13/05/2026',
    status: 'Dự thảo',
    product: {
      name: 'Điều hòa LG DUALCOOL™ Inverter AI Air 1 chiều 1.5HP IDC12M2',
      image:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuBP6nzocz3mI5LkYvnfX3rKr7jBcc9WSEeSBZ26iLFz_yTz_Q14hOYajbYQkoEhVbOSxWwhO5qLq55dl-mqB_jfrLu-82zVW3xQM4NyBUlM_cx30RGdt4-WQHAENSBl0Csa9SXXcr3KnmY_mfrH4P2-JrQ6HEmqm7I6ZDGtkHXKXSF2LKBQtnr_KAC-NLuVHcYVMskiyUuNvKYz3QDAzU_D-iEUlKF_Tn36A64QhaGk0r2W7vyXqmDFMq9ZwZjSt9HMqXNFsTIKv3Q',
      quantity: 1,
      duration: '12 tháng',
    },
    total: 13408100,
  },
  {
    id: '#ORD-2026-00717',
    date: '13/05/2026',
    status: 'Dự thảo',
    product: {
      name: 'Điều hòa LG DUALCOOL™ Inverter AI Air 1 chiều 1.5HP IDC12M2',
      image:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuBP6nzocz3mI5LkYvnfX3rKr7jBcc9WSEeSBZ26iLFz_yTz_Q14hOYajbYQkoEhVbOSxWwhO5qLq55dl-mqB_jfrLu-82zVW3xQM4NyBUlM_cx30RGdt4-WQHAENSBl0Csa9SXXcr3KnmY_mfrH4P2-JrQ6HEmqm7I6ZDGtkHXKXSF2LKBQtnr_KAC-NLuVHcYVMskiyUuNvKYz3QDAzU_D-iEUlKF_Tn36A64QhaGk0r2W7vyXqmDFMq9ZwZjSt9HMqXNFsTIKv3Q',
      quantity: 1,
      duration: '12 tháng',
    },
    total: 13408100,
  },
];

export default function HistoryPage() {
  return (
    <div className="bg-surface min-h-screen pb-12">
      <div className="mx-auto max-w-2xl space-y-6 px-5 pt-8">
        {/* Search Bar */}
        <div className="relative">
          <input
            type="text"
            placeholder="Tìm theo mã đơn hàng, mã hợp đồng..."
            className="border-surface-container-highest focus:border-primary w-full rounded-2xl border bg-white py-4 pr-4 pl-12 text-sm font-medium shadow-sm outline-none focus:ring-0"
          />
          <Search className="text-secondary absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 opacity-40" />
        </div>

        {/* Categories Tabs */}
        <div className="hide-scrollbar flex gap-2 overflow-x-auto pb-2">
          {['Tất cả', 'Dự thảo', 'Đăng ký', 'Hủy', 'Giao hàng'].map(
            (label, idx) => (
              <button
                key={label}
                className={`rounded-full px-6 py-3 text-sm font-bold whitespace-nowrap transition-all ${idx === 0 ? 'bg-accent shadow-accent/20 text-white shadow-lg' : 'bg-surface-container-low text-secondary hover:bg-surface-container'}`}>
                {label}
              </button>
            ),
          )}
        </div>

        {/* Date Filter Accordion */}
        <div className="border-surface-container-highest text-primary overflow-hidden rounded-2xl border bg-white shadow-sm">
          <div className="flex cursor-pointer items-center justify-between p-4">
            <div className="flex items-center gap-2">
              <Calendar className="text-secondary h-5 w-5 opacity-60" />
              <span className="text-sm font-bold">Lọc theo ngày</span>
            </div>
            <ChevronDown className="text-secondary h-4 w-4 opacity-60" />
          </div>

          <div className="space-y-6 px-5 pt-2 pb-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <p className="text-secondary text-xs font-bold tracking-widest uppercase opacity-60">
                  Từ ngày
                </p>
                <div className="bg-surface-container border-surface-container-highest h-14 rounded-xl border p-4"></div>
              </div>
              <div className="space-y-2">
                <p className="text-secondary text-xs font-bold tracking-widest uppercase opacity-60">
                  Đến ngày
                </p>
                <div className="bg-surface-container border-surface-container-highest h-14 rounded-xl border p-4"></div>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              {['Hôm nay', '7 ngày qua', '30 ngày qua', '3 tháng qua'].map(
                label => (
                  <button
                    key={label}
                    className="border-surface-container-highest text-secondary hover:bg-surface-container rounded-full border px-4 py-2 text-xs font-bold transition-colors">
                    {label}
                  </button>
                ),
              )}
            </div>
          </div>
        </div>

        {/* Order List */}
        <div className="space-y-4">
          {orders.map(order => (
            <Link
              key={order.id}
              href={`/order-detail/${order.id.replace('#', '')}`}>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="border-surface-container-highest mb-4 overflow-hidden rounded-3xl border bg-white p-6 shadow-sm transition-transform active:scale-[0.98]">
                <div className="mb-6 flex items-start justify-between">
                  <div>
                    <h3 className="text-primary text-lg font-extrabold tracking-tight">
                      Đơn hàng {order.id}
                    </h3>
                    <p className="text-secondary mt-0.5 text-sm font-medium opacity-60">
                      {order.date}
                    </p>
                  </div>
                  <span className="bg-surface-container-highest text-secondary rounded-full px-4 py-2 text-xs font-bold">
                    {order.status}
                  </span>
                </div>

                <div className="mb-6 flex gap-4">
                  <div className="bg-surface-container flex h-20 w-20 items-center justify-center rounded-xl p-2">
                    <Image
                      src={order.product.image}
                      alt={order.product.name}
                      width={80}
                      height={80}
                      className="h-full w-full object-contain"
                    />
                  </div>
                  <div className="flex-1 space-y-2">
                    <h4 className="line-clamp-2 text-sm leading-tight font-bold">
                      {order.product.name}
                    </h4>
                    <p className="text-secondary text-xs font-medium opacity-60">
                      Số lượng: {order.product.quantity}
                    </p>
                    <p className="text-secondary text-xs font-medium opacity-60">
                      Thời hạn: {order.product.duration}
                    </p>
                  </div>
                </div>

                <div className="border-surface-container flex flex-col gap-1 border-t pt-6">
                  <p className="text-secondary text-xs font-medium opacity-60">
                    Tổng tiền
                  </p>
                  <p className="text-accent text-2xl font-extrabold">
                    {order.total.toLocaleString()} đ
                  </p>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
