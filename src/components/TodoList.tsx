"use client";

import { Task } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Plus, Info } from "lucide-react";
import React, { useState, useEffect, FormEvent, DragEvent } from "react";
import TaskItem from "./TaskItem";
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
} from "@/components/ui/alert-dialog"

const initialTasks: Task[] = [
  { id: "1", text: "Welcome to Todist! Get started by adding a task.", completed: false },
  { id: "2", text: "Use the checkbox to mark tasks as complete.", completed: true },
  { id: "3", text: "Drag and drop to reorder your tasks.", completed: false },
  { id: "4", text: "Use the buttons on the right to edit or delete.", completed: false },
];

export function TodoList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskText, setNewTaskText] = useState("");
  const [draggedItem, setDraggedItem] = useState<Task | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    try {
      const storedTasks = localStorage.getItem("todist-tasks");
      if (storedTasks) {
        setTasks(JSON.parse(storedTasks));
      } else {
        setTasks(initialTasks);
      }
    } catch (error) {
      console.error("Failed to load tasks from localStorage", error);
      setTasks(initialTasks);
    }
  }, []);

  useEffect(() => {
    if (isMounted) {
      try {
        localStorage.setItem("todist-tasks", JSON.stringify(tasks));
      } catch (error) {
        console.error("Failed to save tasks to localStorage", error);
      }
    }
  }, [tasks, isMounted]);

  const handleAddTask = (e: FormEvent) => {
    e.preventDefault();
    if (newTaskText.trim() === "") return;
    const newTask: Task = {
      id: crypto.randomUUID(),
      text: newTaskText,
      completed: false,
    };
    setTasks([newTask, ...tasks]);
    setNewTaskText("");
  };

  const handleToggleComplete = (id: string) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const handleDeleteTask = (id: string) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };
  
  const handleClearCompleted = () => {
    setTasks(tasks.filter((task) => !task.completed));
  }

  const handleUpdateTask = (id: string, newText: string) => {
    setTasks(
      tasks.map((task) => (task.id === id ? { ...task, text: newText } : task))
    );
  };
  
  const handleMove = (id: string, direction: 'up' | 'down') => {
    const index = tasks.findIndex(task => task.id === id);
    if (index === -1) return;

    const newIndex = direction === 'up' ? index - 1 : index + 1;
    if (newIndex < 0 || newIndex >= tasks.length) return;

    const newTasks = [...tasks];
    const [movedTask] = newTasks.splice(index, 1);
    newTasks.splice(newIndex, 0, movedTask);
    setTasks(newTasks);
  }

  const handleDragStart = (task: Task) => {
    setDraggedItem(task);
  };

  const handleDragEnter = (targetTask: Task) => {
    if (!draggedItem || draggedItem.id === targetTask.id) return;
    
    const newTasks = [...tasks];
    const draggedIndex = newTasks.findIndex(t => t.id === draggedItem.id);
    const targetIndex = newTasks.findIndex(t => t.id === targetTask.id);

    if (draggedIndex === -1 || targetIndex === -1) return;

    const [removed] = newTasks.splice(draggedIndex, 1);
    newTasks.splice(targetIndex, 0, removed);
    
    setTasks(newTasks);
  };

  const handleDragEnd = () => {
    setDraggedItem(null);
  };

  const completedCount = tasks.filter(t => t.completed).length;

  if (!isMounted) {
    return null; // or a loading skeleton
  }

  return (
    <Card className="w-full shadow-lg">
      <CardHeader>
        <form onSubmit={handleAddTask} className="flex gap-2">
          <Input
            id="new-task-input"
            type="text"
            value={newTaskText}
            onChange={(e) => setNewTaskText(e.target.value)}
            placeholder="What needs to be done?"
            aria-label="Add a new task"
            className="flex-grow"
          />
          <Button type="submit" aria-label="Add Task">
            <Plus className="h-4 w-4 mr-2" />
            Add
          </Button>
        </form>
      </CardHeader>
      <CardContent>
        {tasks.length > 0 ? (
          <ul className="space-y-2">
            {tasks.map((task, index) => (
              <TaskItem
                key={task.id}
                task={task}
                isDragged={draggedItem?.id === task.id}
                onToggleComplete={handleToggleComplete}
                onDelete={handleDeleteTask}
                onUpdate={handleUpdateTask}
                onMove={handleMove}
                onDragStart={handleDragStart}
                onDragEnter={handleDragEnter}
                onDragEnd={handleDragEnd}
                isFirst={index === 0}
                isLast={index === tasks.length - 1}
              />
            ))}
          </ul>
        ) : (
          <div className="text-center py-10 text-muted-foreground flex flex-col items-center gap-2">
            <Info className="h-6 w-6"/>
            <p className="font-medium">All clear!</p>
            <p className="text-sm">You have no tasks. Add one above to get started.</p>
          </div>
        )}
        {tasks.length > 0 && completedCount > 0 && (
           <div className="mt-4 flex justify-end">
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="ghost" size="sm">Clear {completedCount} completed task(s)</Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This will permanently delete all completed tasks. This action cannot be undone.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={handleClearCompleted} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">Clear Completed</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
           </div>
        )}
      </CardContent>
    </Card>
  );
}
