"use client";

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import Link from '@tiptap/extension-link';
import TaskList from '@tiptap/extension-task-list';
import TaskItem from '@tiptap/extension-task-item';
import Placeholder from '@tiptap/extension-placeholder';
import { Table } from '@tiptap/extension-table';
import { TableRow } from '@tiptap/extension-table-row';
import { TableCell } from '@tiptap/extension-table-cell';
import { TableHeader } from '@tiptap/extension-table-header';
import TextAlign from '@tiptap/extension-text-align';
import Highlight from '@tiptap/extension-highlight';
import BubbleMenuExtension from '@tiptap/extension-bubble-menu';
import { Markdown } from 'tiptap-markdown';
import { cn } from '@/lib/utils';
import { useEffect, useRef, useCallback } from 'react';
import { EditorToolbar } from './EditorToolbar';
import { TableBubbleMenu } from './TableBubbleMenu';
import { SlashCommand, suggestionOptions } from './SlashCommand';

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  isFullScreen: boolean;
  ariaLabel?: string;
}

export function RichTextEditor({ value, onChange, isFullScreen, ariaLabel = "Rich text editor" }: RichTextEditorProps) {
  const hasInitialized = useRef(false);
  const isUpdating = useRef(false);

  // Memoize extensions to prevent recreation
  const extensions = useCallback(() => [
    StarterKit.configure({
      heading: {
        levels: [1, 2, 3],
      },
    }),
    SlashCommand.configure({
      suggestion: suggestionOptions,
    }),
    Underline,
    Link.configure({
      openOnClick: true,
      autolink: true,
      linkOnPaste: true,
      HTMLAttributes: {
        class: 'text-primary underline cursor-pointer',
        rel: 'noopener noreferrer nofollow',
        target: '_blank',
      },
    }),
    TaskList,
    TaskItem.configure({
      nested: true,
    }),
    Placeholder.configure({
      placeholder: 'Start writing your note...',
    }),
    Table.configure({
      resizable: true,
    }),
    TableRow,
    TableCell,
    TableHeader,
    TextAlign.configure({
      types: ['heading', 'paragraph'],
    }),
    Highlight.configure({
      multicolor: true,
    }),
    BubbleMenuExtension,
    Markdown.configure({
      html: true,
      tightLists: true,
      tightListClass: 'tight',
      bulletListMarker: '-',
      linkify: true,
      breaks: false,
      transformPastedText: true,
      transformCopiedText: true,
    }),
  ], []);

  const editor = useEditor({
    extensions: extensions(),
    content: value,
    immediatelyRender: false,
    onUpdate: ({ editor }) => {
      isUpdating.current = true;
      onChange(editor.getHTML());
      setTimeout(() => {
        isUpdating.current = false;
      }, 0);
    },
    editorProps: {
      attributes: {
        class: 'outline-none min-h-[200px] px-4 py-3',
        'aria-label': ariaLabel,
      },
    },
  });

  // Only set content when external value changes and we're not in the middle of an update
  useEffect(() => {
    if (editor && !hasInitialized.current && value) {
      editor.commands.setContent(value, { emitUpdate: false });
      hasInitialized.current = true;
    } else if (editor && hasInitialized.current && !isUpdating.current && editor.getHTML() !== value) {
      editor.commands.setContent(value, { emitUpdate: false });
    }
  }, [editor, value]);

  // Reset initialization flag when editor is destroyed
  useEffect(() => {
    return () => {
      hasInitialized.current = false;
      isUpdating.current = false;
    };
  }, []);

  if (!editor) {
    return (
      <div className={cn(
        "max-w-none w-full rounded-lg border border-input/50 bg-background",
        isFullScreen ? "h-full flex flex-col" : "min-h-[50vh]"
      )}>
        <div className="flex items-center justify-center min-h-[200px] text-muted-foreground">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-primary animate-pulse" />
            <span className="text-sm">Loading editor...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={cn(
      "max-w-none w-full rounded-lg border border-input/50 bg-background overflow-hidden transition-all duration-200",
      "focus-within:border-primary/50 focus-within:ring-1 focus-within:ring-primary/20",
      isFullScreen ? "h-full flex flex-col" : "min-h-[50vh]"
    )}>
      <EditorToolbar editor={editor} />
      <TableBubbleMenu editor={editor} />
      <EditorContent 
        editor={editor} 
        className={cn(
          "flex-1 overflow-y-auto tiptap-container",
          isFullScreen && "h-full"
        )}
      />
    </div>
  );
}
