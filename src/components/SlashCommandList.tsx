"use client";

import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from 'react';
import { 
  Heading1, 
  Heading2, 
  Heading3, 
  List, 
  ListOrdered, 
  ListTodo, 
  TextQuote, 
  Code2, 
  Minus,
  Table,
  Link
} from 'lucide-react';
import { Editor } from '@tiptap/react';
import { SuggestionProps } from '@tiptap/suggestion';

export interface SlashCommandListRef {
  onKeyDown: (props: { event: KeyboardEvent }) => boolean;
}

interface CommandItem {
  title: string;
  description: string;
  searchTerms: string[];
  icon: React.ReactNode;
  command: (args: { editor: Editor; range: Range }) => void;
}

interface Range {
  from: number;
  to: number;
}

export const SlashCommandList = forwardRef<SlashCommandListRef, SuggestionProps>((props, ref) => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const selectItem = (index: number) => {
    const item = props.items[index];

    if (item) {
      props.command(item);
    }
  };

  useEffect(() => setSelectedIndex(0), [props.items]);

  useImperativeHandle(ref, () => ({
    onKeyDown: ({ event }) => {
      if (event.key === 'ArrowUp') {
        setSelectedIndex((selectedIndex + props.items.length - 1) % props.items.length);
        return true;
      }

      if (event.key === 'ArrowDown') {
        setSelectedIndex((selectedIndex + 1) % props.items.length);
        return true;
      }

      if (event.key === 'Enter') {
        selectItem(selectedIndex);
        return true;
      }

      return false;
    },
  }));

  if (props.items.length === 0) {
    return null;
  }

  return (
    <div className="z-50 h-auto max-h-[330px] w-72 overflow-y-auto rounded-md border bg-popover p-1 text-popover-foreground shadow-md animate-in fade-in zoom-in-95 duration-200">
      {props.items.map((item: CommandItem, index: number) => (
        <button
          key={index}
          className={`flex w-full items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none select-none ${
            index === selectedIndex ? 'bg-accent text-accent-foreground' : 'hover:bg-accent hover:text-accent-foreground'
          }`}
          onClick={() => selectItem(index)}
        >
          <div className="flex items-center justify-center w-5 h-5 border rounded-sm bg-background border-muted-foreground/20 text-muted-foreground">
            {item.icon}
          </div>
          <div className="flex flex-col items-start">
            <span className="font-medium">{item.title}</span>
            <span className="text-xs text-muted-foreground">{item.description}</span>
          </div>
        </button>
      ))}
    </div>
  );
});

SlashCommandList.displayName = 'SlashCommandList';

export const getSuggestionItems = ({ query, editor }: { query: string; editor: Editor }) => {
  const items: CommandItem[] = [
    {
      title: 'Heading 1',
      description: 'Big section heading',
      searchTerms: ['h1', 'heading', 'title'],
      icon: <Heading1 className="w-3 h-3" />,
      command: ({ editor, range }) => {
        editor.chain().focus().deleteRange(range).setNode('heading', { level: 1 }).run();
      },
    },
    {
      title: 'Heading 2',
      description: 'Medium section heading',
      searchTerms: ['h2', 'heading', 'subtitle'],
      icon: <Heading2 className="w-3 h-3" />,
      command: ({ editor, range }) => {
        editor.chain().focus().deleteRange(range).setNode('heading', { level: 2 }).run();
      },
    },
    {
      title: 'Heading 3',
      description: 'Small section heading',
      searchTerms: ['h3', 'heading', 'subtitle'],
      icon: <Heading3 className="w-3 h-3" />,
      command: ({ editor, range }) => {
        editor.chain().focus().deleteRange(range).setNode('heading', { level: 3 }).run();
      },
    },
    {
      title: 'Bullet List',
      description: 'Create a simple bullet list',
      searchTerms: ['ul', 'list', 'bullet'],
      icon: <List className="w-3 h-3" />,
      command: ({ editor, range }) => {
        editor.chain().focus().deleteRange(range).toggleBulletList().run();
      },
    },
    {
      title: 'Numbered List',
      description: 'Create a list with numbering',
      searchTerms: ['ol', 'list', 'number'],
      icon: <ListOrdered className="w-3 h-3" />,
      command: ({ editor, range }) => {
        editor.chain().focus().deleteRange(range).toggleOrderedList().run();
      },
    },
    {
        title: 'Task List',
        description: 'Track tasks with a todo list',
        searchTerms: ['todo', 'task', 'check', 'box'],
        icon: <ListTodo className="w-3 h-3" />,
        command: ({ editor, range }) => {
          editor.chain().focus().deleteRange(range).toggleTaskList().run();
        },
    },
    {
        title: 'Table',
        description: 'Add a simple table',
        searchTerms: ['table', 'grid', 'data'],
        icon: <Table className="w-3 h-3" />,
        command: ({ editor, range }) => {
          editor.chain().focus().deleteRange(range).insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run();
        },
    },
    {
      title: 'Quote',
      description: 'Capture a quote',
      searchTerms: ['blockquote', 'quote'],
      icon: <TextQuote className="w-3 h-3" />,
      command: ({ editor, range }) => {
        editor.chain().focus().deleteRange(range).setNode('blockquote').run();
      },
    },
    {
      title: 'Code Block',
      description: 'Capture a code snippet',
      searchTerms: ['codeblock', 'code', 'pre'],
      icon: <Code2 className="w-3 h-3" />,
      command: ({ editor, range }) => {
        editor.chain().focus().deleteRange(range).setNode('codeBlock').run();
      },
    },
    {
      title: 'Divider',
      description: 'Visually divide blocks',
      searchTerms: ['hr', 'divider', 'line'],
      icon: <Minus className="w-3 h-3" />,
      command: ({ editor, range }) => {
        editor.chain().focus().deleteRange(range).setHorizontalRule().run();
      },
    },
  ];

  return items.filter((item) => {
    if (typeof query === 'string' && query.length > 0) {
      const search = query.toLowerCase();
      return (
        item.title.toLowerCase().includes(search) ||
        item.description.toLowerCase().includes(search) ||
        item.searchTerms.some((term) => term.includes(search))
      );
    }
    return true;
  }).slice(0, 10);
};
