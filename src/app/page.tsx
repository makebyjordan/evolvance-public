
import Header from '@/components/header';
import Hero from '@/components/hero';
import MarketingAI from '@/components/marketing-ai';
import Services from '@/components/services';
import Timeline from '@/components/timeline';
import Philosophy from '@/components/philosophy';
import Team from '@/components/team';
import Clients from '@/components/clients';
import Faq from '@/components/faq';
import Cta from '@/components/cta';
import { SectionSeparator } from '@/components/section-separator';
import Footer from '@/components/footer';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow">
        <Hero />
        <div className="relative isolate">
          <SectionSeparator position="top" align="right" />
          <MarketingAI />
        </div>
        <div className="relative isolate">
          <SectionSeparator position="top" align="left" />
          <Services />
        </div>
        <div className="relative isolate">
          <SectionSeparator position="top" align="right" />
          <Timeline />
        </div>
        <div className="relative isolate">
            <SectionSeparator position="top" align="left" />
            <Philosophy />
        </div>
        <div className="relative isolate">
            <SectionSeparator position="top" align="right" />
            <Team />
        </div>
         <div className="relative isolate">
            <SectionSeparator position="top" align="left" />
            <Faq />
        </div>
         <div className="relative isolate">
            <SectionSeparator position="top" align="right" />
            <Clients />
        </div>
         <div className="relative isolate">
            <SectionSeparator position="top" align="left" />
            <Cta />
        </div>
      </main>
      <Footer />
    </div>
  );
}
