"use client";

import { Note } from "@/lib/types";
import { Button } from "@/components/ui/button";
import {
  Trash2,
  Pencil,
  MoreVertical,
  Pin,
  PinOff,
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
import { motion } from "framer-motion";

interface NoteCardProps {
  note: Note;
  onDelete: (id: string) => void;
  onTogglePin: (id: string, currentPinStatus: boolean) => void;
  index?: number;
}

const NoteCard: React.FC<NoteCardProps> = memo(({
  note,
  onDelete,
  onTogglePin,
  index = 0,
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
    const div = document.createElement('div');
    div.innerHTML = sanitizedContent;
    return div.textContent || div.innerText || '';
  }, [sanitizedContent]);

  return (
    <motion.li
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      whileHover={{ y: -4 }}
      className="group"
    >
      <div
        className={cn(
          "relative flex flex-col h-72 rounded-xl border bg-card text-card-foreground transition-all duration-200",
          "shadow-sm hover:shadow-lg",
          note.pinned && "ring-2 ring-primary/20 border-primary/30"
        )}
      >
        {note.pinned && (
          <div className="absolute -top-2 -right-2 z-10">
            <div className="flex items-center justify-center h-6 w-6 rounded-full bg-primary text-primary-foreground shadow-md">
              <Pin className="h-3 w-3" />
            </div>
          </div>
        )}

        <div className="p-4 pb-2 border-b border-border/50">
          <div className="flex items-start justify-between gap-2">
            <Link href={`/notes/${note.id}`} className="flex-1 min-w-0">
              <h3 className="font-semibold text-base truncate hover:text-primary transition-colors">
                {note.title || "Untitled Note"}
              </h3>
              <p className="text-xs text-muted-foreground mt-0.5">
                {formattedDate}
              </p>
            </Link>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0"
                  aria-label={`Options for ${note.title || 'Untitled Note'}`}
                >
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => onTogglePin(note.id, !!note.pinned)}>
                  {note.pinned ? (
                    <>
                      <PinOff className="mr-2 h-4 w-4" />
                      Unpin
                    </>
                  ) : (
                    <>
                      <Pin className="mr-2 h-4 w-4" />
                      Pin
                    </>
                  )}
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href={`/notes/${note.id}`} className="flex items-center">
                    <Pencil className="mr-2 h-4 w-4" />
                    Edit
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <DropdownMenuItem 
                      onSelect={(e) => e.preventDefault()} 
                      className="text-destructive focus:text-destructive"
                    >
                      <Trash2 className="mr-2 h-4 w-4" />
                      Delete
                    </DropdownMenuItem>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Delete this note?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete
                        "{note.title || 'Untitled Note'}".
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
        </div>

        <Link 
          href={`/notes/${note.id}`} 
          className="flex-1 overflow-hidden relative"
          aria-label={`View ${note.title || 'Untitled Note'}`}
        >
          <div className="p-4 pt-3 h-full">
            <p className="text-sm text-muted-foreground line-clamp-5 leading-relaxed">
              {plainTextContent || "No content yet..."}
            </p>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-card to-transparent pointer-events-none" />
        </Link>

        {note.tags && note.tags.length > 0 && (
          <div className="px-4 pb-3 pt-1 flex gap-1.5 flex-wrap">
            {note.tags.slice(0, 3).map(tag => (
              <Badge 
                key={tag} 
                variant="secondary" 
                className="text-xs px-2 py-0 h-5 bg-primary/10 text-primary hover:bg-primary/20"
              >
                {tag}
              </Badge>
            ))}
            {note.tags.length > 3 && (
              <Badge variant="outline" className="text-xs px-2 py-0 h-5">
                +{note.tags.length - 3}
              </Badge>
            )}
          </div>
        )}
      </div>
    </motion.li>
  );
});

NoteCard.displayName = 'NoteCard';

export default NoteCard;
