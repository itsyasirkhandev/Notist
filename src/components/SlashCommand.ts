import { Extension } from '@tiptap/core';
import Suggestion from '@tiptap/suggestion';
import { ReactRenderer } from '@tiptap/react';
import tippy from 'tippy.js';
import { SlashCommandList, getSuggestionItems } from './SlashCommandList';

export const SlashCommand = Extension.create({
  name: 'slashCommand',

  addOptions() {
    return {
      suggestion: {
        char: '/',
        command: ({ editor, range, props }: any) => {
          props.command({ editor, range });
        },
      },
    };
  },

  addProseMirrorPlugins() {
    return [
      Suggestion({
        editor: this.editor,
        ...this.options.suggestion,
      }),
    ];
  },
});

export const suggestionOptions = {
    items: getSuggestionItems,
    render: () => {
      let component: ReactRenderer<any> | null = null;
      let popup: any | null = null;
  
      return {
        onStart: (props: any) => {
          component = new ReactRenderer(SlashCommandList, {
            props,
            editor: props.editor,
          });
  
          if (!props.clientRect) {
            return;
          }
  
          popup = tippy('body', {
            getReferenceClientRect: props.clientRect,
            appendTo: () => document.body,
            content: component.element,
            showOnCreate: true,
            interactive: true,
            trigger: 'manual',
            placement: 'bottom-start',
          });
        },
  
        onUpdate(props: any) {
          component?.updateProps(props);
  
          if (!props.clientRect) {
            return;
          }
  
          popup?.[0].setProps({
            getReferenceClientRect: props.clientRect,
          });
        },
  
        onKeyDown(props: any) {
          if (props.event.key === 'Escape') {
            popup?.[0].hide();
            return true;
          }
  
          // @ts-ignore
          return component?.ref?.onKeyDown(props);
        },
  
        onExit() {
          popup?.[0].destroy();
          component?.destroy();
        },
      };
    },
  };
