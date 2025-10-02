
"use client";

import { Note } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Info, NotebookPen, Search, MailWarning } from "lucide-react";
import React, { useState, useEffect, useMemo } from "react";
import NoteItem from "./NoteItem";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import Link from "next/link";
import { Input } from "./ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { useCollection, useFirebase, useMemoFirebase } from "@/firebase";
import { collection, doc, orderBy, query, where } from "firebase/firestore";
import { sendEmailVerification } from "firebase/auth";
import { deleteDocumentNonBlocking, updateDocumentNonBlocking } from "@/firebase/non-blocking-updates";
import { useToast } from "@/hooks/use-toast";

export function NoteList() {
  const { user, auth, firestore, isUserLoading } = useFirebase();
  const { toast } = useToast();
  const [draggedItem, setDraggedItem] = useState<Note | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterTag, setFilterTag] = useState<string>("all");
  const [filterStatus, setFilterStatus] = useState<"all" | "active" | "completed">("all");

  const notesQuery = useMemoFirebase(() => {
    if (!user || !user.emailVerified) return null;
    return query(collection(firestore, `users/${user.uid}/tasks`), orderBy('createdAt', 'desc'));
  }, [user, firestore]);

  const { data: notes, isLoading } = useCollection<Note>(notesQuery);

  const filteredNotes = useMemo(() => {
    if (!notes) return [];
    return notes
      .filter(note => {
        // Status filter
        if (filterStatus !== 'all') {
          const isCompleted = filterStatus === 'completed';
          if (note.completed !== isCompleted) return false;
        }

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
  }, [notes, searchTerm, filterStatus, filterTag]);

  const allTags = useMemo(() => {
    if (!notes) return [];
    const tags = new Set<string>();
    notes.forEach(note => note.tags?.forEach(tag => tags.add(tag)));
    return Array.from(tags).sort();
  }, [notes]);


  const handleToggleComplete = (id: string, completed: boolean) => {
    if (!user) return;
    const docRef = doc(firestore, `users/${user.uid}/tasks`, id);
    updateDocumentNonBlocking(docRef, { completed });
  };

  const handleDeleteNote = (id: string) => {
    if (!user) return;
    const docRef = doc(firestore, `users/${user.uid}/tasks`, id);
    deleteDocumentNonBlocking(docRef);
  };
  
  const handleClearCompleted = () => {
    if (!user || !notes) return;
    const completedNotes = notes.filter(note => note.completed);
    completedNotes.forEach(note => {
        const docRef = doc(firestore, `users/${user.uid}/tasks`, note.id);
        deleteDocumentNonBlocking(docRef);
    });
  }
  
  const handleMove = (id: string, direction: 'up' | 'down') => {
    // Note: Reordering is complex with Firestore queries.
    // A simple implementation would require a dedicated 'order' field.
    // For now, this is a placeholder.
    console.log("Moving not yet implemented with Firestore backend");
  }

  const handleDragStart = (note: Note) => {
    setDraggedItem(note);
  };

  const handleDragEnter = (targetNote: Note) => {
     // Note: Reordering is complex with Firestore queries.
    if (!draggedItem || draggedItem.id === targetNote.id) return;
    console.log("Dragging not yet implemented with Firestore backend");
  };

  const handleDragEnd = () => {
    setDraggedItem(null);
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

  const completedCount = notes?.filter(t => t.completed).length || 0;

  if (isUserLoading) {
    return (
      <Card className="w-full shadow-lg">
          <CardContent>
              <div className="text-center py-10 text-muted-foreground">
                  <p>Loading...</p>
              </div>
          </CardContent>
      </Card>
    )
  }

  if (!user) {
    return (
        <Card className="w-full shadow-lg">
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

  return (
    <Card className="w-full shadow-lg">
      <CardHeader className="space-y-4">
        <div className="flex flex-col sm:flex-row gap-2">
            <Link href="/notes/new" className="w-full">
                <Button className="w-full" aria-label="Add New Note">
                    <NotebookPen className="h-4 w-4 mr-2" />
                    Add New Note
                </Button>
            </Link>
        </div>
        <div className="flex flex-col sm:flex-row gap-2">
            <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input 
                    placeholder="Search notes..."
                    className="pl-10 w-full"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
            <div className="flex flex-col sm:flex-row gap-2">
              <Select value={filterTag} onValueChange={setFilterTag}>
                <SelectTrigger className="w-full sm:w-[150px]">
                  <SelectValue placeholder="Filter by tag" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Tags</SelectItem>
                  {allTags.map(tag => (
                    <SelectItem key={tag} value={tag}>{tag}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={filterStatus} onValueChange={(value) => setFilterStatus(value as any)}>
                <SelectTrigger className="w-full sm:w-[150px]">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                </SelectContent>
              </Select>
            </div>
        </div>
      </CardHeader>
      <CardContent>
        {isLoading && <p>Loading notes...</p>}
        {!isLoading && filteredNotes.length > 0 ? (
          <ul className="space-y-2">
            {filteredNotes.map((note, index) => (
              <NoteItem
                key={note.id}
                note={note}
                isDragged={draggedItem?.id === note.id}
                onToggleComplete={handleToggleComplete}
                onDelete={handleDeleteNote}
                onMove={handleMove}
                onDragStart={handleDragStart}
                onDragEnter={handleDragEnter}
                onDragEnd={handleDragEnd}
                isFirst={index === 0}
                isLast={index === filteredNotes.length - 1}
              />
            ))}
          </ul>
        ) : (
          !isLoading && (
            <div className="text-center py-10 text-muted-foreground flex flex-col items-center gap-2">
              <Info className="h-6 w-6"/>
              <p className="font-medium">No notes match your filters!</p>
              <p className="text-sm">Try a different search or filter.</p>
            </div>
          )
        )}
        {notes && notes.length > 0 && completedCount > 0 && (
           <div className="mt-4 flex justify-end">
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="ghost" size="sm">Clear {completedCount} completed note(s)</Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This will permanently delete all completed notes. This action cannot be undone.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={handleClearCompleted} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">Clear Completed</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
           </div>
        )}
      </CardContent>
    </Card>
  );
}
