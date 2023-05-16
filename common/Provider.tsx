'use client';

import { CacheProvider } from '@chakra-ui/next-js';
import { ChakraProvider } from '@chakra-ui/react';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';

const client = new QueryClient({
	defaultOptions: {
		queries: {
			refetchInterval: false,
			refetchIntervalInBackground: false,
			refetchOnMount: false,
			refetchOnReconnect: false,
			refetchOnWindowFocus: false,
			retry: false,
		},
	},
});

const Provider = ({ children }: { children: React.ReactNode }) => {
	return (
		<QueryClientProvider {...{ client }}>
			<CacheProvider>
				<ChakraProvider>{children}</ChakraProvider>
			</CacheProvider>
		</QueryClientProvider>
	);
};

export default Provider;
