import * as React from 'react';
import { get, RegisterOptions, useFormContext } from 'react-hook-form';
import { IconType } from 'react-icons';
import { HiExclamationCircle } from 'react-icons/hi';

import clsxm from '@/lib/clsxm';

export type InputProps = {
  label: string;
  id: string;
  placeholder?: string;
  helperText?: string;
  type?: React.HTMLInputTypeAttribute;
  readOnly?: boolean;
  hideError?: boolean;
  leftIcon?: IconType;
  rightIcon?: IconType;
  inputClassName?: string;
  leftIconClassName?: string;
  rightIconClassName?: string;
  validation?: RegisterOptions;
} & React.ComponentPropsWithoutRef<'input'>;

export default function Input({
  label,
  placeholder = '',
  helperText,
  id,
  type = 'text',
  readOnly = false,
  hideError = false,
  leftIcon: LeftIcon,
  rightIcon: RightIcon,
  inputClassName,
  leftIconClassName,
  rightIconClassName,
  validation,
  ...rest
}: InputProps) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const error = get(errors, id);

  return (
    <div>
      <label
        htmlFor={id}
        className='block text-sm font-semibold text-neutral-100'
      >
        {label}
      </label>
      <div className='relative mt-1'>
        <input
          {...register(id, validation)}
          {...rest}
          type={type}
          name={id}
          id={id}
          readOnly={readOnly}
          className={clsxm(
            readOnly
              ? 'bg-gray-500 focus:ring-0 cursor-not-allowed border-none'
              : error
              ? 'bg-red-200 focus:ring-red-500 border-red-500 focus:border-red-500'
              : 'bg-transparent focus:ring-blue-500 border-gray-600 focus:border-blue-500',
            'block w-full rounded-md outline-none',
            'px-2 py-1.5 border-2',
            inputClassName,

            LeftIcon && 'pl-9',
            RightIcon && 'pr-8',
          )}
          placeholder={placeholder}
          aria-describedby={id}
        />
        {LeftIcon && (
          <div className='absolute left-0 translate-x-1/2 -translate-y-1/2 top-1/2'>
            <LeftIcon
              className={clsxm('text-lg md:text-xl', leftIconClassName)}
            />
          </div>
        )}
        {RightIcon && (
          <div className='absolute right-0 -translate-x-1/2 -translate-y-1/2 top-1/2'>
            <RightIcon
              className={clsxm('text-lg md:text-xl', rightIconClassName)}
            />
          </div>
        )}
      </div>
      <div className='mt-1'>
        {helperText && <p className='text-xs text-neutral-300'>{helperText}</p>}
        {!hideError && error && (
          <span className='flex text-sm text-red-500 gap-x-1'>
            <HiExclamationCircle className='text-xl text-red-500' />
            {error?.message as unknown as string}
          </span>
        )}
      </div>
    </div>
  );
}
