
import Image from 'next/image';
import { CheckCircle2, ChevronDown } from 'lucide-react';
import victoriaHistoryImg from '../assets/victoria-history.jpg';

export function History() {
  return (
    <section id="history" className="py-16 md:py-24 lg:min-h-screen flex flex-col justify-center bg-[#0B1220] border-b border-white/5 relative overflow-hidden">
      <div className="absolute -left-1/4 top-0 w-1/2 h-full bg-[#FFB800]/5 blur-[150px] rounded-full pointer-events-none"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 xl:gap-24 items-center max-w-5xl xl:max-w-6xl 2xl:max-w-7xl mx-auto bg-white/5 border border-white/10 rounded-3xl lg:rounded-[2.5rem] p-6 sm:p-8 lg:p-12 backdrop-blur-sm">
          
          <div className="w-full max-w-sm md:max-w-md lg:max-w-none lg:w-5/12 xl:w-4/12 relative group mx-auto">
            <div className="absolute inset-0 bg-[#FFB800] rounded-3xl translate-x-3 translate-y-3 opacity-20 transition-transform duration-500"></div>
            <Image 
              src={victoriaHistoryImg}
              alt="Victoria Morais" 
              className="relative rounded-3xl w-full object-cover shadow-2xl border border-white/10"
            />
          </div>

          <div className="w-full lg:w-7/12 xl:w-8/12 text-center lg:text-left">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6 lg:mb-8 leading-tight">
              Há alguns anos eu também achava que isso era <span className="text-[#FFB800]">impossível.</span>
            </h2>
            <div className="mb-6 lg:mb-8 p-5 lg:p-6 rounded-2xl bg-white/5 border border-white/10 text-left">
              <p className="text-base md:text-lg lg:text-xl text-slate-300 leading-relaxed">
                <span className="text-[#FFB800]">Eu sou Vivi Morais, nascida em Fortaleza (CE) </span>e por muito tempo acreditei na mentira de que eu precisava morar fora ou pagar professores particulares caríssimos para um dia conseguir falar inglês de verdade.
              </p>
            </div>
            <div className="space-y-4 lg:space-y-5 text-left">
              {[
                "Entendi que a gramática tradicional estava me travando.",
                "Criei minha própria bolha de imersão morando no Brasil.",
                "Usei o shadowing para calibrar meu ouvido e reduzir o sotaque.",
                "Perdi o medo de errar praticando técnicas ativas sozinha.",
                "Hoje conquistei a fluência e trabalho para uma empresa americana."
              ].map((item, idx) => (
                <div key={idx} className="flex items-start gap-3 lg:gap-4">
                  <CheckCircle2 className="w-5 h-5 lg:w-6 lg:h-6 text-[#FFB800] shrink-0 mt-0.5" />
                  <span className="text-base md:text-lg text-slate-300 font-light">{item}</span>
                </div>
              ))}
            </div>

            <div className="mt-8 pt-8 border-t border-white/10 text-center lg:text-left">
              <p className="text-lg lg:text-xl font-medium text-[#FFB800] italic leading-relaxed">
                "Ser autodidata não significa estudar sozinho sem rumo, e sim assumir a responsabilidade pelo próprio resultado. — Vivi Morais"
              </p>
            </div>
          </div>
          
        </div>
      </div>
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30">
        <a href="#who-is-this-for" className="text-[#FFB800] hover:text-[#E6A600] transition-colors" aria-label="Próxima seção">
          <ChevronDown className="w-10 h-10 animate-bounce" />
        </a>
      </div>
    </section>
  );
}
