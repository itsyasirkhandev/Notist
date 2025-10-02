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

interface NoteFormProps {
    noteId?: string;
}

export function NoteForm({ noteId }: NoteFormProps) {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    if (noteId) {
        try {
            const storedNotes = localStorage.getItem("notes-app-notes");
            if (storedNotes) {
                const notes: Note[] = JSON.parse(storedNotes);
                const noteToEdit = notes.find(n => n.id === noteId);
                if (noteToEdit) {
                    setTitle(noteToEdit.title);
                    setContent(noteToEdit.content);
                    setTags(noteToEdit.tags);
                }
            }
        } catch (error) {
            console.error("Failed to load note from localStorage", error);
        }
    }
  }, [noteId]);

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
    if (title.trim() === "" && content.trim() === "") return;
    
    try {
        const storedNotes = localStorage.getItem("notes-app-notes");
        const notes: Note[] = storedNotes ? JSON.parse(storedNotes) : [];
        
        if (noteId) {
            const updatedNotes = notes.map(n => 
                n.id === noteId ? { ...n, title, content, tags } : n
            );
            localStorage.setItem("notes-app-notes", JSON.stringify(updatedNotes));
        } else {
            const newNote: Note = {
                id: crypto.randomUUID(),
                title,
                content,
                tags,
                completed: false,
                createdAt: new Date().toISOString(),
            };
            localStorage.setItem("notes-app-notes", JSON.stringify([newNote, ...notes]));
        }

        router.push("/");
    } catch(error) {
        console.error("Failed to save note to localStorage", error);
    }
  };

  if (!isMounted) {
    return null; // Or a loading skeleton
  }

  return (
    <Card className="w-full shadow-lg">
      <form onSubmit={handleSubmit}>
        <CardHeader>
          <CardTitle>{noteId ? "Edit Note" : "New Note"}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Note title"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="content">Content</Label>
            <RichTextEditor
              value={content}
              onChange={setContent}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="tags">Tags</Label>
            <div className="flex items-center gap-2 rounded-md border border-input px-3 py-2">
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
        <CardFooter className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={() => router.push('/')}>Cancel</Button>
            <Button type="submit">
                <Plus className="h-4 w-4 mr-2" />
                {noteId ? "Save Changes" : "Add Note"}
            </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
