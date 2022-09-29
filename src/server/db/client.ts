import { PrismaClient } from '@prisma/client';
import { config } from '@config';

declare global {
  var prisma: PrismaClient | undefined;
}

// Prevent multiple instances of Prisma Client in development
export const db = global.prisma || new PrismaClient({ log: ['query'] });

if (config.isProduction) global.prisma = db;
