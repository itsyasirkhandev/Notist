import type {Metadata} from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster"
import { ClientProviders } from '@/components/ClientProviders';
import OfflineWarning from '@/components/OfflineWarning';

const appUrl = 'https://notesbyyasir.netlify.app/';

export const metadata: Metadata = {
  title: 'Notist [2025]: The #1 Task Manager & To-Do List App',
  description: 'Boost your productivity with Notist. A simple, powerful, and intuitive to-do list and task manager app to help you organize your work and life. Get started for free!',
  keywords: 'Notist, to-do list, task manager, productivity app, notes, tasks, organization, getting things done',
  authors: [{ name: 'Yasir Khan', url: 'https://notesbyyasir.netlify.app/' }],
  robots: 'index, follow',
  metadataBase: new URL(appUrl),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Notist [2025]: The #1 Task Manager & To-Do List App',
    description: 'A simple and intuitive to-do list app to help you manage tasks, organize your life, and boost productivity.',
    url: appUrl,
    siteName: 'Notist',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Notist [2025]: The #1 Task Manager & To-Do List App',
    description: 'A simple and intuitive to-do list app to help you manage tasks, organize your life, and boost productivity.',
    creator: '@yourtwitterhandle', // Replace with actual creator handle
    site: '@yourtwitterhandle', // Replace with actual site handle
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
