import { PostType } from '@/lib/types/interfaces';
import React from 'react';

const PostCard = ({
  title,
  content,
  author,
  published,
  authorId,
}: PostType) => {
  if (!published) return null;
  return (
    <a
      href={`/user/${authorId}`}
      className='flex flex-col text-left bg-gray-800 rounded-lg max-w-sm p-4 gap-2'
    >
      <h1 className='text-2xl font-semibold'>{title}</h1>
      <p className='text-base'>{content}</p>
      <p className='text-sm font-light'>Author: {author.name}</p>
    </a>
  );
};

export default PostCard;
