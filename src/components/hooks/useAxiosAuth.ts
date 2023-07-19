'use client';

import { axiosAuth } from '@/lib/axios';
import { useSession } from 'next-auth/react';
import React from 'react';

export const useAxiosAuth = () => {
  const { data: session } = useSession();

  React.useEffect(() => {
    const requestIntercept = axiosAuth.interceptors.request.use((config) => {
      if (!config.headers['Authorization']) {
        config.headers['Authorization'] = `Bearer ${session?.user.accessToken}`;
      }
      return config;
    });
    return () => {
      axiosAuth.interceptors.request.eject(requestIntercept);
    };
  }, [session]);
  return axiosAuth;
};
