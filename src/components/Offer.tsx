
import Image from 'next/image';
import { CheckCircle2, ShieldCheck, Zap, Laptop, ChevronDown } from 'lucide-react';
import { CheckoutButton } from './CheckoutButton';
import mockupGringaImg from '../assets/mockup-gringa.png';

export function Offer() {
  return (
    <section id="offer" className="py-16 md:py-24 lg:min-h-screen flex flex-col justify-center bg-gradient-to-b from-[#071426] to-[#0B1220] border-b border-white/5 relative">
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row gap-16 items-center max-w-6xl mx-auto">
          
          <div className="lg:w-5/12 w-full flex justify-center mb-6 lg:mb-0">
            <div className="relative w-full max-w-sm md:max-w-md">
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
            <div className="bg-[#071426] border border-white/10 rounded-3xl p-5 md:p-10 shadow-2xl relative">
              
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#FFB800] text-[#0B1220] px-6 py-2 rounded-full font-bold text-sm uppercase tracking-widest shadow-lg whitespace-nowrap">
                Oferta Especial de Lançamento
              </div>

              <div className="text-center mb-6 mt-4 md:mt-0">
                <p className="text-white font-medium text-base md:text-lg leading-snug bg-white/5 p-4 rounded-xl border border-white/10">
                  <strong className="text-[#FFB800]">Mais que um ebook</strong>, isso é o método completo que funcionou na prática (e não é teoria).
                </p>
              </div>

              <h2 className="text-xl md:text-2xl font-extrabold text-white mb-5 text-center">
                O Que Você Leva com Este Ebook:
              </h2>

              <div className="space-y-4 mb-8">
                {[
                  "O sistema de 4 pilares que substitui anos de cursinho por 30 minutos por dia",
                  "O passo a passo para criar sua bolha de imersão artificial – sem precisar morar fora",
                  "A técnica do \"Pause\" com séries que fixa vocabulário muito mais rápido que apostila",
                  "O método musical em 4 passos para calibrar seu ouvido e entender nativos de verdade",
                  "Estratégias de fala para destravar a vergonha: Shadowing, treino com IA e como usar chats internacionais de graça",
                  "O Desafio de 30 Dias: um cronograma prático, dia a dia, que cabe na rotina de quem trabalha e estuda"
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 md:w-6 md:h-6 text-[#FFB800] shrink-0 mt-0.5" />
                    <p className="text-sm md:text-base text-slate-300 leading-snug font-medium">
                      {item}
                    </p>
                  </div>
                ))}
              </div>

              <div className="bg-[#FFB800]/10 border border-[#FFB800]/30 rounded-2xl p-5 md:p-6 mb-8 shadow-inner relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#FFB800]/20 blur-3xl rounded-full"></div>
                <h3 className="text-lg md:text-xl font-bold text-[#FFB800] mb-4 flex items-center gap-2 relative z-10">
                  🎁 Bônus especial para os primeiros compradores
                </h3>
                <div className="space-y-3 relative z-10">
                  {[
                    "Checklist do Desafio de 30 Dias – para você marcar cada passo e não perder o ritmo",
                    "Guia de Configuração de Algoritmo – para transformar seu Instagram e YouTube em máquinas de aprendizado",
                    "Lista de criadores gringos por nicho – curadoria pronta para você seguir e consumir conteúdo real desde o dia 1",
                    "Acesso a um grupo de conversação exclusivo no WhatsApp – com uma condição especial por tempo limitado. Lá dentro, o português é proibido, você pratica com outros alunos e tem acompanhamento semanal ao vivo. (Vagas limitadas, só vale para quem garantir agora.)"
                  ].map((bonus, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 md:w-5 md:h-5 text-[#E6A600] shrink-0 mt-0.5" />
                      <p className="text-sm md:text-base text-slate-200 leading-snug font-medium">
                        {bonus}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-[#0B1220] rounded-2xl p-6 lg:p-8 text-center border border-white/5 shadow-inner">
                <p className="text-slate-400 mb-1 text-sm md:text-base">Valor total estimado de tudo que você vai receber:</p>
                <p className="text-slate-500 mb-4 line-through text-lg font-medium">R$ 297,00</p>
                
                <p className="text-white font-bold text-base md:text-lg mb-5 bg-[#FFB800]/10 inline-block px-4 py-1 rounded-full border border-[#FFB800]/20">Mas durante o lançamento de acesso inicial:</p>
                
                <div className="flex flex-col items-center justify-center mb-6">
                  <div className="flex items-baseline gap-2 mb-1">
                    <span className="text-2xl md:text-3xl font-bold text-slate-400">R$</span>
                    <span className="text-6xl md:text-7xl font-extrabold text-[#FFB800] drop-shadow-[0_0_20px_rgba(255,184,0,0.3)]">97,00</span>
                  </div>
                  <p className="text-white font-black text-xl md:text-2xl mt-1 tracking-wide uppercase">à vista</p>
                  <p className="text-slate-400 font-medium text-base md:text-lg mt-3 bg-white/5 px-4 py-1 rounded-full">ou 12x de R$ 9,68</p>
                </div>
                
                <CheckoutButton 
                  sectionName="offer"
                  className="block w-full px-4 py-5 bg-[#FFB800] hover:bg-[#E6A600] text-[#0B1220] font-extrabold rounded-xl transition-all duration-300 text-lg md:text-xl transform hover:-translate-y-1 shadow-[0_0_30px_rgba(255,184,0,0.3)] hover:shadow-[0_0_50px_rgba(255,184,0,0.5)]"
                >
                  QUERO DESTRAVAR MINHA FALA HOJE
                </CheckoutButton>
                <p className="text-xs md:text-sm text-slate-400 mt-4 font-medium flex flex-wrap justify-center gap-x-3 gap-y-2">
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
