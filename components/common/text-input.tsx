'use client';
import clsx from 'clsx';
import { X } from 'lucide-react';
import { InputHTMLAttributes } from 'react';

interface TextInputProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'onChange' | 'value'
> {
  id: string;
  label?: string;
  value: string;
  onChange: (value: string) => void;
  clearable?: boolean;
  className?: string;
  inputClassName?: string;
}

const TextInput = ({
  id,
  label,
  value,
  onChange,
  clearable = true,
  className,
  inputClassName,
  ...inputProps
}: TextInputProps) => {
  return (
    <div className={className}>
      {label && (
        <label htmlFor={id} className="block text-[14px] font-bold md:mb-7">
          {label}
        </label>
      )}
      <div className="flex items-center border-b border-[#555]">
        <input
          id={id}
          value={value}
          className={clsx(
            'h-11 min-w-0 flex-1 bg-transparent text-[19px] outline-none md:text-[15px]',
            inputClassName,
          )}
          onChange={event => onChange(event.target.value)}
          {...inputProps}
        />
        {clearable && value && (
          <button
            type="button"
            aria-label="Xóa nội dung"
            className="flex size-5 shrink-0 cursor-pointer items-center justify-center rounded-full bg-[#8f8f8f] text-white hover:bg-[#555]"
            onClick={() => onChange('')}>
            <X size={14} strokeWidth={3} />
          </button>
        )}
      </div>
    </div>
  );
};

export default TextInput;
