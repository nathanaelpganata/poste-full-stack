import prisma from '@/lib/prisma';
import { protectRoute } from '@/lib/protectRoute';

export async function GET(request: Request) {
  const response = protectRoute(request);
  if (response) {
    return response;
  }

  const data = await prisma.post.findMany({
    include: {
      author: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  });

  return new Response(JSON.stringify(data), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  });
}
