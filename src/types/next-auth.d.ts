import { UserType } from './interfaces';

declare module 'next-auth' {
  interface Session {
    user: UserType;
  }
}
