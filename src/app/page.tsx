import { Auth } from '@/components/Auth';
import { NoteList } from '@/components/NoteList';
import { ThemeToggle } from '@/components/theme-toggle';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-start min-h-screen bg-background font-body selection:bg-primary/20">
      <div className='w-full bg-primary text-primary-foreground border-b-4 border-border'>
        <div className="w-full max-w-5xl mx-auto p-4 flex justify-between items-center">
            <h1 className="text-2xl font-bold tracking-tight">
              Notist
            </h1>
            <div className="flex items-center gap-4">
              <Auth />
              <ThemeToggle />
            </div>
        </div>
      </div>
      <div className="w-full max-w-5xl mx-auto p-4 md:py-8">
        <main>
          <NoteList />
        </main>
        <footer className="text-center mt-12 text-sm text-muted-foreground">
          <p>Tip: You can drag and drop notes to reorder them.</p>
        </footer>
      </div>
    </div>
  );
}
