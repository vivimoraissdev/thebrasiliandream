'use client';

import { useState } from 'react';
import { Users, MessageSquare, FileText, Globe2, ChevronDown } from 'lucide-react';

export function Bonus() {
  const [openBonus, setOpenBonus] = useState<number | null>(null);

  return (
    <section id="bonus" className="flex flex-col justify-center py-16 bg-[#0B1220] border-b border-white/5 relative overflow-hidden">
      <div className="absolute right-0 top-1/2 w-1/2 h-1/2 bg-blue-900/10 blur-[150px] rounded-full pointer-events-none"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">Acesso Premium aos Bônus</h2>
          <p className="text-lg text-slate-400 font-light">O guia é a base. O ecossistema é o que garante sua execução.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {[
            { icon: <Users />, title: "Grupo Exclusivo", desc: "Networking com pessoas buscando trabalho internacional" },
            { icon: <MessageSquare />, title: "Sala de Inglês", desc: "Prática de conversação focada em entrevistas" },
            { icon: <FileText />, title: "Checklist", desc: "Passo a passo do que revisar antes de se candidatar" },
            { icon: <Globe2 />, title: "Plataformas", desc: "Sites usados para vagas internacionais além do LinkedIn" }
          ].map((bonus, i) => (
            <div 
              key={i} 
              onClick={() => setOpenBonus(openBonus === i ? null : i)}
              className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-6 bg-gradient-to-br from-white/5 to-transparent border border-white/10 p-4 md:p-6 lg:p-8 rounded-2xl hover:border-white/20 transition-all cursor-pointer md:cursor-default"
            >
              <div className="flex items-center justify-between w-full md:w-auto">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 md:w-14 md:h-14 bg-[#071426] border border-white/10 rounded-xl flex items-center justify-center shrink-0">
                    <div className="text-[#FFB800]">{bonus.icon}</div>
                  </div>
                  <h4 className="text-lg font-bold text-white md:hidden">{bonus.title}</h4>
                </div>
                <div className="md:hidden">
                  <ChevronDown className={`w-5 h-5 text-[#FFB800] transition-transform duration-300 ${openBonus === i ? 'rotate-180' : ''}`} />
                </div>
              </div>
              
              <div className={`w-full md:w-auto mt-2 md:mt-0 transition-all duration-300 overflow-hidden ${openBonus === i ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0 md:max-h-none md:opacity-100'}`}>
                <h4 className="hidden md:block text-xl font-bold text-white mb-2">{bonus.title}</h4>
                <p className="text-slate-400 font-medium text-sm md:text-base leading-relaxed">{bonus.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
