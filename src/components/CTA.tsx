
import { CheckoutButton } from './CheckoutButton';

export function CTA() {
  return (
    <section id="cta" className="flex flex-col justify-center py-20 relative overflow-hidden">
      {/* Deep Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#00C853]/10 to-[#0B1220] z-0"></div>
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-10 z-0 mix-blend-overlay"></div>

      <div className="container mx-auto px-6 relative z-10 text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl lg:text-6xl font-bold text-white mb-8 leading-tight tracking-tight">
            A história que eu contei no Instagram <span className="text-[#00C853]">também pode ser a sua.</span>
          </h2>
          <p className="text-xl text-slate-400 font-light mb-12 max-w-2xl mx-auto">
            Uma vaga certa pode mudar completamente sua renda, sua carreira e as possibilidades que você enxerga para o seu futuro.
          </p>

          <CheckoutButton 
            sectionName="final"
            className="inline-flex px-12 py-6 bg-[#00C853] hover:bg-[#00E65F] text-[#0B1220] font-extrabold rounded-2xl transition-all duration-300 text-xl items-center justify-center shadow-[0_0_50px_rgba(0,200,83,0.3)] hover:shadow-[0_0_80px_rgba(0,200,83,0.5)] transform hover:-translate-y-1"
          >
            QUERO MEU GUIA AGORA
          </CheckoutButton>
        </div>
      </div>
    </section>
  );
}
