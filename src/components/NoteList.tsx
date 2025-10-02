"use client";

import { Note } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Info, NotebookPen } from "lucide-react";
import React, { useState, useEffect, DragEvent } from "react";
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

const initialNotes: Note[] = [
  { id: "1", title: "Welcome to Notes!", content: "Get started by adding a note.", tags: ["getting-started"], completed: false, createdAt: new Date().toISOString() },
  { id: "2", title: "Mark as complete", content: "Use the checkbox to mark notes as complete.", tags: [], completed: true, createdAt: new Date().toISOString() },
  { id: "3", title: "Drag and drop", content: "Drag and drop to reorder your notes.", tags: [], completed: false, createdAt: new Date().toISOString() },
  { id: "4", title: "Edit or delete", content: "Use the buttons on the right to edit or delete.", tags: [], completed: false, createdAt: new Date().toISOString() },
];

export function NoteList() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [draggedItem, setDraggedItem] = useState<Note | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    try {
      const storedNotes = localStorage.getItem("notes-app-notes");
      if (storedNotes) {
        const parsedNotes = JSON.parse(storedNotes);
        if(parsedNotes.length === 0){
          setNotes(initialNotes);
        } else {
          setNotes(parsedNotes);
        }
      } else {
        setNotes(initialNotes);
      }
    } catch (error) {
      console.error("Failed to load notes from localStorage", error);
      setNotes(initialNotes);
    }
  }, []);

  useEffect(() => {
    if (isMounted) {
      try {
        localStorage.setItem("notes-app-notes", JSON.stringify(notes));
      } catch (error) {
        console.error("Failed to save notes to localStorage", error);
      }
    }
  }, [notes, isMounted]);

  const handleToggleComplete = (id: string) => {
    setNotes(
      notes.map((note) =>
        note.id === id ? { ...note, completed: !note.completed } : note
      )
    );
  };

  const handleDeleteNote = (id: string) => {
    setNotes(notes.filter((note) => note.id !== id));
  };
  
  const handleClearCompleted = () => {
    setNotes(notes.filter((note) => !note.completed));
  }
  
  const handleMove = (id: string, direction: 'up' | 'down') => {
    const index = notes.findIndex(note => note.id === id);
    if (index === -1) return;

    const newIndex = direction === 'up' ? index - 1 : index + 1;
    if (newIndex < 0 || newIndex >= notes.length) return;

    const newNotes = [...notes];
    const [movedNote] = newNotes.splice(index, 1);
    newNotes.splice(newIndex, 0, movedNote);
    setNotes(newNotes);
  }

  const handleDragStart = (note: Note) => {
    setDraggedItem(note);
  };

  const handleDragEnter = (targetNote: Note) => {
    if (!draggedItem || draggedItem.id === targetNote.id) return;
    
    const newNotes = [...notes];
    const draggedIndex = newNotes.findIndex(t => t.id === draggedItem.id);
    const targetIndex = newNotes.findIndex(t => t.id === targetNote.id);

    if (draggedIndex === -1 || targetIndex === -1) return;

    const [removed] = newNotes.splice(draggedIndex, 1);
    newNotes.splice(targetIndex, 0, removed);
    
    setNotes(newNotes);
  };

  const handleDragEnd = () => {
    setDraggedItem(null);
  };

  const completedCount = notes.filter(t => t.completed).length;

  if (!isMounted) {
    return null; // or a loading skeleton
  }

  return (
    <Card className="w-full shadow-lg">
      <CardHeader>
        <div className="flex gap-2">
            <Link href="/notes/new" className="w-full">
                <Button className="w-full" aria-label="Add Note">
                    <NotebookPen className="h-4 w-4 mr-2" />
                    Add New Note
                </Button>
            </Link>
        </div>
      </CardHeader>
      <CardContent>
        {notes.length > 0 ? (
          <ul className="space-y-2">
            {notes.map((note, index) => (
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
                isLast={index === notes.length - 1}
              />
            ))}
          </ul>
        ) : (
          <div className="text-center py-10 text-muted-foreground flex flex-col items-center gap-2">
            <Info className="h-6 w-6"/>
            <p className="font-medium">No notes yet!</p>
            <p className="text-sm">Add one above to get started.</p>
          </div>
        )}
        {notes.length > 0 && completedCount > 0 && (
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
