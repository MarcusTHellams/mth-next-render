import { Register, SignIn, SignOut } from '@/components/CredentialButtons';
import { User } from '@/components/User';

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
        <User />
      </div>
    </main>
  );
}
