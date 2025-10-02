import { NoteForm } from "@/components/NoteForm";

export default function NewNotePage() {
    return (
        <div className="flex flex-col items-center justify-start min-h-screen bg-background font-body selection:bg-primary/20">
             <div className='w-full bg-primary text-primary-foreground'>
                <div className="w-full max-w-4xl mx-auto p-4 flex justify-between items-center">
                    <h1 className="text-2xl font-bold tracking-tight">
                    New Note
                    </h1>
                </div>
            </div>
            <div className="w-full p-4 md:pt-8">
                <main>
                    <NoteForm />
                </main>
            </div>
        </div>
    );
}
