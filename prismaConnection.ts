import { PrismaClient, User } from '@prisma/client';
import { hash } from 'bcryptjs';

export const prismaClient = new PrismaClient({
  log:
    process.env.NODE_ENV === 'development'
      ? ['error', 'info', 'query', 'warn']
      : undefined,
});

export const setPrismaClientMiddleWare = async () => {
  prismaClient.$use(async (params, next) => {
    if (params.model === 'User') {
      if (params.action === 'create') {
        const user = params.args.data;
        const hashedPassword = await hash(user.password, 10);
        user.password = hashedPassword;
        params.args.data = user;
      }
      if (params.action === 'createMany') {
        const users = params.args.data;
        const modifiedUsers = await Promise.all(
          users.map(async (user: User) => {
            const hashedPassword = await hash(user.password, 10);
            user.password = hashedPassword;
            return user;
          })
        );
        params.args.data = modifiedUsers;
      }
    }
    return next(params);
  });
};

export * from '@prisma/client';
