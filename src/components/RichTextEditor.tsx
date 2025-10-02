
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
    <div className="rounded-md border border-input bg-background focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2">
        <div className="p-2 border-b border-input flex flex-wrap items-center gap-1">
            <ToggleGroup type="multiple" className="flex items-center justify-start flex-wrap gap-1">
                <ToggleGroupItem value="bold" aria-label="Toggle bold" onClick={() => execCommand('bold')}><Bold className="h-4 w-4" /></ToggleGroupItem>
                <ToggleGroupItem value="italic" aria-label="Toggle italic" onClick={() => execCommand('italic')}><Italic className="h-4 w-4" /></ToggleGroupItem>
                <ToggleGroupItem value="underline" aria-label="Toggle underline" onClick={() => execCommand('underline')}><Underline className="h-4 w-4" /></ToggleGroupItem>
                <ToggleGroupItem value="strikethrough" aria-label="Toggle strikethrough" onClick={() => execCommand('strikethrough')}><Strikethrough className="h-4 w-4" /></ToggleGroupItem>
                <ToggleGroupItem value="superscript" aria-label="Toggle superscript" onClick={() => execCommand('superscript')}><Superscript className="h-4 w-4" /></ToggleGroupItem>
                <ToggleGroupItem value="subscript" aria-label="Toggle subscript" onClick={() => execCommand('subscript')}><Subscript className="h-4 w-4" /></ToggleGroupItem>
            </ToggleGroup>
            <Separator orientation="vertical" className="h-8 mx-1" />
            <ToggleGroup type="multiple" className="flex items-center justify-start flex-wrap gap-1">
                <ToggleGroupItem value="insertOrderedList" aria-label="Ordered list" onClick={() => execCommand('insertOrderedList')}><ListOrdered className="h-4 w-4" /></ToggleGroupItem>
                <ToggleGroupItem value="insertUnorderedList" aria-label="Unordered list" onClick={() => execCommand('insertUnorderedList')}><List className="h-4 w-4" /></ToggleGroupItem>
            </ToggleGroup>
            <Separator orientation="vertical" className="h-8 mx-1" />
            <ToggleGroup type="multiple" className="flex items-center justify-start flex-wrap gap-1">
                <ToggleGroupItem value="undo" aria-label="Undo" onClick={() => execCommand('undo')}><Undo className="h-4 w-4" /></ToggleGroupItem>
                <ToggleGroupItem value="redo" aria-label="Redo" onClick={() => execCommand('redo')}><Redo className="h-4 w-4" /></ToggleGroupItem>
            </ToggleGroup>
             <Separator orientation="vertical" className="h-8 mx-1" />
             <ToggleGroup type="single" className="flex items-center justify-start flex-wrap gap-1">
                <ToggleGroupItem value="createLink" aria-label="Create link" onClick={createLink}><LinkIcon className="h-4 w-4" /></ToggleGroupItem>
                <ToggleGroupItem value="unlink" aria-label="Unlink" onClick={() => execCommand('unlink')}><LinkIcon className="h-4 w-4" /></ToggleGroupItem>
            </ToggleGroup>
            <Separator orientation="vertical" className="h-8 mx-1" />
            <ToggleGroup type="single" defaultValue="justifyLeft" className="flex items-center justify-start flex-wrap gap-1">
                <ToggleGroupItem value="justifyLeft" aria-label="Justify Left" onClick={() => execCommand('justifyLeft')}><AlignLeft className="h-4 w-4" /></ToggleGroupItem>
                <ToggleGroupItem value="justifyCenter" aria-label="Justify Center" onClick={() => execCommand('justifyCenter')}><AlignCenter className="h-4 w-4" /></ToggleGroupItem>
                <ToggleGroupItem value="justifyRight" aria-label="Justify Right" onClick={() => execCommand('justifyRight')}><AlignRight className="h-4 w-4" /></ToggleGroupItem>
                <ToggleGroupItem value="justifyFull" aria-label="Justify Full" onClick={() => execCommand('justifyFull')}><AlignJustify className="h-4 w-4" /></ToggleGroupItem>
            </ToggleGroup>
            <Separator orientation="vertical" className="h-8 mx-1" />
            <ToggleGroup type="multiple" className="flex items-center justify-start flex-wrap gap-1">
                <ToggleGroupItem value="indent" aria-label="Indent" onClick={() => execCommand('indent')}><Indent className="h-4 w-4" /></ToggleGroupItem>
                <ToggleGroupItem value="outdent" aria-label="Outdent" onClick={() => execCommand('outdent')}><Outdent className="h-4 w-4" /></ToggleGroupItem>
            </ToggleGroup>
            <Separator orientation="vertical" className="h-8 mx-1" />
            <Select onValueChange={(value) => execCommand('formatBlock', value)}>
                <SelectTrigger className="w-[100px]">
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
            <Separator orientation="vertical" className="h-8 mx-1" />
            <Select onValueChange={(value) => execCommand('fontName', value)}>
                <SelectTrigger className="w-[120px]">
                    <SelectValue placeholder="Font" />
                </SelectTrigger>
                <SelectContent>
                    {fontList.map(font => <SelectItem key={font} value={font}>{font}</SelectItem>)}
                </SelectContent>
            </Select>
            <Separator orientation="vertical" className="h-8 mx-1" />
             <Select onValueChange={(value) => execCommand('fontSize', value)}>
                <SelectTrigger className="w-[80px]">
                    <SelectValue placeholder="Size" />
                </SelectTrigger>
                <SelectContent>
                    {[...Array(7)].map((_, i) => <SelectItem key={i+1} value={(i+1).toString()}>{i+1}</SelectItem>)}
                </SelectContent>
            </Select>
            <Separator orientation="vertical" className="h-8 mx-1" />
            <div className="flex items-center gap-2">
              <Label htmlFor="foreColor" className="text-sm">Font Color</Label>
              <Input type="color" id="foreColor" className="h-8 w-8 p-0.5" onChange={(e) => execCommand('foreColor', e.target.value)} />
            </div>
            <div className="flex items-center gap-2">
              <Label htmlFor="backColor" className="text-sm">Highlight</Label>
              <Input type="color" id="backColor" className="h-8 w-8 p-0.5" onChange={(e) => execCommand('backColor', e.target.value)} />
            </div>

        </div>
        <div
            ref={editorRef}
            contentEditable
            onInput={handleInput}
            dangerouslySetInnerHTML={{ __html: value }}
            className={cn(
                "prose dark:prose-invert max-w-none min-h-[200px] w-full rounded-b-md bg-transparent px-3 py-2 text-sm ring-offset-background focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50",
                !value && "text-muted-foreground before:content-['']"
            )}
        />
    </div>
  );
};
