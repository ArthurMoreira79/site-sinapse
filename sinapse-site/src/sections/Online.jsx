import { Link } from 'react-router-dom';
import { Laptop, ShieldCheck, MapPin } from 'lucide-react';
import { fotoPaisagem } from '../utils/asset.js';
import { TRACO } from '../components/Icones.jsx';

const ITENS = [
  {
    icone: Laptop,
    titulo: 'Só precisa de internet',
    texto: 'A sessão é por vídeo, pelo celular ou pelo computador. O link chega no seu WhatsApp.',
  },
  {
    icone: ShieldCheck,
    titulo: 'Mesma ética, mesmo sigilo',
    texto: 'Segue as normas do Conselho Federal de Psicologia, como no consultório.',
  },
  {
    icone: MapPin,
    titulo: 'De qualquer lugar do Brasil',
    texto: 'Bom para quem mora longe, viaja muito ou prefere ser atendido em casa.',
  },
];

export default function Online() {
  const foto = fotoPaisagem('atendimento-online');
  return (
    <section className="secao secao-alt" aria-labelledby="online-titulo">
      <div className="container dupla">
        <div className="revelar">
          <p className="sobretitulo">Atendimento online</p>
          <h2 id="online-titulo" className="secao-titulo">
            A mesma escuta, de onde você estiver
          </h2>
          <p className="secao-sub">
            Todos os profissionais da Sinapse atendem online. Você escolhe a modalidade na hora de
            agendar e pode alternar entre presencial e online quando precisar.
          </p>
          <ul className="lista-check">
            {ITENS.map(({ icone: Icone, titulo, texto }) => (
              <li key={titulo}>
                <span className="icone-circulo" style={{ background: 'var(--cor-branco)' }}>
                  <Icone strokeWidth={TRACO} aria-hidden="true" />
                </span>
                <span>
                  <strong>{titulo}</strong>
                  <span>{texto}</span>
                </span>
              </li>
            ))}
          </ul>
          <Link to="/agendar?modalidade=online" className="btn btn-primario" style={{ marginTop: 32 }}>
            Agendar sessão online
          </Link>
        </div>
        <figure className="online-foto revelar" style={{ margin: 0, '--atraso': '0.1s' }}>
          <img
            {...foto}
            loading="lazy"
            alt="A psicóloga Marina Duarte, sorrindo, atende online pelo notebook em uma mesa com caderno, caneca e copo d'água"
          />
          <figcaption>Marina Duarte em atendimento online</figcaption>
        </figure>
      </div>
    </section>
  );
}
