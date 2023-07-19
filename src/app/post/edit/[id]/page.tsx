'use client';

import { DANGER_TOAST, SUCCESS_TOAST, showToast } from '@/components/Toast';
import Input from '@/components/forms/Input';
import TextArea from '@/components/forms/TextArea';
import { useAxiosAuth } from '@/hooks/useAxiosAuth';
import { PostType } from '@/types/interfaces';
import { useRouter } from 'next/navigation';
import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';

const EditPostPage = ({ params }: { params: { id: string } }) => {
  const axiosAuth = useAxiosAuth();

  const method = useForm({
    defaultValues: async () =>
      axiosAuth.get(`/post/${params.id}`).then((res) => {
        return res.data[0];
      }),
  });

  const { handleSubmit } = method;

  const router = useRouter();

  const onSubmit = async (data: Omit<PostType, 'id'>) => {
    await axiosAuth
      .put('/post', {
        ...data,
        id: params.id,
      })
      .then(() => {
        showToast('Post Edited Successfully', SUCCESS_TOAST),
          router.replace('/post/manage');
      })
      .catch((err) => showToast(err.response.data.message, DANGER_TOAST));
  };

  return (
    <div className='flex justify-center w-full mt-24'>
      <FormProvider {...method}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className='flex flex-col max-w-md w-full p-8 bg-slate-500 rounded-md'
        >
          <Input
            id='title'
            label='Title'
            placeholder='Title'
            validation={{ required: 'Please fill the Title' }}
          />
          <TextArea
            id='content'
            label='Content'
            placeholder='Content'
            rows={5}
            validation={{ required: 'Please fill the Content' }}
          />
          <Input id='published' label='Published (?)' type='checkbox' />
          <button type='submit' className='bg-blue-400 px-5 py-1.5 mt-4'>
            Submit
          </button>
        </form>
      </FormProvider>
    </div>
  );
};

export default EditPostPage;
