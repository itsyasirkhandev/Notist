"use client";

import { Button } from "@/components/ui/button";
import { NotebookPen, Search } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Logo } from "./Logo";

interface EmptyStateProps {
  type: "no-notes" | "no-results";
  userName?: string;
  onClearFilters?: () => void;
}

export function EmptyState({ type, userName, onClearFilters }: EmptyStateProps) {
  if (type === "no-notes") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex flex-col items-center justify-center py-16 px-4"
      >
        <div className="relative mb-6">
          <div className="absolute inset-0 bg-primary/20 rounded-full blur-2xl" />
          <div className="relative flex items-center justify-center h-20 w-20 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/20">
            <Logo showText={false} size="lg" />
          </div>
        </div>
        
        <h3 className="text-xl font-semibold text-foreground mb-2">
          {userName ? `Welcome, ${userName}!` : "Welcome to Notist!"}
        </h3>
        <p className="text-muted-foreground text-center max-w-sm mb-6">
          Your notes will appear here. Create your first note to start organizing your thoughts.
        </p>
        
        <Link href="/notes/new">
          <Button size="lg" className="gap-2">
            <NotebookPen className="h-4 w-4" />
            Create your first note
          </Button>
        </Link>

        <div className="mt-8 flex flex-col items-center gap-2 text-sm text-muted-foreground">
          <p className="font-medium">Quick tips:</p>
          <div className="flex flex-wrap justify-center gap-3">
            <kbd className="px-2 py-1 rounded bg-muted border text-xs">⌘ + N</kbd>
            <span>New note</span>
            <kbd className="px-2 py-1 rounded bg-muted border text-xs">⌘ + S</kbd>
            <span>Save</span>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="flex flex-col items-center justify-center py-16 px-4 border border-dashed rounded-xl"
    >
      <div className="relative mb-6">
        <div className="relative flex items-center justify-center h-16 w-16 rounded-full bg-muted">
          <Search className="h-8 w-8 text-muted-foreground" />
        </div>
      </div>
      
      <h3 className="text-lg font-semibold text-foreground mb-2">
        No notes found
      </h3>
      <p className="text-muted-foreground text-center max-w-sm mb-4">
        We couldn't find any notes matching your search or filters.
      </p>
      
      {onClearFilters && (
        <Button variant="outline" onClick={onClearFilters}>
          Clear filters
        </Button>
      )}
    </motion.div>
  );
}
