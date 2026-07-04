
import { CheckCircle2, Circle, X, ChevronDown } from 'lucide-react';

export function WhoIsThisFor() {
  return (
    <section id="who-is-this-for" className="py-16 lg:py-24 bg-slate-950 relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-5 z-0 mix-blend-overlay pointer-events-none"></div>
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-3">
            A pergunta que mais recebo é simples: <br /> <span className="text-[#00C853]">"Mas isso funciona para mim?"</span>
          </h2>
          <p className="text-lg text-slate-400 font-medium">
            E a minha resposta é: <span className="text-[#00C853]">"Você quer ganhar em dólar trabalhando de casa?"</span>
          </p>
        </div>

        <div className="flex flex-col md:grid md:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto mt-8">
          
          {/* Box 1 - É para você */}
          <div className="bg-slate-800/60 border border-emerald-500/30 rounded-3xl p-4 md:p-6 lg:p-8 shadow-2xl relative">
            <div className="absolute -top-5 left-1/2 -translate-x-1/2 md:translate-x-0 md:left-8 bg-[#00C853] text-[#0B1220] px-5 py-1.5 rounded-full font-bold text-sm shadow-[0_0_20px_rgba(0,200,83,0.3)] whitespace-nowrap">
              É para você se:
            </div>
            <ul className="space-y-3 md:space-y-4 mt-4">
              {[
                "Já tem experiência profissional (qualquer área)",
                "Quer ganhar em moeda forte",
                "Quer trabalhar remotamente",
                "Está cansado do mercado brasileiro",
                "Quer construir carreira internacional"
              ].map((item, idx) => (
                <li key={idx} className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#00C853] shrink-0" />
                  <span className="text-white font-medium text-base">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Box 2 - NÃO precisa */}
          <div className="bg-[#0B1220] border border-white/5 rounded-3xl p-4 md:p-6 lg:p-8 shadow-xl relative">
            <div className="absolute -top-5 left-1/2 -translate-x-1/2 md:translate-x-0 md:left-8 bg-slate-700 text-white px-5 py-1.5 rounded-full font-bold text-sm whitespace-nowrap">
              Você NÃO precisa de:
            </div>
            <ul className="space-y-3 md:space-y-4 mt-4">
              {[
                "Ser programador",
                "Morar fora do Brasil",
                "Falar inglês perfeito",
                "Ter feito intercâmbio",
                "Ter diploma internacional"
              ].map((item, idx) => (
                <li key={idx} className="flex items-center gap-3">
                  <Circle className="w-4 h-4 text-slate-500 shrink-0" strokeWidth={3} />
                  <span className="text-slate-300 text-base">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Box 3 - NÃO é para você */}
          <div className="bg-[#0B1220] border border-red-500/10 rounded-3xl p-4 md:p-6 lg:p-8 shadow-xl relative opacity-80">
            <div className="absolute -top-5 left-1/2 -translate-x-1/2 md:translate-x-0 md:left-8 bg-red-500/10 text-red-400 px-5 py-1.5 rounded-full font-bold text-sm border border-red-500/20 whitespace-nowrap">
              Mas não é para você se:
            </div>
            <ul className="space-y-3 md:space-y-4 mt-4">
              {[
                "Quer dinheiro rápido",
                "Acredita que vai ganhar dinheiro sem se candidatar a vagas",
                "Não quer passar por processos seletivos",
                "Não quer estudar nem se preparar para entrevistas",
                "Espera resultado sem ação"
              ].map((item, idx) => (
                <li key={idx} className="flex items-center gap-3">
                  <X className="w-5 h-5 text-red-500/70 shrink-0" strokeWidth={3} />
                  <span className="text-slate-400 text-base">{item}</span>
                </li>
              ))}
            </ul>
          </div>

        </div>

        <div className="max-w-3xl mx-auto mt-20 text-center px-4">
          <p className="text-xl md:text-2xl text-slate-300 font-medium leading-relaxed">
            Você não precisa descobrir tudo sozinho.
            <span className="text-white font-bold block mt-3">
              Eu organizei o caminho que eu gostaria de ter seguido.
            </span>
            <span className="text-[#00C853] font-bold block mt-4">
              Veja tudo o que você vai receber:
            </span>
          </p>
        </div>

      </div>
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30">
        <a href="#offer" className="text-[#00C853] hover:text-[#00E65F] transition-colors" aria-label="Próxima seção">
          <ChevronDown className="w-10 h-10 animate-bounce" />
        </a>
      </div>
    </section>
  );
}
