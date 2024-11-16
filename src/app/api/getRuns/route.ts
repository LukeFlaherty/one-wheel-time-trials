import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const runs = await prisma.timeTrialRun.findMany({
      include: {
        course: {
          select: {
            name: true,
          },
        },
        rider: {
          select: {
            name: true,
          },
        },
        boardType: {
          select: {
            name: true,
          },
        },
      },
      orderBy: {
        date: 'desc',
      },
    });

    return NextResponse.json(runs);
  } catch (error) {
    console.error('Error fetching runs:', error);
    return NextResponse.json(
      { error: 'Failed to fetch runs' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}