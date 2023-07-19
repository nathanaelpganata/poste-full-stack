'use client';

import {
  DANGER_TOAST,
  LOADING_TOAST,
  SUCCESS_TOAST,
  showToast,
} from '@/components/Toast';
import { useRouter } from 'next/navigation';
import { signIn, useSession } from 'next-auth/react';
import React from 'react';
import toast from 'react-hot-toast';

interface IProps {
  searchParams?: { [key: string]: string | string[] | undefined };
}

const LoginPage = ({ searchParams }: IProps) => {
  const router = useRouter();

  const { data: session } = useSession();

  const email = React.useRef('');
  const password = React.useRef('');

  // const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   toast.promise(
  //     signIn<'credentials'>('credentials', {
  //       email: email.current,
  //       password: password.current,
  //       redirect: false
  //     }),
  //     {
  //       loading: "",
  //       success: (res) => showToast(`${res?.error}`, WARNING_TOAST),
  //       error: (res) => showToast(`${res?.error}`, WARNING_TOAST),
  //     },
  //   );
  // };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    showToast('Logging in...', LOADING_TOAST);
    const res = await signIn('credentials', {
      email: email.current,
      password: password.current,
      redirect: false,
    });
    toast.dismiss();
    if (res?.url) {
      showToast('Logged in successfully', SUCCESS_TOAST);
    } else {
      showToast('Invalid credentials', DANGER_TOAST);
    }
  };

  if (session && session.user && session.user.role == 'USER') {
    router.replace('/post');
  } else if (session && session.user && session.user.role == 'ADMIN') {
    router.replace('/admin');
  }

  return (
    <div className='flex flex-col justify-center items-center pt-32 w-full text-white gap-2'>
      {searchParams?.message && (
        <p className='text-red-700 text-base font-bold text-center border-2 border-red-700 rounded-md py-2 px-5'>
          {searchParams?.message}
        </p>
      )}
      <form
        className='flex flex-col gap-3 bg-[#333333] p-8 rounded-md'
        onSubmit={onSubmit}
      >
        <div className='flex flex-col'>
          <label className='text-xl' htmlFor='email'>
            Email
          </label>
          <input
            className='bg-transparent outline-none border-2 rounded-md px-2 py-1'
            type='email'
            id='email'
            name='email'
            onChange={(e) => (email.current = e.target.value)}
          />
        </div>
        <div className='flex flex-col'>
          <label className='text-xl' htmlFor='password'>
            Password
          </label>
          <input
            className='bg-transparent outline-none border-2 rounded-md px-2 py-1'
            type='password'
            id='password'
            name='password'
            onChange={(e) => (password.current = e.target.value)}
          />
        </div>
        <button className='bg-slate-900 py-2 rounded-md mt-4' type='submit'>
          Log In
        </button>
        <p className='text-sm text-center text-slate-300'>
          Not registered? Register{' '}
          <a href='/register' className='underline'>
            here
          </a>
        </p>
      </form>
    </div>
  );
};

export default LoginPage;
