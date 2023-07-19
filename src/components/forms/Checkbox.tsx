import clsx from 'clsx';
import * as React from 'react';
import { RegisterOptions, useFormContext } from 'react-hook-form';

import Typography, {
  TypographyColor,
} from '@/components/typography/Typography';
import clsxm from '@/lib/clsxm';

enum CheckboxSize {
  'sm',
  'base',
}

export type CheckboxProps = {
  label: string;
  name: string;
  value?: string | number;
  helperText?: string;
  readOnly?: boolean;
  hideError?: boolean;
  validation?: RegisterOptions;
  size?: keyof typeof CheckboxSize;
  color?: keyof typeof TypographyColor;
} & Omit<React.ComponentPropsWithoutRef<'input'>, 'size'>;

export default function Checkbox({
  label,
  name,
  value,
  placeholder = '',
  helperText,
  readOnly = false,
  hideError = false,
  validation,
  size = 'base',
  color = 'primary',

  ...rest
}: CheckboxProps) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const error = errors[name];

  return (
    <div>
      <div className='flex items-start gap-2'>
        <input
          {...register(name, validation)}
          {...rest}
          type='checkbox'
          name={name}
          id={`${name}_${value}`}
          value={value}
          disabled={readOnly}
          className={clsxm(
            // add top margin so the checkbox align with the text
            'mt-[0.25em]',
            'shrink-0',
            'border-white rounded-sm border-2 focus:ring-0',
            'checked:bg-blue-400 checked:hover:bg-blue-600 checked:focus:bg-blue-400 checked:active:bg-blue-700',
            readOnly &&
              'cursor-not-allowed bg-gray-100 disabled:checked:bg-blue-300',
            error && 'border-red-400 bg-red-100',
            size === 'sm' && 'h-3.5 w-3.5',
          )}
          placeholder={placeholder}
          aria-describedby={name}
        />
        <Typography
          color={color}
          className={clsx(readOnly && 'cursor-not-allowed')}
          as='label'
          htmlFor={`${name}_${value}`}
          variant={clsx({ b2: size === 'base', b3: size === 'sm' })}
        >
          {label}
        </Typography>
      </div>
      <div className='mt-1'>
        {!(!hideError && error) && helperText && <p>{helperText}</p>}
        {!hideError && error && (
          <Typography variant='body'>{error?.message}</Typography>
        )}
      </div>
    </div>
  );
}
