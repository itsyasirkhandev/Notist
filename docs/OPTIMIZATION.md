# Code Optimization Principles & Extended Thinking Framework

## Overview

This document establishes optimization principles for the Notist codebase. These principles leverage extended thinking methodologies to ensure thorough analysis before implementation.

## Core Philosophy

> "The best code is no code. The second best code is code that already exists and works."

### The LEVER Framework

**L**everage existing patterns  
**E**xtend before creating  
**V**erify through reactivity  
**E**liminate duplication  
**R**educe complexity  

## 🧠 Extended Thinking Process

Always follow this decision tree before implementing:

```
New Feature Request
        │
        ▼
┌───────────────────────────┐
│ Can existing code handle? │
└───────────────────────────┘
        │
    ┌───┴───┐
    Yes     No
    │       │
    ▼       ▼
 Extend   ┌─────────────────────────┐
existing  │ Can we modify existing? │
  code    └─────────────────────────┘
    │           │
    │       ┌───┴───┐
    │      Yes     No
    │       │       │
    │       ▼       ▼
    │    Adapt   ┌──────────────────┐
    │     and    │ Is new code      │
    │   extend   │ reusable?        │
    │       │    └──────────────────┘
    │       │           │
    │       │       ┌───┴───┐
    │       │      Yes     No
    │       │       │       │
    │       │       ▼       ▼
    │       │   Create   Reconsider
    │       │ abstraction approach
    │       │       │       │
    ▼       ▼       ▼       │
┌─────────────────────┐     │
│ Document extensions │◄────┘
└─────────────────────┘
```

## 📋 Pre-Implementation Checklist

Before writing any code, complete this extended thinking exercise:

### 1. Pattern Recognition Phase (10-15 minutes)
```markdown
## Existing Pattern Analysis
- [ ] What similar functionality already exists?
- [ ] Which Firebase hooks handle related data?
- [ ] What UI components display similar information?
- [ ] Which custom hooks manage related state?

## Code Reuse Opportunities
- [ ] Can I extend an existing Firestore document instead of creating a new collection?
- [ ] Can I add fields to an existing useDoc return?
- [ ] Can I enhance an existing hook with new computed properties?
- [ ] Can I modify an existing component with conditional rendering?
```

### 2. Complexity Assessment (5-10 minutes)
```markdown
## Proposed Solution Complexity
- Lines of new code: ___
- New files created: ___
- New Firestore collections: ___
- New Firebase hooks: ___

## Optimized Alternative
- Lines extending existing code: ___
- Files modified: ___
- Fields added to existing documents: ___
- Existing hooks enhanced: ___

If optimized < 50% of proposed, proceed with optimization.
```

## 🏗️ Architecture Principles

### 1. Firestore Schema Extensions

#### ❌ Anti-Pattern: Creating New Collections
```typescript
// DON'T: Create separate tracking collection
// users/{userId}/campaignTracking/{trackingId}
interface CampaignTracking {
  source: string;
  medium: string;
  timestamp: Timestamp;
  // ... 10 more fields
}

// Requires separate queries, joins in client, sync logic
```

#### ✅ Pattern: Extend Existing Documents
```typescript
// DO: Add fields to existing Note interface
// users/{userId}/notes/{noteId}
interface Note {
  // ... existing fields ...
  
  // New tracking fields (minimal additions)
  viewCount?: number;
  lastViewedAt?: Timestamp;
  sharedWith?: string[];
}
// Data locality, single query, existing indexes work
```

### 2. Query Optimization

#### ❌ Anti-Pattern: Duplicate Query Logic
```typescript
// DON'T: Create multiple similar hooks
export function useRecentNotes() { /* separate query */ }
export function usePinnedNotes() { /* separate query */ }
export function useArchivedNotes() { /* separate query */ }
```

#### ✅ Pattern: Extend Existing Hooks
```typescript
// DO: Enhance existing hook with computed properties
export function useNotes() {
  const { firestore, user } = useFirebase();
  
  const notesQuery = useMemoFirebase(() => {
    if (!user || !firestore) return null;
    return query(
      collection(firestore, `users/${user.uid}/notes`),
      orderBy("updatedAt", "desc")
    );
  }, [user, firestore]);

  const { data: notes, isLoading } = useCollection<Note>(notesQuery);
  
  // Add computed properties for different views
  const enhancedData = useMemo(() => ({
    all: notes,
    pinned: notes?.filter(n => n.pinned),
    recent: notes?.slice(0, 5),
    byTag: (tag: string) => notes?.filter(n => n.tags.includes(tag)),
  }), [notes]);
  
  return { ...enhancedData, isLoading };
}
```

### 3. Frontend State Management

#### ❌ Anti-Pattern: New Hooks for Similar Data
```typescript
// DON'T: Create overlapping hooks
export function useNoteStatus() { /* ... */ }
export function useNoteMetrics() { /* ... */ }
export function useNoteAnalytics() { /* ... */ }
```

#### ✅ Pattern: Enhance Existing Hooks
```typescript
// DO: Extend useNotes or create computed values
export function useNoteStats() {
  const { all: notes } = useNotes();
  
  return useMemo(() => ({
    totalNotes: notes?.length ?? 0,
    totalWords: notes?.reduce((sum, n) => sum + countWords(n.content), 0) ?? 0,
    tagsUsed: [...new Set(notes?.flatMap(n => n.tags) ?? [])],
    pinnedCount: notes?.filter(n => n.pinned).length ?? 0,
  }), [notes]);
}
```

## 🔥 Firebase-Specific Optimizations

### 1. Leverage Firestore Reactivity

```typescript
// ❌ DON'T: Manual state synchronization
const [notes, setNotes] = useState<Note[]>([]);
const [loading, setLoading] = useState(true);

useEffect(() => {
  const unsubscribe = onSnapshot(notesRef, (snapshot) => {
    setNotes(snapshot.docs.map(d => ({ id: d.id, ...d.data() })));
    setLoading(false);
  });
  return unsubscribe;
}, []);

// ✅ DO: Use existing hooks that handle reactivity
const { data: notes, isLoading } = useCollection<Note>(notesQuery);
// Automatically updates everywhere when Firestore data changes
```

### 2. Use useMemoFirebase for References

```typescript
// ❌ DON'T: Create refs without memoization (causes infinite loops)
const noteRef = doc(firestore, `users/${user.uid}/notes`, noteId);
const { data } = useDoc(noteRef); // Re-creates ref every render!

// ✅ DO: Always memoize Firestore references
const noteRef = useMemoFirebase(() => {
  if (!noteId || !user || !firestore) return null;
  return doc(firestore, `users/${user.uid}/notes`, noteId);
}, [noteId, user, firestore]);

const { data } = useDoc<Note>(noteRef);
```

### 3. Optimize Writes with Non-Blocking Updates

```typescript
// ❌ DON'T: Blocking writes that freeze UI
await setDoc(noteRef, data);
// User waits for network round-trip

// ✅ DO: Use non-blocking updates for optimistic UI
import { setDocumentNonBlocking } from "@/firebase/non-blocking-updates";

await setDocumentNonBlocking(noteRef, {
  ...data,
  updatedAt: serverTimestamp(),
}, { merge: true });
// UI updates immediately, syncs in background
```

### 4. Batch Related Operations

```typescript
// ❌ DON'T: Sequential writes
for (const note of notesToUpdate) {
  await updateDoc(doc(firestore, `users/${user.uid}/notes`, note.id), {
    archived: true,
  });
}

// ✅ DO: Use batched writes
import { writeBatch } from "firebase/firestore";

const batch = writeBatch(firestore);
notesToUpdate.forEach(note => {
  const ref = doc(firestore, `users/${user.uid}/notes`, note.id);
  batch.update(ref, { archived: true });
});
await batch.commit();
```

### 5. Efficient Querying

```typescript
// ❌ DON'T: Fetch all then filter in client
const { data: allNotes } = useCollection(allNotesQuery);
const pinnedNotes = allNotes?.filter(n => n.pinned); // Wastes bandwidth

// ✅ DO: Filter in query when possible
const pinnedQuery = useMemoFirebase(() => {
  if (!user || !firestore) return null;
  return query(
    collection(firestore, `users/${user.uid}/notes`),
    where("pinned", "==", true),
    orderBy("updatedAt", "desc")
  );
}, [user, firestore]);

// BUT: For small datasets (<100 docs), client filtering is fine
// and reduces index requirements
```

## 📊 Decision Framework

### When to Extend vs Create New

| Criteria | Extend Existing | Create New |
|----------|----------------|------------|
| Similar data structure exists | +3 points | -3 points |
| Can reuse existing Firestore path | +2 points | -2 points |
| Existing hooks return related data | +3 points | -3 points |
| UI components show similar info | +2 points | -2 points |
| Would require <50 lines to extend | +3 points | -3 points |
| Would introduce circular dependencies | -5 points | +5 points |
| Significantly different domain | -3 points | +3 points |

**Score > 5**: Extend existing code  
**Score < -5**: Create new implementation  
**Score -5 to 5**: Deeper analysis required  

## 🛠️ Implementation Strategies

### 1. The Three-Pass Approach

**Pass 1: Discovery (No Code)**
- Find all related existing code
- Document current patterns
- Identify extension points

**Pass 2: Design (Minimal Code)**
- Write interface changes only
- Update type definitions
- Plan data flow

**Pass 3: Implementation (Optimized Code)**
- Implement with maximum reuse
- Add only essential new logic
- Document why choices were made

### 2. Code Reuse Patterns

#### Pattern: Feature Flags in Existing Components
```typescript
// Instead of new component, extend existing
export function NoteCard({ note, showMetrics = false }: NoteCardProps) {
  return (
    <Card>
      {/* Existing UI */}
      <CardContent>
        <h3>{note.title}</h3>
        {/* ... existing content ... */}
      </CardContent>
      
      {/* Conditionally show new features */}
      {showMetrics && (
        <CardFooter>
          <span>{countWords(note.content)} words</span>
          <span>{note.tags.length} tags</span>
        </CardFooter>
      )}
    </Card>
  );
}
```

#### Pattern: Computed Properties from Existing Data
```typescript
// Instead of new Firestore fields, compute from existing
export function useNoteMetadata(note: Note) {
  return useMemo(() => ({
    wordCount: countWords(note.content),
    charCount: note.content.replace(/<[^>]*>/g, '').length,
    hasLinks: /<a\s/i.test(note.content),
    headingCount: (note.content.match(/<h[1-6]/gi) || []).length,
    isLong: countWords(note.content) > 500,
  }), [note.content]);
}
```

## 🚫 Anti-Patterns to Avoid

### 1. The "Just One More Collection" Trap
Each new Firestore collection adds:
- Schema complexity
- Security rules maintenance
- Query complexity
- Read/write cost

**Ask**: Can this data live in an existing document?

### 2. The "Similar But Different" Excuse
Before creating `useNoteAnalytics` when `useNotes` exists:
- Can useNotes return analytics fields?
- Can we add computed properties?
- Can a wrapper hook derive what we need?

### 3. The "UI Drives Database" Mistake
Never create Firestore structure to match UI components. Instead:
- Store data in its most logical form
- Use queries to transform for UI
- Let components compute display values

### 4. The "Index Everything" Fallacy
```typescript
// ❌ DON'T: Create composite indexes for every query variant
// Firestore has index limits and they cost money

// ✅ DO: Design queries around existing indexes
// For small collections, client-side filtering is often better
```

## 📝 Documentation Requirements

When extending existing code:

```typescript
// Document WHY you're extending
export function useNotes() {
  // ... existing implementation ...
  
  // OPTIMIZATION: Added viewCount tracking here instead of creating
  // separate analytics collection. Saves reads and maintains
  // data locality. See: docs/OPTIMIZATION.md
  
  return {
    // ... existing fields ...
    mostViewed: notes?.sort((a, b) => (b.viewCount ?? 0) - (a.viewCount ?? 0)),
  };
}
```

## 🎯 Success Metrics

Track optimization success:

| Metric | Target |
|--------|--------|
| Code reduction vs initial approach | >50% |
| Reused existing patterns | >70% |
| New files created | <3 per feature |
| New Firestore collections | 0 (extend existing) |
| New composite indexes | 0 (use existing) |
| Implementation time | <50% of estimate |

## ✅ Review Checklist

Before submitting optimized code:

- [ ] Extended existing documents instead of creating new collections
- [ ] Reused existing hooks with additions
- [ ] Leveraged existing components
- [ ] No duplicate state management logic
- [ ] Documented why extensions were chosen
- [ ] Maintained backward compatibility
- [ ] Added fields are optional in TypeScript
- [ ] No circular dependencies introduced
- [ ] Performance same or better
- [ ] Code reduction >50%
- [ ] Security rules updated if needed

## 📚 Notist-Specific Patterns

### Extending the Note Interface
```typescript
// src/lib/types.ts
export interface Note {
  id: string;
  title: string;
  content: string;
  tags: string[];
  createdAt: Timestamp;
  updatedAt: Timestamp;
  userId?: string;
  pinned?: boolean;
  
  // Add new optional fields here
  // viewCount?: number;
  // sharedWith?: string[];
  // archived?: boolean;
}
```

### Extending useFirebase Hook
```typescript
// If you need new Firebase functionality, extend the provider
// src/firebase/provider.tsx - add to context value

// Then access via existing hook:
const { user, firestore, auth, newFeature } = useFirebase();
```

### Extending NoteForm
```typescript
// Add new form fields to existing NoteForm.tsx
// Don't create NoteFormWithFeatureX.tsx

// Use feature flags:
<NoteForm noteId={id} showAdvancedOptions={true} />
```

---

*Remember: Every line of code is a liability. The best feature is one that requires no new code, just better use of what exists.*
