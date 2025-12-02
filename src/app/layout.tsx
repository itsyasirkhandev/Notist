import type {Metadata} from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster"
import { ClientProviders } from '@/components/ClientProviders';
import OfflineWarning from '@/components/OfflineWarning';

const appUrl = 'https://notesbyyasir.netlify.app/';

export const metadata: Metadata = {
  title: 'Notist - Capture Ideas, Organize Thoughts, Get Things Done',
  description: 'Free note-taking app with rich text editing, real-time sync, and offline support. Capture ideas, organize thoughts, and stay productive. Start for free today!',
  keywords: 'Notist, note-taking app, notes, rich text editor, productivity, organization, sync, offline, free notes app',
  authors: [{ name: 'Yasir Khan', url: 'https://notesbyyasir.netlify.app/' }],
  robots: 'index, follow',
  metadataBase: new URL(appUrl),
  manifest: '/manifest.json',
  alternates: {
    canonical: '/',
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Notist',
  },
  openGraph: {
    title: 'Notist - Capture Ideas, Organize Thoughts, Get Things Done',
    description: 'Free note-taking app with rich text editing, real-time sync, and offline support. Start organizing your thoughts today.',
    url: appUrl,
    siteName: 'Notist',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Notist - Capture Ideas, Organize Thoughts',
    description: 'Free note-taking app with rich text editing, real-time sync, and offline support. Start organizing your thoughts today.',
    creator: '@itsyasirkhandev',
    site: '@itsyasirkhandev',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
        <link rel="apple-touch-icon" href="/icon.svg" />
        <meta name="theme-color" content="#6366f1" />
      </head>
      <body className="font-sans antialiased">
          <ClientProviders>
            {children}
          </ClientProviders>
          <Toaster />
          <OfflineWarning />
      </body>
    </html>
  );
}
