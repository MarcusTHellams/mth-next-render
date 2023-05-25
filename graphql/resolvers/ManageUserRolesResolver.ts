import {
  Arg,
  Ctx,
  Field,
  InputType,
  Int,
  Mutation,
  Resolver,
} from 'type-graphql';
import { type MyContext } from '../context';

@InputType()
class ManageUserRolesInput {
  @Field(() => [String])
  users!: string[];

  @Field(() => Int)
  role!: number;
}


@Resolver()
export class ManageUserRolesResolver {
  @Mutation(()=> String)
  async manageUserRoles(
    @Arg('input') { users, role }: ManageUserRolesInput,
    @Ctx() { prisma }: MyContext
  ) {
    const result = await prisma.$transaction(
      users.map((user) => {
        return prisma.user.update({
          data: {
            roles: {
              connectOrCreate: {
                create: {
                  roleId: role,
                },
                where: {
                  userId_roleId: { roleId: role, userId: user },
                },
              },
            },
          },
          where: {
            id: user,
          },
        });
      })
    );

    return `Updated ${result.length} Users`;
  }
}
