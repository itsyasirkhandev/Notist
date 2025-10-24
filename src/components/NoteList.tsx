
"use client";

import { Note } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Info, NotebookPen, Search, MailWarning } from "lucide-react";
import React, { useState, useMemo } from "react";
import NoteItem from "./NoteItem";
import Link from "next/link";
import { Input } from "./ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { useCollection, useFirebase, useMemoFirebase } from "@/firebase";
import { collection, doc, orderBy, query } from "firebase/firestore";
import { sendEmailVerification } from "firebase/auth";
import { deleteDocumentNonBlocking } from "@/firebase/non-blocking-updates";
import { useToast } from "@/hooks/use-toast";
import { Loader } from "./Loader";

export function NoteList() {
  const { user, auth, firestore, isUserLoading } = useFirebase();
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterTag, setFilterTag] = useState<string>("all");

  const notesQuery = useMemoFirebase(() => {
    if (!user || !user.emailVerified) return null;
    return query(collection(firestore, `users/${user.uid}/notes`), orderBy('updatedAt', 'desc'));
  }, [user, firestore]);

  const { data: notes, isLoading } = useCollection<Note>(notesQuery);

  const filteredNotes = useMemo(() => {
    if (!notes) return [];
    return notes
      .filter(note => {
        // Tag filter
        if (filterTag !== 'all') {
            if (!note.tags || !note.tags.includes(filterTag)) return false;
        }

        // Search term filter
        const matchesSearch = searchTerm.trim() === "" ||
          note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (note.content && note.content.toLowerCase().includes(searchTerm.toLowerCase()));
        
        return matchesSearch;
      });
  }, [notes, searchTerm, filterTag]);

  const allTags = useMemo(() => {
    if (!notes) return [];
    const tags = new Set<string>();
    notes.forEach(note => note.tags?.forEach(tag => tags.add(tag)));
    return Array.from(tags).sort();
  }, [notes]);


  const handleDeleteNote = (id: string) => {
    if (!user) return;
    const docRef = doc(firestore, `users/${user.uid}/notes`, id);
    deleteDocumentNonBlocking(docRef);
  };
  
  const handleResendVerification = async () => {
    if (!user) return;
    try {
        await sendEmailVerification(user);
        toast({
            title: "Verification Email Sent",
            description: "Please check your inbox (and spam folder) for the verification link.",
        });
    } catch (error: any) {
        toast({
            variant: "destructive",
            title: "Error Sending Email",
            description: error.message || "Could not send verification email. Please try again.",
        });
    }
  }

  if (isUserLoading) {
    return (
      <Card className="w-full shadow-none border-none">
          <CardContent>
              <div className="text-center py-10 text-muted-foreground">
                  <Loader />
              </div>
          </CardContent>
      </Card>
    )
  }

  if (!user) {
    return (
        <Card className="w-full shadow-none border-none">
            <CardContent>
                <div className="text-center py-10 text-muted-foreground flex flex-col items-center gap-2">
                    <Info className="h-6 w-6"/>
                    <p className="font-medium">Please sign in to see your notes.</p>
                </div>
            </CardContent>
        </Card>
    )
  }

  if (user && !user.emailVerified) {
    return (
      <Card className="w-full shadow-lg">
          <CardHeader>
            <h2 className="text-xl font-semibold text-center">Verify Your Email</h2>
          </CardHeader>
          <CardContent>
              <div className="text-center py-10 text-muted-foreground flex flex-col items-center gap-4">
                  <MailWarning className="h-12 w-12 text-primary"/>
                  <p className="font-medium text-lg">A verification link has been sent to your email address:</p>
                  <p className="font-bold text-foreground">{user.email}</p>
                  <p>Please click the link in the email to continue. You may need to refresh this page after verifying.</p>
                  <Button onClick={handleResendVerification}>Resend Verification Email</Button>
              </div>
          </CardContent>
      </Card>
    )
  }
  
  const hasFiltersApplied = searchTerm.trim() !== "" || filterTag !== "all";

  return (
    <>
      <div className="mb-8">
        <h2 className="text-3xl font-bold tracking-tight">Your Notes</h2>
        <p className="text-muted-foreground">Manage your notes or create a new one.</p>
      </div>
      <div className="flex flex-col sm:flex-row gap-2 mb-6">
          <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                  placeholder="Search notes..."
                  className="pl-10 w-full"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
              />
          </div>
          <Select value={filterTag} onValueChange={setFilterTag}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Filter by tag" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Tags</SelectItem>
              {allTags.map(tag => (
                <SelectItem key={tag} value={tag}>{tag}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Link href="/notes/new" className="w-full sm:w-auto">
              <Button className="w-full sm:w-auto" aria-label="Add New Note">
                  <NotebookPen className="h-4 w-4 mr-2" />
                  Add New Note
              </Button>
          </Link>
      </div>
      <div>
        {isLoading && (
          <div className="text-center py-10">
            <Loader />
          </div>
        )}
        {!isLoading && filteredNotes.length > 0 ? (
          <ul className="gap-6 md:columns-2 lg:columns-3 xl:columns-4">
            {filteredNotes.map((note) => (
              <NoteItem
                key={note.id}
                note={note}
                onDelete={handleDeleteNote}
              />
            ))}
          </ul>
        ) : (
          !isLoading && (
            <div className="text-center py-20 text-muted-foreground flex flex-col items-center gap-2 border border-dashed rounded-lg">
              <Info className="h-8 w-8"/>
              {notes && notes.length === 0 && !hasFiltersApplied ? (
                 <>
                  <p className="font-medium text-lg mt-2">No notes yet!</p>
                  <p className="text-sm">Click "Add New Note" to get started.</p>
                </>
              ) : (
                <>
                  <p className="font-medium text-lg mt-2">No notes match your filters!</p>
                  <p className="text-sm">Try a different search or filter.</p>
                </>
              )}
            </div>
          )
        )}
      </div>
    </>
  );
}
