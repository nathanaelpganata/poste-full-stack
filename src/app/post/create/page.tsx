'use client';

import { DANGER_TOAST, SUCCESS_TOAST, showToast } from '@/components/Toast';
import Input from '@/components/forms/Input';
import TextArea from '@/components/forms/TextArea';
import { useAxiosAuth } from '@/hooks/useAxiosAuth';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';

const CreatePostPage = () => {
  const method = useForm();
  const { handleSubmit } = method;

  const router = useRouter();

  const axiosAuth = useAxiosAuth();

  const { data: session } = useSession();

  const onSubmit = async (data: any) => {
    await axiosAuth
      .post('/post', {
        ...data,
        authorId: session?.user?.id,
      })
      .then(() => {
        showToast('Post Created Successfully', SUCCESS_TOAST),
          router.replace('/post');
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

export default CreatePostPage;
