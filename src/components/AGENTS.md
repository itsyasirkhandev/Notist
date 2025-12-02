# AGENTS.md - Components

## Package Identity
- **Purpose:** React components for the Notist note-taking app
- **Tech:** React 18, TypeScript, TailwindCSS, shadcn/ui, TipTap

## Directory Structure
```
components/
├── ui/                    # shadcn/ui primitives (DO NOT EDIT directly)
├── NoteForm.tsx           # Note creation/editing form
├── NoteCard.tsx           # Note display card (list view)
├── NoteList.tsx           # Notes list with filtering
├── RichTextEditor.tsx     # TipTap editor wrapper
├── EditorToolbar.tsx      # TipTap formatting toolbar
├── Header.tsx             # App header
├── Auth.tsx               # Auth wrapper component
├── LoginForm.tsx          # Login form
├── SignupForm.tsx         # Signup form
└── ...
```

## Patterns & Conventions

### Component Structure
```tsx
"use client";  // Only if using hooks, state, or browser APIs

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface ComponentNameProps {
  prop1: string;
  className?: string;
}

export function ComponentName({ prop1, className }: ComponentNameProps) {
  return (
    <div className={cn("base-styles", className)}>
      {/* content */}
    </div>
  );
}
```

### DO's and DON'Ts

#### Styling
- ✅ DO: Use `cn()` for conditional classes: `cn("base", isActive && "active")`
- ✅ DO: Use Tailwind utilities, reference `src/components/NoteCard.tsx`
- ✅ DO: Use CSS variables from `globals.css` (e.g., `bg-primary`, `text-muted-foreground`)
- ❌ DON'T: Use inline styles or CSS modules
- ❌ DON'T: Hardcode colors (use theme tokens)

#### Components
- ✅ DO: Use shadcn/ui primitives from `@/components/ui/*`
- ✅ DO: Use Lucide icons from `lucide-react`
- ✅ DO: Add `"use client"` only when necessary
- ❌ DON'T: Create new UI primitives (use shadcn/ui)
- ❌ DON'T: Use class components

#### State & Data
- ✅ DO: Use Firebase hooks for data (`useDoc`, `useCollection`)
- ✅ DO: Use `useState`, `useEffect`, `useMemo` for local state
- ❌ DON'T: Fetch data directly in components (use hooks)

### Example Patterns

#### Form Component (copy from)
```
src/components/NoteForm.tsx
```
- Uses controlled inputs
- Auto-save with debounce
- Firebase integration
- Keyboard shortcuts
- Word count display

#### Card Component (copy from)
```
src/components/NoteCard.tsx
```
- Responsive layout
- Hover states
- Action buttons
- Tag display

#### List with Filtering (copy from)
```
src/components/NoteList.tsx
```
- Search/filter state
- Loading skeletons
- Empty states
- Drag and drop

#### Rich Text Editor (copy from)
```
src/components/RichTextEditor.tsx
src/components/EditorToolbar.tsx
```
- TipTap integration
- Toolbar with tooltips
- Mobile-responsive toolbar

## UI Primitives (shadcn/ui)

### Available Components
Located in `src/components/ui/`:
- Layout: `card`, `dialog`, `sheet`, `tabs`, `accordion`
- Forms: `input`, `button`, `checkbox`, `select`, `switch`, `textarea`
- Feedback: `toast`, `alert`, `progress`, `skeleton`
- Navigation: `dropdown-menu`, `menubar`, `sidebar`
- Data: `table`, `badge`, `avatar`
- Overlay: `popover`, `tooltip`, `alert-dialog`

### Adding New shadcn Components
```bash
npx shadcn@latest add <component-name>
```

### Common UI Patterns

#### Button with Loading
```tsx
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

<Button disabled={isLoading}>
  {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
  Save
</Button>
```

#### Card Layout
```tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

<Card>
  <CardHeader>
    <CardTitle>Title</CardTitle>
  </CardHeader>
  <CardContent>Content here</CardContent>
</Card>
```

#### Tooltip
```tsx
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

<TooltipProvider>
  <Tooltip>
    <TooltipTrigger asChild>
      <Button>Hover me</Button>
    </TooltipTrigger>
    <TooltipContent>Tooltip text</TooltipContent>
  </Tooltip>
</TooltipProvider>
```

## Touch Points

| Purpose | File |
|---------|------|
| Note editing | `NoteForm.tsx` |
| Note display | `NoteCard.tsx`, `NoteItem.tsx` |
| Notes list | `NoteList.tsx` |
| Rich text | `RichTextEditor.tsx`, `EditorToolbar.tsx` |
| Auth forms | `LoginForm.tsx`, `SignupForm.tsx` |
| App shell | `Header.tsx`, `ThemeToggle.tsx` |
| Loading | `Loader.tsx`, `NoteItemSkeleton.tsx` |
| Error handling | `ErrorBoundary.tsx` |

## JIT Index Hints
```powershell
# Find component exports
Select-String -Path "src\components\*.tsx" -Pattern "export function"

# Find component props interfaces
Select-String -Path "src\components\*.tsx" -Pattern "interface.*Props"

# Find shadcn imports
Select-String -Path "src\components\*.tsx" -Pattern "from.*@/components/ui"

# Find Lucide icon usage
Select-String -Path "src\components\*.tsx" -Pattern "from.*lucide-react"
```

## Common Gotchas
- **Client directive:** Components using `useState`, `useEffect`, or event handlers need `"use client"`
- **Tooltip wrapping:** `TooltipTrigger` needs `asChild` when wrapping custom components
- **cn() import:** Always use `import { cn } from "@/lib/utils"`
- **Icon sizing:** Lucide icons default large; always add `className="h-4 w-4"` or similar

---

## Tailwind CSS v4 Guidelines

> **This project uses Tailwind CSS v4** (stable, released January 2025).

### General Principles
- Use Tailwind utility classes for all styling; custom CSS only for special cases
- Organize classes logically: layout → spacing → colors → typography
- Use responsive variants (`sm:`, `md:`, `lg:`) and state variants (`hover:`, `focus:`, `dark:`)
- Rely on CSS variables defined in `@theme` for design tokens

### Configuration (CSS-First in v4)
```css
/* src/app/globals.css */
@import "tailwindcss";

/* Define theme tokens */
@theme {
  --color-primary: hsl(var(--primary));
  --radius-lg: var(--radius);
  --font-sans: "Inter", ui-sans-serif, system-ui, sans-serif;
}

/* Light/dark mode variables */
:root {
  --primary: 245 58% 51%;
  --background: 240 5% 96%;
}
.dark {
  --primary: 245 58% 61%;
  --background: 240 10% 8%;
}

/* Reference variables in @theme inline for dynamic colors */
@theme inline {
  --color-background: hsl(var(--background));
  --color-primary: hsl(var(--primary));
}
```

### Class Organization Order
```tsx
// ✅ DO: Organize classes logically
<div className="
  flex items-center gap-4        /* Layout */
  w-full max-w-md p-4            /* Sizing & Spacing */
  bg-card rounded-lg border      /* Background & Border */
  text-sm font-medium            /* Typography */
  hover:bg-muted transition      /* States & Effects */
">
```

### Styling Patterns

#### Responsive Design
```tsx
// Mobile-first approach
<div className="p-2 sm:p-4 md:p-6 lg:p-8">
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
<div className="text-sm md:text-base lg:text-lg">
```

#### Dark Mode
```tsx
// Use dark: variant
<div className="bg-white dark:bg-slate-900">
<span className="text-gray-900 dark:text-gray-100">
```

#### State Variants
```tsx
// Hover, focus, active states
<button className="
  bg-primary text-primary-foreground
  hover:bg-primary/90
  focus:ring-2 focus:ring-ring focus:ring-offset-2
  active:scale-95
  disabled:opacity-50 disabled:cursor-not-allowed
">
```

#### Container Queries (v4 feature)
```tsx
// Parent container
<div className="@container">
  {/* Responsive to container, not viewport */}
  <div className="@md:flex @lg:grid @lg:grid-cols-2">
```

#### Arbitrary Values
```tsx
// When design tokens don't fit
<div className="top-[117px] grid-cols-[1fr_500px_2fr]">
<div className="bg-[--custom-color] text-[length:var(--font-size)]">
```

### DO's and DON'Ts

#### ✅ DO
```tsx
// Use theme colors
<div className="bg-primary text-primary-foreground">

// Use cn() for conditional classes
<div className={cn("base-class", isActive && "active-class")}>

// Use CSS variables from theme
<div className="text-[hsl(var(--muted-foreground))]">

// Group related utilities
<div className="flex items-center justify-between gap-4">
```

#### ❌ DON'T
```tsx
// Don't use inline styles
<div style={{ backgroundColor: 'blue' }}>

// Don't hardcode colors
<div className="bg-[#5046e5]">  // Use bg-primary instead

// Don't create one-off CSS classes
.my-special-button { ... }  // Use utilities instead

// Don't mix Tailwind with CSS modules
import styles from './Button.module.css'  // Avoid
```

### v4-Specific Features (Now Available)

#### Automatic Content Detection
- No need for `content` array in config
- Tailwind scans project files automatically
- Faster builds with the Oxide engine

#### Container Queries
```tsx
<div className="@container">
  <div className="@md:flex @lg:grid">
</div>
```

#### 3D Transforms
```tsx
<div className="rotate-x-45 rotate-y-30 perspective-500">
```

#### New Variants
```tsx
<div className="not-first:mt-4 not-last:mb-4">
<div className="starting:opacity-0"> {/* @starting-style */}
```

### Performance Tips
- Use `@apply` sparingly; prefer utility classes in markup
- Oxide engine provides fast builds automatically
- No manual content configuration needed

### Accessibility with Tailwind
```tsx
// Screen reader utilities
<span className="sr-only">Loading...</span>

// Focus visible for keyboard users
<button className="focus-visible:ring-2 focus-visible:outline-none">

// Pair with ARIA attributes
<div className="hidden" aria-hidden="true">
```

### File References
| Purpose | File |
|---------|------|
| Theme & CSS variables (v4) | `src/app/globals.css` |
| Tailwind config (minimal) | `tailwind.config.ts` |
| PostCSS config | `postcss.config.mjs` (uses `@tailwindcss/postcss`) |
| Utility function | `src/lib/utils.ts` (`cn()`) |
