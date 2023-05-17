import { Register, SignIn, SignOut } from '@/components/CredentialButtons';

export default function Home() {
  return (
    <main
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '70vh',
      }}
    >
      <div>
        <SignIn />
        <Register />
        <SignOut />
      </div>
    </main>
  );
}
