export interface UserType {
  id: string;
  name: string | null | undefined;
  email: string;
  password: string;
  role: 'USER' | 'ADMIN' | 'SUPERADMIN';
  accessToken: string;
  posts: PostType[];
}

export interface PostType {
  id: string;
  title: string;
  content: string;
  published: boolean;
  authorId: string;
  author: UserType;
  createdAt: string;
  updatedAt: string;
}
