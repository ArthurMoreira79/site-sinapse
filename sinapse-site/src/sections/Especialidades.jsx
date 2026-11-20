import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';
import especialidades from '../data/especialidades.json';
import { IconeEspecialidade, TRACO } from '../components/Icones.jsx';

export default function Especialidades() {
  return (
    <section id="especialidades" className="secao secao-alt" aria-labelledby="esp-titulo">
      <div className="container">
        <header className="secao-cabecalho revelar">
          <p className="sobretitulo">Para quem é</p>
          <h2 id="esp-titulo" className="secao-titulo">
            Especialidades
          </h2>
          <p className="secao-sub">
            Atendemos questões do dia a dia e momentos mais difíceis. Se você não se encontrou na lista,
            fale com a gente mesmo assim.
          </p>
        </header>

        <div className="grade-cards">
          {especialidades.map((e, i) => (
            <article key={e.id} className="card-esp revelar" style={{ '--atraso': `${(i % 4) * 0.06}s` }}>
              <span className="icone-circulo">
                <IconeEspecialidade nome={e.icone} />
              </span>
              <h3>{e.nome}</h3>
              <p>{e.frase}</p>
            </article>
          ))}
          <Link
            to="/agendar?caminho=triagem"
            className="card-esp card-triagem revelar"
            style={{ '--atraso': '0.18s' }}
          >
            <span className="icone-circulo">
              <Sparkles strokeWidth={TRACO} aria-hidden="true" />
            </span>
            <h3>Não sabe por onde começar?</h3>
            <p>Responda três perguntas rápidas e veja quem pode te ajudar.</p>
            <span className="link-seta">
              Fazer a triagem <ArrowRight strokeWidth={1.75} aria-hidden="true" />
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
