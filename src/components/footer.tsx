
"use client";

import Link from 'next/link';
import { getWebContent, type SiteConfigContent } from '@/app/actions/web-content-actions';
import { useEffect, useState } from 'react';

// Helper component to safely render SVG from a string
function SvgRenderer({ svgString, className }: { svgString: string, className?: string }) {
    if (!svgString || typeof svgString !== 'string') return null;
    const modifiedSvgString = svgString.replace('<svg', `<svg class="${className || ''}"`);
    return <div dangerouslySetInnerHTML={{ __html: modifiedSvgString }} />;
}

const defaultLogoSvg = `<svg class="w-8 h-8 text-primary" fill="currentColor" viewBox="0 0 20 20"><path d="M11.918 2.032a.75.75 0 00-1.24-.72L3.383 9.471a.75.75 0 00.938 1.146L8.25 7.912v3.338a.75.75 0 01-1.5 0V9.53l-2.454 3.033a.75.75 0 00.95 1.135l3.805-4.711v3.293a.75.75 0 01-1.5 0v-1.75l-1.81.724a.75.75 0 00-.6 1.342l3.864 1.932a.75.75 0 00.994-1.09L8.75 12.088V8.617l4.43 5.488a.75.75 0 00.949-1.135L9.75 6.94v-3.29l1.838 2.276a.75.75 0 001.24-.72L11.918 2.032z"></path></svg>`;
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

  const logoSvg = config?.logoSvg || defaultLogoSvg;
  const socialLinks = config?.socialLinks || [{ url: "#", iconSvg: defaultSocialIconSvg }];

  const navLinks = [
    { href: '/#services', label: 'Servicios' },
    { href: '/#timeline', label: 'Trayectoria' },
    { href: '/#philosophy', label: 'Filosofía' },
  ];

  return (
    <footer className="bg-card border-t border-border/20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          
          <div className="md:col-span-4 lg:col-span-5 flex flex-col items-center md:items-start text-center md:text-left">
            <Link href="/" className="flex items-center gap-2 mb-4 text-foreground">
              <svg
                width="32"
                height="32"
                viewBox="0 0 32 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-8 h-8 text-primary"
              >
                <path
                  d="M19.781 2.00021C19.234 1.98621 18.795 2.30621 18.623 2.79321L11.289 23.0182C11.109 23.5352 11.396 24.0882 11.913 24.2682C12.43 24.4472 12.984 24.1602 13.163 23.6442L20.497 3.41921C20.677 2.90221 20.39 2.34921 19.873 2.16921C19.842 2.15821 19.812 2.15121 19.781 2.14421V2.00021Z"
                  fill="currentColor"
                />
                <path
                  d="M26.4819 12.5295C26.4819 11.2335 25.9619 10.0155 25.0419 9.0965C24.1219 8.1765 22.9039 7.6565 21.6079 7.6565C20.3119 7.6565 19.0939 8.1765 18.1739 9.0965C17.2539 10.0155 16.7339 11.2335 16.7339 12.5295C16.7339 13.6115 17.0869 14.6345 17.7129 15.4245L19.2229 17.2915C19.5399 17.6745 20.0439 17.9045 20.5759 17.9045H20.6079C21.0119 17.9045 21.3949 17.7695 21.6989 17.5255C22.4889 16.9005 23.4089 15.6525 24.1309 14.1845C24.2259 13.9995 24.2729 13.7855 24.2729 13.5655C24.2729 12.9865 24.0389 12.4465 23.6439 12.0515C23.2489 11.6565 22.7089 11.4225 22.1299 11.4225C21.5509 11.4225 21.0109 11.6565 20.6159 12.0515C20.2209 12.4465 19.9869 12.9865 19.9869 13.5655C19.9869 13.6215 19.9919 13.6765 19.9989 13.7325C20.0009 13.7545 20.0079 13.7745 20.0119 13.7955C20.0129 13.8015 20.0149 13.8065 20.0159 13.8125C20.0159 13.8145 20.0159 13.8165 20.0169 13.8185C20.4569 14.6195 20.9769 15.2615 21.4329 15.6325C21.5549 15.7275 21.7249 15.6705 21.8199 15.5485L25.0499 11.1835C25.4019 10.7065 25.2979 10.0215 24.8209 9.6705C24.3439 9.3185 23.6599 9.4235 23.3079 9.8995L20.8939 13.1115C20.7679 13.2755 20.5409 13.3325 20.3549 13.2435C20.1689 13.1555 20.0719 12.9465 20.1229 12.7505L21.0369 9.5445C21.2229 8.8955 21.8489 8.4485 22.5279 8.5635C23.2059 8.6785 23.7299 9.2565 23.7299 9.9485V10.0055C25.3219 10.3705 26.4819 11.3535 26.4819 12.5295Z"
                  fill="currentColor"
                />
              </svg>
              <span className="text-xl font-headline font-bold">Evol-vance</span>
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
