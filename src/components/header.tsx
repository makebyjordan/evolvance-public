
"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { ContactModal } from '@/components/contact-modal';
import { cn } from '@/lib/utils';
import { Menu, ChevronDown } from 'lucide-react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import type { SiteConfigContent } from '@/app/actions/web-content-actions';
import { getWebContent } from '@/app/actions/web-content-actions';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"


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

  const navLinks = [
    { 
      label: 'Servicios',
      isDropdown: true,
      items: [
        { href: '/services', label: 'Todos los Servicios' },
        { href: '/#marketing-ai', label: 'IA & Ads' },
      ]
    },
     { 
      label: 'Trayectoria',
      isDropdown: true,
      items: [
        { href: '/#timeline', label: 'Nuestra Trayectoria' },
        { href: '/#philosophy', label: 'Filosofía' },
        { href: '/#team', label: 'Equipo' },
      ]
    },
    { href: '/#faq', label: 'FAQ' },
    {
      label: 'Intranet',
      isDropdown: true,
      items: [
        { href: '/dashboard', label: 'Dashboard' },
      ]
    }
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
             <Image src="https://iili.io/K78fXyb.png" alt="Evol-vance Logo" width={288} height={288} className="hidden md:block" />
             <Image src="https://iili.io/K78cJ2a.png" alt="Evol-vance Logo" width={96} height={96} className="block md:hidden" />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              link.isDropdown ? (
                <DropdownMenu key={link.label}>
                  <DropdownMenuTrigger className="flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-primary transition-colors outline-none">
                    {link.label} <ChevronDown className="h-4 w-4" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    {link.items?.map(item => (
                       <DropdownMenuItem key={item.label} asChild>
                         <Link href={item.href}>{item.label}</Link>
                       </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Link
                  key={link.label}
                  href={link.href!}
                  className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
                >
                  {link.label}
                </Link>
              )
            ))}
          </nav>
          
          <div className="hidden md:flex items-center gap-2">
             <Button variant="outline" asChild>
                <Link href="/client-portal">Portal Clientes</Link>
             </Button>
             <ContactModal>
                <Button>
                    Agendar Reunión
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
                        <Image src="https://iili.io/K78fXyb.png" alt="Evol-vance Logo" width={288} height={288} />
                    </Link>
                  </SheetTitle>
                </SheetHeader>
                <div className="mt-8 flex flex-col gap-1">
                   <Accordion type="multiple" className="w-full">
                    {navLinks.map((link) => (
                        link.isDropdown ? (
                            <AccordionItem value={link.label} key={link.label} className="border-none">
                                <AccordionTrigger className="py-3 text-lg font-medium text-muted-foreground hover:text-primary hover:no-underline">
                                    {link.label}
                                </AccordionTrigger>
                                <AccordionContent className="pl-4">
                                    <div className="flex flex-col gap-3">
                                        {link.items?.map(item => (
                                            <Link
                                                key={item.label}
                                                href={item.href}
                                                className="text-lg font-medium text-muted-foreground/80 hover:text-primary transition-colors"
                                                onClick={() => setIsMobileMenuOpen(false)}
                                                >
                                                {item.label}
                                            </Link>
                                        ))}
                                    </div>
                                </AccordionContent>
                            </AccordionItem>
                        ) : (
                             <Link
                                key={link.label}
                                href={link.href!}
                                className="block py-3 text-lg font-medium text-muted-foreground hover:text-primary transition-colors"
                                onClick={() => setIsMobileMenuOpen(false)}
                                >
                                {link.label}
                            </Link>
                        )
                    ))}
                  </Accordion>

                   <div className="pt-8 space-y-4">
                     <Button variant="outline" className="w-full" asChild>
                         <Link href="/client-portal" onClick={() => setIsMobileMenuOpen(false)}>Portal Clientes</Link>
                     </Button>
                     <ContactModal>
                        <Button className="w-full" variant="secondary">
                            Agendar Reunión
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
