'use client';
import { useCart } from '@/providers/cart.provider';
import { useSearchQuery } from '@/providers/search-query.provider';
import {
  Facebook,
  Headphones,
  Instagram,
  Menu,
  Search,
  ShoppingCart,
  Smartphone,
  User,
  Watch,
  Youtube,
} from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { PropsWithChildren, useState } from 'react';

const Layout = ({ children }: PropsWithChildren) => {
  const { searchQuery, setSearchQuery } = useSearchQuery();
  const { totalQty: cartCount } = useCart();
  const [showSearch, setShowSearch] = useState(false);
  const pathname = usePathname();

  return (
    <div className="flex min-h-screen flex-col">
      {/* Top Header */}
      <header className="bg-surface/80 border-surface-container-highest fixed top-0 z-50 flex h-14 w-full items-center justify-between border-b px-4 backdrop-blur-md">
        <AnimatePresence mode="wait">
          {!showSearch ? (
            <motion.div
              key="nav-left"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              className="flex items-center gap-4">
              <Menu className="h-6 w-6 cursor-pointer" />
              <Link
                href="/"
                className="text-xl font-extrabold tracking-tighter">
                <Image
                  src="/logo.svg"
                  alt="Samsung Logo"
                  width={100}
                  height={27}
                  className="lg:w-32.5"
                />
              </Link>
            </motion.div>
          ) : (
            <motion.div
              key="search-bar"
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: '100%' }}
              exit={{ opacity: 0, width: 0 }}
              className="flex flex-1 items-center gap-2 pr-4">
              <div className="relative flex-1">
                <Search className="text-secondary absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Tìm kiếm sản phẩm..."
                  autoFocus
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="bg-surface-container focus:ring-primary w-full rounded-full py-1.5 pr-4 pl-10 text-sm focus:ring-1 focus:outline-none"
                />
              </div>
              <button
                onClick={() => {
                  setShowSearch(false);
                  setSearchQuery('');
                }}
                className="text-secondary text-xs font-bold">
                Hủy
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex items-center gap-4">
          {!showSearch && (
            <Search
              onClick={() => setShowSearch(true)}
              className="h-5 w-5 cursor-pointer"
            />
          )}
          <Link href="/cart" className="relative">
            <ShoppingCart className="h-5 w-5 cursor-pointer" />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 flex h-4 w-4 items-center justify-center rounded-full bg-red-600 text-[10px] font-bold text-white">
                {cartCount}
              </span>
            )}
          </Link>
          <User className="h-5 w-5 cursor-pointer" />
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 pt-14 pb-16 md:pb-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={pathname}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}>
            {children}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Footer (Desktop) */}
      <footer className="bg-surface-container-low border-surface-container-highest hidden border-t py-16 md:block">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-16 grid grid-cols-3 gap-12">
            <div className="bg-surface-container hover:bg-surface-container-high group flex cursor-pointer flex-col items-center rounded-2xl p-8 text-center transition-colors">
              <div className="bg-primary/5 mb-6 flex h-16 w-16 items-center justify-center rounded-full transition-transform group-hover:scale-110">
                <Smartphone className="text-primary h-8 w-8" />
              </div>
              <h3 className="mb-3 text-xl font-bold">Di động</h3>
              <p className="text-secondary max-w-50 text-sm">
                Khám phá các dòng điện thoại Galaxy S, Z, A mới nhất.
              </p>
            </div>

            <div className="bg-surface-container hover:bg-surface-container-high group flex cursor-pointer flex-col items-center rounded-2xl p-8 text-center transition-colors">
              <div className="bg-primary/5 mb-6 flex h-16 w-16 items-center justify-center rounded-full transition-transform group-hover:scale-110">
                <Headphones className="text-primary h-8 w-8" />
              </div>
              <h3 className="mb-3 text-xl font-bold">Phụ kiện</h3>
              <p className="text-secondary max-w-50 text-sm">
                Tai nghe Buds, ốp lưng và các phụ kiện chính hãng.
              </p>
            </div>

            <div className="bg-surface-container hover:bg-surface-container-high group flex cursor-pointer flex-col items-center rounded-2xl p-8 text-center transition-colors">
              <div className="bg-primary/5 mb-6 flex h-16 w-16 items-center justify-center rounded-full transition-transform group-hover:scale-110">
                <Watch className="text-primary h-8 w-8" />
              </div>
              <h3 className="mb-3 text-xl font-bold">Đồng hồ</h3>
              <p className="text-secondary max-w-50 text-sm">
                Galaxy Watch thông minh theo dõi sức khỏe của bạn.
              </p>
            </div>
          </div>

          <div className="border-surface-container-highest flex flex-col items-center justify-between gap-6 border-t pt-8 md:flex-row">
            <div className="flex gap-8">
              <Facebook className="text-secondary hover:text-primary h-6 w-6 cursor-pointer transition-colors" />
              <Instagram className="text-secondary hover:text-primary h-6 w-6 cursor-pointer transition-colors" />
              <Youtube className="text-secondary hover:text-primary h-6 w-6 cursor-pointer transition-colors" />
            </div>

            <div className="text-secondary flex gap-8 text-xs font-medium">
              <Link href="#" className="hover:text-primary transition-colors">
                Về chúng tôi
              </Link>
              <Link href="#" className="hover:text-primary transition-colors">
                Hỗ trợ
              </Link>
              <Link href="#" className="hover:text-primary transition-colors">
                Bảo mật
              </Link>
              <Link href="#" className="hover:text-primary transition-colors">
                Pháp lý
              </Link>
            </div>

            <p className="text-secondary text-xs font-medium">
              © 2024 SAMSUNG. All rights reserved.
            </p>
          </div>
        </div>
      </footer>

      {/* Bottom Nav (Mobile) */}
      <nav className="border-surface-container-highest fixed bottom-0 left-0 z-50 flex h-20 w-full items-center justify-around border-t bg-white/80 px-4 pb-4 backdrop-blur-xl md:hidden">
        <Link
          href="/"
          className={`flex flex-col items-center justify-center gap-1.5 rounded-2xl px-4 py-2 transition-all ${pathname === '/' ? 'bg-primary scale-105 text-white' : 'text-secondary hover:bg-surface-container-low'}`}>
          <Smartphone className="h-5 w-5" />
          <span className="text-[10px] font-bold">Di động</span>
        </Link>
        <button className="text-secondary hover:bg-surface-container-low flex flex-col items-center justify-center gap-1.5 rounded-2xl px-4 py-2 transition-all">
          <Headphones className="h-5 w-5" />
          <span className="text-[10px] font-bold">Phụ kiện</span>
        </button>
        <button className="text-secondary hover:bg-surface-container-low flex flex-col items-center justify-center gap-1.5 rounded-2xl px-4 py-2 transition-all">
          <Watch className="h-5 w-5" />
          <span className="text-[10px] font-bold">Đồng hồ</span>
        </button>
      </nav>
    </div>
  );
};

export default Layout;
