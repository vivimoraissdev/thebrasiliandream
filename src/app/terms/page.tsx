
import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Termos de Uso | Fluência Autodidata',
  description: 'Termos de uso do Fluência Autodidata.',
};

export default function Terms() {
  return (
    <div className="min-h-screen bg-[#0B1220] text-slate-300 font-sans p-8">
      <div className="max-w-3xl mx-auto bg-[#071426] p-8 md:p-12 rounded-3xl border border-white/10 shadow-2xl">
        <Link href="/" className="inline-flex items-center text-[#FFB800] hover:text-[#E6A600] mb-8 font-medium transition-colors">
          &larr; Voltar para a página inicial
        </Link>
        <h1 className="text-3xl font-bold text-white mb-6">Termos de Uso</h1>
        <div className="space-y-6 text-sm leading-relaxed text-slate-400">
          <p>
            Bem-vindo ao The Brasilian Dream. Ao acessar nosso site e adquirir nossos materiais, você concorda em cumprir e ser regido pelos seguintes termos e condições de uso.
          </p>
          <h2 className="text-xl text-white font-semibold mt-8 mb-4">1. Uso do Conteúdo</h2>
          <p>
            Todo o conteúdo presente neste site, incluindo o Ebook Fluência Autodidata e os bônus oferecidos, é de propriedade exclusiva e protegido por leis de direitos autorais. Você não pode reproduzir, distribuir ou revender o material sem nossa autorização expressa.
          </p>
          <h2 className="text-xl text-white font-semibold mt-8 mb-4">2. Garantia de Satisfação</h2>
          <p>
            Oferecemos uma garantia incondicional de 7 dias. Se você não estiver satisfeito com o material por qualquer motivo dentro desse período, poderá solicitar o reembolso integral.
          </p>
          <h2 className="text-xl text-white font-semibold mt-8 mb-4">3. Resultados</h2>
          <p>
            Os resultados podem variar de pessoa para pessoa. Fornecemos as informações e estratégias, mas o sucesso depende do esforço individual, dedicação e aplicação do método por parte do aluno. Não garantimos a contratação imediata, visto que o mercado e o esforço individual são variáveis incontroláveis.
          </p>
          <h2 className="text-xl text-white font-semibold mt-8 mb-4">4. Suporte</h2>
          <p>
            Para dúvidas e solicitações de reembolso, por favor entre em contato através do nosso email oficial: suporte@vivimoraiss.com.
          </p>
        </div>
      </div>
    </div>
  );
}
