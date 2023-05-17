'use client';

import { Box } from '@chakra-ui/react';

const Dashboard = () => {
	return (
		<Box as="main" w="full">
			<Box display="flex">
				<Box
					as="nav"
					color="white"
					bgColor="red.700"
					display="block"
					position="sticky"
					overscrollBehavior="contain"
					top="6.5rem"
					height="calc(100vh - 8.125rem)"
					flexShrink="0"
					paddingBottom="6"
					paddingLeft="6"
					paddingRight="8"
					paddingTop="4"
					width="17.5rem"
					overflowY="auto"
				>
					Nav
				</Box>
				<Box flex="1 1 0%" minW="0px">
					<Box
						id="content"
						paddingInlineStart="5"
						paddingInlineEnd="5"
						marginInline="auto"
						minH="76vh"
						overscrollBehavior="none"
					>
						Content
					</Box>
				</Box>
			</Box>
		</Box>
	);
};

export default Dashboard;
