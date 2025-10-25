"use client";

import React, { useState, useEffect } from 'react';
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { Maximize, Minimize } from 'lucide-react';
import { Button } from './ui/button';
import { cn } from '@/lib/utils';

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
}

export function RichTextEditor({ value, onChange }: RichTextEditorProps) {
  const [isFullScreen, setIsFullScreen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Use 'f' key to toggle fullscreen, but not when user is typing in an input.
      if (event.key.toLowerCase() === 'f') {
        const target = event.target as HTMLElement;
        if (target.tagName.toLowerCase() === 'input' || target.tagName.toLowerCase() === 'textarea' || target.isContentEditable) {
          return;
        }
        event.preventDefault();
        setIsFullScreen(prev => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <div className={cn(
      "relative min-h-[40vh]",
      isFullScreen && "fixed inset-0 z-50 bg-background p-4 flex flex-col"
    )}>
       <Button 
        variant="ghost" 
        size="icon" 
        className={cn(
            "absolute top-2 right-2 z-20 h-8 w-8",
            isFullScreen && "top-4 right-4"
            )}
        onClick={() => setIsFullScreen(prev => !prev)}
      >
        {isFullScreen ? <Minimize /> : <Maximize />}
        <span className="sr-only">{isFullScreen ? 'Exit fullscreen' : 'Enter fullscreen'}</span>
      </Button>
      <div className={cn(
        "prose dark:prose-invert max-w-none w-full rounded-md border border-input bg-background focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 flex-grow flex flex-col",
        isFullScreen ? "h-full" : ""
      )}>
        <CKEditor
          editor={ClassicEditor}
          data={value}
          onChange={(event, editor) => {
            const data = editor.getData();
            onChange(data);
          }}
          config={{
            toolbar: {
              items: [
                'heading',
                '|',
                'bold',
                'italic',
                'underline',
                'strikethrough',
                'link',
                '|',
                'bulletedList',
                'numberedList',
                'todoList',
                '|',
                'outdent',
                'indent',
                '|',
                'blockQuote',
                'insertTable',
                'mediaEmbed',
                '|',
                'undo',
                'redo'
              ]
            },
            table: {
              contentToolbar: [
                'tableColumn',
                'tableRow',
                'mergeTableCells'
              ]
            }
          }}
        />
      </div>
    </div>
  );
}
