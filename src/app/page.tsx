import { NoteList } from '@/components/NoteList';
import { ThemeToggle } from '@/components/theme-toggle';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-start min-h-screen bg-background font-body selection:bg-primary/20">
      <div className="w-full max-w-3xl mx-auto px-4 py-8 md:py-16">
        <div className="w-full flex justify-end mb-4">
            <ThemeToggle />
        </div>
        <header className="text-center mb-10">
          <h1 className="text-5xl font-bold tracking-tight text-foreground">
            Notes
          </h1>
          <p className="text-lg text-muted-foreground mt-2">
            Organize Your Thoughts, Capture Your Ideas.
          </p>
        </header>
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
