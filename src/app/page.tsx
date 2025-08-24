import Header from '@/components/header';
import Hero from '@/components/hero';
import Services from '@/components/services';
import Timeline from '@/components/timeline';
import Philosophy from '@/components/philosophy';
import Clients from '@/components/clients';
import Cta from '@/components/cta';
import Footer from '@/components/footer';
import Scene from '@/components/scene';

export default function Home() {
  return (
    <div className="relative isolate overflow-hidden">
      <Scene />
      <div className="relative z-10 flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">
          <Hero />
          <Services />
          <Timeline />
          <Philosophy />
          <Clients />
          <Cta />
        </main>
        <Footer />
      </div>
    </div>
  );
}
