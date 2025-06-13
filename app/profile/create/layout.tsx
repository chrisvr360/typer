import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { Providers } from '@/components/providers';

export default async function ProfileCreateLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession();

  if (!session || !session.user) {
    redirect('/auth/signin');
  }

  return (
    <Providers session={session}>
      {children}
    </Providers>
  );
} 