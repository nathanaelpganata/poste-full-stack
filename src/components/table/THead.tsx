import { flexRender, RowData, Table } from '@tanstack/react-table';
import * as React from 'react';
import { AiFillCaretDown } from 'react-icons/ai';

import clsxm from '@/lib/clsxm';

type THeadProps<T extends RowData> = {
  omitSort: boolean;
  table: Table<T>;
} & React.ComponentPropsWithoutRef<'div'>;

export default function THead<T extends RowData>({
  className,
  omitSort,
  table,
  ...rest
}: THeadProps<T>) {
  return (
    <thead className={clsxm('bg-cyan-500 text-white', className)} {...rest}>
      {table.getHeaderGroups().map((headerGroup) => (
        <tr key={headerGroup.id}>
          {headerGroup.headers.map((header, index) => (
            <th
              {...{
                key: header.id,
                colSpan: header.colSpan,
                style: {
                  width: header.getSize(),
                },
              }}
              key={header.id}
              scope='col'
              className={clsxm(
                'mx-auto items-center py-3 text-left text-sm font-semibold capitalize ',
                // !omitSort && header.column.getCanSort() ? 'pl-4' : 'pl-[30px]',
                'row-span-2',
              )}
            >
              {header.isPlaceholder ? null : (
                <>
                  <div
                    className={clsxm(
                      // if have 2 columns in 1 header, colspan 2
                      'relative mx-auto flex items-center justify-center gap-2 py-1',
                      !omitSort && header.column.getCanSort()
                        ? 'cursor-pointer select-none'
                        : '',
                    )}
                    onClick={
                      omitSort
                        ? () => null
                        : header.column.getToggleSortingHandler()
                    }
                  >
                    {!omitSort &&
                    header.column.getCanSort() &&
                    !header.column.getIsSorted() ? (
                      <AiFillCaretDown className='group-hover:fill-white w-1.5 rotate-180 fill-transparent' />
                    ) : (
                      {
                        asc: (
                          <AiFillCaretDown className='fill-white w-1.5 rotate-180' />
                        ),
                        desc: <AiFillCaretDown className='fill-white w-1.5' />,
                      }[header.column.getIsSorted() as string] ?? null
                    )}
                    <p>
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                    </p>
                    <div
                      {...{
                        onMouseDown: header.getResizeHandler(),
                        onTouchStart: header.getResizeHandler(),
                        className: `${
                          index != headerGroup.headers.length - 1 && 'resizer'
                        } ${header.column.getIsResizing() ? 'isResizing' : ''}`,
                        style: {
                          transform: header.column.getIsResizing()
                            ? `translateX(${
                                table.getState().columnSizingInfo.deltaOffset
                              }px)`
                            : '',
                        },
                      }}
                    />
                  </div>
                </>
              )}
            </th>
          ))}
        </tr>
      ))}
    </thead>
  );
}
