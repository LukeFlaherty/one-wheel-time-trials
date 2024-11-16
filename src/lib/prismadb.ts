// lets us make queries anc changes to our db
import { PrismaClient }  from '@prisma/client';

// only want single instance of prisma client in our app to reduce loads prices and bugs
// only allows one instance of prisma in our app at any point

const globalForPrisma = globalThis as unknown as {
    prisma: PrismaClient | undefined;
}

export const prismadb = 
    globalForPrisma.prisma ??
    new PrismaClient({
        log:
            process.env.NODE_ENV === "development"
            ? ["query", "info", "warn"]
            : ["error"],
    })

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prismadb;
