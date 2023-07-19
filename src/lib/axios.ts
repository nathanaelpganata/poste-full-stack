import axios from 'axios';
import { getSession } from 'next-auth/react';

export default axios.create({
  baseURL: 'http://localhost:3000/api',
  headers: { 'Content-Type': 'application/json' },
});

export const axiosAuth = axios.create({
  baseURL: 'http://localhost:3000/api',
  headers: { 'Content-Type': 'application/json' },
});

axiosAuth.interceptors.request.use(async (config) => {
  if (!config.headers['Authorization']) {
    try {
      const session = await getSession();
      config.headers['Authorization'] = `Bearer ${session?.user.accessToken}`;
    } catch (error) {
      console.error('Error fetching session:', error);
    }
  }
  return config;
});
