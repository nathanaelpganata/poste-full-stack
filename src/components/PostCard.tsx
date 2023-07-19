'use client';

import { PostCardType } from '@/app/post/manage/page';
import {
  DANGER_TOAST,
  LOADING_TOAST,
  SUCCESS_TOAST,
  showToast,
} from '@/components/Toast';
import { useAxiosAuth } from '@/hooks/useAxiosAuth';
import { useSession } from 'next-auth/react';
import React from 'react';
import toast from 'react-hot-toast';

const PostCard = ({
  id,
  title,
  content,
  author,
  published,
  authorId,
  onSuccess,
}: PostCardType) => {
  const axiosAuth = useAxiosAuth();
  const [readOnly, setReadOnly] = React.useState<boolean>(true);

  const { data: session } = useSession();
  React.useEffect(() => {
    if (session?.user.id === authorId) setReadOnly(false);
  }, [session, authorId]);

  const deletePost = () => {
    showToast('Deleting Post...', LOADING_TOAST);
    axiosAuth
      .delete(`/post`, {
        data: {
          id,
        },
      })
      .then(() => {
        onSuccess(), toast.dismiss();
      })
      .then(() => {
        showToast('Successfully Deleted', SUCCESS_TOAST);
      })
      .catch((err) => showToast(err.response.data.message, DANGER_TOAST));
  };

  return (
    <div className='flex flex-col justify-between gap-3 text-left bg-gray-800 rounded-lg w-full max-w-sm p-4 h-56'>
      <div>
        <h1 className='text-2xl font-semibold'>{title}</h1>
        <p className='text-base line-clamp-4 mt-2'>{content}</p>
      </div>
      <div className='self-end w-full'>
        {readOnly ? (
          <a
            href={`/post/${authorId}`}
            className='text-sm font-light hover:underline decoration-blue-500 hover:text-blue-500'
          >
            Author: {author.name}
          </a>
        ) : (
          <div className='flex flex-row w-full justify-between gap-3  items-end'>
            <p className='text-slate-300 font-light'>
              {published === false ? 'Not published' : 'Published'}
            </p>
            <div className='flex flex-row gap-2 text-center'>
              <a
                href={`/post/edit/${id}`}
                className='px-4 py-1.5 bg-amber-500 rounded-lg'
              >
                Edit
              </a>
              <button
                className='px-4 py-1.5 bg-red-500 rounded-md'
                onClick={deletePost}
              >
                Delete
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PostCard;
