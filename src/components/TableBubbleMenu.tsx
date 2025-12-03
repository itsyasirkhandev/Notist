"use client";

import { BubbleMenu as TiptapBubbleMenu } from "@tiptap/react/menus";
import { Editor } from "@tiptap/core";
import { 
  Trash2, 
  ArrowUp, 
  ArrowDown, 
  ArrowLeft, 
  ArrowRight,
  Columns,
  Rows
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface TableBubbleMenuProps {
  editor: Editor | null;
}

export function TableBubbleMenu({ editor }: TableBubbleMenuProps) {
  if (!editor) return null;

  return (
    <TiptapBubbleMenu
      editor={editor}
      shouldShow={({ editor }: { editor: Editor }) => editor.isActive("table")}
      className="flex items-center gap-1 p-1 rounded-lg border bg-background shadow-lg animate-in fade-in zoom-in-95 duration-200"
    >
        <TooltipProvider delayDuration={300}>
            {/* Column Operations */}
            <div className="flex items-center gap-0.5">
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 hover:bg-muted text-muted-foreground hover:text-primary"
                            onClick={() => editor.chain().focus().addColumnBefore().run()}
                        >
                            <ArrowLeft className="h-4 w-4" />
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent>Add Column Before</TooltipContent>
                </Tooltip>
                
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 hover:bg-muted text-muted-foreground hover:text-primary"
                            onClick={() => editor.chain().focus().addColumnAfter().run()}
                        >
                            <ArrowRight className="h-4 w-4" />
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent>Add Column After</TooltipContent>
                </Tooltip>

                <Tooltip>
                    <TooltipTrigger asChild>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 hover:bg-destructive/10 text-muted-foreground hover:text-destructive"
                            onClick={() => editor.chain().focus().deleteColumn().run()}
                        >
                            <Columns className="h-4 w-4" />
                            <span className="sr-only">Delete Column</span>
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent>Delete Column</TooltipContent>
                </Tooltip>
            </div>

            <Separator orientation="vertical" className="h-6 mx-1" />

            {/* Row Operations */}
            <div className="flex items-center gap-0.5">
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 hover:bg-muted text-muted-foreground hover:text-primary"
                            onClick={() => editor.chain().focus().addRowBefore().run()}
                        >
                            <ArrowUp className="h-4 w-4" />
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent>Add Row Before</TooltipContent>
                </Tooltip>

                <Tooltip>
                    <TooltipTrigger asChild>
                         <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 hover:bg-muted text-muted-foreground hover:text-primary"
                            onClick={() => editor.chain().focus().addRowAfter().run()}
                        >
                            <ArrowDown className="h-4 w-4" />
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent>Add Row After</TooltipContent>
                </Tooltip>

                <Tooltip>
                    <TooltipTrigger asChild>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 hover:bg-destructive/10 text-muted-foreground hover:text-destructive"
                            onClick={() => editor.chain().focus().deleteRow().run()}
                        >
                            <Rows className="h-4 w-4" />
                            <span className="sr-only">Delete Row</span>
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent>Delete Row</TooltipContent>
                </Tooltip>
            </div>

            <Separator orientation="vertical" className="h-6 mx-1" />

             {/* Table Operations */}
            <Tooltip>
                <TooltipTrigger asChild>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 hover:bg-destructive/10 text-muted-foreground hover:text-destructive"
                        onClick={() => editor.chain().focus().deleteTable().run()}
                    >
                        <Trash2 className="h-4 w-4" />
                    </Button>
                </TooltipTrigger>
                <TooltipContent>Delete Table</TooltipContent>
            </Tooltip>
        </TooltipProvider>
    </TiptapBubbleMenu>
  );
}
