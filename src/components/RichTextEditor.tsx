
"use client";

import React, { useRef } from 'react';
import { 
    Bold, Italic, Underline, Strikethrough, Link as LinkIcon,
    List, ListOrdered, Undo, Redo, Superscript, Subscript,
    AlignLeft, AlignCenter, AlignRight, AlignJustify,
    Indent, Outdent
} from 'lucide-react';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Button } from './ui/button';

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
}

const fontList = [
    "Arial", "Verdana", "Times New Roman", "Garamond", 
    "Georgia", "Courier New", "Cursive"
];

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
    const url = prompt("Enter a URL");
    if (url) {
      if (/http/i.test(url)) {
        execCommand('createLink', url);
      } else {
        execCommand('createLink', `http://${url}`);
      }
    }
  };

  return (
    <div className="rounded-md border border-input bg-card focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2">
        <div className="p-2 border-b border-input flex flex-wrap items-center gap-1">
            <ToggleGroup type="multiple" className="flex items-center justify-start flex-wrap gap-0.5">
                <ToggleGroupItem value="bold" aria-label="Toggle bold" onClick={() => execCommand('bold')} className="size-7 p-1"><Bold className="h-4 w-4" /></ToggleGroupItem>
                <ToggleGroupItem value="italic" aria-label="Toggle italic" onClick={() => execCommand('italic')} className="size-7 p-1"><Italic className="h-4 w-4" /></ToggleGroupItem>
                <ToggleGroupItem value="underline" aria-label="Toggle underline" onClick={() => execCommand('underline')} className="size-7 p-1"><Underline className="h-4 w-4" /></ToggleGroupItem>
                <ToggleGroupItem value="strikethrough" aria-label="Toggle strikethrough" onClick={() => execCommand('strikethrough')} className="size-7 p-1"><Strikethrough className="h-4 w-4" /></ToggleGroupItem>
                <ToggleGroupItem value="superscript" aria-label="Toggle superscript" onClick={() => execCommand('superscript')} className="size-7 p-1"><Superscript className="h-4 w-4" /></ToggleGroupItem>
                <ToggleGroupItem value="subscript" aria-label="Toggle subscript" onClick={() => execCommand('subscript')} className="size-7 p-1"><Subscript className="h-4 w-4" /></ToggleGroupItem>
            </ToggleGroup>
            <Separator orientation="vertical" className="h-7 mx-1" />
            <ToggleGroup type="multiple" className="flex items-center justify-start flex-wrap gap-0.5">
                <ToggleGroupItem value="insertOrderedList" aria-label="Ordered list" onClick={() => execCommand('insertOrderedList')} className="size-7 p-1"><ListOrdered className="h-4 w-4" /></ToggleGroupItem>
                <ToggleGroupItem value="insertUnorderedList" aria-label="Unordered list" onClick={() => execCommand('insertUnorderedList')} className="size-7 p-1"><List className="h-4 w-4" /></ToggleGroupItem>
            </ToggleGroup>
            <Separator orientation="vertical" className="h-7 mx-1" />
            <ToggleGroup type="multiple" className="flex items-center justify-start flex-wrap gap-0.5">
                <ToggleGroupItem value="undo" aria-label="Undo" onClick={() => execCommand('undo')} className="size-7 p-1"><Undo className="h-4 w-4" /></ToggleGroupItem>
                <ToggleGroupItem value="redo" aria-label="Redo" onClick={() => execCommand('redo')} className="size-7 p-1"><Redo className="h-4 w-4" /></ToggleGroupItem>
            </ToggleGroup>
             <Separator orientation="vertical" className="h-7 mx-1" />
             <ToggleGroup type="single" className="flex items-center justify-start flex-wrap gap-0.5">
                <ToggleGroupItem value="createLink" aria-label="Create link" onClick={createLink} className="size-7 p-1"><LinkIcon className="h-4 w-4" /></ToggleGroupItem>
                <ToggleGroupItem value="unlink" aria-label="Unlink" onClick={() => execCommand('unlink')} className="size-7 p-1"><LinkIcon className="h-4 w-4" /></ToggleGroupItem>
            </ToggleGroup>
            <Separator orientation="vertical" className="h-7 mx-1" />
            <ToggleGroup type="single" defaultValue="justifyLeft" className="flex items-center justify-start flex-wrap gap-0.5">
                <ToggleGroupItem value="justifyLeft" aria-label="Justify Left" onClick={() => execCommand('justifyLeft')} className="size-7 p-1"><AlignLeft className="h-4 w-4" /></ToggleGroupItem>
                <ToggleGroupItem value="justifyCenter" aria-label="Justify Center" onClick={() => execCommand('justifyCenter')} className="size-7 p-1"><AlignCenter className="h-4 w-4" /></ToggleGroupItem>
                <ToggleGroupItem value="justifyRight" aria-label="Justify Right" onClick={() => execCommand('justifyRight')} className="size-7 p-1"><AlignRight className="h-4 w-4" /></ToggleGroupItem>
                <ToggleGroupItem value="justifyFull" aria-label="Justify Full" onClick={() => execCommand('justifyFull')} className="size-7 p-1"><AlignJustify className="h-4 w-4" /></ToggleGroupItem>
            </ToggleGroup>
            <Separator orientation="vertical" className="h-7 mx-1" />
            <ToggleGroup type="multiple" className="flex items-center justify-start flex-wrap gap-0.5">
                <ToggleGroupItem value="indent" aria-label="Indent" onClick={() => execCommand('indent')} className="size-7 p-1"><Indent className="h-4 w-4" /></ToggleGroupItem>
                <ToggleGroupItem value="outdent" aria-label="Outdent" onClick={() => execCommand('outdent')} className="size-7 p-1"><Outdent className="h-4 w-4" /></ToggleGroupItem>
            </ToggleGroup>
            <Separator orientation="vertical" className="h-7 mx-1" />
            <Select onValueChange={(value) => execCommand('formatBlock', value)}>
                <SelectTrigger className="w-[100px] h-7 text-xs">
                    <SelectValue placeholder="H1" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="H1">H1</SelectItem>
                    <SelectItem value="H2">H2</SelectItem>
                    <SelectItem value="H3">H3</SelectItem>
                    <SelectItem value="H4">H4</SelectItem>
                    <SelectItem value="H5">H5</SelectItem>
                    <SelectItem value="H6">H6</SelectItem>
                </SelectContent>
            </Select>
            <Separator orientation="vertical" className="h-7 mx-1" />
            <Select onValueChange={(value) => execCommand('fontName', value)}>
                <SelectTrigger className="w-[120px] h-7 text-xs">
                    <SelectValue placeholder="Font" />
                </SelectTrigger>
                <SelectContent>
                    {fontList.map(font => <SelectItem key={font} value={font} className="text-xs">{font}</SelectItem>)}
                </SelectContent>
            </Select>
            <Separator orientation="vertical" className="h-7 mx-1" />
             <Select onValueChange={(value) => execCommand('fontSize', value)}>
                <SelectTrigger className="w-[80px] h-7 text-xs">
                    <SelectValue placeholder="Size" />
                </SelectTrigger>
                <SelectContent>
                    {[...Array(7)].map((_, i) => <SelectItem key={i+1} value={(i+1).toString()} className="text-xs">{i+1}</SelectItem>)}
                </SelectContent>
            </Select>
            <Separator orientation="vertical" className="h-7 mx-1" />
            <div className="flex items-center gap-1">
              <Label htmlFor="foreColor" className="text-xs">Font</Label>
              <Input type="color" id="foreColor" className="h-7 w-7 p-0.5" onChange={(e) => execCommand('foreColor', e.target.value)} />
            </div>
            <div className="flex items-center gap-1">
              <Label htmlFor="backColor" className="text-xs">Highlight</Label>
              <Input type="color" id="backColor" className="h-7 w-7 p-0.5" onChange={(e) => execCommand('backColor', e.target.value)} />
            </div>
        </div>
        <div
            ref={editorRef}
            contentEditable
            onInput={handleInput}
            dangerouslySetInnerHTML={{ __html: value }}
            className={cn(
                "prose dark:prose-invert max-w-none min-h-[250px] w-full rounded-b-md bg-transparent px-3 py-2 text-sm ring-offset-background focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50",
                !value && "text-muted-foreground"
            )}
        />
    </div>
  );
};
