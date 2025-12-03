"use client";

import Link from "next/link";
import { Plus, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "./ThemeToggle";
import { Auth } from "./Auth";
import { useUser } from "@/firebase";
import { cn } from "@/lib/utils";
import { Logo } from "./Logo";
import { KeyboardShortcutsDialog } from "./KeyboardShortcutsDialog";
import { TooltipProvider } from "@/components/ui/tooltip";

interface HeaderProps {
  onSearchClick?: () => void;
  className?: string;
}

export function Header({ onSearchClick, className }: HeaderProps) {
  const { user } = useUser();

  return (
    <TooltipProvider>
      <header className={cn(
        "sticky top-0 z-40 w-full border-b border-border/40 bg-background/95 backdrop-blur-sm supports-[backdrop-filter]:bg-background/60",
        className
      )}>
        <div className="w-full max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <Logo href={user ? "/dashboard" : "/"} />

          <div className="flex items-center gap-2">
            {user && (
              <>
                <Button
                  variant="outline"
                  size="sm"
                  className="hidden sm:flex items-center gap-2 text-muted-foreground hover:text-foreground"
                  onClick={onSearchClick}
                >
                  <Search className="h-4 w-4" />
                  <span className="hidden md:inline">Search notes...</span>
                  <kbd className="hidden md:inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
                    <span className="text-xs">⌘</span>K
                  </kbd>
                </Button>

                <Button
                  variant="ghost"
                  size="icon"
                  className="sm:hidden h-9 w-9"
                  onClick={onSearchClick}
                >
                  <Search className="h-4 w-4" />
                  <span className="sr-only">Search</span>
                </Button>

                <Link href="/notes/new">
                  <Button size="sm" className="gap-2">
                    <Plus className="h-4 w-4" />
                    <span className="hidden sm:inline">New Note</span>
                  </Button>
                </Link>
                
                <KeyboardShortcutsDialog />
              </>
            )}

            <ThemeToggle />
            <Auth />
          </div>
        </div>
      </header>
    </TooltipProvider>
  );
}
