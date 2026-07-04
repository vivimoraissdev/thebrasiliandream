
import Image from 'next/image';
import { CheckCircle2, ShieldCheck, Zap, Laptop, ChevronDown } from 'lucide-react';
import { CheckoutButton } from './CheckoutButton';
import mockupGringaImg from '../assets/mockup-gringa.png';

export function Offer() {
  return (
    <section id="offer" className="py-16 md:py-20 lg:py-6 xl:py-8 flex flex-col justify-center bg-gradient-to-b from-[#071426] to-[#0B1220] border-b border-white/5 relative">
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-center mx-auto">
          
          <div className="lg:w-5/12 w-full flex justify-center mb-6 lg:mb-0">
            <div className="relative w-full max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl">
              {/* Back glow for Mockup */}
              <div className="absolute inset-0 bg-[#FFB800]/20 blur-[80px] rounded-full z-0"></div>
              <Image 
                src={mockupGringaImg} 
                alt="Mockup Guia Trabalhe na Gringa" 
                className="relative z-10 w-full max-h-[350px] lg:max-h-none object-contain mx-auto rounded-xl drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)] transform -rotate-2 hover:rotate-0 transition-transform duration-500"
              />
            </div>
          </div>

          <div className="lg:w-7/12 w-full">
            <div className="bg-[#071426] border border-white/10 rounded-3xl p-5 md:p-8 lg:p-5 xl:p-6 shadow-2xl relative">
              
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#FFB800] text-[#0B1220] px-6 py-1.5 md:py-2 rounded-full font-bold text-sm uppercase tracking-widest shadow-lg whitespace-nowrap">
                Oferta Especial de Lançamento
              </div>

              <div className="text-center mb-3 lg:mb-4 mt-4 md:mt-2 lg:mt-0">
                <p className="text-white font-medium text-base leading-snug bg-white/5 p-3 rounded-xl border border-white/10">
                  <strong className="text-[#FFB800]">Mais que um ebook</strong>, isso é o método completo que funcionou na prática (e não é teoria).
                </p>
              </div>

              <h2 className="text-xl md:text-2xl font-extrabold text-white mb-3 text-center">
                O Que Você Leva com Este Ebook:
              </h2>

              <div className="space-y-4 lg:space-y-0 lg:grid lg:grid-cols-2 lg:gap-x-4 lg:gap-y-2 mb-4">
                {[
                  { title: "Sistema de 4 Pilares", desc: "Substitui anos de cursinho por 30 minutos diários." },
                  { title: "Bolha de Imersão", desc: "Mergulhe no idioma sem precisar morar fora." },
                  { title: "Técnica do \"Pause\"", desc: "Fixe vocabulário com séries muito mais rápido que apostilas." },
                  { title: "Método Musical", desc: "4 passos rápidos para calibrar seu ouvido com nativos." },
                  { title: "Destrave a Fala", desc: "Estratégias de Shadowing e treino com IA grátis." },
                  { title: "Desafio 30 Dias", desc: "Cronograma prático para quem trabalha e estuda." }
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 md:w-5 md:h-5 text-[#FFB800] shrink-0 mt-0.5" />
                    <p className="text-sm text-slate-300 leading-snug font-medium">
                      <strong className="text-white">{item.title}:</strong> {item.desc}
                    </p>
                  </div>
                ))}
              </div>

              <div className="bg-[#FFB800]/10 border border-[#FFB800]/30 rounded-2xl p-5 md:p-5 lg:p-3 xl:p-4 mb-4 shadow-inner relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#FFB800]/20 blur-3xl rounded-full"></div>
                <h3 className="text-base md:text-lg font-bold text-[#FFB800] mb-2 flex items-center gap-2 relative z-10">
                  🎁 Bônus especial para os primeiros compradores
                </h3>
                <div className="space-y-3 lg:space-y-0 lg:grid lg:grid-cols-2 lg:gap-x-4 lg:gap-y-2 relative z-10">
                  {[
                    { title: "Checklist 30 Dias", desc: "Marque cada passo e não perca o ritmo." },
                    { title: "Guia de Algoritmo", desc: "Transforme redes sociais em máquinas de estudo." },
                    { title: "Criadores Gringos", desc: "Curadoria pronta para consumir conteúdo real." },
                    { title: "Acesso Exclusivo", desc: "Condição especial no Grupo de Conversação do WhatsApp." }
                  ].map((bonus, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 md:w-5 md:h-5 text-[#E6A600] shrink-0 mt-0.5" />
                      <p className="text-xs md:text-sm text-slate-200 leading-snug font-medium">
                        <strong className="text-white">{bonus.title}:</strong> {bonus.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-[#0B1220] rounded-2xl p-5 lg:p-4 xl:p-5 text-center border border-white/5 shadow-inner">
                <div className="flex flex-col md:flex-row items-center justify-between gap-3 mb-3 lg:mb-4">
                  <div className="text-center md:text-left">
                    <p className="text-slate-400 mb-0.5 text-sm">Valor total estimado:</p>
                    <p className="text-slate-500 mb-2 line-through text-base font-medium">R$ 297,00</p>
                    <p className="text-white font-bold text-xs bg-[#FFB800]/10 inline-block px-3 py-1 rounded-full border border-[#FFB800]/20">Acesso inicial:</p>
                  </div>
                  
                  <div className="flex flex-col items-center md:items-end">
                    <div className="flex items-baseline gap-1.5 md:gap-2 mb-1">
                      <span className="text-xl md:text-2xl lg:text-3xl font-bold text-slate-400">R$</span>
                      <span className="text-5xl md:text-6xl font-extrabold text-[#FFB800] drop-shadow-[0_0_20px_rgba(255,184,0,0.3)]">97,00</span>
                    </div>
                    <p className="text-white font-black text-lg md:text-xl mt-0.5 tracking-wide uppercase">à vista</p>
                    <p className="text-slate-400 font-medium text-xs md:text-sm mt-1 bg-white/5 px-3 py-0.5 md:py-1 rounded-full">ou 12x de R$ 9,68</p>
                  </div>
                </div>
                
                <CheckoutButton 
                  sectionName="offer"
                  className="block w-full px-4 py-4 lg:py-3.5 xl:py-4 bg-[#FFB800] hover:bg-[#E6A600] text-[#0B1220] font-extrabold rounded-xl transition-all duration-300 text-lg md:text-xl transform hover:-translate-y-1 shadow-[0_0_30px_rgba(255,184,0,0.3)] hover:shadow-[0_0_50px_rgba(255,184,0,0.5)]"
                >
                  QUERO DESTRAVAR MINHA FALA HOJE
                </CheckoutButton>
                <p className="text-xs text-slate-400 mt-2 md:mt-3 font-medium flex flex-wrap justify-center gap-x-3 gap-y-1">
                  <span className="flex items-center gap-1"><ShieldCheck className="w-4 h-4 text-[#FFB800]"/> Compra 100% segura</span>
                  <span className="flex items-center gap-1"><Zap className="w-4 h-4 text-[#FFB800]"/> Download imediato após a compra</span>
                  <span className="flex items-center gap-1"><Laptop className="w-4 h-4 text-[#FFB800]"/> Acesso vitalício</span>
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
