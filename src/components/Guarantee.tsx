
import Image from 'next/image';
import garantiaImg from '../assets/garantia.webp';
import secureCheckoutImg from '../assets/seguro.png';

export function Guarantee() {
  return (
    <section id="guarantee" className="flex flex-col justify-center py-16 bg-[#071426] border-t border-white/5 relative">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-10">
          <div className="md:w-1/3 flex justify-center">
            <Image 
              src={garantiaImg}
              alt="Garantia Incondicional de 7 Dias" 
              className="w-48 h-auto drop-shadow-2xl"
            />
          </div>
          <div className="md:w-2/3 text-center md:text-left space-y-4">
            <h3 className="text-3xl font-bold text-white">Risco Zero: Garantia Incondicional de 7 Dias</h3>
            <p className="text-slate-300 text-lg leading-relaxed mb-6">
              Você tem 7 dias de garantia incondicional. Acesse o guia, leia o material e veja o passo a passo por dentro. Se decidir que o meu caminho não é para você, basta solicitar e seu investimento será 100% reembolsado.
            </p>
            
            <div className="pt-6">
              <Image 
                src={secureCheckoutImg}
                alt="Checkout Seguro e Meios de Pagamento" 
                className="w-full max-w-md mx-auto md:mx-0 opacity-90 drop-shadow-2xl"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
