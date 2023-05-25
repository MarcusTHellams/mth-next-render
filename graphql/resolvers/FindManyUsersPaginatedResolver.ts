import { FindManyUserArgs, User } from '@generated/type-graphql';
import { Args, Ctx, Query, Resolver } from 'type-graphql';

import { type MyContext } from '@/graphql/context';
import { getPaginatedResponse } from '@/common/utils';
import { UserPaginatedResponse } from '@/graphql/types/UserPaginatedResponse';

@Resolver(() => User)
export class FindManyUsersPaginatedResolver {
  @Query(() => UserPaginatedResponse, { description: 'Get Paginated Users' })
  async usersPaginated(
    @Args() args: FindManyUserArgs,
    @Ctx() { prisma }: MyContext
  ) {
    const count = await prisma.user.count({
      ...args,
      skip: undefined,
      take: undefined,
    });
    const users = await prisma.user.findMany(args);

    return getPaginatedResponse({
      count,
      items: users,
      limit: args.take,
      skip: args.skip,
    });
  }
}
