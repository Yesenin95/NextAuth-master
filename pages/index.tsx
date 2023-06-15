import { useSession, signIn, signOut } from 'next-auth/react';
import Image from 'next/image';

export default function Home() {
   const { data: session } = useSession();
   if (session) {
      return (
         <div className='form'>
            Signed in as {session.user?.email} <br />
            Photo: {session?.user?.image && <Image src={session?.user?.image} alt='photo' width={100} height="100"/>} <br />
            Name: {session.user?.name} <br />
            <button onClick={() => signOut()}>Sign out</button>
         </div>
      );
   }
   return (
      <div className='form'>
         Not signed in <br />
         <button onClick={() => signIn()}>Sign in</button>
      </div>
   );
}
