"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Github, Twitter, Linkedin } from 'lucide-react';

const Logo = () => (
    <svg width="30" height="30" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
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

  return (
    <footer className="bg-background/80 backdrop-blur-sm border-t border-border/20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center gap-2 mb-4 md:mb-0">
            <Logo />
            <span className="text-lg font-headline font-bold text-foreground">Evol-vance</span>
          </div>
          <div className="flex space-x-4">
            <Link href="#" className="text-muted-foreground hover:text-primary"><span className="sr-only">Twitter</span><Twitter /></Link>
            <Link href="#" className="text-muted-foreground hover:text-primary"><span className="sr-only">GitHub</span><Github /></Link>
            <Link href="#" className="text-muted-foreground hover:text-primary"><span className="sr-only">LinkedIn</span><Linkedin /></Link>
          </div>
        </div>
        <div className="mt-8 text-center text-sm text-muted-foreground">
          © {year} Evol-vance. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  );
}
