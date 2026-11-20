import { useLocation } from 'react-router-dom';
import { IconeWhatsApp } from './Icones.jsx';
import { linkContato } from '../utils/whatsapp.js';

export default function WhatsAppButton() {
  // no agendamento o botão some no celular para não cobrir os campos do formulário
  const { pathname } = useLocation();
  return (
    <a
      className={`whats-flutuante ${pathname === '/agendar' ? 'whats-discreto' : ''}`}
      href={linkContato()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Falar no WhatsApp"
      title="Falar no WhatsApp"
    >
      <IconeWhatsApp />
    </a>
  );
}
