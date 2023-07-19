'use client';

import PostCard from '@/components/PostCard';
import { UserType } from '@/types/interfaces';
import { useQuery } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import React from 'react';

export type PostCardType = {
  id: string;
  title: string;
  content: string;
  published: boolean;
  authorId: string;
  author: UserType;
  createdAt: string;
  updatedAt: string;
  onSuccess: () => void;
};

const ManagePostPage = () => {
  const { data: session } = useSession();

  const {
    data: queryData,
    isLoading,
    refetch,
  } = useQuery<PostCardType[]>([`/post/user/${session?.user.id}`]);

  return (
    <div>
      <h1 className='mb-10 text-3xl font-semibold'>
        {session?.user?.name}`s Posts
      </h1>
      <div className='flex flex-wrap gap-4'>
        {isLoading ? (
          <>Loading</>
        ) : (
          queryData?.map(({ ...v }: PostCardType, i: number) => (
            <PostCard {...v} key={i} onSuccess={refetch} />
          ))
        )}
      </div>
    </div>
  );
};

export default ManagePostPage;
