"use client";

import Link from "next/link";
import { NotebookPen } from "lucide-react";
import { cn } from "@/lib/utils";

interface LogoProps {
  href?: string;
  showText?: boolean;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const sizeClasses = {
  sm: {
    container: "h-6 w-6 rounded-md",
    icon: "h-3 w-3",
    text: "text-lg",
  },
  md: {
    container: "h-8 w-8 rounded-lg",
    icon: "h-4 w-4",
    text: "text-xl",
  },
  lg: {
    container: "h-10 w-10 rounded-lg",
    icon: "h-5 w-5",
    text: "text-2xl",
  },
};

export function Logo({ href, showText = true, size = "md", className }: LogoProps) {
  const sizes = sizeClasses[size];

  const content = (
    <div className={cn("flex items-center gap-2", className)}>
      <div className={cn(
        "flex items-center justify-center bg-primary text-primary-foreground",
        sizes.container
      )}>
        <NotebookPen className={sizes.icon} />
      </div>
      {showText && (
        <span className={cn("font-bold tracking-tight", sizes.text)}>
          Notist
        </span>
      )}
    </div>
  );

  if (href) {
    return (
      <Link href={href} className="hover:opacity-80 transition-opacity">
        {content}
      </Link>
    );
  }

  return content;
}
