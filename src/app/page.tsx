import Header from '@/components/header';
import Hero from '@/components/hero';
import Services from '@/components/services';
import Timeline from '@/components/timeline';
import Philosophy from '@/components/philosophy';
import Clients from '@/components/clients';
import Faq from '@/components/faq';
import Cta from '@/components/cta';
import Footer from '@/components/footer';

export default function Home() {
  return (
    <div className="relative isolate overflow-hidden bg-background">
      <div className="absolute inset-0 -z-10 bg-grid-white/[0.05]" />
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
    </div>
  );
}
