
"use client";

import { Note } from "@/lib/types";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Tag, X } from "lucide-react";
import React, { useState, useEffect, KeyboardEvent, useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";
import { Badge } from "./ui/badge";
import { useDoc, useFirebase, useMemoFirebase } from "@/firebase";
import { doc, serverTimestamp, collection, addDoc } from "firebase/firestore";
import { setDocumentNonBlocking } from "@/firebase/non-blocking-updates";
import { Loader } from "./Loader";
import dynamic from 'next/dynamic';

const RichTextEditor = dynamic(() => import('./RichTextEditor').then(mod => mod.RichTextEditor), {
  ssr: false,
  loading: () => <div className="flex items-center justify-center min-h-[250px]"><Loader /></div>,
});


type SavingStatus = "idle" | "saving" | "saved";

interface NoteFormProps {
    noteId?: string;
}

export function NoteForm({ noteId: initialNoteId }: NoteFormProps) {
  const router = useRouter();
  const { firestore, user } = useFirebase();
  const [noteId, setNoteId] = useState(initialNoteId);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [savingStatus, setSavingStatus] = useState<SavingStatus>("idle");

  const noteRef = useMemoFirebase(() => {
    if (!noteId || !user || !firestore) return null;
    return doc(firestore, `users/${user.uid}/notes`, noteId);
  }, [noteId, user, firestore]);

  const { data: note, isLoading: isNoteLoading } = useDoc<Note>(noteRef);

  useEffect(() => {
    if (note) {
      setTitle(note.title);
      setContent(note.content);
      setTags(note.tags || []);
      setIsInitialLoad(false);
    } else if (!isNoteLoading) {
      // If there's no note and we're not loading, it's a new note.
      setIsInitialLoad(false);
    }
  }, [note, isNoteLoading]);


  const saveNote = useCallback(async () => {
    if (!user || !firestore || isInitialLoad) return;

    const hasContent = title.trim() !== '' || content.trim() !== '';
    const noteExists = !!noteId;

    // Don't save if it's a new note with no content
    if (!noteExists && !hasContent) {
        return;
    }
    
    const hasChanged = note ? title !== note.title || content !== note.content || JSON.stringify(tags) !== JSON.stringify(note.tags) : hasContent;

    if (!hasChanged) {
        return;
    }

    setSavingStatus("saving");

    const timestamp = serverTimestamp();
    const noteData = {
        title,
        content,
        tags,
        updatedAt: timestamp,
    };

    try {
        if (noteId) {
            const docRef = doc(firestore, `users/${user.uid}/notes`, noteId);
            await setDocumentNonBlocking(docRef, noteData, { merge: true });
        } else {
            const collectionRef = collection(firestore, `users/${user.uid}/notes`);
            const newDocRef = await addDoc(collectionRef, {
                ...noteData,
                createdAt: timestamp,
                userId: user.uid,
            });
            setNoteId(newDocRef.id);
            // Replace the URL to reflect the new note's ID without a full navigation
            router.replace(`/notes/${newDocRef.id}`, { scroll: false });
        }
        
        setSavingStatus("saved");
    } catch (error) {
        console.error("Failed to save note:", error);
        setSavingStatus("idle"); // Revert status on error
    }

  }, [title, content, tags, user, firestore, noteId, router, isInitialLoad, note]);

  useEffect(() => {
    if (isInitialLoad) return;

    const handler = setTimeout(() => {
      saveNote();
    }, 1500); // Debounce time: 1.5 seconds

    return () => {
      clearTimeout(handler);
    };
  }, [title, content, tags, saveNote, isInitialLoad]);

  useEffect(() => {
    if (savingStatus === 'saved') {
        const timer = setTimeout(() => setSavingStatus('idle'), 2000);
        return () => clearTimeout(timer);
    }
  }, [savingStatus]);


  const handleTagInputKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      const newTag = tagInput.trim();
      if (newTag && !tags.includes(newTag)) {
        setTags([...tags, newTag]);
      }
      setTagInput("");
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };
  
  if (isNoteLoading) {
    return <div className="flex items-center justify-center min-h-[400px]"><Loader /></div>
  }

  return (
    <Card className="w-full max-w-4xl mx-auto shadow-lg border-none">
        <div className="flex items-center justify-end px-6 pt-4 h-8 text-sm text-muted-foreground transition-opacity duration-500 opacity-100">
            {savingStatus === 'saved' && 'All changes saved'}
        </div>
        <CardContent className="space-y-4 p-4 md:p-6 pt-0">
          <div className="space-y-2 p-2">
            <Label htmlFor="title" className="sr-only">Title</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Note title..."
              className="text-2xl font-bold border-none shadow-none px-2 h-auto"
            />
          </div>
          <RichTextEditor value={content} onChange={setContent} />
          <div className="space-y-2">
            <Label htmlFor="tags" className="sr-only">Tags</Label>
            <div className="flex items-center gap-2 rounded-md border border-input px-3 py-1">
                <Tag className="h-4 w-4 text-muted-foreground"/>
                <div className="flex gap-1 flex-wrap">
                {tags.map(tag => (
                    <Badge key={tag} variant="secondary">
                        {tag}
                        <button onClick={() => handleRemoveTag(tag)} className="ml-1 rounded-full hover:bg-destructive/20 p-0.5">
                            <X className="h-3 w-3" />
                        </button>
                    </Badge>
                ))}
                </div>
                <Input
                    id="tags"
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyDown={handleTagInputKeyDown}
                    placeholder="Add tags..."
                    className="flex-grow h-8 border-none shadow-none p-0"
                />
            </div>
          </div>
        </CardContent>
    </Card>
  );
}
