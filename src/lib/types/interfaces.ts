export interface UserType {
  id: string;
  name: string | null | undefined;
  email: string;
  password: string;
  role: string;
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
}
