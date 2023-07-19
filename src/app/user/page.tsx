'use client';

import PostCard from '@/components/PostCard';
import { PostType } from '@/lib/types/interfaces';
import { useSession } from 'next-auth/react';
import { useAxiosAuth } from '@/components/hooks/useAxiosAuth';
import React from 'react';

const UsersHomePage = () => {
  const { data: session } = useSession();

  const [data, setData] = React.useState([]);

  const axiosAuth = useAxiosAuth();

  const GetData = async () => {
    const res = await axiosAuth.get('/user/posts');
    setData(res.data);
  };

  React.useEffect(() => {
    GetData();
  });

  return (
    <div>
      <h1 className='mb-10 text-3xl font-semibold'>Recent Posts</h1>
      <div className='flex flex-wrap gap-4'>
        {data.length >= 1 &&
          data.map(({ ...v }: PostType, i: number) => (
            <PostCard {...v} key={i} />
          ))}
      </div>
    </div>
  );
};

export default UsersHomePage;
