
"use client";

import Link from 'next/link';
import Image from 'next/image';
import { getWebContent, type SiteConfigContent } from '@/app/actions/web-content-actions';
import { useEffect, useState } from 'react';

// Helper component to safely render SVG from a string
function SvgRenderer({ svgString, className }: { svgString: string, className?: string }) {
    if (!svgString || typeof svgString !== 'string') return null;
    const modifiedSvgString = svgString.replace('<svg', `<svg class="${className || ''}"`);
    return <div dangerouslySetInnerHTML={{ __html: modifiedSvgString }} />;
}

const defaultSocialIconSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-twitter"><path d="M22 4s-.7 2.1-2 3.4c1.6 1.4 3.3 4.9 3 7.1 0 .8-.4 1.5-.9 2.2-1.1 1.4-2.6 2.3-4.2 3.1-3.1 1.5-5.3 2.5-8.5 2.5-2.2 0-3.6-.4-5.2-1.2-1.9-.9-3.2-2.3-4.3-4.1-1.1-1.8-1.2-3.3-1-4.6 0-1.1.4-2.1 1.1-3.2 1.3-2 2.8-3.4 4.6-4.8 2.5-1.9 4.2-3.3 7.1-5.3 1.1-.8 2.3-1.5 3.6-2.2.5-.3 1.1-.5 1.7-.5.9 0 1.5.5 1.5 1.5Z"/></svg>`;


export default function Footer() {
  const [year, setYear] = useState(new Date().getFullYear());
  const [config, setConfig] = useState<SiteConfigContent | null>(null);

  useEffect(() => {
    setYear(new Date().getFullYear());
    async function fetchConfig() {
      const loadedConfig = await getWebContent<SiteConfigContent>('siteConfig');
      setConfig(loadedConfig);
    }
    fetchConfig();
  }, []);

  const socialLinks = config?.socialLinks || [{ url: "#", iconSvg: defaultSocialIconSvg }];

  const navLinks = [
    { href: '/services', label: 'Servicios' },
    { href: '/#timeline', label: 'Trayectoria' },
    { href: '/#philosophy', label: 'Filosofía' },
  ];

  return (
    <footer className="bg-card border-t border-border/20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          
          <div className="md:col-span-4 lg:col-span-5 flex flex-col items-center md:items-start text-center md:text-left">
            <Link href="/" className="flex items-center gap-2 mb-4 text-foreground">
              <Image src="https://iili.io/K78fXyb.png" alt="Evol-vance Logo" width={96} height={96} />
              
            </Link>
            <p className="text-muted-foreground text-sm max-w-xs">
              Fusionamos IA, Experiencias Inmersivas y Marketing Estratégico para llevar tu empresa a la siguiente dimensión.
            </p>
          </div>

          <div className="md:col-span-8 lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8">
            <div className="text-center sm:text-left">
              <h3 className="font-headline font-semibold text-foreground mb-4">Navegación</h3>
              <ul className="space-y-2">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <a href={link.href} className="text-muted-foreground hover:text-primary transition-colors text-sm">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="text-center sm:text-left">
              <h3 className="font-headline font-semibold text-foreground mb-4">Legal</h3>
              <ul className="space-y-2">
                <li><Link href="/terms" className="text-muted-foreground hover:text-primary transition-colors text-sm">Términos y Condiciones</Link></li>
                <li><Link href="/privacy" className="text-muted-foreground hover:text-primary transition-colors text-sm">Política de Privacidad</Link></li>
              </ul>
            </div>

            <div className="col-span-2 sm:col-span-1 text-center sm:text-left">
              <h3 className="font-headline font-semibold text-foreground mb-4">Síguenos</h3>
              <div className="flex justify-center sm:justify-start space-x-4">
                {socialLinks.map((link, index) => (
                  <Link key={index} href={link.url} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary">
                      <SvgRenderer svgString={link.iconSvg} className="w-6 h-6" />
                      <span className="sr-only">Social media link {index+1}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-border/20 text-center text-sm text-muted-foreground">
          © {year} Evol-vance. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  );
}
