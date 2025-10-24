
"use client";

import { Note } from "@/lib/types";
import { Button } from "@/components/ui/button";
import {
  Trash2,
  Pencil,
  MoreVertical,
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
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";
import Link from "next/link";
import { format } from "date-fns";

interface NoteItemProps {
  note: Note;
  onDelete: (id: string) => void;
}

const NoteItem: React.FC<NoteItemProps> = ({
  note,
  onDelete,
}) => {

  const createdDate = note.createdAt ? format(note.createdAt.toDate(), 'MMM d, yyyy') : 'No date';

  return (
    <li
      className={cn(
        "group flex flex-col h-80 items-start rounded-lg border bg-card text-card-foreground transition-all break-inside-avoid-column mb-4 shadow-sm hover:shadow-lg",
      )}
      aria-roledescription="Note item"
    >
      <Link href={`/notes/${note.id}`} className="block w-full flex-grow overflow-hidden">
        <div className="p-4 relative h-full">
          <div 
            className="prose prose-sm dark:prose-invert max-w-none"
            dangerouslySetInnerHTML={{ __html: note.content }}
          />
          <div className="absolute bottom-0 left-0 w-full h-12 bg-gradient-to-t from-card to-transparent" />
        </div>
      </Link>
      
      <div className="w-full p-4 border-t flex justify-between items-center">
        <div className="flex-grow overflow-hidden">
            <Link href={`/notes/${note.id}`} className="block">
              <h3 className="font-semibold text-base truncate">{note.title || "Untitled Note"}</h3>
            </Link>
            <p className="text-sm text-muted-foreground mt-1">
                Opened {createdDate}
            </p>
        </div>
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8 flex-shrink-0">
                    <MoreVertical className="h-4 w-4"/>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuItem asChild>
                    <Link href={`/notes/${note.id}`} className="flex items-center">
                        <Pencil className="mr-2 h-4 w-4" />
                        Edit
                    </Link>
                </DropdownMenuItem>
                <AlertDialog>
                    <AlertDialogTrigger asChild>
                        <DropdownMenuItem onSelect={(e) => e.preventDefault()} className="text-destructive focus:text-destructive">
                             <Trash2 className="mr-2 h-4 w-4" />
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
