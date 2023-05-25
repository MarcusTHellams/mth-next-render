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
	@Mutation(() => String)
	async manageUserRoles(
		@Arg('input') { users, role }: ManageUserRolesInput,
		@Ctx() { prisma }: MyContext
	) {
		const result = await prisma.$transaction(
			users.map((user) => {
				return prisma.rolesOnUsers.upsert({
					where: {
						userId_roleId: { roleId: role, userId: user },
					},
					create: {
						roleId: role,
						userId: user,
					},
					update: {
						roleId: role,
						userId: user,
					},
				});
			})
		);

		return `Updated ${result.length} Users`;
	}
}
