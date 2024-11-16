import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    await prisma.timeTrialRun.delete({
      where: {
        id,
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting run:', error);
    return NextResponse.json(
      { error: 'Failed to delete run' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}