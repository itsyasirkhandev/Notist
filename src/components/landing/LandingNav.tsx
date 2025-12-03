'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/ThemeToggle';
import { Menu, X, LayoutDashboard } from 'lucide-react';
import { useState } from 'react';
import { useUser } from '@/firebase';
import { Logo } from '@/components/Logo';

export function LandingNav() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user } = useUser();

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-white/5 bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Logo href="/" />

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <a 
              href="#features" 
              onClick={(e) => scrollToSection(e, '#features')}
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors cursor-pointer"
            >
              Features
            </a>
            <a 
              href="#how-it-works" 
              onClick={(e) => scrollToSection(e, '#how-it-works')}
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors cursor-pointer"
            >
              How It Works
            </a>
            <a 
              href="#pricing" 
              onClick={(e) => scrollToSection(e, '#pricing')}
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors cursor-pointer"
            >
              Pricing
            </a>
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-4">
            <ThemeToggle />
            {user ? (
              <Button asChild className="rounded-full px-6 shadow-sm hover:shadow-md transition-all">
                <Link href="/dashboard">
                  <LayoutDashboard className="h-4 w-4 mr-2" />
                  Go to Dashboard
                </Link>
              </Button>
            ) : (
              <>
                <Button variant="ghost" asChild className="rounded-full px-4 text-muted-foreground hover:text-foreground">
                  <Link href="/auth">Log In</Link>
                </Button>
                <Button asChild className="rounded-full px-6 shadow-sm hover:shadow-md transition-all hover:-translate-y-0.5">
                  <Link href="/auth">Get Started</Link>
                </Button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            <ThemeToggle />
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="rounded-full"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-6 border-t bg-background/95 backdrop-blur-md animate-in slide-in-from-top-2">
            <div className="flex flex-col gap-4 px-2">
              <a 
                href="#features" 
                onClick={(e) => scrollToSection(e, '#features')}
                className="flex items-center px-4 py-2 text-sm font-medium text-muted-foreground hover:text-primary hover:bg-muted/50 rounded-md transition-colors"
              >
                Features
              </a>
              <a 
                href="#how-it-works" 
                onClick={(e) => scrollToSection(e, '#how-it-works')}
                className="flex items-center px-4 py-2 text-sm font-medium text-muted-foreground hover:text-primary hover:bg-muted/50 rounded-md transition-colors"
              >
                How It Works
              </a>
              <a 
                href="#pricing" 
                onClick={(e) => scrollToSection(e, '#pricing')}
                className="flex items-center px-4 py-2 text-sm font-medium text-muted-foreground hover:text-primary hover:bg-muted/50 rounded-md transition-colors"
              >
                Pricing
              </a>
              <div className="flex flex-col gap-3 pt-4 mt-2 border-t px-4">
                {user ? (
                  <Button asChild className="w-full rounded-full">
                    <Link href="/dashboard">
                      <LayoutDashboard className="h-4 w-4 mr-2" />
                      Go to Dashboard
                    </Link>
                  </Button>
                ) : (
                  <>
                    <Button variant="outline" asChild className="w-full rounded-full justify-center">
                      <Link href="/auth">Log In</Link>
                    </Button>
                    <Button asChild className="w-full rounded-full justify-center shadow-md">
                      <Link href="/auth">Get Started Free</Link>
                    </Button>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
