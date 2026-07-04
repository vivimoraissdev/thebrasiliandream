
import Image from 'next/image';
import { ChevronDown } from 'lucide-react';
import dolarRealImg from '../assets/dolar-real.webp';

export function Problem() {
  return (
    <section id="problem" className="py-16 md:py-24 lg:min-h-screen flex flex-col justify-center bg-slate-950 relative">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <div className="lg:w-1/2">
            <div className="relative flex justify-center">
              <Image 
                src={dolarRealImg} 
                alt="Dólares" 
                className="w-full max-w-md h-auto object-contain drop-shadow-2xl"
              />
            </div>
          </div>
          
          <div className="lg:w-1/2 space-y-8">
            <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight">
              Você já fez as contas de quanto o seu salário atual vale <span className="text-red-400 border-b-2 border-red-400/30">em dólar?</span>
            </h2>
            
            <div className="space-y-6 text-lg text-gray-300 leading-relaxed">
              <p className="text-xl">
                É frustrante. Você <span className="text-white font-semibold">estuda, faz faculdade, entrega resultados incríveis</span> e trabalha 40 horas por semana. Mas no final do mês, percebe que seu esforço muitas vezes não é recompensado financeiramente na mesma proporção.
              </p>
              <p className="text-xl leading-relaxed">
                Durante muito tempo eu achei normal estudar, trabalhar duro e ainda sentir que meu salário <span className="text-white font-semibold">nunca acompanhava meu esforço</span>.
                Só depois que comecei a olhar para <span className="text-[#00C853] font-bold">oportunidades internacionais</span> percebi que o problema não era minha capacidade profissional.
                Era o <span className="text-white font-bold underline decoration-white/20 underline-offset-4">mercado onde eu estava competindo.</span>
              </p>
              <p className="text-xl">
                O mercado brasileiro <strong className="text-red-400 font-bold">está saturado</strong>. Salários estagnados, empresas exigindo cada vez mais por cada vez menos, e aquela sensação constante de que você <span className="text-white font-bold">nunca vai ser valorizado como realmente merece.</span>
              </p>
              <div className="p-8 bg-slate-800/50 border border-slate-700/50 rounded-xl shadow-lg">
                <p className="text-emerald-300 font-bold text-2xl leading-relaxed">
                  A verdade é que seu salário deixa de depender exclusivamente da realidade econômica brasileira. Você passa a disputar oportunidades em mercados que tradicionalmente oferecem <span className="text-white underline decoration-emerald-500 underline-offset-4">remunerações mais altas, ganhando em moeda forte.</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30">
        <a href="#history" className="text-[#00C853] hover:text-[#00E65F] transition-colors" aria-label="Próxima seção">
          <ChevronDown className="w-10 h-10 animate-bounce" />
        </a>
      </div>
    </section>
  );
}
