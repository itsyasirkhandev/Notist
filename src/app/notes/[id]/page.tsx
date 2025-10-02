import { NoteForm } from "@/components/NoteForm";

export default function EditNotePage({ params }: { params: { id: string } }) {
    return (
        <div className="flex flex-col items-center justify-start min-h-screen bg-background font-body selection:bg-primary/20">
            <div className="w-full max-w-3xl mx-auto px-4 py-8 md:py-16">
                <header className="text-center mb-10">
                <h1 className="text-5xl font-bold tracking-tight text-foreground">
                    Edit Note
                </h1>
                <p className="text-lg text-muted-foreground mt-2">
                    Refine your ideas.
                </p>
                </header>
                <main>
                    <NoteForm noteId={params.id} />
                </main>
            </div>
        </div>
    );
}
