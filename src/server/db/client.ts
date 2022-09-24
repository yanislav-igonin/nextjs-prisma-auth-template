import { PrismaClient } from '@prisma/client';
import { config } from '@config';

// Prevent multiple instances of Prisma Client in development
const prisma = global.prisma || new PrismaClient({ log: ['query'] });

if (config.isProduction) global.prisma = prisma;

export { prisma as db };
