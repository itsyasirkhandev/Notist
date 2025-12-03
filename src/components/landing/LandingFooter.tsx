'use client';

import Link from 'next/link';
import { Github, Linkedin } from 'lucide-react';
import { Logo } from '@/components/Logo';

export function LandingFooter() {
  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="border-t bg-background/50 backdrop-blur-lg relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8">
          {/* Brand */}
          <div className="md:col-span-2 space-y-6">
            <div className="mb-4">
              <Logo href="/" />
            </div>
            <p className="text-base text-muted-foreground max-w-md leading-relaxed">
              The free note-taking app that helps you capture ideas, organize thoughts, 
              and get things done. Simple, powerful, and always available.
            </p>
            <div className="flex items-center gap-4 pt-2">
              <Link 
                href="https://github.com/itsyasirkhandev" 
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors hover:bg-primary/10 p-2 rounded-full"
                aria-label="GitHub"
              >
                <Github className="h-5 w-5" />
              </Link>
              <Link 
                href="https://linkedin.com/in/itsyasirkhandev" 
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors hover:bg-primary/10 p-2 rounded-full"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </Link>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-semibold mb-6 text-foreground">Product</h4>
            <ul className="space-y-4 text-sm text-muted-foreground">
              <li>
                <a 
                  href="#features" 
                  onClick={(e) => scrollToSection(e, '#features')}
                  className="hover:text-primary transition-colors cursor-pointer"
                >
                  Features
                </a>
              </li>
              <li>
                <a 
                  href="#how-it-works" 
                  onClick={(e) => scrollToSection(e, '#how-it-works')}
                  className="hover:text-primary transition-colors cursor-pointer"
                >
                  How It Works
                </a>
              </li>
              <li>
                <a 
                  href="#pricing" 
                  onClick={(e) => scrollToSection(e, '#pricing')}
                  className="hover:text-primary transition-colors cursor-pointer"
                >
                  Pricing
                </a>
              </li>
            </ul>
          </div>

          {/* Account */}
          <div>
            <h4 className="font-semibold mb-6 text-foreground">Account</h4>
            <ul className="space-y-4 text-sm text-muted-foreground">
              <li>
                <Link href="/auth" className="hover:text-primary transition-colors">
                  Sign In
                </Link>
              </li>
              <li>
                <Link href="/auth" className="hover:text-primary transition-colors">
                  Create Account
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="hover:text-primary transition-colors">
                  Dashboard
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-16 pt-8 border-t border-border/50 flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
          <p>
            © {new Date().getFullYear()} Notist. All rights reserved.
          </p>
          <p>
            Designed & Built by Yasir Khan
          </p>
        </div>
      </div>
    </footer>
  );
}
