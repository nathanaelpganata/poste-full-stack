'use client';

import PostCard from '@/components/PostCard';
import { useAxiosAuth } from '@/components/hooks/useAxiosAuth';
import { PostType } from '@/lib/types/interfaces';
import { useSession } from 'next-auth/react';
import React from 'react';

const UserPostsPage = ({ params }: { params: { id: string } }) => {
  const { data: session } = useSession();
  const [data, setData] = React.useState<PostType[]>([]);
  const axiosAuth = useAxiosAuth();
  const GetData = async () => {
    const res = await axiosAuth.get(`/user/posts/${params.id}`);
    setData(res.data);
  };
  React.useEffect(() => {
    GetData();
  });

  return (
    <div>
      <h1 className='mb-10 text-3xl font-semibold'>
        {session?.user?.name}`s Posts
      </h1>
      <div className='flex flex-wrap gap-4'>
        {data.length < 1 && <div>No Posts</div>}
        {data &&
          data.map(({ ...v }: PostType, i: number) => (
            <PostCard {...v} key={i} />
          ))}
      </div>
    </div>
  );
};

export default UserPostsPage;
