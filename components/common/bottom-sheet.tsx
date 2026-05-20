'use client';

import clsx from 'clsx';
import { X } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { ReactNode, useEffect, useId } from 'react';

interface BottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  footer?: ReactNode;
  className?: string;
  contentClassName?: string;
  showCloseButton?: boolean;
}

const BottomSheet = ({
  isOpen,
  onClose,
  title,
  children,
  footer,
  className,
  contentClassName,
  showCloseButton = true,
}: BottomSheetProps) => {
  const titleId = useId();

  useEffect(() => {
    if (!isOpen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-100 flex items-end justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}>
          <button
            type="button"
            aria-label="Đóng hộp thoại"
            className="absolute inset-0 h-full w-full cursor-default bg-black/60"
            onClick={onClose}
          />
          <motion.section
            role="dialog"
            aria-modal="true"
            aria-labelledby={title ? titleId : undefined}
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 40, opacity: 0 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
            className={clsx(
              'relative w-full max-w-230 rounded-t-[24px] bg-white shadow-2xl',
              className,
            )}>
            <div className="flex flex-col items-center px-5 pt-4">
              <div className="bg-surface-container-high h-1.5 w-12 rounded-full" />
              <div className="flex w-full items-center justify-between pt-4 pb-3">
                {title && (
                  <h2 id={titleId} className="text-lg font-extrabold">
                    {title}
                  </h2>
                )}
                {showCloseButton && (
                  <button
                    type="button"
                    aria-label="Đóng"
                    className="ml-auto flex size-9 items-center justify-center rounded-full hover:bg-[#f4f4f4]"
                    onClick={onClose}>
                    <X size={20} strokeWidth={1.5} />
                  </button>
                )}
              </div>
            </div>

            <div className={clsx('px-5 pb-6', contentClassName)}>
              {children}
            </div>

            {footer && (
              <div className="border-surface-container-highest bg-white px-5 py-4 shadow-[0_-8px_20px_rgba(0,0,0,0.12)]">
                {footer}
              </div>
            )}
          </motion.section>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default BottomSheet;
