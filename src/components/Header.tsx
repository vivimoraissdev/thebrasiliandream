import Image from 'next/image';
import Link from 'next/link';
import { CheckoutButton } from './CheckoutButton';
import logoImg from '../assets/thebra$iliandream-logo-horizontal.png';

export function Header() {
  return (
    <header className="w-full bg-[#071426]/90 backdrop-blur-md border-b border-white/5 sticky top-0 z-50">
      <div className="container mx-auto px-4 md:px-6 h-20 md:h-28 flex items-center justify-between">
        <Link href="/" className="flex items-center group transition-transform hover:scale-[1.02] bg-white rounded-full overflow-hidden shadow-[0_0_20px_rgba(255,255,255,0.15)]">
          <div className="relative w-52 h-12 md:w-80 md:h-[4.5rem] lg:w-96 lg:h-20 flex items-center justify-center shrink-0">
            <Image 
              src={logoImg} 
              alt="The Brasilian Dream Logo" 
              className="w-full h-full object-cover"
              quality={100}
              priority={true}
            />
          </div>
        </Link>
        
        <div>
          <CheckoutButton 
            sectionName="header"
            className="hidden md:inline-flex px-8 lg:px-10 py-3 lg:py-4 bg-[#FFB800] hover:bg-[#E6A600] text-[#0B1220] font-extrabold rounded-xl transition-all duration-300 shadow-[0_0_20px_rgba(255,184,0,0.3)] hover:shadow-[0_0_30px_rgba(255,184,0,0.5)] transform hover:-translate-y-1 text-base lg:text-lg"
          >
            QUERO O EBOOK
          </CheckoutButton>
        </div>
      </div>
    </header>
  );
}
