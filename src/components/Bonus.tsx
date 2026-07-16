import { Gift, Target, MessageSquare, FileText, Video, Users, Zap } from 'lucide-react';
import { FlipClock } from './FlipClock';

export function Bonus() {

  return (
    <section id="bonus" className="flex flex-col justify-center py-16 bg-[#0B1220] border-b border-white/5 relative overflow-hidden">
      <div className="absolute right-0 top-1/2 w-1/2 h-1/2 bg-blue-900/10 blur-[150px] rounded-full pointer-events-none"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">Bônus especial para os primeiros compradores</h2>
          <p className="text-lg text-slate-400 font-light">O e-book é a base. Mas os bônus são os aceleradores do seu aprendizado.</p>
        </div>

        <div className="max-w-4xl mx-auto bg-gradient-to-br from-[#071426] to-transparent border border-[#FFB800]/20 p-6 md:p-10 rounded-3xl relative overflow-hidden">
          {/* Decorative glow */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#FFB800]/10 blur-[100px] rounded-full pointer-events-none"></div>
          
          <h3 className="text-2xl md:text-3xl font-extrabold text-[#FFB800] mb-8 flex items-center gap-3">
            <Gift className="w-6 h-6 md:w-8 md:h-8 shrink-0" /> Comunidade Imersão Brazilian — O que você vai viver em 30 dias:
          </h3>
          
          <ul className="space-y-4 text-slate-300 font-medium text-lg md:text-xl leading-relaxed relative z-10">
            <li className="flex items-start gap-3">
              <Target className="w-6 h-6 mt-0.5 shrink-0 text-[#FFB800]" />
              <span><strong className="text-white">Encontros semanais ao vivo</strong> com a Victoria para praticar conversação.</span>
            </li>
            <li className="flex items-start gap-3">
              <MessageSquare className="w-6 h-6 mt-0.5 shrink-0 text-[#FFB800]" />
              <span><strong className="text-white">Grupo exclusivo no WhatsApp</strong> com interação diária e suporte direto.</span>
            </li>
            <li className="flex items-start gap-3">
              <FileText className="w-6 h-6 mt-0.5 shrink-0 text-[#FFB800]" />
              <span><strong className="text-white">Feedback personalizado</strong> sobre sua pronúncia, fluência e gramática.</span>
            </li>
            <li className="flex items-start gap-3">
              <Video className="w-6 h-6 mt-0.5 shrink-0 text-[#FFB800]" />
              <span><strong className="text-white">Acesso às gravações</strong> de todas as sessões para revisar quando quiser.</span>
            </li>
            <li className="flex items-start gap-3">
              <Users className="w-6 h-6 mt-0.5 shrink-0 text-[#FFB800]" />
              <span><strong className="text-white">Networking de alto nível</strong> com outros alunos focados no mesmo objetivo.</span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-6 h-6 mt-0.5 shrink-0 text-[#FFB800]" />
              <span><strong className="text-white">Correções em tempo real</strong> e direcionamento prático durante as sessões ao vivo.</span>
            </li>
          </ul>

          <div className="mt-8 mb-4 border-t border-white/10 pt-8 relative z-10 flex flex-col items-center">
            <h4 className="text-[#FFB800] font-bold text-lg md:text-xl text-center mb-2">A oferta especial se encerra em:</h4>
            <FlipClock />
          </div>
        </div>
      </div>
    </section>
  );
}
