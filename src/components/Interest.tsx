
import Image from 'next/image';
import { Heart, MessageCircle, MessageSquare, Share2, ChevronDown } from 'lucide-react';
import people1Img from '../assets/people1.webp';
import people2Img from '../assets/people2.webp';
import people3Img from '../assets/people3.webp';
import people4Img from '../assets/people4.webp';

export function Interest() {
  return (
    <section id="interest" className="py-16 md:py-24 lg:min-h-screen flex flex-col justify-center bg-[#0B1220] border-b border-white/5 relative">
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="text-3xl lg:text-5xl font-bold text-white mb-6">
            O interesse que esse assunto gerou
          </h2>
          <p className="text-xl text-slate-400 font-light">
            Quando compartilhei minha história, não esperava a repercussão que ela teria.
          </p>
        </div>

        {/* DMs e Comentários Grid */}
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <Image src={people1Img} alt="Comentário" className="rounded-2xl border border-white/10 shadow-xl opacity-90 hover:opacity-100 hover:scale-[1.02] transition-all duration-300 w-full h-auto object-cover" />
          <Image src={people2Img} alt="Comentário" className="rounded-2xl border border-white/10 shadow-xl opacity-90 hover:opacity-100 hover:scale-[1.02] transition-all duration-300 w-full h-auto object-cover" />
          <Image src={people3Img} alt="Comentário" className="rounded-2xl border border-white/10 shadow-xl opacity-90 hover:opacity-100 hover:scale-[1.02] transition-all duration-300 w-full h-auto object-cover" />
          <Image src={people4Img} alt="Comentário" className="rounded-2xl border border-white/10 shadow-xl opacity-90 hover:opacity-100 hover:scale-[1.02] transition-all duration-300 w-full h-auto object-cover" />
        </div>

        {/* Estatísticas Virais */}
        <div className="max-w-5xl mx-auto bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-sm grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x divide-white/10">
          <div className="flex flex-col items-center justify-center space-y-2">
            <Heart className="w-8 h-8 text-[#00C853] mb-2" />
            <span className="text-3xl lg:text-4xl font-bold text-white">+14.000</span>
            <span className="text-sm text-slate-400 font-medium uppercase tracking-widest">Curtidas</span>
          </div>
          <div className="flex flex-col items-center justify-center space-y-2">
            <MessageCircle className="w-8 h-8 text-[#00C853] mb-2" />
            <span className="text-3xl lg:text-4xl font-bold text-white">+530</span>
            <span className="text-sm text-slate-400 font-medium uppercase tracking-widest">Comentários</span>
          </div>
          <div className="flex flex-col items-center justify-center space-y-2">
            <MessageSquare className="w-8 h-8 text-[#00C853] mb-2" />
            <span className="text-3xl lg:text-4xl font-bold text-white">Centenas</span>
            <span className="text-sm text-slate-400 font-medium uppercase tracking-widest">de Mensagens Privadas</span>
          </div>
          <div className="flex flex-col items-center justify-center space-y-2">
            <Share2 className="w-8 h-8 text-[#00C853] mb-2" />
            <span className="text-3xl lg:text-4xl font-bold text-white">Milhares</span>
            <span className="text-sm text-slate-400 font-medium uppercase tracking-widest">de Pessoas Querendo Aprender</span>
          </div>
        </div>
      </div>
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30">
        <a href="#problem" className="text-[#00C853] hover:text-[#00E65F] transition-colors" aria-label="Próxima seção">
          <ChevronDown className="w-10 h-10 animate-bounce" />
        </a>
      </div>
    </section>
  );
}
