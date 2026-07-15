
import Image from 'next/image';
import { ChevronDown } from 'lucide-react';
import dolarRealImg from '../assets/dolar-real.png';

export function Problem() {
  return (
    <section id="problem" className="py-16 md:py-24 lg:min-h-screen flex flex-col justify-center bg-slate-950 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <div className="lg:w-1/2">
            <div className="relative flex justify-center">
              <Image 
                src={dolarRealImg} 
                alt="Dólares" 
                className="w-full max-w-md lg:max-w-xl xl:max-w-2xl h-auto object-contain drop-shadow-2xl"
              />
            </div>
          </div>
          
          <div className="lg:w-1/2 space-y-8">
            <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight">
              Você já parou para pensar quantas oportunidades já perdeu por <span className="text-red-400 border-b-2 border-red-400/30">não falar inglês?</span>
            </h2>
            
            <div className="space-y-6 text-lg text-gray-300 leading-relaxed">
              <p className="text-xl">
                Durante muito tempo, eu acreditava que para aprender inglês por meio de uma verdadeira imersão cultural <span className="text-white font-semibold">seria necessário sair do Brasil</span>, morar em outro país e me afastar da minha família.
              </p>
              <p className="text-xl leading-relaxed">
                Mas a realidade é que você não precisa cruzar o oceano. Depois de muito tentar, percebi que é perfeitamente possível <span className="text-[#FFB800] font-bold">criar uma imersão cultural de forma autodidata</span>, dentro do seu próprio quarto e em qualquer lugar do mundo.
              </p>
              <p className="text-xl">
                O mercado está cheio de <strong className="text-red-400 font-bold">métodos ultrapassados</strong>. Eles fazem você acreditar que precisa focar anos em gramática infinita e repetição robótica antes de conseguir se comunicar de verdade.
              </p>
              <div className="p-8 bg-slate-800/50 border border-slate-700/50 rounded-xl shadow-lg">
                <p className="text-yellow-300 font-bold text-2xl leading-relaxed">
                  A verdade é que a fluência deixa de depender de professores quando você aprende a usar o ambiente a seu favor. Você passa a <span className="text-white underline decoration-yellow-500 underline-offset-4">consumir e produzir conteúdo em inglês no seu próprio ritmo.</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30">
        <a href="#history" className="text-[#FFB800] hover:text-[#E6A600] transition-colors" aria-label="Próxima seção">
          <ChevronDown className="w-10 h-10 animate-bounce" />
        </a>
      </div>
    </section>
  );
}
