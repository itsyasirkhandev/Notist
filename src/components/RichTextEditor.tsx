
"use client";

import React, { useRef, useEffect } from 'react';
import {
  Bold,
  Italic,
  Underline,
  Strikethrough,
  Superscript,
  Subscript,
  ListOrdered,
  List,
  RotateCcw,
  RotateCw,
  Link2,
  Unlink2,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  Indent,
  Outdent,
} from 'lucide-react';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
}

const fontList = ["Arial", "Verdana", "Times New Roman", "Garamond", "Georgia", "Courier New", "Cursive"];

export function RichTextEditor({ value, onChange }: RichTextEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (editorRef.current && value !== editorRef.current.innerHTML) {
      editorRef.current.innerHTML = value;
    }
  }, [value]);

  const handleInput = () => {
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML);
    }
  };

  const execCommand = (command: string, value?: string) => {
    document.execCommand(command, false, value);
    editorRef.current?.focus();
  };

  const handleLink = () => {
    const url = prompt("Enter a URL:");
    if (url) {
      execCommand("createLink", url);
    }
  };

  const enableImageResizing = () => {
    document.execCommand('enableObjectResizing', false, 'true');
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
        <ToggleGroup type="single" className="flex items-center justify-start flex-wrap gap-1">
          <ToggleGroupItem value="orderedList" aria-label="Ordered list" onClick={() => execCommand('insertOrderedList')}><ListOrdered className="h-4 w-4" /></ToggleGroupItem>
          <ToggleGroupItem value="unorderedList" aria-label="Unordered list" onClick={() => execCommand('insertUnorderedList')}><List className="h-4 w-4" /></ToggleGroupItem>
        </ToggleGroup>
        <ToggleGroup type="single" className="flex items-center justify-start flex-wrap gap-1">
            <ToggleGroupItem value="undo" aria-label="Undo" onClick={() => execCommand('undo')}><RotateCcw className="h-4 w-4" /></ToggleGroupItem>
            <ToggleGroupItem value="redo" aria-label="Redo" onClick={() => execCommand('redo')}><RotateCw className="h-4 w-4" /></ToggleGroupItem>
        </ToggleGroup>
        <ToggleGroup type="single" className="flex items-center justify-start flex-wrap gap-1">
            <ToggleGroupItem value="link" aria-label="Add link" onClick={handleLink}><Link2 className="h-4 w-4" /></ToggleGroupItem>
            <ToggleGroupItem value="unlink" aria-label="Remove link" onClick={() => execCommand('unlink')}><Unlink2 className="h-4 w-4" /></ToggleGroupItem>
        </ToggleGroup>
         <ToggleGroup type="single" defaultValue="left" className="flex items-center justify-start flex-wrap gap-1">
            <ToggleGroupItem value="left" aria-label="Align left" onClick={() => execCommand('justifyLeft')}><AlignLeft className="h-4 w-4" /></ToggleGroupItem>
            <ToggleGroupItem value="center" aria-label="Align center" onClick={() => execCommand('justifyCenter')}><AlignCenter className="h-4 w-4" /></ToggleGroupItem>
            <ToggleGroupItem value="right" aria-label="Align right" onClick={() => execCommand('justifyRight')}><AlignRight className="h-4 w-4" /></ToggleGroupItem>
            <ToggleGroupItem value="justify" aria-label="Align justify" onClick={() => execCommand('justifyFull')}><AlignJustify className="h-4 w-4" /></ToggleGroupItem>
        </ToggleGroup>
        <ToggleGroup type="single" className="flex items-center justify-start flex-wrap gap-1">
            <ToggleGroupItem value="indent" aria-label="Indent" onClick={() => execCommand('indent')}><Indent className="h-4 w-4" /></ToggleGroupItem>
            <ToggleGroupItem value="outdent" aria-label="Outdent" onClick={() => execCommand('outdent')}><Outdent className="h-4 w-4" /></ToggleGroupItem>
        </ToggleGroup>
        <Select onValueChange={(value) => execCommand('formatBlock', value)}>
            <SelectTrigger className="w-[100px]">
                <SelectValue placeholder="H1" />
            </SelectTrigger>
            <SelectContent>
                {['H1', 'H2', 'H3', 'H4', 'H5', 'H6'].map(h => <SelectItem key={h} value={h}>{h}</SelectItem>)}
            </SelectContent>
        </Select>
        <Select onValueChange={(value) => execCommand('fontName', value)}>
            <SelectTrigger className="w-[120px]">
                <SelectValue placeholder="Font" />
            </SelectTrigger>
            <SelectContent>
                {fontList.map(font => <SelectItem key={font} value={font}>{font}</SelectItem>)}
            </SelectContent>
        </Select>
        <Select onValueChange={(value) => execCommand('fontSize', value)}>
            <SelectTrigger className="w-[80px]">
                <SelectValue placeholder="Size" />
            </SelectTrigger>
            <SelectContent>
                {[1, 2, 3, 4, 5, 6, 7].map(size => <SelectItem key={size} value={size.toString()}>{size}</SelectItem>)}
            </SelectContent>
        </Select>
        <div className="flex items-center gap-1">
            <Label htmlFor='foreColor' className="text-sm">Font Color</Label>
            <Input id="foreColor" type="color" defaultValue="#000000" className="h-8 w-8 p-1" onChange={(e) => execCommand('foreColor', e.target.value)} />
        </div>
        <div className="flex items-center gap-1">
            <Label htmlFor='backColor' className="text-sm">Highlight</Label>
            <Input id="backColor" type="color" defaultValue="#ffffff" className="h-8 w-8 p-1" onChange={(e) => execCommand('backColor', e.target.value)} />
        </div>
      </div>
      <div
        ref={editorRef}
        contentEditable="true"
        onInput={handleInput}
        onFocus={enableImageResizing}
        className="prose dark:prose-invert max-w-none min-h-[250px] w-full rounded-b-md bg-transparent px-3 py-2 text-sm ring-offset-background focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
      />
    </div>
  );
}
