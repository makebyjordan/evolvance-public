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
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow">
        <div className="relative isolate">
           <SectionSeparator position="top" />
           <Hero />
           <SectionSeparator position="bottom" />
        </div>
        <Services />
        <Timeline />
         <div className="relative isolate">
            <SectionSeparator position="top" />
            <Philosophy />
            <SectionSeparator position="bottom" />
        </div>
        <Faq />
        <Clients />
        <Cta />
      </main>
      <Footer />
    </div>
  );
}
