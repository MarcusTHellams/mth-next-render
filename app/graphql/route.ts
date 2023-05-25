import 'reflect-metadata';

import { startServerAndCreateNextHandler } from '@as-integrations/next';
import { ApolloServer } from '@apollo/server';
import { buildSchemaSync } from 'type-graphql';
import { resolvers } from '@generated/type-graphql';
import { prismaClient, setPrismaClientMiddleWare } from '@/prismaConnection';
import { FindManyUsersPaginatedResolver } from '@/graphql/resolvers/FindManyUsersPaginatedResolver';
import { Mine } from '@/graphql/resolvers/MyResolver';
import { ManageUserRolesResolver } from '@/graphql/resolvers/ManageUserRolesResolver';

const schema = buildSchemaSync({
  resolvers: [...resolvers, FindManyUsersPaginatedResolver, Mine, ManageUserRolesResolver],
  emitSchemaFile: true,
});

const server = new ApolloServer({
  schema,
});

const handler = startServerAndCreateNextHandler(server, {
  // @ts-ignore
  context() {
    return {
      prisma: prismaClient,
    };
  },
});

export async function GET(request: Request) {
  const response = await handler(request);

  await setPrismaClientMiddleWare();

  response.headers.set('Access-Control-Allow-Origin', '*');
  response.headers.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  response.headers.set(
    'Access-Control-Allow-Headers',
    'Content-Type, Authorization'
  );
  response.headers.set('Access-Control-Allow-Credentials', 'true');

  return response;
}

export async function POST(request: Request) {
  const response = await handler(request);

  await setPrismaClientMiddleWare();

  response.headers.set('Access-Control-Allow-Origin', '*');
  response.headers.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  response.headers.set(
    'Access-Control-Allow-Headers',
    'Content-Type, Authorization'
  );
  response.headers.set('Access-Control-Allow-Credentials', 'true');

  return response;
}
