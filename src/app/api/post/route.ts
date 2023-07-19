import prisma from '@/lib/prisma';
import { protectRoute } from '@/lib/protectRoute';

export async function GET(request: Request) {
  const response = protectRoute(request);
  if (response) {
    return response;
  }

  const queryParams = new URLSearchParams(request.url.split('?')[1]);
  const page = Number(queryParams.get('page')) || 1;
  const perPage = Number(queryParams.get('perPage')) || 10;

  const skip = (page - 1) * perPage;

  const data = await prisma.post.findMany({
    include: {
      author: {
        select: {
          id: true,
          name: true,
        },
      },
    },
    skip: skip,
    take: perPage,
  });

  return new Response(JSON.stringify(data), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

export async function POST(request: Request) {
  const body = await request.json();

  const response = protectRoute(request);
  if (response) {
    return response;
  }

  try {
    await prisma.post.create({
      data: {
        title: body.title,
        content: body.content,
        published: body.published || false,
        authorId: body.authorId,
      },
    });
  } catch (err) {
    return new Response(JSON.stringify({ message: err }), {
      status: 400,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  return new Response(JSON.stringify({ message: 'Post created' }), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

export async function PUT(request: Request) {
  const body = await request.json();

  const response = protectRoute(request);
  if (response) {
    return response;
  }

  try {
    await prisma.post.update({
      where: {
        id: body.id,
      },
      data: {
        title: body.title,
        content: body.content,
        published: body.published || false,
        authorId: body.authorId,
      },
    });
  } catch (err) {
    return new Response(JSON.stringify({ message: err }), {
      status: 400,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  return new Response(JSON.stringify({ message: 'Post updated' }), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

export async function DELETE(request: Request) {
  const body = await request.json();

  const response = protectRoute(request);
  if (response) {
    return response;
  }

  try {
    await prisma.post.delete({
      where: {
        id: body.id,
      },
    });
  } catch (err) {
    return new Response(JSON.stringify({ message: err }), {
      status: 400,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  return new Response(JSON.stringify({ message: 'Post deleted' }), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  });
}
