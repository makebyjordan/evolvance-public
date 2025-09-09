
"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ContactModal } from '@/components/contact-modal';
import { cn } from '@/lib/utils';
import { Menu } from 'lucide-react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import type { SiteConfigContent } from '@/app/actions/web-content-actions';
import { getWebContent } from '@/app/actions/web-content-actions';


function SvgRenderer({ svgString, className }: { svgString: string, className?: string }) {
    if (!svgString || typeof svgString !== 'string') return null;
    const modifiedSvgString = svgString.replace('<svg', `<svg class="${className || ''}"`);
    return <div dangerouslySetInnerHTML={{ __html: modifiedSvgString }} />;
}

const defaultLogoSvg = `<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-8 h-8 text-primary"><path d="M6.66669 25.3333V4H10.6667L20.1334 16.5333V4H24.0001V25.3333H20.0001L10.5334 12.8V25.3333H6.66669Z" fill="currentColor"/></svg>`;

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [config, setConfig] = useState<SiteConfigContent | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    async function fetchConfig() {
      const loadedConfig = await getWebContent<SiteConfigContent>('siteConfig');
      setConfig(loadedConfig);
    }
    fetchConfig();
  }, []);

  const logoSvg = config?.logoSvg || defaultLogoSvg;

  const navLinks = [
    { href: '/#services', label: 'Servicios' },
    { href: '/#timeline', label: 'Trayectoria' },
    { href: '/#philosophy', label: 'Filosofía' },
    { href: '/#faq', label: 'FAQ' },
    { href: '/dashboard', label: 'Intranet' },
  ];

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled ? "bg-card/80 backdrop-blur-sm shadow-md" : "bg-transparent"
      )}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link href="/" className="flex items-center gap-2 text-foreground">
             <svg
                width="32"
                height="32"
                viewBox="0 0 32 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-8 h-8 text-primary"
              >
                <path
                  d="M6.66669 25.3333V4H10.6667L20.1334 16.5333V4H24.0001V25.3333H20.0001L10.5334 12.8V25.3333H6.66669Z"
                  fill="currentColor"
                />
              </svg>
            <span className="text-xl font-headline font-bold">Evol-vance</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>
          
          <div className="hidden md:flex items-center gap-2">
             <ContactModal>
                <Button>
                    Agendar Sesión
                </Button>
            </ContactModal>
          </div>
          
          {/* Mobile Navigation */}
          <div className="md:hidden">
             <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu />
                  <span className="sr-only">Abrir menú</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left">
                <SheetHeader>
                   <SheetTitle>
                     <Link href="/" className="flex items-center gap-2 text-foreground" onClick={() => setIsMobileMenuOpen(false)}>
                        <svg
                            width="32"
                            height="32"
                            viewBox="0 0 32 32"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-8 h-8 text-primary"
                        >
                            <path
                            d="M6.66669 25.3333V4H10.6667L20.1334 16.5333V4H24.0001V25.3333H20.0001L10.5334 12.8V25.3333H6.66669Z"
                            fill="currentColor"
                            />
                        </svg>
                        <span className="text-xl font-headline font-bold">Evol-vance</span>
                    </Link>
                  </SheetTitle>
                </SheetHeader>
                <div className="mt-8 flex flex-col gap-4">
                  {navLinks.map((link) => (
                    <Link
                      key={link.label}
                      href={link.href}
                      className="text-lg font-medium text-muted-foreground hover:text-primary transition-colors"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {link.label}
                    </Link>
                  ))}
                   <div className="pt-4">
                     <ContactModal>
                        <Button className="w-full">
                            Agendar Sesión
                        </Button>
                    </ContactModal>
                   </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>

        </div>
      </div>
    </header>
  );
}
