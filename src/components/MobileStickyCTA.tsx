'use client';

import { useEffect, useState } from 'react';
import { CheckoutButton } from './CheckoutButton';

export function MobileStickyCTA() {
  const [showStickyCta, setShowStickyCta] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show sticky CTA only after scrolling past 80% of the viewport (Hero section)
      if (window.scrollY > window.innerHeight * 0.8) {
        setShowStickyCta(true);
      } else {
        setShowStickyCta(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className={`fixed bottom-0 left-0 right-0 z-50 p-4 bg-[#0B1220]/90 backdrop-blur border-t border-white/10 md:hidden transition-transform duration-500 ease-in-out ${showStickyCta ? 'translate-y-0' : 'translate-y-[150%]'}`}>
      <CheckoutButton 
        sectionName="sticky_mobile"
        className="w-full block text-center py-4 bg-[#FFB800] text-[#0B1220] font-bold rounded-xl shadow-lg cursor-pointer hover:bg-[#E6A600] hover:-translate-y-1 hover:shadow-[0_0_30px_rgba(255,184,0,0.3)] transition-all duration-300"
      >
        QUERO ACESSO AGORA
      </CheckoutButton>
    </div>
  );
}
