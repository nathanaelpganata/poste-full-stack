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
  const filterFields = queryParams.getAll('filter[]') || [];
  const sortField = queryParams.get('sort') || 'name';
  const sortOrder = queryParams.get('type') || 'asc';
  const searchText = queryParams.get('search') || '';

  const where: any = {};
  filterFields.forEach((field) => {
    where['role'] = { equals: field };
  });

  const searchWhere = {
    OR: [
      { name: { contains: searchText } },
      { email: { contains: searchText } },
    ],
  };

  try {
    // Get the total count of users that match the specified filters and search criteria
    const totalUsersCount = await prisma.user.count({
      where: {
        AND: [
          where, // Filter condition
          searchWhere, // Search condition
        ],
      },
    });

    const users = await prisma.user.findMany({
      skip: (page - 1) * perPage,
      take: perPage,
      orderBy: {
        [sortField]: sortOrder as 'asc' | 'desc',
      },
      where: {
        AND: [
          where, // Filter condition
          searchWhere, // Search condition
        ],
      },
    });

    const maxPage = Math.ceil(totalUsersCount / perPage);

    const responsePayload = {
      users,
      meta: {
        page,
        maxPage,
      },
    };

    return new Response(JSON.stringify(responsePayload), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    return new Response(JSON.stringify({ message: error }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}
