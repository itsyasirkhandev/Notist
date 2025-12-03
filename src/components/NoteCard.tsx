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
  Copy, 
  Clock
} from "lucide-react";
import { cn, getTagColor } from "@/lib/utils";
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
import { format, formatDistanceToNow, isAfter, subDays } from "date-fns";
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
  // Date formatting logic
  const dateObj = note.updatedAt?.toDate() || note.createdAt?.toDate();
  
  const dateDisplay = useMemo(() => {
    if (!dateObj) return { text: 'No date', isRelative: false };
    
    const now = new Date();
    const sevenDaysAgo = subDays(now, 7);
    const isRecent = isAfter(dateObj, sevenDaysAgo);
    
    if (isRecent) {
      return { 
        text: formatDistanceToNow(dateObj, { addSuffix: true }), 
        isRelative: true 
      };
    }
    
    return { 
      text: format(dateObj, 'MMM d, yyyy'), 
      isRelative: false 
    };
  }, [dateObj]);
  
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
      className="group/card"
    >
      <div
        className={cn(
          "relative flex flex-col h-[280px] rounded-2xl border bg-card text-card-foreground overflow-hidden",
          "transition-all duration-300 ease-[cubic-bezier(0.23,1,0.32,1)]",
          "hover:shadow-[0_10px_40px_-15px_rgba(0,0,0,0.1)] dark:hover:shadow-[0_10px_40px_-15px_rgba(255,255,255,0.05)]",
          "hover:-translate-y-1 hover:border-primary/30",
          note.pinned 
            ? "bg-gradient-to-br from-primary/5 via-background to-background border-primary/20 shadow-sm" 
            : "hover:bg-accent/5"
        )}
      >
        {/* Pinned indicator */}
        {note.pinned && (
          <div className="absolute top-3 right-3 z-20 pointer-events-none">
            <div className="flex items-center justify-center h-7 w-7 rounded-full bg-background/50 backdrop-blur-md border border-primary/20 shadow-sm">
              <Pin className="h-3.5 w-3.5 text-primary fill-primary/20" />
            </div>
          </div>
        )}

        {/* Header */}
        <div className={cn(
          "relative p-5 pb-2 flex flex-col gap-1 z-10",
          note.pinned && "pr-12"
        )}>
          <div className="flex items-start justify-between gap-3">
            <Link href={`/notes/${note.id}`} className="flex-1 min-w-0 group/title focus:outline-none">
              <h3 className="font-semibold text-lg leading-snug tracking-tight line-clamp-2 text-foreground/90 group-hover/title:text-primary transition-colors duration-200">
                {note.title || "Untitled Note"}
              </h3>
            </Link>
            
            {/* Quick Action Toolbar (Hover) */}
            <div className={cn(
              "flex items-center gap-1 -mr-2 -mt-1 transition-opacity duration-200",
              !note.pinned ? "opacity-0 group-hover/card:opacity-100" : "opacity-100"
            )}>
              {/* Pin Button (visible on hover) */}
               <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 hidden group-hover/card:flex text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-full"
                onClick={() => onTogglePin(note.id, !!note.pinned)}
                aria-label={note.pinned ? "Unpin note" : "Pin note"}
              >
                {note.pinned ? <PinOff className="h-4 w-4" /> : <Pin className="h-4 w-4" />}
              </Button>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-8 w-8 text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-full transition-colors"
                    aria-label={`Options for ${note.title || 'Untitled Note'}`}
                  >
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem onClick={() => onTogglePin(note.id, !!note.pinned)} className="md:hidden">
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
                   <DropdownMenuItem onClick={() => navigator.clipboard.writeText(plainTextContent)}>
                      <Copy className="mr-2 h-4 w-4" />
                      Copy content
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
          </div>
          
          {/* Date */}
          <div className="flex items-center gap-1.5 text-muted-foreground/70">
            {dateDisplay.isRelative ? <Clock className="h-3 w-3" /> : <Calendar className="h-3 w-3" />}
            <span className="text-xs font-medium">{dateDisplay.text}</span>
          </div>
        </div>

        {/* Content Preview */}
        <Link 
          href={`/notes/${note.id}`} 
          className="flex-1 overflow-hidden relative px-5 pt-2"
          aria-label={`View ${note.title || 'Untitled Note'}`}
        >
          <p className="text-sm text-muted-foreground/80 line-clamp-5 leading-relaxed font-normal">
            {plainTextContent || <span className="italic text-muted-foreground/50">No additional text</span>}
          </p>
          {/* Improved gradient fade */}
          <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-card via-card/90 to-transparent pointer-events-none" />
        </Link>

        {/* Footer with tags and action */}
        <div className="relative p-4 pt-3 flex items-center justify-between gap-3 border-t border-border/30 bg-muted/5">
          {/* Tags */}
          <div className="flex-1 min-w-0">
            {note.tags && note.tags.length > 0 ? (
              <div className="flex gap-1.5 flex-wrap">
                {note.tags.slice(0, 2).map(tag => (
                  <Badge 
                    key={tag} 
                    variant="secondary" 
                    className={cn(
                      "text-[10px] px-2.5 py-0.5 h-5 rounded-full border transition-all",
                      getTagColor(tag)
                    )}
                  >
                    {tag}
                  </Badge>
                ))}
                {note.tags.length > 2 && (
                  <Badge 
                    variant="outline" 
                    className="text-[10px] px-2 py-0.5 h-5 rounded-full bg-background/50"
                  >
                    +{note.tags.length - 2}
                  </Badge>
                )}
              </div>
            ) : (
              <div className="h-5" /> // Spacer
            )}
          </div>
          
          {/* Open button */}
          <Link 
            href={`/notes/${note.id}`}
            className={cn(
              "flex items-center justify-center h-8 w-8 rounded-full",
              "text-muted-foreground/50 hover:text-primary hover:bg-primary/10",
              "transition-all duration-200 transform",
              "group-hover/card:translate-x-0 translate-x-2 opacity-0 group-hover/card:opacity-100"
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
