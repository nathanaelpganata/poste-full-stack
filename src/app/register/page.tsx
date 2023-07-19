'use client';

import { DANGER_TOAST, SUCCESS_TOAST, showToast } from '@/components/Toast';
import { useRouter } from 'next/navigation';
import { FormProvider, useForm } from 'react-hook-form';
import React from 'react';
import axios from '@/lib/axios';
import Input from '@/components/forms/Input';

const RegisterPage = () => {
  const router = useRouter();

  // Use Form
  const methods = useForm();
  const { handleSubmit } = methods;

  const onSubmit = async (data: any) => {
    const res = await axios
      .post('/user', data)
      .then(() => showToast('Account Created Successfully', SUCCESS_TOAST))
      .then(() => router.replace('/login'))
      .catch((err) => showToast(err.response.data.message, DANGER_TOAST));
  };

  return (
    <div className='flex justify-center items-center pt-32 w-full text-white '>
      <FormProvider {...methods}>
        <form
          className='flex flex-col gap-3 bg-[#333333] p-8 rounded-md'
          onSubmit={handleSubmit(onSubmit)}
        >
          <Input
            id='name'
            label='Name'
            type='text'
            placeholder='josh'
            validation={{ required: 'Name is required' }}
          />
          <Input
            id='email'
            label='Email'
            type='email'
            placeholder='josh@example.com'
            validation={{ required: 'Email is required' }}
          />
          <Input
            id='password'
            label='Password'
            type='password'
            placeholder='password'
            validation={{ required: 'Password is required' }}
          />
          <button
            className='bg-blue-700 py-2 rounded-md mt-4 hover:bg-blue-800'
            type='submit'
          >
            Sign Up
          </button>
        </form>
      </FormProvider>
    </div>
  );
};

export default RegisterPage;
