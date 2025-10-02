
"use client";

import { Note } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Info, NotebookPen, Search } from "lucide-react";
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
import { deleteDocumentNonBlocking, updateDocumentNonBlocking } from "@/firebase/non-blocking-updates";

export function NoteList() {
  const { user, firestore } = useFirebase();
  const [draggedItem, setDraggedItem] = useState<Note | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterTag, setFilterTag] = useState<string>("all");
  const [filterStatus, setFilterStatus] = useState<"all" | "active" | "completed">("all");

  const notesQuery = useMemoFirebase(() => {
      if (!user) return null;
      
      const baseQuery = collection(firestore, `users/${user.uid}/tasks`);
      
      let conditions = [];
      if (filterStatus !== 'all') {
          conditions.push(where('completed', '==', filterStatus === 'completed'));
      }
      if (filterTag !== 'all') {
          conditions.push(where('tags', 'array-contains', filterTag));
      }

      return query(baseQuery, ...conditions, orderBy('createdAt', 'desc'));
  }, [user, firestore, filterStatus, filterTag]);

  const { data: notes, isLoading } = useCollection<Note>(notesQuery);

  const filteredNotes = useMemo(() => {
    if (!notes) return [];
    return notes
      .filter(note => {
        const matchesSearch = searchTerm.trim() === "" ||
          note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (note.content && note.content.toLowerCase().includes(searchTerm.toLowerCase()));
        return matchesSearch;
      });
  }, [notes, searchTerm]);

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

  const completedCount = notes?.filter(t => t.completed).length || 0;

  if (!user && !isLoading) {
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

  return (
    <Card className="w-full shadow-lg">
      <CardHeader className="space-y-4">
        <div className="flex flex-col sm:flex-row gap-2">
            <Link href="/notes/new" className="w-full">
                <Button className="w-full" aria-label="Add Note">
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
