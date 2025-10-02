"use client";

import React, { useRef } from 'react';
import { Bold, Italic, Underline, List, ListOrdered, Link as LinkIcon } from 'lucide-react';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
}

export const RichTextEditor: React.FC<RichTextEditorProps> = ({ value, onChange }) => {
  const editorRef = useRef<HTMLDivElement>(null);

  const execCommand = (command: string, value?: string) => {
    document.execCommand(command, false, value);
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML);
      editorRef.current.focus();
    }
  };

  const handleInput = () => {
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML);
    }
  };
  
  const createLink = () => {
    const url = prompt("Enter the URL");
    if (url) {
      execCommand('createLink', url);
    }
  };

  return (
    <div className="rounded-md border border-input bg-background focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2">
        <div className="p-2 border-b border-input flex flex-wrap items-center gap-1">
            <ToggleGroup type="multiple" className="flex items-center justify-start flex-wrap">
                <ToggleGroupItem value="bold" aria-label="Toggle bold" onClick={() => execCommand('bold')}>
                    <Bold className="h-4 w-4" />
                </ToggleGroupItem>
                <ToggleGroupItem value="italic" aria-label="Toggle italic" onClick={() => execCommand('italic')}>
                    <Italic className="h-4 w-4" />
                </ToggleGroupItem>
                <ToggleGroupItem value="underline" aria-label="Toggle underline" onClick={() => execCommand('underline')}>
                    <Underline className="h-4 w-4" />
                </ToggleGroupItem>
            </ToggleGroup>
            <Separator orientation="vertical" className="h-8 mx-1" />
            <ToggleGroup type="multiple" className="flex items-center justify-start flex-wrap">
                <ToggleGroupItem value="insertUnorderedList" aria-label="Unordered list" onClick={() => execCommand('insertUnorderedList')}>
                    <List className="h-4 w-4" />
                </ToggleGroupItem>
                <ToggleGroupItem value="insertOrderedList" aria-label="Ordered list" onClick={() => execCommand('insertOrderedList')}>
                    <ListOrdered className="h-4 w-4" />
                </ToggleGroupItem>
            </ToggleGroup>
             <Separator orientation="vertical" className="h-8 mx-1" />
             <ToggleGroup type="single" className="flex items-center justify-start flex-wrap">
                <ToggleGroupItem value="createLink" aria-label="Create link" onClick={createLink}>
                    <LinkIcon className="h-4 w-4" />
                </ToggleGroupItem>
            </ToggleGroup>
        </div>
        <div
            ref={editorRef}
            contentEditable
            onInput={handleInput}
            dangerouslySetInnerHTML={{ __html: value }}
            className={cn(
                "prose dark:prose-invert max-w-none min-h-[200px] w-full rounded-b-md bg-transparent px-3 py-2 text-sm ring-offset-background focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50",
                !value && "text-muted-foreground before:content-['Type_your_note_content_here...'] before:cursor-text"
            )}
        />
    </div>
  );
};
