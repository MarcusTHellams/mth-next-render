import { prismaClient } from '@/prismaConnection';

export type MyContext = {
  prisma: typeof prismaClient;
};
