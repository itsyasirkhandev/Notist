
import { NoteForm } from "@/components/NoteForm";
import { Button } from "@/components/ui/button";
import { ArrowLeft, FilePlus } from "lucide-react";
import Link from "next/link";

export default function NewNotePage() {
    return (
        <div className="flex flex-col items-center justify-start min-h-screen bg-muted/30 font-body selection:bg-primary/20">
            <header className="w-full bg-primary text-primary-foreground shadow-md">
                <div className="w-full max-w-4xl mx-auto px-4 py-3 flex items-center gap-3">
                    <Button 
                        asChild 
                        variant="ghost" 
                        size="icon"
                        className="h-9 w-9 rounded-full hover:bg-white/10 transition-colors"
                    >
                        <Link href="/">
                            <ArrowLeft className="h-5 w-5" />
                            <span className="sr-only">Back to notes</span>
                        </Link>
                    </Button>
                    <div className="flex items-center gap-2">
                        <FilePlus className="h-5 w-5 opacity-80" />
                        <h1 className="text-lg font-semibold tracking-tight">
                            New Note
                        </h1>
                    </div>
                </div>
            </header>
            <main className="w-full p-4 md:p-6">
                <NoteForm />
            </main>
        </div>
    );
}
