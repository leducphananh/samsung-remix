import {
  Calendar,
  ChevronRight,
  Clock,
  CreditCard,
  Edit3,
  Mail,
  MapPin,
  Phone,
  User,
} from 'lucide-react';
import Link from 'next/link';

export default function ProfilePage() {
  const profileData = {
    name: 'LY DIEU BINH',
    email: 'binhld@gmail.com',
    phone: '0988456679',
    gender: 'Nam',
    birthDate: '16/9/1980',
    idNumber: '001080040688',
  };

  return (
    <div className="bg-surface min-h-screen pb-12">
      <div className="mx-auto max-w-2xl space-y-6 px-5 pt-8">
        {/* Profile Card */}
        <div className="border-surface-container-highest bg-surface-container-lowest flex flex-col items-center rounded-2xl border p-8 shadow-sm">
          <div className="bg-surface-container-low border-surface-container-highest mb-6 flex h-24 w-24 items-center justify-center rounded-full border">
            <User className="text-secondary h-10 w-10 opacity-40" />
          </div>
          <h2 className="text-primary mb-1 text-2xl font-extrabold tracking-tight">
            {profileData.name}
          </h2>
          <p className="text-secondary mb-1 text-sm font-medium opacity-60">
            {profileData.email}
          </p>
          <p className="text-secondary text-sm font-medium opacity-60">
            {profileData.phone}
          </p>
        </div>

        {/* Personal Information Section */}
        <div className="border-surface-container-highest bg-surface-container-lowest overflow-hidden rounded-2xl border shadow-sm">
          <div className="border-surface-container flex items-center justify-between border-b p-6">
            <h3 className="text-xl font-bold">Thông tin cá nhân</h3>
            <button className="hover:bg-surface-container-low rounded-full p-2 transition-colors">
              <Edit3 className="text-secondary h-5 w-5" />
            </button>
          </div>

          <div className="divide-surface-container divide-y">
            {[
              { icon: User, label: 'Họ và tên', value: profileData.name },
              { icon: User, label: 'Giới tính', value: profileData.gender },
              { icon: Mail, label: 'Email', value: profileData.email },
              { icon: Phone, label: 'Số điện thoại', value: profileData.phone },
              {
                icon: Calendar,
                label: 'Ngày sinh',
                value: profileData.birthDate,
              },
              {
                icon: CreditCard,
                label: 'Số CCCD',
                value: profileData.idNumber,
              },
            ].map((item, idx) => (
              <div key={idx} className="flex items-start gap-4 p-6">
                <item.icon className="text-secondary mt-0.5 h-5 w-5 shrink-0 opacity-40" />
                <div className="space-y-1">
                  <p className="text-secondary text-xs font-bold tracking-widest uppercase opacity-60">
                    {item.label}
                  </p>
                  <p className="text-primary text-base font-bold">
                    {item.value}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Action Links */}
        <div className="space-y-3">
          <Link
            href="/history"
            className="border-surface-container-highest bg-surface-container-lowest group hover:bg-surface-container-low flex w-full items-center justify-between rounded-2xl border p-6 shadow-sm transition-all active:scale-[0.98]">
            <div className="flex items-center gap-4">
              <div className="bg-surface-container-low flex h-12 w-12 items-center justify-center rounded-xl">
                <Clock className="text-primary h-5 w-5" />
              </div>
              <div className="text-left">
                <h4 className="text-lg font-bold">Lịch sử đơn hàng</h4>
                <p className="text-secondary text-xs font-medium opacity-60">
                  Xem các đơn hàng đã đăng ký
                </p>
              </div>
            </div>
            <ChevronRight className="text-secondary h-5 w-5 opacity-40 transition-transform group-hover:translate-x-1" />
          </Link>

          <button className="border-surface-container-highest bg-surface-container-lowest group hover:bg-surface-container-low flex w-full items-center justify-between rounded-2xl border p-6 shadow-sm transition-all active:scale-[0.98]">
            <div className="flex items-center gap-4">
              <div className="bg-surface-container-low flex h-12 w-12 items-center justify-center rounded-xl">
                <MapPin className="text-primary h-5 w-5" />
              </div>
              <div className="text-left">
                <h4 className="text-lg font-bold">Địa chỉ của tôi</h4>
                <p className="text-secondary text-xs font-medium opacity-60">
                  Quản lý các địa chỉ hiện tại
                </p>
              </div>
            </div>
            <ChevronRight className="text-secondary h-5 w-5 opacity-40 transition-transform group-hover:translate-x-1" />
          </button>
        </div>

        {/* Logout */}
        <div className="flex justify-center pt-4">
          <button className="text-sm font-bold text-red-500 hover:underline">
            Đăng xuất
          </button>
        </div>
      </div>
    </div>
  );
}
