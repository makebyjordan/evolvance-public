
"use client";

import Link from 'next/link';
import Image from 'next/image';
import { getWebContent, type SiteConfigContent } from '@/app/actions/web-content-actions';
import { getCompanyInfo, type CompanyInfo } from '@/app/actions/company-actions';
import { useEffect, useState } from 'react';
import { MapPin, Phone } from 'lucide-react';

// Helper component to safely render SVG from a string
function SvgRenderer({ svgString, className }: { svgString: string, className?: string }) {
    if (!svgString || typeof svgString !== 'string') return null;
    const modifiedSvgString = svgString.replace('<svg', `<svg class="${className || ''}"`);
    return <div dangerouslySetInnerHTML={{ __html: modifiedSvgString }} />;
}

const defaultSocialIconSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-twitter"><path d="M22 4s-.7 2.1-2 3.4c1.6 1.4 3.3 4.9 3 7.1 0 .8-.4 1.5-.9 2.2-1.1 1.4-2.6 2.3-4.2 3.1-3.1 1.5-5.3 2.5-8.5 2.5-2.2 0-3.6-.4-5.2-1.2-1.9-.9-3.2-2.3-4.3-4.1-1.1-1.8-1.2-3.3-1-4.6 0-1.1.4-2.1 1.1-3.2 1.3-2 2.8-3.4 4.6-4.8 2.5-1.9 4.2-3.3 7.1-5.3 1.1-.8 2.3-1.5 3.6-2.2.5-.3 1.1-.5 1.7-.5.9 0 1.5.5 1.5 1.5Z"/></svg>`;

export default function Footer() {
  const [year, setYear] = useState(new Date().getFullYear());
  const [siteConfig, setSiteConfig] = useState<SiteConfigContent | null>(null);
  const [companyInfo, setCompanyInfo] = useState<CompanyInfo | null>(null);

  useEffect(() => {
    setYear(new Date().getFullYear());
    async function fetchData() {
      const [loadedSiteConfig, loadedCompanyInfo] = await Promise.all([
        getWebContent<SiteConfigContent>('siteConfig'),
        getCompanyInfo(),
      ]);
      setSiteConfig(loadedSiteConfig);
      setCompanyInfo(loadedCompanyInfo);
    }
    fetchData();
  }, []);

  const socialLinks = siteConfig?.socialLinks || [{ url: "#", iconSvg: defaultSocialIconSvg }];
  const navLinks = [
    { href: '/services', label: 'Servicios' },
    { href: '/#timeline', label: 'Trayectoria' },
    { href: '/#philosophy', label: 'Filosofía' },
  ];

  return (
    <footer className="bg-card border-t border-border/20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          
          <div className="md:col-span-3 flex flex-col items-center md:items-start text-center md:text-left">
            <Link href="/" className="flex items-center gap-2 mb-4 text-foreground">
              <Image src="https://iili.io/KkYGiil.png" alt="Evol-vance Logo" width={150} height={40} />
            </Link>
            <p className="text-muted-foreground text-sm max-w-xs">
              Fusionamos IA, Experiencias Inmersivas y Marketing Estratégico para llevar tu empresa a la siguiente dimensión.
            </p>
             <div className="flex justify-center sm:justify-start space-x-4 mt-6">
                {socialLinks.map((link, index) => (
                  <Link key={index} href={link.url} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary">
                      <SvgRenderer svgString={link.iconSvg} className="w-6 h-6" />
                      <span className="sr-only">Social media link {index+1}</span>
                  </Link>
                ))}
              </div>
          </div>

          <div className="md:col-span-5">
            <h3 className="font-headline font-semibold text-foreground mb-4 text-center md:text-left">Nuestra Ubicación</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
               <div className="aspect-video relative rounded-lg overflow-hidden">
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3169.576832629765!2d-6.009366624141662!3d37.42236907206452!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd126e1c27204f1f%3A0x3b64ea360ac9b33a!2sEvolvance!5e0!3m2!1ses!2ses!4v1700671373516!5m2!1ses!2ses"
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen={false}
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        title="Mapa de ubicación de Evolvance"
                    ></iframe>
                </div>
                 <div className="aspect-video relative rounded-lg overflow-hidden">
                   <Image src="https://iili.io/K7yWjjt.jpg" alt="Torres Torneo, Sevilla" fill className="object-cover" />
                </div>
            </div>
          </div>

          <div className="md:col-span-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 gap-8">
            <div className="text-center sm:text-left md:text-right">
              <h3 className="font-headline font-semibold text-foreground mb-4">Contacto</h3>
                <div className="text-sm text-muted-foreground space-y-2">
                    <p className="flex items-center justify-center sm:justify-start md:justify-end gap-2"><MapPin className="w-4 h-4 text-primary shrink-0"/> C. Astronomía, 1, Torre 2, P. 8, 41015 Sevilla</p>
                    {companyInfo?.phone && <p className="flex items-center justify-center sm:justify-start md:justify-end gap-2"><Phone className="w-4 h-4 text-primary shrink-0"/> {companyInfo.phone}</p>}
                </div>
            </div>
            <div className="text-center sm:text-left md:text-right">
              <h3 className="font-headline font-semibold text-foreground mb-4">Legal</h3>
              <ul className="space-y-2">
                <li><Link href="/terms" className="text-muted-foreground hover:text-primary transition-colors text-sm">Términos y Condiciones</Link></li>
                <li><Link href="/privacy" className="text-muted-foreground hover:text-primary transition-colors text-sm">Política de Privacidad</Link></li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-border/20 text-center text-sm text-muted-foreground">
          © {year} Evolvance.es - Todos los derechos reservados.
        </div>
      </div>
    </footer>
  );
}
