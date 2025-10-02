import { NoteList } from '@/components/NoteList';
import { ThemeToggle } from '@/components/theme-toggle';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-start min-h-screen bg-primary font-body selection:bg-primary/20">
      <div className='w-full bg-primary text-primary-foreground'>
        <div className="w-full max-w-5xl mx-auto p-4 flex justify-between items-center">
            <h1 className="text-2xl font-bold tracking-tight">
              Notes
            </h1>
            <ThemeToggle />
        </div>
      </div>
      <div className="w-full max-w-5xl mx-auto px-4 py-8 md:py-16 -mt-16">
        <main>
          <NoteList />
        </main>
        <footer className="text-center mt-12 text-sm text-primary-foreground/80">
          <p>Tip: You can drag and drop notes to reorder them.</p>
        </footer>
      </div>
    </div>
  );
}
