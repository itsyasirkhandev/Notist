"use client";

import { useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";

interface ShortcutHandlers {
  onNewNote?: () => void;
  onSave?: () => void;
  onSearch?: () => void;
}

export function useKeyboardShortcuts(handlers?: ShortcutHandlers) {
  const router = useRouter();

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      const isMac = navigator.platform.toUpperCase().indexOf("MAC") >= 0;
      const modifier = isMac ? event.metaKey : event.ctrlKey;

      if (!modifier) return;

      const target = event.target as HTMLElement;
      const isEditing =
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.isContentEditable;

      switch (event.key.toLowerCase()) {
        case "n":
          if (!isEditing) {
            event.preventDefault();
            if (handlers?.onNewNote) {
              handlers.onNewNote();
            } else {
              router.push("/notes/new");
            }
          }
          break;

        case "s":
          if (handlers?.onSave) {
            event.preventDefault();
            handlers.onSave();
          }
          break;

        case "k":
          if (handlers?.onSearch) {
            event.preventDefault();
            handlers.onSearch();
          }
          break;
      }
    },
    [router, handlers]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);
}
