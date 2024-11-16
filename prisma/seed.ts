const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
  // Create Courses
  const beachLoop = await prisma.course.create({
    data: {
      name: 'Beach Loop',
      description: 'Scenic beach pathway',
      distance: 2.5,
      difficulty: 'medium',
    },
  })

  const forestTrail = await prisma.course.create({
    data: {
      name: 'Forest Trail',
      description: 'Winding forest path',
      distance: 3.0,
      difficulty: 'hard',
    },
  })

  // Create Board Types
  const gt = await prisma.boardType.create({
    data: {
      name: 'GT',
      description: 'OneWheel GT',
    },
  })

  const pintX = await prisma.boardType.create({
    data: {
      name: 'Pint X',
      description: 'OneWheel Pint X',
    },
  })

  // Create a Rider
  const defaultRider = await prisma.rider.create({
    data: {
      name: 'Default Rider',
      experienceLevel: 'intermediate',
    },
  })

  console.log({ beachLoop, forestTrail, gt, pintX, defaultRider })
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })