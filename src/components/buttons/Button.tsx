import * as React from 'react';
import { IconType } from 'react-icons';
import { ImSpinner2 } from 'react-icons/im';

import clsxm from '@/lib/clsxm';

enum ButtonVariant {
  'red',
  'yellow',
  'green',
  'outline',
  'basic',
  'discolored',
}
enum ButtonSize {
  'small',
  'base',
  'large',
}

type ButtonProps = {
  isLoading?: boolean;
  size?: keyof typeof ButtonSize;
  variant?: keyof typeof ButtonVariant;
  leftIcon?: IconType;
  rightIcon?: IconType;
  leftIconClassName?: string;
  rightIconClassName?: string;
} & React.ComponentPropsWithRef<'button'>;

// eslint-disable-next-line react/display-name
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      className,
      disabled: buttonDisabled,
      isLoading,
      size = 'base',
      variant = 'red',
      leftIcon: LeftIcon,
      rightIcon: RightIcon,
      leftIconClassName,
      rightIconClassName,
      ...rest
    },
    ref,
  ) => {
    const disabled = isLoading || buttonDisabled;

    return (
      <button
        ref={ref}
        type='button'
        disabled={disabled}
        className={clsxm(
          'button inline-flex items-center justify-center rounded-md md:rounded-lg',
          'focus:outline-none focus-visible:ring focus-visible:ring-primary-500',
          'transition-colors duration-75',
          //#region  //*=========== Size ===========
          [
            size === 'large' && [
              'min-h-[34px] py-2 px-[18px] font-semibold md:min-h-[38px] md:py-2.5 md:px-6',
              'md:text-lg',
            ],
            size === 'base' && [
              'min-h-[30px] py-1.5 px-[14px] font-semibold md:min-h-[34px] md:py-2 md:px-5',
              'text-sm ',
            ],
            size === 'small' && [
              'min-h-[26px] py-0.5 px-[10px] font-medium md:min-h-[30px] md:py-1.5 md:px-4',
              'text-xs md:text-sm',
            ],
          ],
          //#endregion  //*======== Size ===========
          //#region  //*=========== Variants ===========
          [
            variant === 'red' && [
              'bg-red-600 text-white',
              'hover:bg-red-700',
              'active:bg-red-800',
              'disabled:bg-red-700 disabled:brightness-90 disabled:hover:bg-red-700',
            ],
            variant === 'yellow' && [
              'bg-amber-600 text-white',
              'hover:bg-amber-700',
              'active:bg-amber-800',
              'disabled:bg-amber-700 disabled:brightness-90 disabled:hover:bg-amber-700',
            ],
            variant === 'green' && [
              'bg-green-600 text-white',
              'hover:bg-green-700',
              'active:bg-green-800',
              'disabled:bg-green-700 disabled:brightness-90 disabled:hover:bg-green-700',
            ],
            variant === 'outline' && [
              '!text-white',
              'border border-outline-base duration-250',
              'hover:bg-base-surface active:bg-base-outline disabled:bg-base-outline',
            ],
            variant === 'basic' && [
              '!text-white',
              'shadow-none duration-250',
              'hover:bg-base-surface active:bg-base-outline disabled:bg-base-outline',
            ],
            variant === 'discolored' && [
              'bg-slate-200 text-discolored-1000',
              'hover:bg-slate-600',
              'active:bg-slate-700',
              'disabled:bg-slate-600 disabled:brightness-90 disabled:hover:bg-slate-700',
            ],
          ],
          //#endregion  //*======== Variants ===========
          'disabled:cursor-not-allowed',
          isLoading &&
            'relative text-transparent transition-none hover:text-transparent disabled:cursor-wait',
          className,
        )}
        {...rest}
      >
        {isLoading && (
          <div
            className={clsxm(
              'absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white',
            )}
          >
            <ImSpinner2 className='animate-spin' />
          </div>
        )}
        {/* Left Icon */}
        {LeftIcon && (
          <div className='mr-1'>
            <LeftIcon
              className={clsxm(
                [
                  size === 'large' && 'text-xl md:text-2xl',
                  size === 'base' && 'text-lg md:text-xl',
                  size === 'small' && 'text-sm md:text-lg',
                ],
                [
                  variant === 'outline' && 'text-typo-white',
                  variant == 'basic' && 'text-typo-white',
                ],
                leftIconClassName,
              )}
            />
          </div>
        )}
        {children}
        {RightIcon && (
          <div className='ml-1'>
            <RightIcon
              className={clsxm(
                [
                  size === 'large' && 'text-xl md:text-2xl',
                  size === 'base' && 'text-lg md:text-xl',
                  size === 'small' && 'text-sm md:text-lg',
                ],
                [
                  variant === 'outline' && 'text-typo-icon',
                  variant == 'basic' && 'text-typo-icon',
                ],
                rightIconClassName,
              )}
            />
          </div>
        )}
      </button>
    );
  },
);

export default Button;
