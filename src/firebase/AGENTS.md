# AGENTS.md - Firebase Integration

## Package Identity
- **Purpose:** Firebase Firestore database and Authentication integration
- **Tech:** Firebase SDK, React Context, Custom hooks for data fetching

## Directory Structure
```
firebase/
├── index.ts                  # Main exports, Firebase initialization
├── config.ts                 # Firebase configuration (from env)
├── provider.tsx              # FirebaseProvider context
├── client-provider.tsx       # Client-side provider wrapper
├── firestore/
│   ├── use-collection.tsx    # useCollection hook
│   └── use-doc.tsx           # useDoc hook
├── non-blocking-updates.tsx  # Optimistic updates
├── non-blocking-login.tsx    # Non-blocking auth
├── errors.ts                 # Firebase error handling
└── error-emitter.ts          # Error event system
```

## Core Concepts

### Firebase Provider
All Firebase functionality is accessed through context:
```tsx
import { useFirebase } from "@/firebase";

function MyComponent() {
  const { user, firestore, auth } = useFirebase();
  // user: current authenticated user or null
  // firestore: Firestore instance
  // auth: Firebase Auth instance
}
```

### Data Fetching Hooks

#### useDoc - Single Document
```tsx
import { useDoc, useMemoFirebase, useFirebase } from "@/firebase";
import { doc } from "firebase/firestore";

function NoteView({ noteId }: { noteId: string }) {
  const { firestore, user } = useFirebase();
  
  // Memoize the document reference
  const noteRef = useMemoFirebase(() => {
    if (!noteId || !user || !firestore) return null;
    return doc(firestore, `users/${user.uid}/notes`, noteId);
  }, [noteId, user, firestore]);

  const { data: note, isLoading, error } = useDoc<Note>(noteRef);
  
  if (isLoading) return <Loader />;
  if (!note) return <NotFound />;
  return <NoteDisplay note={note} />;
}
```

#### useCollection - Multiple Documents
```tsx
import { useCollection, useMemoFirebase, useFirebase } from "@/firebase";
import { collection, query, orderBy } from "firebase/firestore";

function NotesList() {
  const { firestore, user } = useFirebase();
  
  const notesQuery = useMemoFirebase(() => {
    if (!user || !firestore) return null;
    return query(
      collection(firestore, `users/${user.uid}/notes`),
      orderBy("updatedAt", "desc")
    );
  }, [user, firestore]);

  const { data: notes, isLoading } = useCollection<Note>(notesQuery);
  
  return notes?.map(note => <NoteCard key={note.id} note={note} />);
}
```

## Patterns & Conventions

### DO's and DON'Ts

#### Data Access
- ✅ DO: Use `useDoc` and `useCollection` hooks for reading data
- ✅ DO: Use `useMemoFirebase` to memoize document/query references
- ✅ DO: Check for `user` and `firestore` before creating refs
- ❌ DON'T: Call Firestore directly without hooks
- ❌ DON'T: Create refs without memoization (causes infinite loops)

#### Writing Data
- ✅ DO: Use `setDocumentNonBlocking` for optimistic updates
- ✅ DO: Use `serverTimestamp()` for createdAt/updatedAt
- ❌ DON'T: Use blocking `setDoc` for user-facing operations

#### Authentication
- ✅ DO: Check `user` before accessing user-specific data
- ✅ DO: Use `users/{userId}/notes` path pattern
- ❌ DON'T: Store sensitive data in documents without rules

### Writing Data Pattern
```tsx
import { doc, serverTimestamp, collection, addDoc } from "firebase/firestore";
import { setDocumentNonBlocking } from "@/firebase/non-blocking-updates";

// Update existing document (non-blocking/optimistic)
const docRef = doc(firestore, `users/${user.uid}/notes`, noteId);
await setDocumentNonBlocking(docRef, {
  title,
  content,
  updatedAt: serverTimestamp(),
}, { merge: true });

// Create new document
const collectionRef = collection(firestore, `users/${user.uid}/notes`);
const newDocRef = await addDoc(collectionRef, {
  title,
  content,
  tags: [],
  createdAt: serverTimestamp(),
  updatedAt: serverTimestamp(),
  userId: user.uid,
  pinned: false,
});
```

### Delete Pattern
```tsx
import { doc, deleteDoc } from "firebase/firestore";

const docRef = doc(firestore, `users/${user.uid}/notes`, noteId);
await deleteDoc(docRef);
```

## Data Schema

### Note Document
Path: `users/{userId}/notes/{noteId}`
```typescript
interface Note {
  id: string;           // Document ID
  title: string;        // Note title
  content: string;      // HTML content (from TipTap)
  tags: string[];       // Array of tag strings
  createdAt: Timestamp; // Firebase Timestamp
  updatedAt: Timestamp; // Firebase Timestamp
  userId?: string;      // Owner user ID
  pinned?: boolean;     // Pinned status
}
```

## Touch Points

| Purpose | File |
|---------|------|
| Firebase init | `index.ts` |
| Config (env vars) | `config.ts` |
| Context provider | `provider.tsx` |
| Read single doc | `firestore/use-doc.tsx` |
| Read collection | `firestore/use-collection.tsx` |
| Optimistic writes | `non-blocking-updates.tsx` |
| Error handling | `errors.ts`, `error-emitter.ts` |

## JIT Index Hints
```powershell
# Find all Firebase hook usage
Select-String -Path "src\**\*.tsx" -Pattern "useFirebase|useDoc|useCollection"

# Find Firestore writes
Select-String -Path "src\**\*.tsx" -Pattern "setDoc|addDoc|deleteDoc|updateDoc"

# Find document references
Select-String -Path "src\**\*.tsx" -Pattern "doc\(firestore"

# Find collection queries
Select-String -Path "src\**\*.tsx" -Pattern "collection\(firestore|query\("
```

## Common Gotchas

1. **Memoize refs:** Always wrap `doc()` or `query()` in `useMemoFirebase()` to prevent infinite re-renders

2. **Null checks:** Firebase hooks return null during loading; always check:
   ```tsx
   if (!user || !firestore) return null;
   ```

3. **Offline persistence:** Firestore has offline cache enabled. Writes work offline and sync when online.

4. **Timestamps:** Use `serverTimestamp()` for dates, not `new Date()`. Import from `firebase/firestore`.

5. **Security rules:** Data access is controlled by `firestore.rules` at project root. Users can only access `users/{userId}/**` where `userId` matches their auth.

## Environment Variables
Required in `.env`:
```
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=
```
