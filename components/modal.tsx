'use client';

import clsx from 'clsx';
import { X } from 'lucide-react';
import { ReactNode, useEffect, useId } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  footer?: ReactNode;
  className?: string;
  contentClassName?: string;
}

const Modal = ({
  isOpen,
  onClose,
  title,
  children,
  footer,
  className,
  contentClassName,
}: ModalProps) => {
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

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center bg-black/75 px-4 py-6">
      <button
        type="button"
        aria-label="Đóng hộp thoại"
        className="absolute inset-0 h-full w-full cursor-default"
        onClick={onClose}
      />
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? titleId : undefined}
        className={clsx(
          'relative flex max-h-[calc(100dvh-48px)] w-full max-w-230 flex-col overflow-hidden rounded-[20px] bg-white shadow-2xl',
          className,
        )}>
        <div className="flex items-start justify-between gap-4 px-6 pt-8 pb-4 md:px-15 md:pt-14">
          {title && (
            <h2
              id={titleId}
              className="font-samsung-sharp text-[24px] leading-tight font-bold md:text-[32px]">
              {title}
            </h2>
          )}
          <button
            type="button"
            aria-label="Đóng"
            className="ml-auto flex size-10 shrink-0 cursor-pointer items-center justify-center rounded-full hover:bg-[#f4f4f4]"
            onClick={onClose}>
            <X size={28} strokeWidth={1.5} />
          </button>
        </div>

        <div
          className={clsx(
            'min-h-0 flex-1 overflow-y-auto px-6 pb-8 md:px-15',
            contentClassName,
          )}>
          {children}
        </div>

        {footer && (
          <div className="shrink-0 border-t border-[#eee] bg-white px-6 py-5 shadow-[0_-10px_24px_rgba(0,0,0,0.12)] md:px-15 md:py-6">
            {footer}
          </div>
        )}
      </section>
    </div>
  );
};

export default Modal;
