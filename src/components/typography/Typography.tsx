import * as React from 'react';

import clsxm from '@/lib/clsxm';

enum TypographyVariant {
  'h0',
  'h1',
  'h2',
  'h3',
  'h4',
  'h5',
  'h6',
  't',
  'p',
  'b1',
  'b2',
  'c',
}

export enum TypographyColor {
  'DEFAULT',
  'primary',
  'secondary',
  'tertiary',
  'danger',
  'success',
  'warning',
  'skyblue',
  'purple',
}

enum FontVarinat {
  'upakarti',
  'montserrat',
}

type TypographyProps<T extends React.ElementType> = {
  /** @default <p> tag */
  as?: T;
  className?: string;
  color?: keyof typeof TypographyColor;
  font: keyof typeof FontVarinat;
  variant: keyof typeof TypographyVariant;
  children: React.ReactNode;
} & React.ComponentProps<T>;

export default function Typography<T extends React.ElementType>({
  as,
  children,
  className,
  color = 'primary',
  font = 'montserrat',
  variant,
  ...rest
}: TypographyProps<T>) {
  const Component = as || 'p';
  return (
    <Component
      className={clsxm(
        //#region  //*=========== Variants ===========
        [
          variant === 'h0' && [
            'font-bold text-[96px] sm:text-[128px] md:text-[196px]',
          ],
          variant === 'h1' && ['text-[64px] md:text-[80px]'],
          variant === 'h2' && ['text-[48px] md:text-[72px]'],
          variant === 'h3' && ['text-[32px] md:text-[64px]'],
          variant === 'h4' && ['text-[24px] md:text-[48px]'],
          variant === 'h5' && ['text-[20px] md:text-[32px]'],
          variant === 'h6' && ['text-[16px] md:text-[24px]'],
          variant === 't' && ['text-[20px]'],
          variant === 'p' && ['text-sm md:text-[18px] leading-[24px]'],
          variant === 'b1' && ['text-[16px]'],
          variant === 'b2' && ['text-[16px]'],
          variant === 'c' && ['text-[14px]'],
        ],

        //#region  //*=========== Color ===========
        [
          color === 'primary' && ['text-neutral-200'],
          color === 'secondary' && ['text-neutral-900'],
          color === 'danger' && ['text-red-600'],
          color === 'success' && ['text-green-600'],
          color === 'warning' && ['text-amber-600'],
          color === 'skyblue' && ['text-[#30B1FE]'],
          color === 'purple' && ['text-[#713BDB]'],
        ],
        //#endregion  //*======== Color ===========
        [
          font === 'montserrat' && ['font-primary leading-none'],
          // font === 'montserrat' && ['font-secondary'],
        ],
        className,
      )}
      {...rest}
    >
      {children}
    </Component>
  );
}
