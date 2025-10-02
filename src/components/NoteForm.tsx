
"use client";

import { Note } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Plus, Tag, X } from "lucide-react";
import React, { useState, useEffect, FormEvent, KeyboardEvent } from "react";
import { useRouter } from "next/navigation";
import { Badge } from "./ui/badge";
import { RichTextEditor } from "./RichTextEditor";
import { useDoc, useFirebase } from "@/firebase";
import { doc, serverTimestamp } from "firebase/firestore";
import { addDocumentNonBlocking, setDocumentNonBlocking } from "@/firebase/non-blocking-updates";

interface NoteFormProps {
    noteId?: string;
}

export function NoteForm({ noteId }: NoteFormProps) {
  const router = useRouter();
  const { firestore, user } = useFirebase();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");
  
  const noteRef = noteId && user ? doc(firestore, `users/${user.uid}/tasks`, noteId) : null;
  const { data: note, isLoading } = useDoc<Note>(noteId ? noteRef : null);

  useEffect(() => {
    if (note) {
      setTitle(note.title);
      setContent(note.content);
      setTags(note.tags || []);
    }
  }, [note]);

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
  
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!user || !firestore) return;
    if (title.trim() === "" && content.trim() === "") return;

    const noteData = {
        title,
        content,
        tags,
        updatedAt: serverTimestamp(),
    };
    
    if (noteId) {
        const docRef = doc(firestore, `users/${user.uid}/tasks`, noteId);
        setDocumentNonBlocking(docRef, noteData, { merge: true });
    } else {
        const collectionRef = doc(firestore, `users/${user.uid}/tasks`);
        addDocumentNonBlocking(collectionRef, {
            ...noteData,
            completed: false,
            createdAt: serverTimestamp(),
            userId: user.uid,
        });
    }

    router.push("/");
  };

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <Card className="w-full max-w-4xl mx-auto shadow-lg border-none">
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4 p-4 md:p-6">
          <div className="space-y-2">
            <Label htmlFor="title" className="sr-only">Title</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Note title..."
              required
              className="text-2xl font-bold border-none shadow-none focus-visible:ring-0 px-2"
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
                    className="flex-grow h-8 border-none shadow-none focus-visible:ring-0 p-0"
                />
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-end gap-2 p-4 md:p-6 pt-0">
            <Button type="button" variant="ghost" onClick={() => router.push('/')}>Cancel</Button>
            <Button type="submit">
                <Plus className="h-4 w-4 mr-2" />
                {noteId ? "Save Changes" : "Add Note"}
            </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
