import { RowData, Table } from '@tanstack/react-table';
import * as React from 'react';
import { FiSearch, FiXCircle } from 'react-icons/fi';

import clsxm from '@/lib/clsxm';

type FilterProps<T extends RowData> = {
  table: Table<T>;
  placeholder?: string;
} & React.ComponentPropsWithoutRef<'div'>;

export default function Filter<T extends RowData>({
  className,
  table,
  placeholder = 'Search...',
  ...rest
}: FilterProps<T>) {
  const [filter, setFilter] = React.useState('');

  const handleClearFilter = () => {
    table.setGlobalFilter('');
    setFilter('');
  };

  React.useEffect(() => {
    const timeout = setTimeout(() => {
      table.setGlobalFilter(filter);
    }, 360);
    return () => clearTimeout(timeout);
  }, [filter, table]);

  return (
    <div className={clsxm('relative mt-1 self-start', className)} {...rest}>
      <div className='pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3'>
        <FiSearch className='text-typo text-[1.125rem]' />
      </div>
      <input
        type='text'
        value={filter ?? ''}
        onChange={(e) => {
          setFilter(String(e.target.value));
        }}
        className={clsxm(
          'block rounded-lg pl-9 pr-20 text-base shadow-sm transition duration-100',
          'border-typo-outline bg-secondary-250 focus:border-typo-icon focus:ring-0',
          'placeholder:text-typo-icon',
          'caret-primary-400',
        )}
        placeholder={placeholder}
      />
      {table.getState().globalFilter !== '' && (
        <div className='absolute inset-y-0 right-0 flex items-center pr-3'>
          <button type='button' onClick={handleClearFilter} className='p-1'>
            <FiXCircle className='text-typo-icons text-xl text-danger-main' />
          </button>
        </div>
      )}
    </div>
  );
}
