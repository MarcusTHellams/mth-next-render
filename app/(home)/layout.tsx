// export const metadata = {
// 	title: 'Create Next App',
// 	description: 'Generated by create next app',
// };

import LayoutCSR from './layoutCSR';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <LayoutCSR>{children}</LayoutCSR>
    </>
  );
}