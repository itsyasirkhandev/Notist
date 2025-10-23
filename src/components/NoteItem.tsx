
"use client";

import { Note } from "@/lib/types";
import { Button } from "@/components/ui/button";
import {
  Trash2,
  Pencil,
} from "lucide-react";
import { cn } from "@/lib/utils";
import React from "react";
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
} from "@/components/ui/alert-dialog";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import Link from "next/link";
import { Badge } from "./ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger } from "./ui/select";
import { Notebook } from "lucide-react";

interface NoteItemProps {
  note: Note;
  onDelete: (id: string) => void;
}

const NoteItem: React.FC<NoteItemProps> = ({
  note,
  onDelete,
}) => {

  const stripHtml = (html: string) => {
    if (typeof document !== 'undefined') {
      const doc = new DOMParser().parseFromString(html, 'text/html');
      return doc.body.textContent || "";
    }
    return html.replace(/<[^>]+>/g, '');
  };

  const truncatedContent = stripHtml(note.content);

  return (
    <li
      className={cn(
        "group flex flex-col items-start gap-2 rounded-lg border bg-card p-4 transition-all hover:shadow-md break-inside-avoid-column mb-4 relative",
        "focus-within:ring-2 focus-within:ring-ring"
      )}
      aria-roledescription="Note item"
    >
      <TooltipProvider>
      
      <Link href={`/notes/${note.id}`} className="flex-grow w-full">
        <div className="flex-grow cursor-pointer pr-16">
            <span
              id={`note-label-${note.id}`}
              className={cn(
                "font-medium text-base transition-colors break-words",
                "text-foreground"
              )}
            >
              {note.title}
            </span>
            <p 
                className={cn(
                  "text-sm transition-colors text-muted-foreground mt-1 break-words"
                )}
              >
                {truncatedContent.substring(0, 120)}{truncatedContent.length > 120 ? '...' : ''}
              </p>
            <div className="mt-2 flex gap-1 flex-wrap">
                {note.tags && note.tags.map(tag => (
                    <Badge key={tag} variant="secondary">{tag}</Badge>
                ))}
            </div>
        </div>
      </Link>
      
      <div className="absolute top-2 right-2 flex flex-col sm:flex-row items-center gap-1 opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity">
        <Tooltip>
            <TooltipTrigger asChild>
                <Link href={`/notes/${note.id}`}>
                    <Button variant="ghost" size="icon" className="h-8 w-8" aria-label="Edit note">
                        <Pencil className="h-4 w-4" />
                    </Button>
                </Link>
            </TooltipTrigger>
            <TooltipContent><p>Edit</p></TooltipContent>
        </Tooltip>
        <AlertDialog>
          <Tooltip>
            <TooltipTrigger asChild>
              <AlertDialogTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:text-destructive" aria-label="Delete note">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </AlertDialogTrigger>
            </TooltipTrigger>
            <TooltipContent>
              <p>Delete</p>
            </TooltipContent>
          </Tooltip>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete the
                note: "{note.title}".
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={() => onDelete(note.id)}
                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              >
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
      </TooltipProvider>
    </li>
  );
};

export default NoteItem;
