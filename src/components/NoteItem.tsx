"use client";

import { Note } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Trash2,
  GripVertical,
  ArrowUp,
  ArrowDown,
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

interface NoteItemProps {
  note: Note;
  isDragged: boolean;
  onToggleComplete: (id: string) => void;
  onDelete: (id: string) => void;
  onMove: (id: string, direction: 'up' | 'down') => void;
  onDragStart: (note: Note) => void;
  onDragEnter: (note: Note) => void;
  onDragEnd: () => void;
  isFirst: boolean;
  isLast: boolean;
}

const NoteItem: React.FC<NoteItemProps> = ({
  note,
  isDragged,
  onToggleComplete,
  onDelete,
  onMove,
  onDragStart,
  onDragEnter,
  onDragEnd,
  isFirst,
  isLast,
}) => {

  return (
    <li
      draggable
      onDragStart={() => onDragStart(note)}
      onDragEnter={() => onDragEnter(note)}
      onDragEnd={onDragEnd}
      onDragOver={(e) => e.preventDefault()}
      className={cn(
        "group flex items-start gap-2 rounded-lg border bg-card p-3 transition-shadow hover:shadow-md",
        isDragged && "opacity-50 shadow-xl scale-105",
        "focus-within:ring-2 focus-within:ring-ring"
      )}
      aria-roledescription="Draggable note item"
    >
      <TooltipProvider>
      <div className="flex items-center gap-2 pt-1">
        <Tooltip>
          <TooltipTrigger asChild>
            <button className="p-1 cursor-grab focus:cursor-grabbing active:cursor-grabbing focus:outline-none focus:ring-1 focus:ring-ring rounded-sm" aria-label="Drag to reorder">
              <GripVertical className="h-5 w-5 text-muted-foreground" />
            </button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Drag to reorder</p>
          </TooltipContent>
        </Tooltip>

        <Checkbox
          id={`note-${note.id}`}
          checked={note.completed}
          onCheckedChange={() => onToggleComplete(note.id)}
          aria-labelledby={`note-label-${note.id}`}
        />
      </div>

      <Link href={`/notes/${note.id}`} className="flex-grow">
        <div className="flex-grow cursor-pointer">
            <span
              id={`note-label-${note.id}`}
              className={cn(
                "font-medium text-base transition-colors",
                note.completed ? "text-muted-foreground line-through" : "text-foreground"
              )}
            >
              {note.title}
            </span>
            <div 
                className={cn(
                  "prose prose-sm dark:prose-invert max-w-none text-sm transition-colors text-muted-foreground mt-1",
                  note.completed ? "line-through" : ""
                )}
                dangerouslySetInnerHTML={{ __html: note.content.substring(0, 120) + (note.content.length > 120 ? '...' : '') }}
              />
            <div className="mt-2 flex gap-1 flex-wrap">
                {note.tags.map(tag => (
                    <Badge key={tag} variant="secondary">{tag}</Badge>
                ))}
            </div>
        </div>
      </Link>
      
      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity pt-1">
        <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => onMove(note.id, 'up')} disabled={isFirst} aria-label="Move note up">
                <ArrowUp className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent><p>Move up</p></TooltipContent>
        </Tooltip>
        <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => onMove(note.id, 'down')} disabled={isLast} aria-label="Move note down">
                <ArrowDown className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent><p>Move down</p></TooltipContent>
        </Tooltip>
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
