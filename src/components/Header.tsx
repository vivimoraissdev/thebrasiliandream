import Image from 'next/image';
import Link from 'next/link';
import { CheckoutButton } from './CheckoutButton';
import logoImg from '../assets/logo-thebrasiliandream.png';

export function Header() {
  return (
    <header className="w-full bg-[#071426]/90 backdrop-blur-md border-b border-white/5 sticky top-0 z-50">
      <div className="container mx-auto px-4 md:px-6 h-20 md:h-28 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group transition-transform hover:scale-[1.02] bg-white rounded-full pr-6 pl-2 py-2 shadow-[0_0_20px_rgba(255,255,255,0.15)]">
          <div className="relative w-12 h-12 md:w-20 md:h-20 flex items-center justify-center shrink-0">
            <Image 
              src={logoImg} 
              alt="The Brasilian Dream Logo" 
              className="w-full h-full object-contain"
            />
          </div>
          <span className="font-black text-xl md:text-3xl tracking-tight leading-none text-[#0B1220]">
            The Bra<span className="text-[#FFB800]">$</span>ilian <span className="underline decoration-[#FFB800] decoration-4 md:decoration-8 underline-offset-4 md:underline-offset-8">Dream</span>
          </span>
        </Link>
        
        <div>
          <CheckoutButton 
            sectionName="header"
            className="hidden md:inline-flex px-6 py-2 bg-[#FFB800] hover:bg-[#E6A600] text-[#0B1220] font-bold rounded-lg transition-all duration-300 shadow-[0_0_15px_rgba(255,184,0,0.2)] hover:shadow-[0_0_25px_rgba(255,184,0,0.4)] transform hover:-translate-y-0.5 text-sm"
          >
            QUERO O EBOOK
          </CheckoutButton>
        </div>
      </div>
    </header>
  );
}
