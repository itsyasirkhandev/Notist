"use client";

import { Editor } from '@tiptap/react';
import { Toggle } from '@/components/ui/toggle';
import { Separator } from '@/components/ui/separator';
import {
  Bold,
  Italic,
  Underline,
  Strikethrough,
  List,
  ListOrdered,
  ListTodo,
  Quote,
  Code,
  Heading1,
  Heading2,
  Heading3,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Undo,
  Redo,
  Link,
  Unlink,
  Table,
  Highlighter,
  MoreHorizontal,
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

interface EditorToolbarProps {
  editor: Editor | null;
}

interface ToolbarButtonProps {
  pressed?: boolean;
  onPressedChange?: () => void;
  onClick?: () => void;
  disabled?: boolean;
  tooltip: string;
  shortcut?: string;
  children: React.ReactNode;
  isToggle?: boolean;
}

function ToolbarButton({ 
  pressed, 
  onPressedChange, 
  onClick,
  disabled,
  tooltip, 
  shortcut, 
  children,
  isToggle = true 
}: ToolbarButtonProps) {
  const content = isToggle ? (
    <Toggle
      size="sm"
      pressed={pressed}
      onPressedChange={onPressedChange}
      disabled={disabled}
      className="h-8 w-8 p-0 data-[state=on]:bg-primary/20 data-[state=on]:text-primary hover:bg-muted transition-colors"
    >
      {children}
    </Toggle>
  ) : (
    <Button
      variant="ghost"
      size="sm"
      onClick={onClick}
      disabled={disabled}
      className="h-8 w-8 p-0 hover:bg-muted transition-colors"
    >
      {children}
    </Button>
  );

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        {content}
      </TooltipTrigger>
      <TooltipContent side="bottom" className="flex items-center gap-2">
        <span>{tooltip}</span>
        {shortcut && (
          <kbd className="px-1.5 py-0.5 text-xs bg-muted rounded font-mono">
            {shortcut}
          </kbd>
        )}
      </TooltipContent>
    </Tooltip>
  );
}

export function EditorToolbar({ editor }: EditorToolbarProps) {
  if (!editor) return null;

  const addLink = () => {
    const url = window.prompt('Enter URL:');
    if (url) {
      editor.chain().focus().setLink({ href: url }).run();
    }
  };

  const addTable = () => {
    editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run();
  };

  return (
    <TooltipProvider delayDuration={300}>
      <div className="sticky top-0 z-10 flex flex-wrap items-center gap-0.5 border-b p-2 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        {/* Headings */}
        <div className="hidden sm:flex items-center gap-0.5">
          <ToolbarButton
            pressed={editor.isActive('heading', { level: 1 })}
            onPressedChange={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
            tooltip="Heading 1"
            shortcut="Ctrl+Alt+1"
          >
            <Heading1 className="h-4 w-4" />
          </ToolbarButton>
          <ToolbarButton
            pressed={editor.isActive('heading', { level: 2 })}
            onPressedChange={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
            tooltip="Heading 2"
            shortcut="Ctrl+Alt+2"
          >
            <Heading2 className="h-4 w-4" />
          </ToolbarButton>
          <ToolbarButton
            pressed={editor.isActive('heading', { level: 3 })}
            onPressedChange={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
            tooltip="Heading 3"
            shortcut="Ctrl+Alt+3"
          >
            <Heading3 className="h-4 w-4" />
          </ToolbarButton>
          <Separator orientation="vertical" className="h-6 mx-1" />
        </div>

        {/* Text formatting - always visible */}
        <div className="flex items-center gap-0.5">
          <ToolbarButton
            pressed={editor.isActive('bold')}
            onPressedChange={() => editor.chain().focus().toggleBold().run()}
            tooltip="Bold"
            shortcut="Ctrl+B"
          >
            <Bold className="h-4 w-4" />
          </ToolbarButton>
          <ToolbarButton
            pressed={editor.isActive('italic')}
            onPressedChange={() => editor.chain().focus().toggleItalic().run()}
            tooltip="Italic"
            shortcut="Ctrl+I"
          >
            <Italic className="h-4 w-4" />
          </ToolbarButton>
          <ToolbarButton
            pressed={editor.isActive('underline')}
            onPressedChange={() => editor.chain().focus().toggleUnderline().run()}
            tooltip="Underline"
            shortcut="Ctrl+U"
          >
            <Underline className="h-4 w-4" />
          </ToolbarButton>
          <div className="hidden sm:flex items-center gap-0.5">
            <ToolbarButton
              pressed={editor.isActive('strike')}
              onPressedChange={() => editor.chain().focus().toggleStrike().run()}
              tooltip="Strikethrough"
              shortcut="Ctrl+Shift+S"
            >
              <Strikethrough className="h-4 w-4" />
            </ToolbarButton>
            <ToolbarButton
              pressed={editor.isActive('highlight')}
              onPressedChange={() => editor.chain().focus().toggleHighlight().run()}
              tooltip="Highlight"
              shortcut="Ctrl+Shift+H"
            >
              <Highlighter className="h-4 w-4" />
            </ToolbarButton>
          </div>
        </div>

        <Separator orientation="vertical" className="h-6 mx-1" />

        {/* Lists */}
        <div className="flex items-center gap-0.5">
          <ToolbarButton
            pressed={editor.isActive('bulletList')}
            onPressedChange={() => editor.chain().focus().toggleBulletList().run()}
            tooltip="Bullet List"
            shortcut="Ctrl+Shift+8"
          >
            <List className="h-4 w-4" />
          </ToolbarButton>
          <ToolbarButton
            pressed={editor.isActive('orderedList')}
            onPressedChange={() => editor.chain().focus().toggleOrderedList().run()}
            tooltip="Numbered List"
            shortcut="Ctrl+Shift+7"
          >
            <ListOrdered className="h-4 w-4" />
          </ToolbarButton>
          <div className="hidden sm:block">
            <ToolbarButton
              pressed={editor.isActive('taskList')}
              onPressedChange={() => editor.chain().focus().toggleTaskList().run()}
              tooltip="Task List"
            >
              <ListTodo className="h-4 w-4" />
            </ToolbarButton>
          </div>
        </div>

        <Separator orientation="vertical" className="h-6 mx-1 hidden sm:block" />

        {/* Block elements - hidden on mobile */}
        <div className="hidden sm:flex items-center gap-0.5">
          <ToolbarButton
            pressed={editor.isActive('blockquote')}
            onPressedChange={() => editor.chain().focus().toggleBlockquote().run()}
            tooltip="Quote"
            shortcut="Ctrl+Shift+B"
          >
            <Quote className="h-4 w-4" />
          </ToolbarButton>
          <ToolbarButton
            pressed={editor.isActive('codeBlock')}
            onPressedChange={() => editor.chain().focus().toggleCodeBlock().run()}
            tooltip="Code Block"
            shortcut="Ctrl+Alt+C"
          >
            <Code className="h-4 w-4" />
          </ToolbarButton>
        </div>

        <Separator orientation="vertical" className="h-6 mx-1 hidden md:block" />

        {/* Alignment - hidden on mobile and tablet */}
        <div className="hidden md:flex items-center gap-0.5">
          <ToolbarButton
            pressed={editor.isActive({ textAlign: 'left' })}
            onPressedChange={() => editor.chain().focus().setTextAlign('left').run()}
            tooltip="Align Left"
            shortcut="Ctrl+Shift+L"
          >
            <AlignLeft className="h-4 w-4" />
          </ToolbarButton>
          <ToolbarButton
            pressed={editor.isActive({ textAlign: 'center' })}
            onPressedChange={() => editor.chain().focus().setTextAlign('center').run()}
            tooltip="Align Center"
            shortcut="Ctrl+Shift+E"
          >
            <AlignCenter className="h-4 w-4" />
          </ToolbarButton>
          <ToolbarButton
            pressed={editor.isActive({ textAlign: 'right' })}
            onPressedChange={() => editor.chain().focus().setTextAlign('right').run()}
            tooltip="Align Right"
            shortcut="Ctrl+Shift+R"
          >
            <AlignRight className="h-4 w-4" />
          </ToolbarButton>
        </div>

        <Separator orientation="vertical" className="h-6 mx-1 hidden md:block" />

        {/* Link & Table - hidden on mobile */}
        <div className="hidden md:flex items-center gap-0.5">
          <ToolbarButton
            pressed={editor.isActive('link')}
            onPressedChange={() => {
              if (editor.isActive('link')) {
                editor.chain().focus().unsetLink().run();
              } else {
                addLink();
              }
            }}
            tooltip={editor.isActive('link') ? "Remove Link" : "Add Link"}
            shortcut="Ctrl+K"
          >
            {editor.isActive('link') ? <Unlink className="h-4 w-4" /> : <Link className="h-4 w-4" />}
          </ToolbarButton>
          <ToolbarButton
            onClick={addTable}
            tooltip="Insert Table"
            isToggle={false}
          >
            <Table className="h-4 w-4" />
          </ToolbarButton>
        </div>

        {/* Mobile overflow menu */}
        <div className="md:hidden ml-auto">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}>
                <Heading1 className="h-4 w-4 mr-2" /> Heading 1
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}>
                <Heading2 className="h-4 w-4 mr-2" /> Heading 2
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}>
                <Heading3 className="h-4 w-4 mr-2" /> Heading 3
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => editor.chain().focus().toggleStrike().run()}>
                <Strikethrough className="h-4 w-4 mr-2" /> Strikethrough
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => editor.chain().focus().toggleHighlight().run()}>
                <Highlighter className="h-4 w-4 mr-2" /> Highlight
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => editor.chain().focus().toggleBlockquote().run()}>
                <Quote className="h-4 w-4 mr-2" /> Quote
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => editor.chain().focus().toggleCodeBlock().run()}>
                <Code className="h-4 w-4 mr-2" /> Code Block
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => editor.chain().focus().toggleTaskList().run()}>
                <ListTodo className="h-4 w-4 mr-2" /> Task List
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => editor.chain().focus().setTextAlign('left').run()}>
                <AlignLeft className="h-4 w-4 mr-2" /> Align Left
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => editor.chain().focus().setTextAlign('center').run()}>
                <AlignCenter className="h-4 w-4 mr-2" /> Align Center
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => editor.chain().focus().setTextAlign('right').run()}>
                <AlignRight className="h-4 w-4 mr-2" /> Align Right
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={addLink}>
                <Link className="h-4 w-4 mr-2" /> Add Link
              </DropdownMenuItem>
              <DropdownMenuItem onClick={addTable}>
                <Table className="h-4 w-4 mr-2" /> Insert Table
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="hidden md:block flex-1" />

        {/* Undo/Redo - always visible */}
        <Separator orientation="vertical" className="h-6 mx-1" />
        <div className="flex items-center gap-0.5">
          <ToolbarButton
            onClick={() => editor.chain().focus().undo().run()}
            disabled={!editor.can().undo()}
            tooltip="Undo"
            shortcut="Ctrl+Z"
            isToggle={false}
          >
            <Undo className="h-4 w-4" />
          </ToolbarButton>
          <ToolbarButton
            onClick={() => editor.chain().focus().redo().run()}
            disabled={!editor.can().redo()}
            tooltip="Redo"
            shortcut="Ctrl+Y"
            isToggle={false}
          >
            <Redo className="h-4 w-4" />
          </ToolbarButton>
        </div>
      </div>
    </TooltipProvider>
  );
}
