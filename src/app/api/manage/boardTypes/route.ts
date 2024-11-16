import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const boardTypes = await prisma.boardType.findMany({
      orderBy: { name: 'asc' }
    });
    return NextResponse.json(boardTypes);
  } catch (error) {
    console.error('Error fetching board types:', error);
    return NextResponse.json({ error: 'Failed to fetch board types' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, description } = body;

    const boardType = await prisma.boardType.create({
      data: {
        name,
        description: description || null,
      },
    });

    return NextResponse.json(boardType, { status: 201 });
  } catch (error) {
    console.error('Error creating board type:', error);
    return NextResponse.json({ error: 'Failed to create board type' }, { status: 500 });
  }
}