
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

const defaultLogoSvg = `<svg class="w-8 h-8 text-primary" fill="currentColor" viewBox="0 0 20 20"><path d="M11.918 2.032a.75.75 0 00-1.24-.72L3.383 9.471a.75.75 0 00.938 1.146L8.25 7.912v3.338a.75.75 0 01-1.5 0V9.53l-2.454 3.033a.75.75 0 00.95 1.135l3.805-4.711v3.293a.75.75 0 01-1.5 0v-1.75l-1.81.724a.75.75 0 00-.6 1.342l3.864 1.932a.75.75 0 00.994-1.09L8.75 12.088V8.617l4.43 5.488a.75.75 0 00.949-1.135L9.75 6.94v-3.29l1.838 2.276a.75.75 0 001.24-.72L11.918 2.032z"></path></svg>`;

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
             <span className="text-primary text-2xl font-bold">%</span>
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
                        <span className="text-primary text-2xl font-bold">%</span>
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
