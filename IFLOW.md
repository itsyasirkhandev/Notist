# Notist Project Context

## Project Overview

Notist is a modern productivity and note-taking application designed for speed, aesthetics, and functionality. It is an offline-first note-taking app featuring a rich text editor and real-time sync capabilities.

### Core Tech Stack

- **Framework**: Next.js 16 (App Router, Turbopack)
- **UI Library**: React 19
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS v4 + shadcn/ui
- **Editor**: TipTap (headless editor based on ProseMirror)
- **Backend**: Firebase Firestore (database) + Firebase Authentication (auth)
- **Icons**: Lucide React
- **PWA**: next-pwa (offline support)

### Architecture Features

- **Offline-First**: Built with PWA technology, supports offline access and note editing
- **Real-Time Sync**: Real-time sync across devices via Firebase Firestore
- **Responsive Design**: Perfectly adapted for desktop, tablet, and mobile devices
- **Dark Mode**: Complete dark theme support
- **Type Safety**: Using TypeScript strict mode

## Building and Running

### Environment Requirements

- Node.js 18+
- npm

### Environment Configuration

Create a `.env` file in the project root directory with Firebase credentials:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=...
NEXT_PUBLIC_FIREBASE_PROJECT_ID=...
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=...
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=...
NEXT_PUBLIC_FIREBASE_APP_ID=...
```

### Common Commands

```bash
# Install dependencies
npm install

# Start development server (port 9002)
npm run dev

# Build production version
npm run build

# Start production server
npm start

# Code linting
npm run lint

# TypeScript type checking
npm run typecheck
```

## Project Structure

```
src/
├── app/                      # Next.js App Router pages
│   ├── auth/                 # Login/Signup pages
│   ├── dashboard/            # Main dashboard
│   ├── notes/                # Note editor routes
│   │   ├── [id]/             # Edit existing note
│   │   └── new/              # Create new note
│   ├── layout.tsx            # Root layout
│   ├── page.tsx              # Home page (Landing Page)
│   └── globals.css           # Global styles
├── components/               # Reusable components
│   ├── landing/              # Landing page sections (Hero, Features, etc.)
│   ├── ui/                   # shadcn/ui primitive components
│   ├── Auth.tsx              # Authentication component
│   ├── NoteCard.tsx          # Dashboard note card
│   ├── RichTextEditor.tsx    # TipTap editor implementation
│   ├── NoteList.tsx          # Note list
│   ├── ThemeToggle.tsx       # Theme toggle
│   └── ...
├── firebase/                 # Firebase configuration and Hooks
│   ├── config.ts             # Firebase config
│   ├── client-provider.tsx   # Firebase client provider
│   ├── provider.tsx          # Firebase provider
│   ├── firestore/
│   │   ├── use-collection.tsx # Firestore collection Hook
│   │   └── use-doc.tsx       # Firestore document Hook
│   └── ...
├── hooks/                    # Custom React Hooks
│   ├── use-mobile.tsx        # Mobile device detection
│   ├── use-toast.ts          # Toast notifications
│   ├── useKeyboardShortcuts.ts # Keyboard shortcuts
│   └── useOnlineStatus.ts    # Online status detection
└── lib/                      # Utility functions and types
    ├── types.ts              # TypeScript type definitions
    └── utils.ts              # Utility functions
```

## Core Features

### Note Features

- **Rich Text Editor**: Supports headings, lists, quotes, code blocks, etc.
- **Slash Commands**: Type `/` to quickly insert tables, task lists, dividers, etc.
- **Markdown Support**: Intuitive formatting shortcuts
- **Table Management**: Advanced table controls with floating bubble menu
- **Smart Search**: Instantly find notes with highlighted search terms in preview
- **Auto-Save**: Automatically save changes and sync in real-time

### Productivity Features

- **Keyboard Shortcuts**: Comprehensive shortcut system (Cmd+K, Cmd+J, etc.)
- **Quick Actions**: Pin, delete, or copy notes directly from card view
- **Color-Coded Tags**: Organize notes with auto-colored tags

### Design & User Experience

- **Modern Dashboard**: Beautiful responsive grid layout with glassmorphism effects
- **Dark Mode**: Fully optimized dark theme
- **Responsive**: Perfectly adapted for desktop, tablet, and mobile devices

## Data Model

### Note Interface

```typescript
interface Note {
  id: string;
  title: string;
  content: string;
  tags: string[];
  createdAt: Timestamp;
  updatedAt: Timestamp;
  userId?: string;
  pinned?: boolean;
  completed?: boolean;
}
```

## Development Conventions

### Code Style

- **TypeScript**: Use strict mode, all files must have type annotations
- **Components**: Use function components and React Hooks
- **Styling**: Use Tailwind CSS v4, avoid inline styles
- **Imports**: Use path alias `@/` to reference files under src directory

### Component Standards

- Use shadcn/ui as base UI component library
- Component files named in PascalCase
- Explicitly separate server and client components (use 'use client' directive)
- Define Props types using TypeScript interfaces

### Style Standards

- Use Tailwind CSS v4 for styling
- Theme configuration in `src/app/globals.css` using `@theme` directive
- Support dark mode using `dark:` prefix
- Responsive design using Tailwind's breakpoint system

### Firebase Usage

- Use Firebase Firestore for data storage
- Use Firebase Authentication for authentication
- Support Google login and email/password login
- Use custom Hooks (`use-collection`, `use-doc`) to interact with Firestore

### Editor

- Use TipTap as rich text editor
- Support extensions: tables, task lists, links, images, highlights, etc.
- Implement slash command menu
- Support Markdown shortcuts

## PWA Configuration

- Use next-pwa plugin
- PWA disabled in development environment
- Provide offline page (`/offline.html`)
- Support Service Worker and caching strategies

## Important Notes

1. **TypeScript Build Errors**: Currently configured with `ignoreBuildErrors: true`, production environment should fix all type errors
2. **Port**: Development server runs on port 9002
3. **Firebase Configuration**: Environment variables need to be set to run
4. **Image Optimization**: Remote image domains configured (placehold.co, unsplash.com, picsum.photos)
5. **Turbopack**: Enabled in development environment for faster build speed