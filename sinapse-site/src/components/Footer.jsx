import { Link } from 'react-router-dom';
import { MapPin, Clock, Instagram, BadgeCheck } from 'lucide-react';
import Logo from './Logo.jsx';
import { IconeWhatsApp } from './Icones.jsx';
import contato from '../data/contato.json';
import { linkContato, linkInstagram } from '../utils/whatsapp.js';

export default function Footer() {
  return (
    <>
      <p className="cvv">
        Em sofrimento intenso? Ligue <a href="tel:188">188 (CVV)</a>, 24h, gratuito.
      </p>
      <footer className="footer">
        <div className="container">
          <div className="footer-grid">
            <div>
              <Logo claro />
              <p className="footer-sobre">
                Atendimento psicológico presencial em São Luís e online para todo o Brasil.
              </p>
            </div>

            <div>
              <h3>Endereço</h3>
              <ul className="footer-lista">
                <li>
                  <MapPin strokeWidth={1.5} aria-hidden="true" />
                  <span>
                    {contato.endereco}
                    <br />
                    {contato.bairro}, {contato.cidade}
                  </span>
                </li>
                <li>
                  <Clock strokeWidth={1.5} aria-hidden="true" />
                  <span>{contato.horario}</span>
                </li>
              </ul>
            </div>

            <div>
              <h3>Contato</h3>
              <ul className="footer-lista">
                <li>
                  <IconeWhatsApp style={{ width: 18, height: 18, fill: 'var(--cor-principal)', flexShrink: 0, marginTop: 3 }} />
                  <a href={linkContato()} target="_blank" rel="noopener noreferrer">
                    {contato.whatsappExibicao}
                  </a>
                </li>
                <li>
                  <Instagram strokeWidth={1.5} aria-hidden="true" />
                  <a href={linkInstagram()} target="_blank" rel="noopener noreferrer">
                    @{contato.instagram}
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3>Clínica</h3>
              <ul className="footer-lista">
                <li>
                  <BadgeCheck strokeWidth={1.5} aria-hidden="true" />
                  <span>
                    Responsável técnica: {contato.responsavelTecnica}
                    <br />
                    {contato.crpResponsavel} (fictício)
                  </span>
                </li>
              </ul>
              <p style={{ marginTop: 14 }}>
                <Link to="/privacidade">Política de privacidade (LGPD)</Link>
              </p>
            </div>
          </div>

          <div className="footer-base">
            <span>
              Projeto demonstrativo: a clínica, os profissionais e os registros no CRP são fictícios.
            </span>
            <span>
              Site por{' '}
              <a href={contato.github} target="_blank" rel="noopener noreferrer">
                {contato.autor}
              </a>
            </span>
          </div>
        </div>
      </footer>
    </>
  );
}
