import { NoteForm } from "@/components/NoteForm";

export default function EditNotePage({ params }: { params: { id: string } }) {
    return (
        <div className="flex flex-col items-center justify-start min-h-screen bg-primary font-body selection:bg-primary/20">
            <div className='w-full bg-primary text-primary-foreground'>
                <div className="w-full max-w-4xl mx-auto p-4 flex justify-between items-center">
                    <h1 className="text-2xl font-bold tracking-tight">
                    Edit Note
                    </h1>
                </div>
            </div>
            <div className="w-full max-w-4xl mx-auto px-4 py-8 md:py-16 -mt-16">
                <main>
                    <NoteForm noteId={params.id} />
                </main>
            </div>
        </div>
    );
}
