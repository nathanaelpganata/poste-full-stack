import prisma from '@/lib/prisma';
import { protectRoute } from '@/lib/protectRoute';

export async function GET(
  request: Request,
  { params }: { params: { id: string } },
) {
  const response = protectRoute(request);
  if (response) {
    return response; // Unauthorized
  }
  const userPosts = await prisma.post.findMany({
    where: {
      authorId: params.id,
    },
    include: {
      author: {
        select: {
          email: true,
          name: true,
        },
      },
    },
  });

  return new Response(JSON.stringify(userPosts), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  });
}
