"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Github, Twitter, Linkedin } from 'lucide-react';

const Logo = () => (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M20 0L25.3301 14.6699L40 20L25.3301 25.3301L20 40L14.6699 25.3301L0 20L14.6699 14.6699L20 0Z" fill="url(#paint0_linear_footer)"/>
    <defs>
      <linearGradient id="paint0_linear_footer" x1="20" y1="0" x2="20" y2="40" gradientUnits="userSpaceOnUse">
        <stop stopColor="hsl(var(--primary))"/>
        <stop offset="1" stopColor="hsl(var(--accent))"/>
      </linearGradient>
    </defs>
  </svg>
);


export default function Footer() {
  const [year, setYear] = useState(new Date().getFullYear());

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  const navLinks = [
    { href: '#services', label: 'Servicios' },
    { href: '#timeline', label: 'Trayectoria' },
    { href: '#philosophy', label: 'Filosofía' },
  ];

  return (
    <footer className="bg-card/50 backdrop-blur-sm border-t border-border/20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          
          <div className="md:col-span-4 lg:col-span-5 flex flex-col items-center md:items-start text-center md:text-left">
            <Link href="/" className="flex items-center gap-3 mb-4">
              <Logo />
              <span className="text-2xl font-headline font-bold text-foreground">Evol-vance</span>
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
                <li><Link href="#" className="text-muted-foreground hover:text-primary transition-colors text-sm">Términos y Condiciones</Link></li>
                <li><Link href="#" className="text-muted-foreground hover:text-primary transition-colors text-sm">Política de Privacidad</Link></li>
              </ul>
            </div>

            <div className="col-span-2 sm:col-span-1 text-center sm:text-left">
              <h3 className="font-headline font-semibold text-foreground mb-4">Síguenos</h3>
              <div className="flex justify-center sm:justify-start space-x-4">
                <Link href="#" className="text-muted-foreground hover:text-primary"><span className="sr-only">Twitter</span><Twitter /></Link>
                <Link href="#" className="text-muted-foreground hover:text-primary"><span className="sr-only">GitHub</span><Github /></Link>
                <Link href="#" className="text-muted-foreground hover:text-primary"><span className="sr-only">LinkedIn</span><Linkedin /></Link>
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