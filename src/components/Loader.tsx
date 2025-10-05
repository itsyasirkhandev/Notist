
import { cn } from "@/lib/utils";

interface LoaderProps {
  className?: string;
}

export function Loader({ className }: LoaderProps) {
  return (
    <div className={cn("flex items-center justify-center", className)}>
      <div className="h-12 w-12 animate-spin rounded-full border-2 border-primary border-t-transparent" />
    </div>
  );
}
