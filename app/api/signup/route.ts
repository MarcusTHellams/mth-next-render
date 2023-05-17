import { prismaClient } from '@/prismaConnection';
import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { ValidationError } from 'yup';
import { signupSchema } from '@/common/signupSchema';
import { NextApiResponse } from 'next';

export async function POST(req: Request, resp: NextApiResponse) {
	const body = await req.json();

	try {
		await signupSchema.validate(body, { abortEarly: false });
	} catch (error) {
		if (error instanceof ValidationError) {
			return NextResponse.json(
				{ message: error.errors.join(', ') },
				{ status: 400, statusText: 'Bad Request' }
			);
		}
	}

	const { username, email, password, firstName, lastName } = body;

	const user = await prismaClient.user.findFirst({
		where: {
			OR: [
				{
					email,
				},
				{
					username,
				},
			],
		},
	});

	if (user) {
		return NextResponse.json(
			{ message: 'Username and/or Email is already being used' },
			{
				status: 409,
				statusText: 'Conflict',
			}
		);
	}

	const hashedPassword = await bcrypt.hash(password, 10);
	const createdUser = await prismaClient.user.create({
		data: {
			email,
			username,
			password: hashedPassword,
			firstName,
			lastName,
		},
		select: {
			email: true,
			firstName: true,
			lastName: true,
			username: true,
		},
	});

	return NextResponse.json({ success: true, user: createdUser });
}
