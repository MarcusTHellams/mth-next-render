'use client';

import { client } from '@/graphql/client';
import { GET_USER_AND_ROLES } from './graphql/queries';
import { useMutation, useQuery } from '@tanstack/react-query';

import { useForm } from 'react-hook-form';
import {
	Form,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { InferType } from 'yup';
import { MANAGE_USER_ROLES } from './graphql/mutations';
import { Loader2 } from 'lucide-react';
import { useMemo } from 'react';
import {
	useReactTable,
	type ColumnDef,
	getCoreRowModel,
	getPaginationRowModel,
	flexRender,
} from '@tanstack/react-table';
import { Label } from '@/components/ui/label';
import { usePagination } from '@mantine/hooks';

interface Data {
	usersPaginated: UsersPaginated;
	roles: Role[];
}

interface UsersPaginated {
	items: Item[];
}

interface Item {
	id: string;
	firstName: string;
	lastName: string;
	email: string;
	username: string;
	roles: Role2[];
}

interface Role2 {
	role: Role;
}

interface Role {
	id: number;
	name: string;
}

const schema = yup.object({
	users: yup
		.array()
		.of(yup.string())
		.min(1, 'At Least One User is Required')
		.required(),
	role: yup
		.number()
		.required('Role is Required')
		.moreThan(0, 'Role is Required'),
});

type TableRow = {
	id: string;
	name: string;
	email: string;
	role: string;
};

const columns: ColumnDef<TableRow>[] = [
	{
		header: 'Name',
		accessorKey: 'name',
	},
	{
		header: 'Email',
		accessorKey: 'email',
	},
	{
		header: 'Role',
		accessorKey: 'role',
	},
];

const Roles = () => {
	const form = useForm<InferType<typeof schema>>({
		defaultValues: {
			users: [],
			role: 0,
		},
		resolver: yupResolver(schema),
	});

	const { data, refetch } = useQuery<Data, Error>({
		queryKey: ['userAndRoles'],
		async queryFn() {
			return client.request(GET_USER_AND_ROLES);
		},
	});

	const tableUsers = useMemo(() => {
		const users: TableRow[] = [];
		data?.usersPaginated.items.forEach((user) => {
			if (!user.roles.length) {
				users.push({
					id: user.id,
					name: `${user.firstName} ${user.lastName}`,
					email: user.email,
					role: 'N/A',
				});
				return;
			}

			user.roles.forEach((roleOnUser) => {
				users.push({
					id: user.id,
					name: `${user.firstName} ${user.lastName}`,
					email: user.email,
					role: roleOnUser.role.name,
				});
			});
		});
		return users;
	}, [data]);

	const table = useReactTable({
		columns,
		data: tableUsers,
		getPaginationRowModel: getPaginationRowModel(),
		getCoreRowModel: getCoreRowModel(),
	});

	const pagination = usePagination({
		total: table.getPageCount(),
		page: table.getState().pagination.pageIndex + 1,
	});

	const mutation = useMutation<string, Error, InferType<typeof schema>>({
		mutationKey: ['manageUserRoles'],
		async mutationFn(values) {
			return client.request(MANAGE_USER_ROLES, {
				input: values,
			});
		},
		onSuccess() {
			form.reset();
			refetch();
		},
		onError() {
			console.error('ERROR: dsfasdfasdfasdfasdfadfdsfadsfa');
		},
	});

	const submitHandler = form.handleSubmit((values) => {
		mutation.mutate(values);
	});

	return (
		<>
			<h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mb-6">
				Manage User Roles
			</h1>
			<div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
				<div>
					{data ? (
						<>
							<Form {...form}>
								<form onSubmit={submitHandler}>
									<div className="flex flex-col gap-4">
										<div>
											<FormField
												control={form.control}
												name="users"
												render={() => {
													return (
														<FormItem>
															<FormLabel>Select 1 or more Users</FormLabel>
															<select
																{...form.register('users')}
																size={data.usersPaginated.items.length}
																className="w-full border border-gray-300 rounded-sm p-3"
																multiple
															>
																{data.usersPaginated.items.map((user) => {
																	return (
																		<option key={user.id} value={user.id}>
																			{user.firstName} {user.lastName}
																		</option>
																	);
																})}
															</select>
															<FormMessage />
														</FormItem>
													);
												}}
											/>
										</div>
										<FormField
											control={form.control}
											name="role"
											render={() => {
												return (
													<FormItem>
														<FormLabel htmlFor="role">
															Select the role to assign
														</FormLabel>
														<select
															className="block w-full border-gray-200 border rounded-sm text-sm py-2 px-3"
															{...form.register('role', {
																valueAsNumber: true,
															})}
														>
															<option value={0}>--Select Role--</option>
															{data.roles.map((role) => {
																return (
																	<option key={role.id} value={role.id}>
																		{role.name}
																	</option>
																);
															})}
														</select>
														<FormMessage />
													</FormItem>
												);
											}}
										/>
										<Button
											disabled={mutation.isLoading}
											className="bg-red-800 hover:bg-red-700"
											type="submit"
										>
											{mutation.isLoading ? (
												<Loader2 className="mr-2 h-4 w-4 animate-spin" />
											) : null}
											Submit
										</Button>
									</div>
								</form>
							</Form>
						</>
					) : null}
				</div>
				<div className="lg:col-span-2">
					{data ? (
						<>
							<Table>
								<TableHeader>
									{table.getHeaderGroups().map((headerGroup) => (
										<TableRow key={headerGroup.id}>
											{headerGroup.headers.map((header) => {
												return (
													<TableHead key={header.id}>
														{header.isPlaceholder
															? null
															: flexRender(
																	header.column.columnDef.header,
																	header.getContext()
															  )}
													</TableHead>
												);
											})}
										</TableRow>
									))}
								</TableHeader>
								<TableBody>
									{table.getRowModel().rows?.length ? (
										table.getRowModel().rows.map((row) => (
											<TableRow
												key={row.id}
												data-state={row.getIsSelected() && 'selected'}
											>
												{row.getVisibleCells().map((cell) => (
													<TableCell key={cell.id}>
														{flexRender(
															cell.column.columnDef.cell,
															cell.getContext()
														)}
													</TableCell>
												))}
											</TableRow>
										))
									) : (
										<TableRow>
											<TableCell
												colSpan={columns.length}
												className="h-24 text-center"
											>
												No results.
											</TableCell>
										</TableRow>
									)}
								</TableBody>
							</Table>
							<div className="btn-group mt-4">
								{pagination.range.map((range, index) => {
									const isDots = range === 'dots';
									return (
										<Button
											className="btn"
											variant={isDots ? 'outline' : 'marcus'}
											disabled={isDots || pagination.active === range}
											onClick={() => {
												table.setPageIndex((range as number) - 1);
											}}
											key={index}
										>
											{isDots ? '...' : range}
										</Button>
									);
								})}
							</div>
						</>
					) : null}
				</div>
			</div>
		</>
	);
};

export default Roles;
