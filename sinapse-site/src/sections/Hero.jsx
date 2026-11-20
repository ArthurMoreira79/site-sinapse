import { Link } from 'react-router-dom';
import { Video, Lock, BadgeCheck, Leaf } from 'lucide-react';
import { fotoPaisagem } from '../utils/asset.js';
import { TRACO } from '../components/Icones.jsx';

const SELOS = [
  { icone: Video, texto: 'Presencial e online' },
  { icone: Lock, texto: 'Sigilo garantido' },
  { icone: BadgeCheck, texto: 'Psicólogos registrados no CRP' },
];

// pequena rede de "sinapses" atrás da foto
const NOS = [
  [60, 70], [190, 30], [330, 90], [250, 190], [370, 250], [120, 260], [300, 380], [180, 450], [380, 470],
];
const LIGACOES = [
  [0, 1], [1, 2], [1, 3], [2, 3], [3, 4], [3, 5], [0, 5], [4, 6], [5, 6], [6, 7], [6, 8], [4, 8],
];

export default function Hero() {
  const foto = fotoPaisagem('consultorio');
  return (
    <section className="hero" aria-labelledby="hero-titulo">
      <div className="container hero-grid">
        <div className="hero-texto">
          <p className="sobretitulo">Clínica de Psicologia · São Luís</p>
          <h1 id="hero-titulo" className="hero-titulo">
            Um espaço seguro para cuidar da sua{' '}
            <em>
              mente.
              <svg viewBox="0 0 100 12" preserveAspectRatio="none" aria-hidden="true">
                <path d="M2 8 C 22 2, 40 11, 60 6 S 90 3, 98 7" pathLength="1" />
              </svg>
            </em>
          </h1>
          <p className="hero-sub">
            Atendimento psicológico presencial em São Luís e online para todo o Brasil.
          </p>
          <div className="hero-acoes">
            <Link to="/agendar" className="btn btn-primario">
              Agendar primeira consulta
            </Link>
            <a href="#equipe" className="btn btn-secundario">
              Conhecer a equipe
            </a>
          </div>
          <ul className="selos" aria-label="Diferenciais">
            {SELOS.map(({ icone: Icone, texto }) => (
              <li key={texto}>
                <Icone strokeWidth={TRACO} aria-hidden="true" />
                {texto}
              </li>
            ))}
          </ul>
        </div>

        <div className="hero-foto">
          <svg className="hero-rede" viewBox="0 0 420 500" aria-hidden="true" focusable="false">
            {LIGACOES.map(([a, b]) => (
              <path key={`${a}-${b}`} d={`M${NOS[a][0]} ${NOS[a][1]} L${NOS[b][0]} ${NOS[b][1]}`} />
            ))}
            {NOS.map(([x, y]) => (
              <circle key={`${x}-${y}`} cx={x} cy={y} r="4.5" />
            ))}
          </svg>
          <img
            {...foto}
            alt="Consultório da Sinapse: duas poltronas claras frente a frente, mesinha com água e lenços, plantas e luz natural entrando pela cortina"
            fetchpriority="high"
          />
          <div className="hero-foto-selo">
            <span className="icone-circulo">
              <Leaf strokeWidth={TRACO} aria-hidden="true" />
            </span>
            <span>
              <strong>Primeira sessão</strong>
              uma conversa de acolhimento, sem pressa
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
