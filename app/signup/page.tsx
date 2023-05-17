'use client';

import { signupSchema } from '@/common/signupSchema';
import {
	Button,
	Container,
	FormControl,
	FormErrorMessage,
	FormLabel,
	Input,
	Stack,
	Heading,
	useDisclosure,
	Alert,
	AlertIcon,
	Box,
	AlertTitle,
	AlertDescription,
	CloseButton,
} from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { InferType } from 'yup';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { axiosInstance } from '@/common/axiosInstance';

const signUpWithPasswordVerification = signupSchema.concat(
	yup.object({
		passwordVerification: yup
			.string()
			.required('Verify Password is Required')
			.test(
				'passwordVerification',
				'Value must match Password',
				(value, context) => {
					return value === context.parent.password;
				}
			),
	})
);
type SignUp = InferType<typeof signUpWithPasswordVerification>;

const SignUp = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<SignUp>({
		resolver: yupResolver(signUpWithPasswordVerification),
	});

	const router = useRouter();

	const {
		isOpen: isVisible,
		onClose,
		onOpen,
	} = useDisclosure({ defaultIsOpen: false });

	const { mutate, isLoading, error } = useMutation<unknown, Error, SignUp>({
		mutationKey: ['signUp'],
		async mutationFn(values) {
			const body: Partial<typeof values> = { ...values };

			delete body.passwordVerification;

			return axiosInstance.post('/signup', body).then(({ data }) => data);
		},
		onSuccess() {
			router.push('/');
		},
		onError() {
			onOpen();
		},
	});
	const submitHandler = handleSubmit((values) => {
		mutate(values);
	});

	return (
		<Container maxW="container.sm" mt="16">
			<Heading mb="8">Sign Up</Heading>
			{isVisible ? (
				<Alert mb="4" status="error">
					<AlertIcon />
					<Box>
						<AlertTitle>Error!</AlertTitle>
						<AlertDescription>{error?.message}</AlertDescription>
					</Box>
					<CloseButton
						alignSelf="flex-start"
						marginLeft="auto"
						onClick={onClose}
					/>
				</Alert>
			) : null}
			<form onSubmit={submitHandler} noValidate>
				<Stack spacing="4">
					<FormControl isInvalid={!!errors.firstName?.message}>
						<FormLabel>First Name</FormLabel>
						<Input {...register('firstName')} />
						{errors.firstName?.message && (
							<FormErrorMessage>{errors.firstName?.message}</FormErrorMessage>
						)}
					</FormControl>
					<FormControl isInvalid={!!errors.lastName?.message}>
						<FormLabel>Last Name</FormLabel>
						<Input {...register('lastName')} />
						{errors.lastName?.message && (
							<FormErrorMessage>{errors.lastName?.message}</FormErrorMessage>
						)}
					</FormControl>
					<FormControl isInvalid={!!errors.email?.message}>
						<FormLabel>Email</FormLabel>
						<Input type="email" {...register('email')} />
						{errors.email?.message && (
							<FormErrorMessage>{errors.email?.message}</FormErrorMessage>
						)}
					</FormControl>
					<FormControl isInvalid={!!errors.username?.message}>
						<FormLabel>Username</FormLabel>
						<Input {...register('username')} />
						{errors.username?.message && (
							<FormErrorMessage>{errors.username?.message}</FormErrorMessage>
						)}
					</FormControl>
					<FormControl isInvalid={!!errors.password?.message}>
						<FormLabel>Password</FormLabel>
						<Input type="password" {...register('password')} />
						{errors.password?.message && (
							<FormErrorMessage>{errors.password?.message}</FormErrorMessage>
						)}
					</FormControl>
					<FormControl isInvalid={!!errors.passwordVerification?.message}>
						<FormLabel>Verify Password</FormLabel>
						<Input type="password" {...register('passwordVerification')} />
						{errors.passwordVerification?.message && (
							<FormErrorMessage>
								{errors.passwordVerification?.message}
							</FormErrorMessage>
						)}
					</FormControl>
					<Button {...{ isLoading }} colorScheme="blue" type="submit">
						Sign Up
					</Button>
				</Stack>
			</form>
		</Container>
	);
};

export default SignUp;
