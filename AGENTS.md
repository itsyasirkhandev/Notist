# AGENTS.md - Notist

## Project Snapshot
- **Type:** Single Next.js 15 application (App Router)
- **Stack:** TypeScript, React 18, TailwindCSS, shadcn/ui, Firebase, TipTap
- **Sub-guides:** See `src/components/AGENTS.md` and `src/firebase/AGENTS.md` for detailed patterns

## Root Setup Commands
```bash
npm install              # Install dependencies
npm run dev              # Start dev server (port 9002)
npm run build            # Production build (Windows: use `npx next build`)
npm run typecheck        # TypeScript check
npm run lint             # ESLint check
```

## Universal Conventions

### Code Style
- TypeScript strict mode enabled
- Use `@/` imports for all absolute paths (e.g., `@/components/Button`)
- Use `cn()` from `@/lib/utils` for className merging
- Prefer functional components with hooks
- Use `"use client"` directive only when needed (client interactivity)

### File Naming
- Components: `PascalCase.tsx` (e.g., `NoteCard.tsx`)
- Hooks: `camelCase.ts` with `use` prefix (e.g., `useOnlineStatus.ts`)
- Utilities: `camelCase.ts` (e.g., `utils.ts`)
- Pages: `page.tsx` (Next.js convention)

### Git Conventions
- Commit format: Descriptive messages (no strict conventional commits)
- Branch from `main`
- Test locally before pushing

## Security & Secrets
- **Never commit:** API keys, Firebase credentials, tokens
- **Secrets location:** `.env` file (gitignored)
- **Client env vars:** Must use `NEXT_PUBLIC_` prefix
- **Firebase config:** In `src/firebase/config.ts` (reads from env)

## JIT Index (what to open, not what to paste)

### Directory Map
| Area | Path | Details |
|------|------|---------|
| Pages/Routes | `src/app/` | Next.js App Router pages |
| Components | `src/components/` | [see src/components/AGENTS.md](src/components/AGENTS.md) |
| UI Primitives | `src/components/ui/` | shadcn/ui components (37 files) |
| Firebase | `src/firebase/` | [see src/firebase/AGENTS.md](src/firebase/AGENTS.md) |
| Hooks | `src/hooks/` | Custom React hooks |
| Types | `src/lib/types.ts` | Shared TypeScript types |
| Utilities | `src/lib/utils.ts` | `cn()` and helpers |
| AI/Genkit | `src/ai/` | AI integration (Genkit) |
| Styles | `src/app/globals.css` | Global CSS + Tailwind |

### Quick Find Commands (PowerShell/Windows)
```powershell
# Find a component by name
Select-String -Path "src\components\*.tsx" -Pattern "export.*ComponentName"

# Find a hook
Select-String -Path "src\hooks\*.ts" -Pattern "export.*useSomething"

# Find Firebase usage
Select-String -Path "src\**\*.tsx" -Pattern "useDoc|useCollection|useFirebase"

# Find all page routes
Get-ChildItem -Path "src\app" -Recurse -Filter "page.tsx"
```

### Key Files Reference
| Purpose | File |
|---------|------|
| Main layout | `src/app/layout.tsx` |
| Home page | `src/app/page.tsx` |
| Global styles | `src/app/globals.css` |
| Note type | `src/lib/types.ts` |
| Firebase init | `src/firebase/index.ts` |
| Auth provider | `src/firebase/provider.tsx` |
| Rich text editor | `src/components/RichTextEditor.tsx` |
| Note form | `src/components/NoteForm.tsx` |

## Tech-Specific Notes

### shadcn/ui
- Config: `components.json`
- Add components: `npx shadcn@latest add <component>`
- All primitives in `src/components/ui/`
- Uses Radix UI primitives under the hood

### TipTap Editor
- Main component: `src/components/RichTextEditor.tsx`
- Toolbar: `src/components/EditorToolbar.tsx`
- Extensions: StarterKit, Underline, Link, TaskList, Table, Highlight, TextAlign

### Firebase
- Offline persistence enabled (Firestore local cache)
- Non-blocking updates for optimistic UI
- See `src/firebase/AGENTS.md` for patterns

## Optimization Guidelines
See [docs/OPTIMIZATION.md](docs/OPTIMIZATION.md) for the LEVER framework and code optimization principles:
- Leverage existing patterns before creating new ones
- Extend existing Firestore documents instead of new collections
- Use computed properties instead of new queries
- Target >50% code reduction vs naive implementation

## Definition of Done
Before creating a PR, ensure:
1. `npm run typecheck` passes (note: some pre-existing type errors exist)
2. `npx next build` succeeds
3. Manual testing of affected features
4. No console errors in browser
