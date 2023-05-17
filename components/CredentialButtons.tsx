'use client';

import { Box, Button, Stack } from '@chakra-ui/react';
import { signIn, signOut } from 'next-auth/react';
import Link from 'next/link';

export const SignIn = () => {
  return <Button onClick={() => signIn()}>Sign In</Button>;
};

export const SignOut = () => {
  return <Button onClick={() => signOut()}>Log Out</Button>;
};

export const Register = () => {
  return <Button href="/signup" as={Link}>Register</Button>;
};

