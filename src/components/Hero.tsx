'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { ChevronRight, ShieldCheck, DollarSign, Laptop, ChevronDown } from 'lucide-react';
import { CheckoutButton } from './CheckoutButton';
import victoriaHeroImg from '../assets/victoria-hero.png';

export function Hero() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <header id="hero" className="relative py-16 md:py-24 lg:min-h-screen flex items-center border-b border-white/5 overflow-hidden">
      {/* Abstract Dark Background Elements */}
      <div className="absolute inset-0 z-0 bg-[#0B1220] bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-[#071426] via-[#0B1220] to-[#0B1220]"></div>
      <div className="absolute inset-0 z-0 opacity-20 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
          
          {/* Left Content */}
          <div className={`lg:w-1/2 flex flex-col items-start transition-all duration-1000 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            
            <h1 className="text-4xl md:text-5xl lg:text-4xl xl:text-[3.5rem] font-bold text-white leading-[1.2] mb-4 xl:mb-6 tracking-tight">
              Destrave sua fala em inglês no seu próprio ritmo — <span className="text-[#FFB800] drop-shadow-[0_0_15px_rgba(255,184,0,0.2)]">sem depender de professores.</span>
            </h1>
            
            <p className="text-lg md:text-xl lg:text-lg xl:text-xl text-slate-400 mb-6 xl:mb-10 leading-relaxed max-w-xl font-light">
              O método prático para quem já entende inglês, mas trava na hora de abrir a boca. Aprenda técnicas de imersão diária e <em>shadowing</em> para falar com segurança.
            </p>

            <div className="flex flex-col w-full sm:w-auto gap-4">
              <CheckoutButton 
                sectionName="hero"
                className="group relative px-8 py-5 bg-[#FFB800] hover:bg-[#E6A600] text-[#0B1220] font-extrabold rounded-xl transition-all duration-300 text-lg flex items-center justify-center gap-3 overflow-hidden shadow-[0_0_40px_rgba(255,184,0,0.3)] hover:shadow-[0_0_60px_rgba(255,184,0,0.5)] transform hover:-translate-y-1"
              >
                <span className="relative z-10 flex items-center gap-2">
                  QUERO DESTRAVAR MINHA FALA
                  <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out"></div>
              </CheckoutButton>
              
              <p className="text-sm text-slate-500 font-medium flex items-center justify-center sm:justify-start gap-2">
                <ShieldCheck className="w-4 h-4 text-[#FFB800]" />
                Acesso imediato • Pagamento seguro
              </p>
            </div>

          </div>

          {/* Right Content - Hero Image */}
          <div className={`lg:w-1/2 relative transition-all duration-1000 delay-300 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            
            {/* Discrete Green Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-[#FFB800]/20 blur-[120px] rounded-full z-0 pointer-events-none"></div>
            
            <div className="relative z-10 w-[90%] sm:w-[80%] lg:w-[90%] xl:w-[85%] mx-auto">
              {/* Main Image Mask/Container */}
              <div className="relative rounded-3xl overflow-hidden border border-white/10 shadow-2xl bg-[#071426] group lg:max-h-[65vh] xl:max-h-[70vh]">
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B1220] via-transparent to-transparent z-10"></div>
                <Image 
                  src={victoriaHeroImg}
                  alt="Victoria Morais - História Real" 
                  priority
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="w-full h-full object-cover object-top transform group-hover:scale-105 transition-transform duration-1000 opacity-95"
                />
              </div>

              {/* Floating Elements (Story focus) */}
              <div className="absolute top-4 -right-2 md:-top-4 md:-right-4 lg:-top-6 lg:-right-2 z-20 bg-white/5 backdrop-blur-xl border border-white/10 p-2 lg:p-4 rounded-xl lg:rounded-2xl shadow-2xl animate-bounce" style={{animationDuration: '4s'}}>
                <div className="flex items-center gap-2 lg:gap-3">
                  <div className="bg-[#FFB800]/20 p-1.5 lg:p-2 rounded-lg lg:rounded-xl">
                    <DollarSign className="w-4 h-4 lg:w-6 lg:h-6 text-[#FFB800]" />
                  </div>
                  <div>
                    <p className="text-[10px] lg:text-xs text-slate-300 font-bold uppercase tracking-wider leading-none mb-0.5 lg:mb-0">Inglês Real</p>
                    <p className="text-xs lg:text-base text-white font-black leading-none lg:leading-normal">Entenda Nativos</p>
                  </div>
                </div>
              </div>

              <div className="absolute top-[75%] -left-4 md:-left-8 lg:-left-10 z-20 bg-white/5 backdrop-blur-xl border border-white/10 p-2 lg:p-4 rounded-xl lg:rounded-2xl shadow-2xl animate-bounce" style={{animationDuration: '5s', animationDelay: '1s'}}>
                <div className="flex items-center gap-2 lg:gap-3">
                  <span className="text-xl lg:text-3xl leading-none">🗣️</span>
                  <div>
                    <p className="text-[10px] lg:text-xs text-slate-300 font-bold uppercase tracking-wider leading-none mb-0.5 lg:mb-0">Prática Diária</p>
                    <p className="text-xs lg:text-base text-white font-black leading-none lg:leading-normal">30 min / dia</p>
                  </div>
                </div>
              </div>

              <div className="absolute bottom-6 -right-2 md:bottom-8 md:-right-6 lg:-right-6 z-20 bg-white/5 backdrop-blur-xl border border-white/10 p-2 lg:p-4 rounded-xl lg:rounded-2xl shadow-2xl animate-bounce" style={{animationDuration: '4.5s', animationDelay: '0.5s'}}>
                <div className="flex items-center gap-2 lg:gap-3">
                  <div className="bg-blue-500/20 p-1.5 lg:p-2 rounded-lg lg:rounded-xl">
                    <Laptop className="w-4 h-4 lg:w-6 lg:h-6 text-blue-400" />
                  </div>
                  <div>
                    <p className="text-[10px] lg:text-xs text-slate-300 font-bold uppercase tracking-wider leading-none mb-0.5 lg:mb-0">Autonomia</p>
                    <p className="text-xs lg:text-base text-white font-black leading-none lg:leading-normal">Sem Professores</p>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30">
        <a href="#why" className="text-[#FFB800] hover:text-[#E6A600] transition-colors" aria-label="Próxima seção">
          <ChevronDown className="w-10 h-10 animate-bounce" />
        </a>
      </div>
    </header>
  );
}
