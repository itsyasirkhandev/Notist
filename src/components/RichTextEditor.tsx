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
import { cn } from '@/lib/utils';
import { useEffect, useRef } from 'react';
import { EditorToolbar } from './EditorToolbar';

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  isFullScreen: boolean;
  ariaLabel?: string;
}

export function RichTextEditor({ value, onChange, isFullScreen, ariaLabel = "Rich text editor" }: RichTextEditorProps) {
  const hasInitialized = useRef(false);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3],
        },
      }),
      Underline,
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: 'text-primary underline cursor-pointer',
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
    ],
    content: value,
    immediatelyRender: false,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: 'outline-none min-h-[200px] px-4 py-3',
        'aria-label': ariaLabel,
      },
    },
  });

  // Only set content on initial mount, not on every value change
  useEffect(() => {
    if (editor && !hasInitialized.current && value) {
      editor.commands.setContent(value, false);
      hasInitialized.current = true;
    }
  }, [editor, value]);

  // Reset initialization flag when editor is destroyed
  useEffect(() => {
    return () => {
      hasInitialized.current = false;
    };
  }, []);

  if (!editor) {
    return (
      <div className={cn(
        "prose dark:prose-invert max-w-none w-full rounded-md border border-input bg-background",
        isFullScreen ? "h-full flex flex-col" : "min-h-[50vh]"
      )}>
        <div className="flex items-center justify-center min-h-[200px] text-muted-foreground">
          Loading editor...
        </div>
      </div>
    );
  }

  return (
    <div className={cn(
      "prose dark:prose-invert max-w-none w-full rounded-md border border-input bg-background overflow-hidden",
      "focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2",
      isFullScreen ? "h-full flex flex-col" : "min-h-[50vh]"
    )}>
      <EditorToolbar editor={editor} />
      <EditorContent 
        editor={editor} 
        className={cn(
          "flex-1 overflow-y-auto",
          isFullScreen && "h-full"
        )}
      />
    </div>
  );
}
