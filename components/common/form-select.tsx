'use client';

import clsx from 'clsx';
import { SelectHTMLAttributes } from 'react';

type FormSelectProps = Omit<
  SelectHTMLAttributes<HTMLSelectElement>,
  'className'
> & {
  label?: string;
  requiredMark?: boolean;
  wrapperClassName?: string;
  selectClassName?: string;
};

const FormSelect = ({
  label,
  requiredMark = false,
  wrapperClassName,
  selectClassName,
  children,
  ...selectProps
}: FormSelectProps) => {
  return (
    <label className={clsx('block', wrapperClassName)}>
      {label && (
        <span className="text-sm font-semibold">
          {label}
          {requiredMark && <span className="text-red-500"> *</span>}
        </span>
      )}
      <select
        {...selectProps}
        className={clsx(
          'border-surface-container-highest text-secondary mt-2 w-full rounded-xl border px-4 py-3 text-sm',
          selectClassName,
        )}>
        {children}
      </select>
    </label>
  );
};

export default FormSelect;
