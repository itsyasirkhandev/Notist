
"use client";

import { Note } from "@/lib/types";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Tag, X, Maximize, Minimize, WifiOff, FileText } from "lucide-react";
import React, { useState, useEffect, KeyboardEvent as ReactKeyboardEvent, useCallback, useRef, useMemo } from "react";
import { useRouter } from "next/navigation";
import { Badge } from "./ui/badge";
import { useDoc, useFirebase, useMemoFirebase } from "@/firebase";
import { doc, serverTimestamp, collection, addDoc } from "firebase/firestore";
import { setDocumentNonBlocking } from "@/firebase/non-blocking-updates";
import { Loader } from "./Loader";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { useOnlineStatus } from "@/hooks/useOnlineStatus";
import { RichTextEditor } from "./RichTextEditor";
import { useKeyboardShortcuts } from "@/hooks/useKeyboardShortcuts";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";


type SavingStatus = "idle" | "saving" | "saved";

interface NoteFormProps {
    noteId?: string;
}

export function NoteForm({ noteId: initialNoteId }: NoteFormProps) {
  const router = useRouter();
  const { firestore, user } = useFirebase();
  const isOnline = useOnlineStatus(); // Use the hook
  const [noteId, setNoteId] = useState(initialNoteId);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [savingStatus, setSavingStatus] = useState<SavingStatus>("idle");
  const [isFullScreen, setIsFullScreen] = useState(false);
  const hasLoadedInitialData = useRef(false);

  const noteRef = useMemoFirebase(() => {
    if (!noteId || !user || !firestore) return null;
    return doc(firestore, `users/${user.uid}/notes`, noteId);
  }, [noteId, user, firestore]);

  const { data: note, isLoading: isNoteLoading } = useDoc<Note>(noteRef);

  useEffect(() => {
    hasLoadedInitialData.current = false;
  }, [noteId]);

  useEffect(() => {
    if (note && !hasLoadedInitialData.current) {
      setTitle(note.title);
      setContent(note.content);
      setTags(note.tags || []);
      hasLoadedInitialData.current = true;
      setIsInitialLoad(false);
    } else if (!isNoteLoading && !note) {
      setIsInitialLoad(false);
    }
  }, [note, isNoteLoading]);


  const saveNote = useCallback(async () => {
    if (!user || !firestore || isInitialLoad) return;

    const hasContent = title.trim() !== '' || content.trim() !== '';
    const noteExists = !!noteId;

    if (!noteExists && !hasContent) {
        return;
    }
    
    const hasChanged = note ? title !== note.title || content !== note.content || JSON.stringify(tags) !== JSON.stringify(note.tags || []) : hasContent;

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
                pinned: false,
            });
            setNoteId(newDocRef.id);
            router.replace(`/notes/${newDocRef.id}`, { scroll: false });
        }
        
        setSavingStatus("saved");
    } catch (error) {
        console.error("Failed to save note:", error);
        setSavingStatus("idle");
    }

  }, [title, content, tags, user, firestore, noteId, router, isInitialLoad, note]);

  useKeyboardShortcuts({ onSave: saveNote });

  const wordCount = useMemo(() => {
    const text = content.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
    return text ? text.split(' ').filter(word => word.length > 0).length : 0;
  }, [content]);

  const charCount = useMemo(() => {
    return content.replace(/<[^>]*>/g, '').length;
  }, [content]);

  useEffect(() => {
    if (isInitialLoad) return;

    const handler = setTimeout(() => {
      saveNote();
    }, 1500);

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

  useEffect(() => {
    const handleKeyDown = (event: globalThis.KeyboardEvent) => {
      if (event.key.toLowerCase() === 'f' && !event.isComposing) {
        const target = event.target as HTMLElement;
        if (target.tagName.toLowerCase() === 'input' || target.tagName.toLowerCase() === 'textarea' || target.isContentEditable) {
          return;
        }
        event.preventDefault();
        setIsFullScreen(prev => !prev);
      } else if (event.key === 'Escape' && isFullScreen) {
        setIsFullScreen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isFullScreen]);

  useEffect(() => {
    if (isFullScreen) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }
  }, [isFullScreen]);


  const handleTagInputKeyDown = (e: ReactKeyboardEvent<HTMLInputElement>) => {
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
    <TooltipProvider>
      <div className={cn(
        "w-full max-w-4xl mx-auto transition-all duration-300 ease-in-out",
        isFullScreen && "fixed inset-0 z-50 bg-background max-w-none"
      )}>
        <Card className={cn(
          "shadow-sm border border-border/50 transition-all duration-300",
          isFullScreen && "h-full flex flex-col border-0 shadow-none rounded-none"
        )}>
          {/* Header bar with status and actions */}
          <div className={cn(
            "flex items-center justify-between px-4 md:px-6 pt-3 pb-2 border-b border-border/30",
            isFullScreen && "border-b-0 bg-muted/30"
          )}>
            <div className="flex items-center gap-3" role="status" aria-live="polite">
              {!isOnline && (
                <div className="flex items-center gap-1.5 text-amber-600 dark:text-amber-500 text-xs font-medium bg-amber-50 dark:bg-amber-950/30 px-2 py-1 rounded-full">
                  <WifiOff className="h-3 w-3" />
                  <span>Offline</span>
                </div>
              )}
              <div className={cn(
                "text-xs text-muted-foreground transition-all duration-300",
                savingStatus === 'idle' && !isFullScreen && "opacity-0"
              )}>
                {savingStatus === 'saving' && (
                  <span className="flex items-center gap-1.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
                    Saving...
                  </span>
                )}
                {savingStatus === 'saved' && (
                  <span className="text-green-600 dark:text-green-500">
                    {isOnline ? 'Saved' : 'Saved locally'}
                  </span>
                )}
              </div>
            </div>
            <div className="flex items-center gap-2">
              {/* Word count - always visible in fullscreen, hover tooltip on normal */}
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className={cn(
                    "flex items-center gap-1.5 text-xs text-muted-foreground cursor-default",
                    isFullScreen ? "opacity-100" : "opacity-70 hover:opacity-100"
                  )}>
                    <FileText className="h-3 w-3" />
                    <span>{wordCount} words</span>
                  </div>
                </TooltipTrigger>
                <TooltipContent side="bottom">
                  <p>{charCount} characters</p>
                </TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-7 w-7 text-muted-foreground hover:text-foreground"
                    onClick={() => setIsFullScreen(prev => !prev)}
                  >
                    {isFullScreen ? <Minimize className="h-4 w-4" /> : <Maximize className="h-4 w-4" />}
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="bottom">
                  {isFullScreen ? 'Exit fullscreen (Esc)' : 'Fullscreen (F)'}
                </TooltipContent>
              </Tooltip>
            </div>
          </div>

          <CardContent className={cn(
            "space-y-4 p-4 md:p-6 pt-4",
            isFullScreen && "flex-grow flex flex-col p-3 md:p-4 min-h-0"
          )}>
            {/* Title input */}
            <div className="space-y-1">
              <Label htmlFor="title" className="sr-only">Title</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Note title..."
                className="text-xl md:text-2xl font-semibold border-none shadow-none px-1 h-auto bg-transparent focus-visible:ring-0 placeholder:text-muted-foreground/50"
              />
            </div>

            {/* Editor */}
            <div className={cn(
              "relative",
              isFullScreen && "flex-grow min-h-0 overflow-y-auto"
            )}>
              <RichTextEditor 
                key={`editor-${noteId || 'new'}`}
                value={content} 
                onChange={setContent} 
                isFullScreen={isFullScreen}
                ariaLabel="Note content"
              />
            </div>

            {/* Tags section */}
            <div className={cn(
              "space-y-2 pt-2 border-t border-border/30",
              isFullScreen && "hidden"
            )}>
              <Label htmlFor="tags" className="sr-only">Tags</Label>
              <div className="flex items-center gap-2 rounded-lg border border-input/50 bg-muted/30 px-3 py-2 focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-1 transition-all">
                <Tag aria-hidden="true" className="h-4 w-4 text-muted-foreground shrink-0"/>
                <div className="flex gap-1.5 flex-wrap items-center">
                  {tags.map(tag => (
                    <Badge 
                      key={tag} 
                      variant="secondary"
                      className="bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
                    >
                      {tag}
                      <button 
                        onClick={() => handleRemoveTag(tag)} 
                        className="ml-1 rounded-full hover:bg-destructive/20 p-0.5 transition-colors" 
                        aria-label={`Remove ${tag} tag`}
                      >
                        <X aria-hidden="true" className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                  <Input
                    id="tags"
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyDown={handleTagInputKeyDown}
                    placeholder={tags.length === 0 ? "Add tags..." : ""}
                    className="flex-grow min-w-[80px] h-6 border-none shadow-none p-0 bg-transparent focus-visible:ring-0 text-sm"
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </TooltipProvider>
  );
}
