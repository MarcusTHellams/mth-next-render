import { PrismaClient } from '@prisma/client';

export const prismaClient = new PrismaClient({
  log:
    process.env.NODE_ENV === 'development'
      ? ['error', 'info', 'query', 'warn']
      : undefined,
});

export * from '@prisma/client';
