import Header from '@/components/header';
import Hero from '@/components/hero';
import Services from '@/components/services';
import Timeline from '@/components/timeline';
import Philosophy from '@/components/philosophy';
import Clients from '@/components/clients';
import Faq from '@/components/faq';
import Cta from '@/components/cta';
import Footer from '@/components/footer';
import { SectionSeparator } from '@/components/section-separator';

export default function Home() {
  return (
    <div className="relative isolate overflow-hidden bg-background">
      
      {/* Separators are positioned absolutely relative to this container */}
      <SectionSeparator position="top" />

      <div className="relative z-10 flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">
          <Hero />
          <Services />
          <Timeline />
          <Philosophy />
          <Faq />
          <Clients />
          <Cta />
        </main>
        <Footer />
      </div>
      
      <SectionSeparator position="bottom" />
    </div>
  );
}
