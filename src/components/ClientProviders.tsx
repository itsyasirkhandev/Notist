"use client";

import { ReactNode } from "react";
import { FirebaseClientProvider } from "@/firebase";
import { ErrorBoundary } from "./ErrorBoundary";
import { ThemeProvider } from "./ThemeProvider";

interface ClientProvidersProps {
  children: ReactNode;
}

export function ClientProviders({ children }: ClientProvidersProps) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <ErrorBoundary>
        <FirebaseClientProvider>
          {children}
        </FirebaseClientProvider>
      </ErrorBoundary>
    </ThemeProvider>
  );
}
