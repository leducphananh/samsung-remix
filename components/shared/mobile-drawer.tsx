'use client';
import { X } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const MobileDrawer = ({ isOpen, onClose }: Props) => {
  const router = useRouter();

  useEffect(() => {
    if (!isOpen) {
      document.body.style.overflow = '';
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  const handleCategoryClick = (category: string) => {
    if (['Galaxy S', 'Galaxy Z', 'Galaxy A', 'Phụ kiện'].includes(category)) {
      router.push(`/product-list?category=${encodeURIComponent(category)}`);
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/40"
          />
          <motion.aside
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', stiffness: 260, damping: 30 }}
            className="bg-surface fixed top-0 left-0 z-60 flex h-full w-72 flex-col gap-6 px-5 py-6 shadow-2xl">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold">Danh mục sản phẩm</h2>
              <button
                onClick={onClose}
                aria-label="Đóng danh mục"
                className="text-secondary hover:text-primary transition-colors">
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="flex flex-col gap-2">
              {[
                { label: 'Galaxy S', href: '/?category=Galaxy%20S' },
                { label: 'Galaxy Z', href: '/?category=Galaxy%20Z' },
                { label: 'Galaxy A', href: '/?category=Galaxy%20A' },
                { label: 'Phụ kiện', href: '/?category=Phụ%20kiện' },
              ].map(item => (
                <button
                  key={item.label}
                  onClick={() => handleCategoryClick(item.label)}
                  className="border-surface-container-highest hover:bg-surface-container-low flex items-center justify-between rounded-xl border px-4 py-3 text-sm font-semibold transition-colors">
                  {item.label}
                </button>
              ))}
            </div>

            <div className="text-secondary mt-auto text-xs">
              Chọn danh mục để khám phá sản phẩm phù hợp với nhu cầu của bạn.
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
};

export default MobileDrawer;
