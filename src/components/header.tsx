
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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [logoSvg, setLogoSvg] = useState(defaultLogoSvg);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);

    async function fetchConfig() {
      const config = await getWebContent<SiteConfigContent>('siteConfig');
      if (config?.logoSvg) {
        setLogoSvg(config.logoSvg);
      }
    }
    fetchConfig();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '#services', label: 'Servicios' },
    { href: '#timeline', label: 'Trayectoria' },
    { href: '#philosophy', label: 'Filosofía' },
    { href: '#clients', label: 'Clientes' },
  ];

  return (
    <header className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
      scrolled || mobileMenuOpen ? "bg-background/80 backdrop-blur-sm border-b border-border/20" : "bg-transparent"
    )}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link href="/" className="flex items-center gap-2 text-foreground">
            <span className="text-primary text-2xl font-bold">%</span>
            <span className="text-xl font-headline font-bold">Evol-vance</span>
          </Link>
          <nav className="hidden md:flex items-center space-x-6">
            {navLinks.map(link => (
              <a key={link.href} href={link.href} className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">{link.label}</a>
            ))}
          </nav>
          <div className="hidden md:flex items-center gap-2">
            <Button asChild variant="secondary">
              <Link href="/login">Acceder</Link>
            </Button>
            <ContactModal>
              <Button variant="default">
                Agendar Asesoría
              </Button>
            </ContactModal>
          </div>
          <div className="md:hidden">
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="bg-background/90 backdrop-blur-sm p-0">
                 <SheetHeader className="p-4 border-b">
                    <SheetTitle className="sr-only">Menú de Navegación</SheetTitle>
                    <div className="flex justify-between items-center">
                        <Link href="/" className="flex items-center gap-2 text-foreground" onClick={() => setMobileMenuOpen(false)}>
                            <span className="text-primary text-2xl font-bold">%</span>
                            <span className="text-xl font-headline font-bold">Evol-vance</span>
                        </Link>
                    </div>
                </SheetHeader>
                <div className="flex flex-col h-[calc(100%-4rem)]">
                  <nav className="flex-grow flex flex-col items-center justify-center gap-y-6 px-4">
                    {navLinks.map(link => (
                      <a key={link.href} href={link.href} onClick={() => setMobileMenuOpen(false)} className="text-xl font-medium text-foreground hover:text-primary transition-colors">{link.label}</a>
                    ))}
                     <Button asChild variant="secondary" className="w-full">
                        <Link href="/login">Acceder</Link>
                      </Button>
                  </nav>
                  <div className="p-4 border-t">
                    <ContactModal>
                       <Button variant="default" className="w-full">
                         Agendar Asesoría
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
