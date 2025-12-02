'use client';

import { Loader } from '@/components/Loader';
import { NoteList } from '@/components/NoteList';
import { Header } from '@/components/Header';
import { useUser } from '@/firebase';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useCallback } from 'react';
import { useKeyboardShortcuts } from '@/hooks/useKeyboardShortcuts';

export default function Dashboard() {
  const { user, isUserLoading } = useUser();
  const router = useRouter();
  const searchInputRef = useRef<HTMLInputElement>(null);

  const handleSearch = useCallback(() => {
    searchInputRef.current?.focus();
  }, []);
  
  useKeyboardShortcuts({ onSearch: handleSearch });

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
    <div className="flex flex-col min-h-screen bg-background selection:bg-primary/20">
      <Header onSearchClick={handleSearch} />
      <div className="flex-1 w-full max-w-7xl mx-auto p-4 md:p-8">
        <main className="min-h-[60vh]">
          <NoteList searchInputRef={searchInputRef} />
        </main>
        <footer className="text-center mt-12 py-6 text-sm text-muted-foreground">
          <p>Organize your thoughts, one note at a time.</p>
        </footer>
      </div>
    </div>
  );
}
