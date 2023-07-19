'use client';

import PostCard from '@/components/PostCard';
import { PostType } from '@/types/interfaces';
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { PostCardType } from '@/app/post/manage/page';

const UsersHomePage = () => {
  const {
    data: queryData,
    isLoading,
    refetch,
  } = useQuery<PostCardType[]>(['/post?page=1&perPage=100']);

  return (
    <div>
      <h1 className='mb-10 text-3xl font-semibold'>Recent Posts</h1>
      <div className='flex flex-wrap gap-4'>
        {isLoading ? (
          <>Loading...</>
        ) : (
          queryData
            ?.filter((d) => d?.published !== false)
            .map(({ ...v }: PostType) => (
              <PostCard {...v} key={v.id} onSuccess={refetch} />
            ))
        )}
      </div>
    </div>
  );
};

export default UsersHomePage;
