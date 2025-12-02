
"use client";

import { Note } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Info, Search, MailWarning } from "lucide-react";
import React, { useState, useMemo } from "react";
import NoteCard from "./NoteCard";
import { Input } from "./ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { useCollection, useFirebase, useMemoFirebase } from "@/firebase";
import { collection, doc, orderBy, query, serverTimestamp } from "firebase/firestore";
import { sendEmailVerification } from "firebase/auth";
import { deleteDocumentNonBlocking, updateDocumentNonBlocking } from "@/firebase/non-blocking-updates";
import { useToast } from "@/hooks/use-toast";
import { Loader } from "./Loader";
import { NoteListSkeleton } from "./NoteItemSkeleton";
import { EmptyState } from "./EmptyState";

interface NoteListProps {
  searchInputRef?: React.RefObject<HTMLInputElement | null>;
}

export function NoteList({ searchInputRef }: NoteListProps) {
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
      })
      .sort((a, b) => {
          // Pinned notes first
          if (a.pinned && !b.pinned) return -1;
          if (!a.pinned && b.pinned) return 1;
          // Then sort by updatedAt
          if (a.updatedAt && b.updatedAt) {
              return b.updatedAt.toMillis() - a.updatedAt.toMillis();
          }
          return 0;
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
  
  const handleTogglePin = (id: string, currentPinStatus: boolean) => {
    if(!user) return;
    const docRef = doc(firestore, `users/${user.uid}/notes`, id);
    updateDocumentNonBlocking(docRef, { pinned: !currentPinStatus, updatedAt: serverTimestamp() });
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
                    <Info aria-hidden className="h-6 w-6"/>
                    <p className="font-medium">Please sign in to see your notes.</p>
                </div>
            </CardContent>
        </Card>
    )
  }

  if (user && !user.emailVerified) {
    return (
      <Card className="w-full shadow-lg">
          <CardContent>
              <div className="text-center py-10 text-muted-foreground flex flex-col items-center gap-4">
                  <MailWarning aria-hidden className="h-12 w-12 text-primary"/>
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

  const clearFilters = () => {
    setSearchTerm("");
    setFilterTag("all");
  };

  return (
    <>
      <div className="mb-8 min-h-[68px]">
        <h2 className="text-3xl font-bold tracking-tight leading-tight">Your Notes</h2>
        <p className="text-muted-foreground leading-normal">Manage your notes or create a new one.</p>
      </div>
      
      <div className="flex flex-col sm:flex-row gap-3 mb-8">
        <div className="relative flex-1">
          <Search aria-hidden className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            ref={searchInputRef}
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
      </div>

      <div>
        {isLoading && <NoteListSkeleton />}
        
        {!isLoading && filteredNotes.length > 0 && (
          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredNotes.map((note) => (
              <NoteCard
                key={note.id}
                note={note}
                onDelete={handleDeleteNote}
                onTogglePin={handleTogglePin}
              />
            ))}
          </ul>
        )}
        
        {!isLoading && filteredNotes.length === 0 && (
          <EmptyState 
            type={notes && notes.length === 0 && !hasFiltersApplied ? "no-notes" : "no-results"}
            userName={user?.displayName?.split(' ')[0]}
            onClearFilters={hasFiltersApplied ? clearFilters : undefined}
          />
        )}
      </div>
    </>
  );
}
