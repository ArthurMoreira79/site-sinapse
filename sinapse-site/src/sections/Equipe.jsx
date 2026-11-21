import { Link } from 'react-router-dom';
import { Video, MapPin } from 'lucide-react';
import equipe from '../data/equipe.json';
import especialidades from '../data/especialidades.json';
import abordagens from '../data/abordagens.json';
import { fotoRetrato } from '../utils/asset.js';
import { TRACO } from '../components/Icones.jsx';

const nomeEsp = (id) => especialidades.find((e) => e.id === id)?.nome;
const siglaAbordagem = (id) => abordagens.find((a) => a.id === id)?.sigla;

export function CardProfissional({ p, indice = 0 }) {
  const foto = fotoRetrato(p);
  return (
    <article className="card-prof revelar" style={{ '--atraso': `${indice * 0.07}s` }}>
      <div className="card-prof-foto">
        <img
          {...foto}
          loading="lazy"
          alt={`Retrato de ${p.nome}`}
        />
        {p.responsavelTecnica && <span className="card-prof-tag">Responsável técnica</span>}
      </div>
      <div className="card-prof-corpo">
        <h3>{p.nome}</h3>
        <p className="crp">
          {p.crp} <abbr title="Nome e registro fictícios, criados para este projeto demonstrativo">(fictício)</abbr>
        </p>
        <p className="card-prof-bio">{p.bio}</p>
        <ul className="chips" aria-label="Especialidades e abordagens">
          {p.especialidades.map((id) => (
            <li key={id} className="chip">
              {nomeEsp(id)}
            </li>
          ))}
          {p.abordagens.map((id) => (
            <li key={id} className="chip chip-lilas">
              {siglaAbordagem(id)}
            </li>
          ))}
        </ul>
        <p className="card-prof-modalidades">
          {p.modalidades.includes('presencial') && (
            <span>
              <MapPin strokeWidth={TRACO} aria-hidden="true" /> Presencial
            </span>
          )}
          <span>
            <Video strokeWidth={TRACO} aria-hidden="true" /> Online
          </span>
        </p>
        <Link to={`/agendar?profissional=${p.id}`} className="btn btn-primario btn-bloco">
          Agendar com {p.primeiroNome}
        </Link>
      </div>
    </article>
  );
}

export default function Equipe() {
  return (
    <section id="equipe" className="secao" aria-labelledby="equipe-titulo">
      <div className="container">
        <header className="secao-cabecalho revelar">
          <p className="sobretitulo">Equipe</p>
          <h2 id="equipe-titulo" className="secao-titulo">
            Quem vai cuidar de você
          </h2>
          <p className="secao-sub">
            Quatro psicólogos com registro no CRP, cada um com seu jeito de conduzir a terapia. Escolha
            quem combina com você ou faça a triagem para receber uma indicação.
          </p>
        </header>
        <div className="grade-equipe">
          {equipe.map((p, i) => (
            <CardProfissional key={p.id} p={p} indice={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
