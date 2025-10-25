
'use client';

import { Auth } from '@/components/Auth';
import { Loader } from '@/components/Loader';
import { NoteList } from '@/components/NoteList';
import { useUser } from '@/firebase';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Home() {
  const { user, isUserLoading } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!isUserLoading && !user) {
      router.push('/auth');
    }
  }, [user, isUserLoading, router]);

  if (isUserLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader />
      </div>
    );
  }

  if (!user) {
    return null;
  }


  return (
    <div className="flex flex-col items-center justify-start min-h-screen bg-background font-body selection:bg-primary/20">
      <header className='w-full border-b border-border'>
        <div className="w-full max-w-7xl mx-auto p-4 flex justify-between items-center">
            <h1 className="text-2xl font-bold tracking-tight text-primary">
              Notist
            </h1>
            <div className="flex items-center gap-4">
              <Auth />
            </div>
        </div>
      </header>
      <div className="w-full max-w-7xl mx-auto p-4 md:p-8">
        <main>
          <NoteList />
        </main>
        <footer className="text-center mt-12 text-sm text-muted-foreground">
          <p>Organize your thoughts, one note at a time.</p>
        </footer>
      </div>
    </div>
  );
}
