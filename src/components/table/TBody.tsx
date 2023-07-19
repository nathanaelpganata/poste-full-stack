import { flexRender, RowData, Table } from '@tanstack/react-table';
import * as React from 'react';

import Typography from '@/components/typography/Typography';
import clsxm from '@/lib/clsxm';

type TBodyProps<T extends RowData> = {
  table: Table<T>;
  isLoading?: boolean;
} & React.ComponentPropsWithoutRef<'div'>;

export default function TBody<T extends RowData>({
  className,
  isLoading,
  table,
  ...rest
}: TBodyProps<T>) {
  return (
    <tbody className={clsxm(className)} {...rest}>
      {isLoading ? (
        <tr>
          <td
            className='truncate whitespace-nowrap py-4 px-3 col-span-full text-typo-icon text-center'
            colSpan={table.getAllColumns().length}
          >
            Loading...
          </td>
        </tr>
      ) : table.getRowModel().rows.length == 0 ? (
        <tr>
          <td
            className='truncate whitespace-nowrap py-4 px-3 col-span-full text-typo-icon text-center'
            colSpan={table.getAllColumns().length}
          >
            No Data
          </td>
        </tr>
      ) : (
        table.getRowModel().rows.map((row, index) => (
          <tr
            key={row.id}
            className={clsxm(index % 2 === 0 ? 'bg-slate-800' : 'bg-black')}
          >
            {row.getVisibleCells().map((cell) => {
              return (
                <Typography
                  key={cell.id}
                  as='td'
                  title={cell.getValue()}
                  className='truncate whitespace-nowrap py-4 px-3 text-center'
                  style={{ maxWidth: cell.column.getSize() }}
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </Typography>
              );
            })}
          </tr>
        ))
      )}
    </tbody>
  );
}
