import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { courseId, riderId, time, boardTypeId, timeOfDay, date, notes } = body;

    // Parse the time string (MM:SS.ms) into milliseconds for storage
    const [minutes, secondsMs] = time.split(':');
    const [seconds, ms] = secondsMs.split('.');
    const timeInMs = (parseInt(minutes) * 60 * 1000) + 
                    (parseInt(seconds) * 1000) + 
                    (parseInt(ms) * 10); // multiply by 10 since we're getting hundredths

    // Create the time trial run
    const newRun = await prisma.timeTrialRun.create({
      data: {
        course: {
          connect: { id: courseId }
        },
        rider: {
          connect: { id: riderId }
        },
        time,
        timeInMs,
        boardType: {
          connect: { id: boardTypeId }
        },
        timeOfDay,
        date: new Date(date),
        notes,
      },
      include: {
        course: true,
        rider: true,
        boardType: true,
      },
    });

    // Check if this is a personal best
    const previousBest = await prisma.timeTrialRun.findFirst({
      where: {
        courseId,
        riderId,
        boardTypeId,
        timeInMs: {
          lt: timeInMs,
        },
      },
      orderBy: {
        timeInMs: 'asc',
      },
    });

    if (!previousBest) {
      // This is a personal best
      await prisma.timeTrialRun.update({
        where: { id: newRun.id },
        data: { isPersonalBest: true },
      });

      // Check if it's also a course record
      const courseRecord = await prisma.courseRecord.findUnique({
        where: {
          courseId_boardTypeId: {
            courseId,
            boardTypeId,
          },
        },
      });

      if (!courseRecord || timeInMs < courseRecord.timeInMs) {
        // Update or create course record
        await prisma.courseRecord.upsert({
          where: {
            courseId_boardTypeId: {
              courseId,
              boardTypeId,
            },
          },
          update: {
            riderId,
            time,
            timeInMs,
            setAt: new Date(),
          },
          create: {
            courseId,
            riderId,
            boardTypeId,
            time,
            timeInMs,
            setAt: new Date(),
          },
        });

        // Mark the run as a course record
        await prisma.timeTrialRun.update({
          where: { id: newRun.id },
          data: { isCourseRecord: true },
        });
      }
    }

    return NextResponse.json(newRun, { status: 201 });
  } catch (error) {
    console.error('Error adding ride:', error);
    return NextResponse.json(
      { error: 'Failed to add ride' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}