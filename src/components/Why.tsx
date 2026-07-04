
import Image from 'next/image';
import { ChevronDown } from 'lucide-react';
import victoriaPostImg from '../assets/victoria-instametrics.png';

export function Why() {
  return (
    <section id="why" className="py-16 md:py-24 lg:min-h-screen flex flex-col justify-center bg-[#071426] border-b border-white/5 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-1/3 h-full bg-blue-900/10 blur-[150px] rounded-full pointer-events-none"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row gap-16 items-center max-w-6xl mx-auto">
          
          <div className="lg:w-1/2 space-y-8">
            <h2 className="text-3xl lg:text-4xl font-bold text-white leading-tight">
              Por que eu criei <span className="text-[#FFB800]">este ebook?</span>
            </h2>
            
            <div className="space-y-6 text-lg text-slate-400 font-light leading-relaxed">
              <p>
                Depois que comecei a compartilhar minha história de como destravei o inglês sozinha, dezenas de pessoas começaram a me fazer exatamente as mesmas perguntas:
              </p>
              
              <ul className="space-y-4 text-white font-medium bg-white/5 border border-white/10 p-6 rounded-2xl backdrop-blur-sm">
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-[#FFB800]"></div> Como você conseguiu perder a vergonha de falar?
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-[#FFB800]"></div> Como você montou sua rotina de estudos?
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-[#FFB800]"></div> É possível aprender sem pagar cursinhos caros?
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-[#FFB800]"></div> Precisa morar fora para entender os nativos?
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-[#FFB800]"></div> Como aplicar o shadowing na prática?
                </li>
              </ul>

              <p>
                Em vez de responder uma por uma, decidi reunir todo o meu método em um passo a passo direto ao ponto.
              </p>
            </div>
          </div>

          <div className="lg:w-1/2 relative group">
            <div className="absolute inset-0 bg-[#FFB800]/10 blur-3xl rounded-full"></div>
            <Image 
              src={victoriaPostImg}
              alt="A postagem que iniciou tudo" 
              className="relative rounded-3xl w-full object-cover shadow-2xl border border-white/10 transform -rotate-2 hover:rotate-0 transition-transform duration-500"
            />
          </div>
          
        </div>
      </div>
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30">
        <a href="#interest" className="text-[#FFB800] hover:text-[#E6A600] transition-colors" aria-label="Próxima seção">
          <ChevronDown className="w-10 h-10 animate-bounce" />
        </a>
      </div>
    </section>
  );
}
