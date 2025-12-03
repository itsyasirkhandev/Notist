"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Keyboard } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from "@/components/ui/tooltip";

export function KeyboardShortcutsDialog() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <TooltipProvider>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <Tooltip>
          <TooltipTrigger asChild>
            <DialogTrigger asChild>
              <Button 
                variant="ghost" 
                size="icon" 
                className="text-muted-foreground hover:text-foreground"
              >
                <Keyboard className="h-5 w-5" />
                <span className="sr-only">Keyboard Shortcuts</span>
              </Button>
            </DialogTrigger>
          </TooltipTrigger>
          <TooltipContent>Keyboard Shortcuts</TooltipContent>
        </Tooltip>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Keyboard Shortcuts</DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-4">
          <div>
            <h3 className="font-semibold mb-3 text-sm text-muted-foreground uppercase tracking-wider">General</h3>
            <div className="space-y-3">
              <ShortcutItem label="Search Notes" keys={["⌘", "K"]} />
              <ShortcutItem label="New Note" keys={["⌘", "N"]} />
              <ShortcutItem label="Save Note" keys={["⌘", "S"]} />
              <ShortcutItem label="Toggle Fullscreen" keys={["F"]} />
              <ShortcutItem label="Exit Fullscreen" keys={["Esc"]} />
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-3 text-sm text-muted-foreground uppercase tracking-wider">Editor</h3>
            <div className="space-y-3">
              <ShortcutItem label="Bold" keys={["⌘", "B"]} />
              <ShortcutItem label="Italic" keys={["⌘", "I"]} />
              <ShortcutItem label="Underline" keys={["⌘", "U"]} />
              <ShortcutItem label="Strikethrough" keys={["⌘", "⇧", "S"]} />
              <ShortcutItem label="Highlight" keys={["⌘", "⇧", "H"]} />
              <ShortcutItem label="Heading 1" keys={["⌘", "Alt", "1"]} />
              <ShortcutItem label="Heading 2" keys={["⌘", "Alt", "2"]} />
              <ShortcutItem label="Heading 3" keys={["⌘", "Alt", "3"]} />
              <ShortcutItem label="Bullet List" keys={["⌘", "⇧", "8"]} />
              <ShortcutItem label="Numbered List" keys={["⌘", "⇧", "7"]} />
              <ShortcutItem label="Link" keys={["⌘", "K"]} />
              <ShortcutItem label="Slash Commands" keys={["/"]} />
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
    </TooltipProvider>
  );
}

function ShortcutItem({ label, keys }: { label: string; keys: string[] }) {
  return (
    <div className="flex items-center justify-between text-sm">
      <span>{label}</span>
      <div className="flex gap-1">
        {keys.map((key, i) => (
          <kbd
            key={i}
            className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground"
          >
            {key}
          </kbd>
        ))}
      </div>
    </div>
  );
}
