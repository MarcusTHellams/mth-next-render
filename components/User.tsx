'use client';

import { Heading } from '@chakra-ui/react';
import { useSession } from 'next-auth/react';

export const User = () => {
  const { data: session } = useSession();
  return (
    <>
      <Heading mb="4">Client Session</Heading>
      <pre>{JSON.stringify(session, null, 2)}</pre>
    </>
  );
};
