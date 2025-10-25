
"use client";

import React from 'react';
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { cn } from '@/lib/utils';

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  isFullScreen: boolean;
  ariaLabel?: string;
}

export function RichTextEditor({ value, onChange, isFullScreen, ariaLabel = "Rich text editor" }: RichTextEditorProps) {
  return (
    <div className={cn(
        "prose dark:prose-invert max-w-none w-full rounded-md border border-input bg-background focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2",
        isFullScreen ? "h-full flex flex-col" : "relative min-h-[50vh]"
        )}>
      <CKEditor
        editor={ClassicEditor}
        data={value}
        onReady={editor => {
            if (editor) {
                editor.editing.view.change(writer => {
                    const viewEditable = editor.editing.view.document.getRoot();
                    if (viewEditable) {
                       writer.setAttribute('aria-label', ariaLabel, viewEditable);
                    }
                });
            }
        }}
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
  );
}
