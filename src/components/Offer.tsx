'use client';

import { useState } from 'react';
import Image from 'next/image';
import { CheckCircle2, ShieldCheck, Zap, ChevronDown, AlertTriangle, Book, Rocket } from 'lucide-react';
import { CheckoutButton } from './CheckoutButton';
import { isPromotionActive } from '../config/campaign';
import mockupGringaImg from '../assets/mockup-gringa.png';

export function Offer() {
  // Default to combo if promotion is active, else default to ebook
  const [selectedOffer, setSelectedOffer] = useState<'combo' | 'ebook'>(isPromotionActive ? 'combo' : 'ebook');

  const comboOffer = {
    badge: "🔥 Apenas 500 vagas disponíveis",
    title: "E-book + 30 Dias de Comunidade Imersão Brazilian",
    description: "E-book + 30 dias de Comunidade VIP. O combo completo para destravar sua fala e praticar com suporte ao vivo.",
    strikethroughPrice: "R$ 568,47",
    price: "197,00",
    installments: "12x de R$ 20,43",
    ctaText: "QUERO O COMBO",
    checkoutLink: "https://pay.cakto.com.br/qw9kowa_969457",
    benefits: [
      "E-book Fluência Autodidata (completo)",
      "30 dias de Comunidade VIP",
      "Encontros semanais ao vivo",
      "Grupo exclusivo no WhatsApp",
      "Feedback personalizado",
      "Acesso às gravações das mentorias"
    ],
    anchoring: "Valor total: E-book R$ 119,00 + Comunidade R$ 449,47 = ~~R$ 568,47~~ | Hoje você paga apenas: R$ 197,00"
  };

  const ebookOffer = {
    badge: null,
    title: "E-book Fluência Autodidata",
    description: "O método completo para destravar sua fala em inglês no seu próprio ritmo.",
    strikethroughPrice: "R$ 167,00",
    price: "119,00",
    installments: "12x de R$ 12,38",
    ctaText: "QUERO O EBOOK",
    checkoutLink: "[INSERT EBOOK CHECKOUT LINK]",
    benefits: [
      "E-book completo com o método prático",
      "Sistema dos 4 Pilares da Fluência",
      "Como criar sua Bolha de Imersão",
      "Técnica do \"Pause\" para pronúncia",
      "Método de Aprendizado Musical",
      "Exercícios práticos para destravar a fala",
      "Bônus inclusos: Checklist, Guia do Algoritmo e Guia de Criadores Gringos"
    ]
  };

  const currentOffer = selectedOffer === 'combo' ? comboOffer : ebookOffer;

  return (
    <section id="offer" className="py-16 md:py-20 lg:py-6 xl:py-8 flex flex-col justify-center bg-gradient-to-b from-[#071426] to-[#0B1220] border-b border-white/5 relative overflow-hidden transition-all duration-500">
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-center mx-auto">
          
          <div className="lg:w-5/12 w-full flex justify-center mb-6 lg:mb-0">
            <div className="relative w-full max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl">
              <div className="absolute inset-0 bg-[#FFB800]/20 blur-[80px] rounded-full z-0"></div>
              <Image 
                src={mockupGringaImg} 
                alt="Mockup Guia" 
                className="relative z-10 w-full max-h-[350px] lg:max-h-none object-contain mx-auto rounded-xl drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)] transform -rotate-2 hover:rotate-0 transition-transform duration-500"
              />
            </div>
          </div>

          <div className="lg:w-7/12 w-full">
            {/* Toggle Switch or Escassez Alert */}
            <div className="mb-8 w-full flex flex-col items-center lg:items-start">
              {isPromotionActive ? (
                <div className="relative flex items-center bg-[#071426] border border-white/10 rounded-full w-full shadow-lg overflow-hidden">
                  {/* Sliding Background */}
                  <div 
                    className="absolute top-0 bottom-0 w-1/2 bg-slate-800 rounded-full shadow-md transition-all duration-300 ease-out"
                    style={{ left: selectedOffer === 'ebook' ? '0%' : '50%' }}
                  ></div>
                  
                  <button
                    onClick={() => setSelectedOffer('ebook')}
                    className={`relative z-10 flex-1 py-3 md:py-4 text-sm md:text-base font-bold text-center rounded-full transition-colors duration-300 flex items-center justify-center gap-2 ${selectedOffer === 'ebook' ? 'text-white' : 'text-slate-400 hover:text-slate-200'}`}
                  >
                    <Book className={`w-4 h-4 md:w-5 md:h-5 ${selectedOffer === 'ebook' ? 'text-blue-400' : ''}`} /> E-book
                  </button>
                  <button
                    onClick={() => setSelectedOffer('combo')}
                    className={`relative z-10 flex-1 py-3 md:py-4 text-sm md:text-base font-bold text-center rounded-full transition-colors duration-300 flex items-center justify-center gap-2 ${selectedOffer === 'combo' ? 'text-[#FFB800]' : 'text-slate-400 hover:text-slate-200'}`}
                  >
                    <Rocket className="w-4 h-4 md:w-5 md:h-5" /> Combo
                  </button>
                </div>
              ) : (
                <div className="bg-red-500/10 border border-red-500/30 rounded-2xl p-4 text-center shadow-lg w-full">
                  <p className="text-red-400 font-medium text-sm flex items-center justify-center gap-2 text-left md:text-center">
                    <AlertTriangle className="w-6 h-6 shrink-0" />
                    As 500 vagas para a oferta especial do combo se esgotaram! O e-book continua disponível abaixo:
                  </p>
                </div>
              )}
            </div>

            <div className="bg-[#071426] border border-white/10 rounded-3xl p-5 md:p-8 lg:p-5 xl:p-6 shadow-2xl relative transition-all duration-500">
              
              {currentOffer.badge && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#FFB800] text-[#0B1220] px-6 py-1.5 md:py-2 rounded-full font-bold text-sm uppercase tracking-widest shadow-lg whitespace-nowrap animate-pulse">
                  {currentOffer.badge}
                </div>
              )}

              <div className="text-center mb-3 lg:mb-4 mt-4 md:mt-2 lg:mt-0">
                <h2 className="text-xl md:text-2xl font-extrabold text-white mb-2">
                  {currentOffer.title}
                </h2>
                <p className="text-slate-400 text-sm md:text-base">
                  {currentOffer.description}
                </p>
              </div>

              <div className="space-y-3 mb-6 bg-white/5 border border-white/10 rounded-2xl p-4 md:p-5">
                {currentOffer.benefits.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-5 h-5 text-[#FFB800] shrink-0 mt-0.5" />
                    <p className="text-sm text-slate-300 leading-snug font-medium">
                      {item.includes('E-book') || item.includes('Comunidade VIP') || item.includes('Bônus') ? (
                        <strong className="text-white">{item}</strong>
                      ) : (
                        item
                      )}
                    </p>
                  </div>
                ))}
              </div>

              <div className="bg-[#0B1220] rounded-2xl p-5 lg:p-4 xl:p-5 text-center border border-white/5 shadow-inner">
                <div className="flex flex-col md:flex-row items-center justify-between gap-3 mb-3 lg:mb-4">
                  <div className="text-center md:text-left">
                    <p className="text-slate-400 mb-0.5 text-sm">Valor original:</p>
                    <p className="text-slate-500 mb-2 line-through text-base font-medium">{currentOffer.strikethroughPrice}</p>
                    <p className="text-white font-bold text-xs bg-[#FFB800]/10 inline-block px-3 py-1 rounded-full border border-[#FFB800]/20">Hoje você paga apenas:</p>
                  </div>
                  
                  <div className="flex flex-col items-center md:items-end">
                    <div className="flex items-baseline gap-1.5 md:gap-2 mb-1">
                      <span className="text-xl md:text-2xl lg:text-3xl font-bold text-slate-400">R$</span>
                      <span className="text-5xl md:text-6xl font-extrabold text-[#FFB800] drop-shadow-[0_0_20px_rgba(255,184,0,0.3)]">{currentOffer.price}</span>
                    </div>
                    <p className="text-slate-400 font-medium text-xs md:text-sm mt-1 bg-white/5 px-3 py-0.5 md:py-1 rounded-full">ou {currentOffer.installments}</p>
                  </div>
                </div>
                
                {selectedOffer === 'combo' && comboOffer.anchoring && (
                  <p className="text-[11px] text-slate-500 mb-4 font-medium italic border-t border-white/5 pt-3">
                    Valor total: E-book R$ 119,00 + Comunidade R$ 449,47 = <span className="line-through">R$ 568,47</span> | Hoje você paga apenas: R$ 197,00
                  </p>
                )}

                <CheckoutButton 
                  href={currentOffer.checkoutLink}
                  sectionName="offer"
                  className="block w-full px-4 py-4 lg:py-3.5 xl:py-4 bg-[#FFB800] hover:bg-[#E6A600] text-[#0B1220] font-extrabold rounded-xl transition-all duration-300 text-lg md:text-xl transform hover:-translate-y-1 shadow-[0_0_30px_rgba(255,184,0,0.3)] hover:shadow-[0_0_50px_rgba(255,184,0,0.5)]"
                >
                  {currentOffer.ctaText}
                </CheckoutButton>
                <p className="text-xs text-slate-400 mt-2 md:mt-3 font-medium flex flex-wrap justify-center gap-x-3 gap-y-1">
                  <span className="flex items-center gap-1"><ShieldCheck className="w-4 h-4 text-[#FFB800]"/> Compra 100% segura</span>
                  <span className="flex items-center gap-1"><Zap className="w-4 h-4 text-[#FFB800]"/> Acesso imediato</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30">
        <a href="#bonus" className="text-[#FFB800] hover:text-[#E6A600] transition-colors" aria-label="Próxima seção">
          <ChevronDown className="w-10 h-10 animate-bounce" />
        </a>
      </div>
    </section>
  );
}
