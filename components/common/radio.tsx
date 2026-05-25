'use client';

import clsx from 'clsx';

type RadioProps = {
  checked: boolean;
  onChange: (checked: boolean) => void;
  ariaLabel?: string;
  className?: string;
  name?: string;
};

const Radio = ({
  checked,
  onChange,
  ariaLabel,
  className,
  name,
}: RadioProps) => {
  return (
    <label className={clsx('inline-flex items-center', className)}>
      <input
        type="radio"
        name={name}
        className="peer sr-only"
        checked={checked}
        onChange={event => onChange(event.target.checked)}
        aria-label={ariaLabel}
      />
      <span
        className={clsx(
          'border-surface-container-highest flex h-6 w-6 items-center justify-center rounded-full border-2 bg-white',
          checked ? 'border-blue-600!' : '',
        )}>
        <span
          className={clsx(
            'h-3 w-3 rounded-full transition-colors',
            checked ? 'bg-blue-600' : 'bg-transparent',
          )}
        />
      </span>
    </label>
  );
};

export default Radio;
