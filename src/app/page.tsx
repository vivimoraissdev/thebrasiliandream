import { Hero } from '@/components/Hero';
import { Why } from '@/components/Why';
import { Interest } from '@/components/Interest';
import { Problem } from '@/components/Problem';
import { History } from '@/components/History';
import { WhoIsThisFor } from '@/components/WhoIsThisFor';
import { Offer } from '@/components/Offer';
import { Bonus } from '@/components/Bonus';
import { Guarantee } from '@/components/Guarantee';
import { CTA } from '@/components/CTA';
import { Footer } from '@/components/Footer';
import { MobileStickyCTA } from '@/components/MobileStickyCTA';
import { Header } from '@/components/Header';

export default function Home() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-[#0B1220] overflow-x-hidden font-sans text-slate-200 selection:bg-[#FFB800]/30 selection:text-white">
        <Hero />
      <Why />
      <Interest />
      <Problem />
      <History />
      <WhoIsThisFor />
      <Offer />
      <Bonus />
      <Guarantee />
      <CTA />
      <Footer />
      <MobileStickyCTA />
      </main>
    </>
  );
}
