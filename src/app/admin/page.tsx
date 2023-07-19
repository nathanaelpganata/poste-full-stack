'use client';

import Button from '@/components/buttons/Button';
import Checkbox from '@/components/forms/Checkbox';
import ServerTable from '@/components/table/ServerTable';
import Typography from '@/components/typography/Typography';
import useServerTable from '@/hooks/useServerTable';
import { buildPaginatedTableURL } from '@/lib/table';
import { UserType } from '@/types/interfaces';
import { Popover, Transition } from '@headlessui/react';
import { useQuery } from '@tanstack/react-query';
import { ColumnDef } from '@tanstack/react-table';
import React from 'react';
import { FormProvider, useForm, useWatch } from 'react-hook-form';
import { FiX } from 'react-icons/fi';

type UserResponseType = {
  users: UserType[];
  meta: {
    page: number;
    maxPage: number;
  };
};

const AdminHomePage = () => {
  // Table Start
  const { tableState, setTableState } = useServerTable<UserType>({
    pageSize: 10,
  });
  const [levelFilter, setLevelFilter] = React.useState<string[]>([]);

  const columns: ColumnDef<UserType>[] = [
    {
      id: 'index',
      cell: (info) => info.row.index + 1,
      header: 'No.',
      size: 20,
    },
    {
      id: 'id',
      accessorKey: 'id',
      header: 'ID',
    },
    {
      id: 'name',
      accessorKey: 'name',
      header: 'Name',
    },
    {
      id: 'email',
      accessorKey: 'email',
      header: 'Email',
    },
    {
      id: 'role',
      accessorKey: 'role',
      header: 'Role',
    },
  ];
  // Table End

  // Fetching Data Start
  const url = buildPaginatedTableURL({
    baseUrl: '/users',
    tableState,
    additionalParam: { filter: levelFilter },
  });

  const { data, isLoading } = useQuery<UserResponseType>([url]);
  // Fetching Data End
  console.log(data);

  return (
    <div className='px-8'>
      <ServerTable
        columns={columns}
        isLoading={isLoading}
        data={data?.users ?? []}
        meta={data?.meta}
        tableState={tableState}
        setTableState={setTableState}
        header={<Header setLevelFilter={setLevelFilter} />}
        withFilter
        className='mt-8'
      />
    </div>
  );
};

export default AdminHomePage;

type HeaderProps = {
  setLevelFilter: React.Dispatch<React.SetStateAction<string[]>>;
};

const filterOption = [
  {
    id: 'ADMIN',
    name: 'Admin',
  },
  {
    id: 'USER',
    name: 'User',
  },
];

function Header({ setLevelFilter }: HeaderProps) {
  //#region  //*=========== Form ===========
  const methods = useForm({
    mode: 'onTouched',
  });
  const { control, setValue } = methods;

  const filter = useWatch({
    control,
    name: 'filter[]',
  });
  //#endregion  //*======== Form ===========

  React.useEffect(() => {
    setLevelFilter(filter);
  }, [filter, setLevelFilter]);

  const resetFilter = () => setValue('filter[]', []);

  return (
    <Popover className='relative'>
      {({ close }: { close: React.MouseEventHandler<HTMLButtonElement> }) => (
        <>
          <Popover.Button as='div'>
            <Button className='bg-secondary-400'>
              Filter {filter?.length > 0 && `(${filter.length})`}
            </Button>
          </Popover.Button>

          <Transition
            as={React.Fragment}
            enter='transition ease-out duration-200'
            enterFrom='opacity-0 translate-y-1'
            enterTo='opacity-100 translate-y-0'
            leave='transition ease-in duration-150'
            leaveFrom='opacity-100 translate-y-0'
            leaveTo='opacity-0 translate-y-1'
          >
            <Popover.Panel className='absolute left-0 z-10 w-screen max-w-xs mt-3 transform sm:left-1/2 sm:-translate-x-1/2'>
              <div className='overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5'>
                <div className='relative p-4 bg-green-500'>
                  <FormProvider {...methods}>
                    <div className='flex items-center justify-between'>
                      <Typography variant='h6'>Filter by</Typography>
                      <div className='flex items-center gap-3'>
                        <Typography
                          as='button'
                          variant='b3'
                          onClick={resetFilter}
                          className='font-semibold underline cursor-pointer text-blue-500'
                        >
                          Reset Filter
                        </Typography>
                        <Button leftIcon={FiX} onClick={close} />
                      </div>
                    </div>
                    <Typography variant='s3' color='secondary' className='mt-4'>
                      Filter
                    </Typography>
                    <div className='grid grid-cols-2 mt-2'>
                      {filterOption.map((item) => (
                        <Checkbox
                          key={item.id}
                          size='sm'
                          name='filter'
                          value={item.id}
                          label={item.name}
                        />
                      ))}
                    </div>
                  </FormProvider>
                </div>
              </div>
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  );
}
