'use client';

import { signIn, signOut, useSession } from 'next-auth/react';
import React from 'react';
import { SUCCESS_TOAST, showToast } from './Toast';

const Navbar = () => {
  const { data: session } = useSession();
  return (
    <div className='flex flex-row justify-between items-center w-full h-20 px-10 bg-[#333333] text-lg'>
      <a href='/'>LOGO</a>
      {session && session.user ? (
        <div className='flex flex-row-reverse items-center gap-4'>
          <button
            className='px-3 py-1.5 bg-red-500 rounded-md'
            onClick={() =>
              signOut().then(async () => {
                showToast('Logout Successful', SUCCESS_TOAST);
              })
            }
          >
            Logout
          </button>
          <a
            href={session.user.role === 'USER' ? '/post' : '/admin'}
            className='px-3 py-1.5 bg-slate-700 rounded-md'
          >
            {session?.user?.name}
          </a>
          {session.user.role === 'USER' ? (
            <>
              <a
                href='/post/create'
                className='px-3 py-1.5 bg-orange-500 rounded-md'
              >
                Create Post
              </a>
              <a
                href='/post/manage'
                className='px-3 py-1.5 bg-green-500 rounded-md'
              >
                Manage Post
              </a>
            </>
          ) : (
            <p>Admin</p>
          )}
        </div>
      ) : (
        <button onClick={() => signIn()}>Login</button>
      )}
    </div>
  );
};

export default Navbar;
