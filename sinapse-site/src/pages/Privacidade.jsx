import { Link } from 'react-router-dom';
import { useTitulo } from '../hooks/useTitulo.js';
import contato from '../data/contato.json';
import { linkContato } from '../utils/whatsapp.js';

export default function Privacidade() {
  useTitulo('Política de privacidade — Sinapse', 'Como a Sinapse trata os seus dados pessoais, de acordo com a LGPD.');

  return (
    <div className="pagina">
      <div className="container texto-legal">
        <h1 className="pagina-titulo">Política de privacidade</h1>
        <p className="pagina-sub">
          Projeto demonstrativo: a Sinapse é uma clínica fictícia. O texto abaixo mostra como um site de
          clínica pode explicar o uso de dados de acordo com a Lei Geral de Proteção de Dados (Lei 13.709/2018).
        </p>

        <h2>Quais dados pedimos</h2>
        <p>
          No agendamento pedimos só o necessário para marcar a consulta: nome, WhatsApp, e-mail e se é a
          sua primeira consulta. Não pedimos que você descreva o que está sentindo. Na triagem, você
          escolhe apenas uma área geral, como “ansiedade e estresse”.
        </p>

        <h2>Para onde os dados vão</h2>
        <p>
          O site não tem servidor nem banco de dados. Ao confirmar, o seu próprio WhatsApp abre com a
          mensagem pronta, e só é enviada se você tocar em enviar. No seu navegador fica guardado apenas o
          profissional, o dia e o horário escolhidos, para esse horário aparecer como ocupado. Nada disso
          inclui seu nome ou contato.
        </p>

        <h2>Sigilo das sessões</h2>
        <p>
          O que é dito nas sessões é protegido pelo sigilo profissional previsto no Código de Ética
          Profissional do Psicólogo. Prontuários ficam guardados com acesso restrito ao profissional
          responsável.
        </p>

        <h2>Seus direitos</h2>
        <ul>
          <li>Saber quais dados seus a clínica tem e pedir uma cópia;</li>
          <li>Corrigir dados incompletos ou desatualizados;</li>
          <li>Pedir a exclusão dos dados que não sejam obrigatórios por lei;</li>
          <li>Retirar o consentimento a qualquer momento.</li>
        </ul>

        <h2>Contato</h2>
        <p>
          Para qualquer pedido sobre seus dados, fale pelo{' '}
          <a href={linkContato()} target="_blank" rel="noopener noreferrer">
            WhatsApp {contato.whatsappExibicao}
          </a>
          . Responsável técnica: {contato.responsavelTecnica}, {contato.crpResponsavel} (fictício).
        </p>

        <p style={{ marginTop: 40 }}>
          <Link to="/" className="btn btn-secundario">
            Voltar ao início
          </Link>
        </p>
      </div>
    </div>
  );
}
