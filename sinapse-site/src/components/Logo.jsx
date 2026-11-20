import { Link } from 'react-router-dom';
import { asset } from '../utils/asset.js';

/** Símbolo da logo (cérebro + infinito) com o nome em Montserrat, para ficar em português e nítido. */
export default function Logo({ claro = false, onClick }) {
  return (
    <Link to="/" className={`logo ${claro ? 'logo-claro' : ''}`} onClick={onClick} aria-label="Sinapse, Clínica de Psicologia: página inicial">
      <img
        src={asset(claro ? 'img/simbolo-branco.png' : 'img/simbolo-marinho.png')}
        alt=""
        width="46"
        height="35"
      />
      <span className="logo-texto" aria-hidden="true">
        <span className="logo-nome">SINAPSE</span>
        <span className="logo-sub">Clínica de Psicologia</span>
      </span>
    </Link>
  );
}
