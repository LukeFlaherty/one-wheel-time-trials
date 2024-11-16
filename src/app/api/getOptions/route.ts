// app/api/getOptions/route.ts
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const [courses, boardTypes, riders] = await Promise.all([
      prisma.course.findMany({
        select: {
          id: true,
          name: true,
        },
        where: {
          isActive: true,
        },
      }),
      prisma.boardType.findMany({
        select: {
          id: true,
          name: true,
        },
      }),
      prisma.rider.findMany({
        select: {
          id: true,
          name: true,
        },
      }),
    ]);

    return NextResponse.json({
      courses,
      boardTypes,
      riders,
    });
  } catch (error) {
    console.error('Error fetching options:', error);
    return NextResponse.json(
      { error: 'Failed to fetch options' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}