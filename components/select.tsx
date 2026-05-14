'use client';

import clsx from 'clsx';
import { ChevronDown, ChevronUp, X } from 'lucide-react';
import { ReactNode, useState } from 'react';

export interface SelectOption {
  id: string;
  label: string;
  suffix?: ReactNode;
}

interface SelectProps {
  label?: string;
  placeholder: string;
  triggerLabel?: ReactNode;
  options?: SelectOption[];
  value?: string;
  onChange?: (id: string) => void;
  disabled?: boolean;
  defaultOpen?: boolean;
  closeOnSelect?: boolean;
  searchable?: boolean;
  className?: string;
}

const Select = ({
  label,
  placeholder,
  triggerLabel,
  options = [],
  value,
  onChange,
  disabled = false,
  defaultOpen = false,
  closeOnSelect = false,
  searchable = false,
  className,
}: SelectProps) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const [searchValue, setSearchValue] = useState('');
  const hasOptions = options.length > 0;
  const visibleOptions =
    searchable && searchValue.trim()
      ? options.filter(option =>
          option.label.toLowerCase().includes(searchValue.trim().toLowerCase()),
        )
      : options;

  return (
    <div className={clsx(disabled && 'opacity-45', className)}>
      {label && (
        <p className="mb-3 text-[12px] font-bold text-[#111]">{label}</p>
      )}
      <div
        className={clsx(
          'overflow-hidden rounded-[5px] border bg-white',
          disabled ? 'border-[#ddd]' : 'border-2 border-[#1677ff]',
        )}>
        {searchable && isOpen && !disabled ? (
          <div className="flex h-16 items-center gap-3 px-6">
            <input
              autoFocus
              value={searchValue}
              placeholder={placeholder}
              className="min-w-0 flex-1 bg-transparent text-[16px] outline-none"
              onChange={event => setSearchValue(event.target.value)}
            />
            {searchValue && (
              <button
                type="button"
                aria-label="Xóa từ khóa tìm kiếm"
                className="flex size-5 shrink-0 cursor-pointer items-center justify-center rounded-full bg-[#8f8f8f] text-white hover:bg-[#555]"
                onClick={() => setSearchValue('')}>
                <X size={14} strokeWidth={3} />
              </button>
            )}
          </div>
        ) : (
          <button
            type="button"
            disabled={disabled || !hasOptions}
            className={clsx(
              'flex w-full items-center justify-between px-6 text-left text-[14px]',
              hasOptions ? 'py-5 font-bold' : 'h-13 text-[#999]',
              disabled || !hasOptions ? 'cursor-not-allowed' : 'cursor-pointer',
            )}
            onClick={() => setIsOpen(current => !current)}>
            <span className="truncate">{triggerLabel ?? placeholder}</span>
            {isOpen && !disabled ? (
              <ChevronUp size={22} strokeWidth={1.6} />
            ) : (
              <ChevronDown size={22} strokeWidth={1.6} />
            )}
          </button>
        )}

        {isOpen && !disabled && hasOptions && (
          <ul
            className={clsx(
              'max-h-61 overflow-y-auto',
              !searchable && 'border-t border-[#ddd]',
            )}>
            {visibleOptions.length === 0 ? (
              <li className="px-6 py-3 text-[14px] text-[#757575]">
                Không tìm thấy kết quả phù hợp
              </li>
            ) : (
              visibleOptions.map(option => {
                const isSelected = value === option.id;

                return (
                  <li key={option.id}>
                    <button
                      type="button"
                      className={clsx(
                        'flex w-full cursor-pointer items-center justify-between gap-4 px-6 py-3 text-left text-[14px]',
                        isSelected && 'bg-[#f5f5f5]',
                      )}
                      onClick={() => {
                        onChange?.(option.id);

                        if (closeOnSelect) {
                          setIsOpen(false);
                          setSearchValue('');
                        }
                      }}>
                      <span className="min-w-0">{option.label}</span>
                      {option.suffix && (
                        <span className="shrink-0">{option.suffix}</span>
                      )}
                    </button>
                  </li>
                );
              })
            )}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Select;
