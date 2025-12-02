"use client";

import { Note } from "@/lib/types";
import { Button } from "@/components/ui/button";
import {
  Trash2,
  Pencil,
  MoreVertical,
  Pin,
  PinOff,
  Calendar,
  ArrowUpRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import React, { memo, useMemo } from "react";
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
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { Badge } from "./ui/badge";
import Link from "next/link";
import { format } from "date-fns";
import DOMPurify from "dompurify";

interface NoteCardProps {
  note: Note;
  onDelete: (id: string) => void;
  onTogglePin: (id: string, currentPinStatus: boolean) => void;
}

const NoteCard: React.FC<NoteCardProps> = memo(({
  note,
  onDelete,
  onTogglePin,
}) => {
  const formattedDate = note.updatedAt 
    ? format(note.updatedAt.toDate(), 'MMM d, yyyy') 
    : note.createdAt 
      ? format(note.createdAt.toDate(), 'MMM d, yyyy')
      : 'No date';
  
  const sanitizedContent = useMemo(() => {
    if (typeof window === 'undefined') return note.content;
    return DOMPurify.sanitize(note.content);
  }, [note.content]);

  const plainTextContent = useMemo(() => {
    return sanitizedContent
      .replace(/<[^>]*>/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
  }, [sanitizedContent]);

  return (
    <li
      className="group"
      style={{ contain: 'layout style paint' }}
    >
      <div
        className={cn(
          "relative flex flex-col h-[280px] rounded-2xl border bg-card text-card-foreground overflow-hidden",
          "shadow-sm hover:shadow-xl transition-all duration-300 ease-out",
          "hover:border-primary/30 hover:-translate-y-1",
          "before:absolute before:inset-0 before:bg-gradient-to-br before:from-primary/5 before:to-transparent before:opacity-0 before:transition-opacity before:duration-300",
          "hover:before:opacity-100",
          note.pinned && "ring-2 ring-primary/30 border-primary/40 bg-gradient-to-br from-primary/5 to-transparent"
        )}
      >
        {/* Pinned indicator */}
        {note.pinned && (
          <div className="absolute top-3 right-3 z-10">
            <div className="flex items-center gap-1.5 px-2 py-1 rounded-full bg-primary/15 backdrop-blur-sm border border-primary/20">
              <Pin className="h-3 w-3 text-primary" />
              <span className="text-[10px] font-medium text-primary">Pinned</span>
            </div>
          </div>
        )}

        {/* Header */}
        <div className="relative p-5 pb-3">
          <div className="flex items-start justify-between gap-3">
            <Link href={`/notes/${note.id}`} className="flex-1 min-w-0 group/title">
              <h3 className="font-semibold text-lg leading-tight line-clamp-2 group-hover/title:text-primary transition-colors duration-200">
                {note.title || "Untitled Note"}
              </h3>
            </Link>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className={cn(
                    "h-8 w-8 rounded-full flex-shrink-0 transition-all duration-200",
                    "opacity-0 group-hover:opacity-100",
                    "hover:bg-primary/10 hover:text-primary"
                  )}
                  aria-label={`Options for ${note.title || 'Untitled Note'}`}
                >
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-44">
                <DropdownMenuItem onClick={() => onTogglePin(note.id, !!note.pinned)}>
                  {note.pinned ? (
                    <>
                      <PinOff className="mr-2 h-4 w-4" />
                      Unpin note
                    </>
                  ) : (
                    <>
                      <Pin className="mr-2 h-4 w-4" />
                      Pin to top
                    </>
                  )}
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href={`/notes/${note.id}`} className="flex items-center">
                    <Pencil className="mr-2 h-4 w-4" />
                    Edit note
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <DropdownMenuItem 
                      onSelect={(e) => e.preventDefault()} 
                      className="text-destructive focus:text-destructive focus:bg-destructive/10"
                    >
                      <Trash2 className="mr-2 h-4 w-4" />
                      Delete note
                    </DropdownMenuItem>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Delete this note?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete
                        &ldquo;{note.title || 'Untitled Note'}&rdquo;.
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
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          
          {/* Date with icon */}
          <div className="flex items-center gap-1.5 mt-2 text-muted-foreground">
            <Calendar className="h-3 w-3" />
            <span className="text-xs">{formattedDate}</span>
          </div>
        </div>

        {/* Content */}
        <Link 
          href={`/notes/${note.id}`} 
          className="flex-1 overflow-hidden relative px-5"
          aria-label={`View ${note.title || 'Untitled Note'}`}
        >
          <p className="text-sm text-muted-foreground/80 line-clamp-4 leading-relaxed">
            {plainTextContent || "Start writing your thoughts..."}
          </p>
          <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-card via-card/80 to-transparent pointer-events-none" />
        </Link>

        {/* Footer with tags and action */}
        <div className="relative p-4 pt-2 flex items-end justify-between gap-3">
          {/* Tags */}
          <div className="flex-1 min-w-0">
            {note.tags && note.tags.length > 0 ? (
              <div className="flex gap-1.5 flex-wrap">
                {note.tags.slice(0, 2).map(tag => (
                  <Badge 
                    key={tag} 
                    variant="secondary" 
                    className="text-[10px] px-2 py-0.5 h-5 rounded-full bg-secondary/80 hover:bg-secondary transition-colors"
                  >
                    {tag}
                  </Badge>
                ))}
                {note.tags.length > 2 && (
                  <Badge 
                    variant="outline" 
                    className="text-[10px] px-2 py-0.5 h-5 rounded-full"
                  >
                    +{note.tags.length - 2}
                  </Badge>
                )}
              </div>
            ) : (
              <span className="text-[10px] text-muted-foreground/50">No tags</span>
            )}
          </div>
          
          {/* Open button */}
          <Link 
            href={`/notes/${note.id}`}
            className={cn(
              "flex items-center justify-center h-8 w-8 rounded-full",
              "bg-primary/10 text-primary",
              "opacity-0 group-hover:opacity-100 transition-all duration-200",
              "hover:bg-primary hover:text-primary-foreground hover:scale-110"
            )}
            aria-label="Open note"
          >
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </li>
  );
});

NoteCard.displayName = 'NoteCard';

export default NoteCard;
