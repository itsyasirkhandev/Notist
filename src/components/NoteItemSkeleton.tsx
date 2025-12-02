"use client";

import { Skeleton } from "@/components/ui/skeleton";

export function NoteItemSkeleton() {
  return (
    <li className="flex flex-col h-72 rounded-xl border bg-card overflow-hidden">
      <div className="p-4 pb-2 border-b border-border/50">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1 space-y-2">
            <Skeleton className="h-5 w-3/4" />
            <Skeleton className="h-3 w-20" />
          </div>
        </div>
      </div>
      <div className="flex-1 p-4 pt-3 space-y-2">
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-3 w-5/6" />
        <Skeleton className="h-3 w-4/5" />
        <Skeleton className="h-3 w-3/4" />
        <Skeleton className="h-3 w-2/3" />
      </div>
      <div className="px-4 pb-3 pt-1 flex gap-1.5">
        <Skeleton className="h-5 w-14 rounded-full" />
        <Skeleton className="h-5 w-12 rounded-full" />
      </div>
    </li>
  );
}

export function NoteListSkeleton({ count = 8 }: { count?: number }) {
  return (
    <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <NoteItemSkeleton key={i} />
      ))}
    </ul>
  );
}
