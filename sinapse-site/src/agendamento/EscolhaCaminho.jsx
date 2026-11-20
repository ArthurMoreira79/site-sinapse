import { Sparkles, CalendarDays, ArrowRight } from 'lucide-react';
import { TRACO } from '../components/Icones.jsx';

export default function EscolhaCaminho({ onTriagem, onJaSei }) {
  return (
    <div className="caminhos">
      <button type="button" className="caminho" onClick={onTriagem}>
        <span className="icone-circulo">
          <Sparkles strokeWidth={TRACO} aria-hidden="true" />
        </span>
        <span className="caminho-rotulo">Caminho A</span>
        <strong>Não sei com quem agendar</strong>
        <span className="caminho-texto">
          Responda três perguntas rápidas e veja um ou dois profissionais indicados para o seu caso.
        </span>
        <span className="link-seta">
          Fazer a triagem <ArrowRight strokeWidth={1.75} aria-hidden="true" />
        </span>
      </button>

      <button type="button" className="caminho" onClick={onJaSei}>
        <span className="icone-circulo">
          <CalendarDays strokeWidth={TRACO} aria-hidden="true" />
        </span>
        <span className="caminho-rotulo">Caminho B</span>
        <strong>Já sei com quem</strong>
        <span className="caminho-texto">
          Escolha presencial ou online, o profissional, o dia e o horário, e confirme pelo WhatsApp.
        </span>
        <span className="link-seta">
          Ir para a agenda <ArrowRight strokeWidth={1.75} aria-hidden="true" />
        </span>
      </button>
    </div>
  );
}
