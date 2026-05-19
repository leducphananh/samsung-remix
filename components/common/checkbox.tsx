'use client';

import clsx from 'clsx';
import { Check } from 'lucide-react';

type CheckboxProps = {
  checked: boolean;
  onChange: (checked: boolean) => void;
  ariaLabel?: string;
  className?: string;
};

const Checkbox = ({
  checked,
  onChange,
  ariaLabel,
  className,
}: CheckboxProps) => {
  return (
    <label className={clsx('inline-flex items-center', className)}>
      <input
        type="checkbox"
        className="peer sr-only"
        checked={checked}
        onChange={event => onChange(event.target.checked)}
        aria-label={ariaLabel}
      />
      <span className="border-surface-container-highest flex h-6 w-6 items-center justify-center rounded-md border bg-white shadow peer-checked:border-blue-600 peer-checked:bg-blue-600 peer-checked:[&>svg]:opacity-100">
        <Check className="h-4 w-4 text-white opacity-0" strokeWidth={3} />
      </span>
    </label>
  );
};

export default Checkbox;
