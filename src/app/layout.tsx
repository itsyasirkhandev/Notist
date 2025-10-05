import type {Metadata} from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster"
import { ThemeProvider } from '@/components/theme-provider';
import { FirebaseClientProvider } from '@/firebase';

export const metadata: Metadata = {
  title: 'Notist: Your Personal Task Manager & To-Do List',
  description: 'Notist is a simple, intuitive, and powerful to-do list and task manager app. Organize your work and life, set priorities, and achieve your goals with ease. Get started for free!',
  keywords: 'Notist, to-do list, task manager, productivity app, notes, tasks, organization, getting things done',
  authors: [{ name: 'Yasir Khan', url: 'https://notesbyyasir.netlify.app/' }],
  robots: 'index, follow',
  metadataBase: new URL('https://notesbyyasir.netlify.app/'),
  openGraph: {
    title: 'Notist: Your Personal Task Manager & To-Do List',
    description: 'A simple and intuitive to-do list app to help you manage tasks, organize your life, and boost productivity.',
    url: 'https://notesbyyasir.netlify.app/',
    siteName: 'Notist',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Notist: Your Personal Task Manager & To-Do List',
    description: 'A simple and intuitive to-do list app to help you manage tasks, organize your life, and boost productivity.',
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
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-sans antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <FirebaseClientProvider>
            {children}
          </FirebaseClientProvider>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
