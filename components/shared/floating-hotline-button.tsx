'use client';
import clsx from 'clsx';
import { Phone } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

const FloatingHotlineButton = () => {
  const pathname = usePathname();
  const [isHotlineOpen, setIsHotlineOpen] = useState(false);

  return (
    <div
      className={clsx(
        'fixed right-6 z-40 flex flex-col items-end gap-3',
        pathname.includes('/product') ? 'bottom-40' : 'bottom-22',
      )}>
      <AnimatePresence>
        {isHotlineOpen && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            className="bg-surface-container-highest border-surface-container-high rounded-2xl border p-4 shadow-xl">
            <p className="text-sm font-bold">
              Hotline: 024 6688 5784 – 024 6688 5764
            </p>
            <p className="text-secondary mt-2 max-w-xs text-xs leading-relaxed">
              Nếu Quý khách có thắc mắc hoặc cần tư vấn về sản phẩm, vui lòng
              liên hệ qua hotline của chúng tôi để được giải đáp nhanh nhất
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setIsHotlineOpen(prev => !prev)}
        aria-expanded={isHotlineOpen}
        aria-label="Hotline"
        className="bg-primary shadow-primary/30 flex h-14 w-14 items-center justify-center rounded-full text-white shadow-lg transition-transform hover:scale-105 active:scale-95">
        <Phone className="h-6 w-6" />
      </button>
    </div>
  );
};

export default FloatingHotlineButton;
