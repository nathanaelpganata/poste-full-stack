import * as React from 'react';

import clsxm from '@/lib/clsxm';

type TOptionProps = {
  children: React.ReactNode;
  placeholder?: string;
  value: string | number | readonly string[] | undefined;
  onChange: React.ChangeEventHandler<HTMLSelectElement>;
};

export default function TOption({
  children,
  placeholder,
  onChange,
  value,
}: TOptionProps) {
  return (
    <div
      className={clsxm(
        'flex items-center justify-start',
        'border-secondary-250 hover:border-primary-400 hover:ring-0',
      )}
    >
      <div className='relative '>
        <select
          className={clsxm(
            'text-typo-icon block rounded-md pr-32 py-2.5 text-sm shadow-sm',
            'border-typo-outline outline-none ring-0 focus:border-typo-icon focus:outline-none focus:ring-0',
            'transition duration-100 hover:border-typo-outline/70',
            'active:border-typo-outline disabled:bg-danger-main disabled:brightness-95',
          )}
          value={value}
          onChange={onChange}
        >
          {placeholder && (
            <option value='' disabled hidden>
              {placeholder}
            </option>
          )}
          {children}
        </select>
      </div>
    </div>
  );
}
