'use client';

import clsx from 'clsx';
import { InputHTMLAttributes } from 'react';

type FormInputProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'className'
> & {
  label?: string;
  requiredMark?: boolean;
  wrapperClassName?: string;
  inputClassName?: string;
};

const FormInput = ({
  label,
  requiredMark = false,
  wrapperClassName,
  inputClassName,
  ...inputProps
}: FormInputProps) => {
  return (
    <label className={clsx('block', wrapperClassName)}>
      {label && (
        <span className="text-sm font-semibold">
          {label}
          {requiredMark && <span className="text-red-500"> *</span>}
        </span>
      )}
      <input
        {...inputProps}
        className={clsx(
          'border-surface-container-highest mt-2 w-full rounded-xl border px-4 py-3 text-sm',
          inputClassName,
        )}
      />
    </label>
  );
};

export default FormInput;
