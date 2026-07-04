
import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Política de Privacidade | Guia Trabalhe na Gringa',
  description: 'Política de privacidade do Guia Trabalhe na Gringa.',
};

export default function Privacy() {
  return (
    <div className="min-h-screen bg-[#0B1220] text-slate-300 font-sans p-8">
      <div className="max-w-3xl mx-auto bg-[#071426] p-8 md:p-12 rounded-3xl border border-white/10 shadow-2xl">
        <Link href="/" className="inline-flex items-center text-[#00C853] hover:text-[#00E65F] mb-8 font-medium transition-colors">
          &larr; Voltar para a página inicial
        </Link>
        <h1 className="text-3xl font-bold text-white mb-6">Política de Privacidade</h1>
        <div className="space-y-6 text-sm leading-relaxed text-slate-400">
          <p>
            A sua privacidade é importante para nós. É política do Trabalhe na Gringa respeitar a sua privacidade em relação a qualquer informação sua que possamos coletar no site Trabalhe na Gringa e outros sites que possuímos e operamos.
          </p>
          <h2 className="text-xl text-white font-semibold mt-8 mb-4">1. Coleta de Dados</h2>
          <p>
            Solicitamos informações pessoais apenas quando realmente precisamos delas para lhe fornecer um serviço. Fazemo-lo por meios justos e legais, com o seu conhecimento e consentimento. Também informamos por que estamos coletando e como será usado.
          </p>
          <h2 className="text-xl text-white font-semibold mt-8 mb-4">2. Uso da Informação</h2>
          <p>
            Apenas retemos as informações coletadas pelo tempo necessário para fornecer o serviço solicitado. Quando armazenamos dados, protegemos dentro de meios comercialmente aceitáveis para evitar perdas e roubos, bem como acesso, divulgação, cópia, uso ou modificação não autorizados.
          </p>
          <h2 className="text-xl text-white font-semibold mt-8 mb-4">3. Compartilhamento</h2>
          <p>
            Não compartilhamos informações de identificação pessoal publicamente ou com terceiros, exceto quando exigido por lei.
          </p>
          <h2 className="text-xl text-white font-semibold mt-8 mb-4">4. Contato</h2>
          <p>
            Se você tiver alguma dúvida sobre como lidamos com dados do usuário e informações pessoais, sinta-se à vontade para entrar em contato conosco através do email: suporte@trabalhenagringa.com.br.
          </p>
        </div>
      </div>
    </div>
  );
}
