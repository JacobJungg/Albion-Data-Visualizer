import { NextResponse } from 'next/server';
import { auth, currentUser } from '@clerk/nextjs';

import prismadb from '@/lib/prismadb';
import { checkSubscription } from '@/lib/subscription';

export async function PATCH(
  req: Request,
  { params }: { params: { itemId: string } }
) {
  try {
    const body = await req.json();
    const user = await currentUser();
    const { src, name, description, instructions, seed, categoryId } = body;
    if (!params.itemId) {
      return new NextResponse('Item ID required', { status: 400 });
    }

    if (!user || !user.id || !user.firstName) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    if (
      !src ||
      !name ||
      !description ||
      !instructions ||
      !seed ||
      !categoryId
    ) {
      return new NextResponse('Missing required fields', { status: 400 });
    }


    const item = await prismadb.item.update({
      where: {
        id: params.itemId,
        userId: user.id,
      },
      data: {
        categoryId,
        userId: user.id,
        userName: user.firstName,
        src,
        name,
        description,
        instructions,
        seed,
      },
    });
    return NextResponse.json(item);
  } catch (error) {
    console.log('[ITEM_PATCH]', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  {
    params,
  }: {
    params: {
        itemId: string;
    };
  }
) {
  try {
    const { userId } = auth();
    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 });
    }
    const item = await prismadb.item.delete({
      where: {
        userId,
        id: params.itemId,
      },
    });
    return NextResponse.json(item);
  } catch (error) {
    console.log('[ITEM_DELETE]', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}