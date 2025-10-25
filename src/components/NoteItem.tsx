
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
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/dropdown-menu";
import Link from "next/link";
import { format } from "date-fns";

interface NoteItemProps {
  note: Note;
  onDelete: (id: string) => void;
  onTogglePin: (id: string, currentPinStatus: boolean) => void;
}

const NoteItem: React.FC<NoteItemProps> = ({
  note,
  onDelete,
  onTogglePin,
}) => {

  const createdDate = note.createdAt ? format(note.createdAt.toDate(), 'MMM d, yyyy') : 'No date';

  return (
    <li
      className={cn(
        "group flex flex-col h-80 items-start rounded-lg border bg-card text-card-foreground transition-all break-inside-avoid-column mb-4 shadow-sm hover:shadow-md",
        note.pinned && "border-primary/50 shadow-lg hover:shadow-xl"
      )}
    >
      <Link href={`/notes/${note.id}`} className="block w-full flex-grow overflow-hidden" aria-label={`View note titled ${note.title || 'Untitled Note'}`}>
        <div className="p-6 relative h-full">
          <div 
            className="prose prose-sm dark:prose-invert max-w-none"
            dangerouslySetInnerHTML={{ __html: note.content }}
          />
          <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-card to-transparent" />
        </div>
      </Link>
      
      <div className="w-full p-6 pt-0 border-t flex justify-between items-center">
        <div className="flex-grow overflow-hidden">
            <div className="block">
              <h3 className="font-semibold text-base truncate flex items-center gap-2">
                {note.pinned && <Pin aria-hidden="true" className="h-4 w-4 text-primary flex-shrink-0" />}
                {note.title || "Untitled Note"}
              </h3>
            </div>
            <p className="text-sm text-muted-foreground mt-1">
                Opened {createdDate}
            </p>
        </div>
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8 flex-shrink-0" aria-label={`Options for note titled ${note.title || 'Untitled Note'}`}>
                    <MoreVertical aria-hidden="true" className="h-4 w-4"/>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => onTogglePin(note.id, !!note.pinned)}>
                  {note.pinned ? (
                    <>
                      <PinOff aria-hidden="true" className="mr-2 h-4 w-4" />
                      Unpin
                    </>
                  ) : (
                    <>
                      <Pin aria-hidden="true" className="mr-2 h-4 w-4" />
                      Pin
                    </>
                  )}
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                    <Link href={`/notes/${note.id}`} className="flex items-center">
                        <Pencil aria-hidden="true" className="mr-2 h-4 w-4" />
                        Edit
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <AlertDialog>
                    <AlertDialogTrigger asChild>
                        <DropdownMenuItem onSelect={(e) => e.preventDefault()} className="text-destructive focus:text-destructive">
                             <Trash2 aria-hidden="true" className="mr-2 h-4 w-4" />
                            Delete
                        </DropdownMenuItem>
                    </AlertDialogTrigger>
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
            </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </li>
  );
};

export default NoteItem;
