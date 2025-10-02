"use client";

import { Task } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import {
  Pencil,
  Trash2,
  GripVertical,
  ArrowUp,
  ArrowDown,
  Check as CheckIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import React, { useState, useRef, useEffect, KeyboardEvent } from "react";
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

interface TaskItemProps {
  task: Task;
  isDragged: boolean;
  onToggleComplete: (id: string) => void;
  onDelete: (id: string) => void;
  onUpdate: (id: string, newText: string) => void;
  onMove: (id: string, direction: 'up' | 'down') => void;
  onDragStart: (task: Task) => void;
  onDragEnter: (task: Task) => void;
  onDragEnd: () => void;
  isFirst: boolean;
  isLast: boolean;
}

const TaskItem: React.FC<TaskItemProps> = ({
  task,
  isDragged,
  onToggleComplete,
  onDelete,
  onUpdate,
  onMove,
  onDragStart,
  onDragEnter,
  onDragEnd,
  isFirst,
  isLast,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(task.text);
  const editInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing) {
      editInputRef.current?.focus();
      editInputRef.current?.select();
    }
  }, [isEditing]);

  const handleUpdate = () => {
    if (editText.trim() === "") {
      onDelete(task.id);
    } else {
      onUpdate(task.id, editText);
    }
    setIsEditing(false);
  };
  
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleUpdate();
    }
    if (e.key === 'Escape') {
      setEditText(task.text);
      setIsEditing(false);
    }
  }

  return (
    <li
      draggable
      onDragStart={() => onDragStart(task)}
      onDragEnter={() => onDragEnter(task)}
      onDragEnd={onDragEnd}
      onDragOver={(e) => e.preventDefault()}
      className={cn(
        "group flex items-center gap-2 rounded-lg border bg-card p-2.5 transition-shadow",
        isDragged && "opacity-50 shadow-xl scale-105",
        "focus-within:ring-2 focus-within:ring-ring"
      )}
      aria-roledescription="Draggable task item"
    >
      <TooltipProvider>
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
        id={`task-${task.id}`}
        checked={task.completed}
        onCheckedChange={() => onToggleComplete(task.id)}
        aria-labelledby={`task-label-${task.id}`}
      />

      {isEditing ? (
        <div className="flex-grow flex gap-2 items-center">
            <Input
              ref={editInputRef}
              type="text"
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              onKeyDown={handleKeyDown}
              onBlur={handleUpdate}
              className="h-8"
              aria-label="Edit task text"
            />
        </div>
      ) : (
        <span
          id={`task-label-${task.id}`}
          className={cn(
            "flex-grow text-sm transition-colors cursor-pointer",
            task.completed ? "text-muted-foreground line-through" : "text-foreground"
          )}
          onDoubleClick={() => setIsEditing(true)}
        >
          {task.text}
        </span>
      )}
      
      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity">
        <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => onMove(task.id, 'up')} disabled={isFirst} aria-label="Move task up">
                <ArrowUp className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent><p>Move up</p></TooltipContent>
        </Tooltip>
        <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => onMove(task.id, 'down')} disabled={isLast} aria-label="Move task down">
                <ArrowDown className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent><p>Move down</p></TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setIsEditing(true)} aria-label="Edit task">
              <Pencil className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Edit</p>
          </TooltipContent>
        </Tooltip>
        <AlertDialog>
          <Tooltip>
            <TooltipTrigger asChild>
              <AlertDialogTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:text-destructive" aria-label="Delete task">
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
                task: "{task.text}".
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={() => onDelete(task.id)}
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

export default TaskItem;
