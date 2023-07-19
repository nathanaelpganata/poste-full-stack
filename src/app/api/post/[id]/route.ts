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
  const posts = await prisma.post.findMany({
    where: {
      id: params.id,
    },
  });

  return new Response(JSON.stringify(posts), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  });
}
