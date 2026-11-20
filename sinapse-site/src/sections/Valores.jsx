import { Link } from 'react-router-dom';
import { Check, Receipt } from 'lucide-react';
import valores from '../data/valores.json';
import { formatarMoeda } from '../utils/formato.js';
import { TRACO } from '../components/Icones.jsx';

export default function Valores() {
  return (
    <section id="valores" className="secao" aria-labelledby="valores-titulo">
      <div className="container">
        <header className="secao-cabecalho centro revelar">
          <p className="sobretitulo">Valores</p>
          <h2 id="valores-titulo" className="secao-titulo">
            Valores claros, sem surpresa
          </h2>
          <p className="secao-sub">O mesmo valor para presencial e online.</p>
        </header>

        <div className="grade-valores">
          {valores.planos.map((v, i) => (
            <article
              key={v.id}
              className={`card-valor revelar ${v.destaque ? 'destaque' : ''}`}
              style={{ '--atraso': `${i * 0.08}s` }}
            >
              {v.destaque && <span className="card-valor-selo">Mais escolhido</span>}
              <h3>{v.nome}</h3>
              <p className="preco">
                {formatarMoeda(v.preco)}
                <small>{v.unidade}</small>
              </p>
              <p className="card-valor-detalhe">{v.detalhe}</p>
              <ul>
                {v.itens.map((item) => (
                  <li key={item}>
                    <Check strokeWidth={2} aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
              <Link
                to={v.id === 'casal' ? '/agendar?sessao=casal' : '/agendar'}
                className={`btn btn-bloco ${v.destaque ? 'btn-primario' : 'btn-secundario'}`}
              >
                {v.id === 'pacote' ? 'Começar pela primeira sessão' : 'Agendar'}
              </Link>
            </article>
          ))}
        </div>

        <p className="nota-reembolso">
          <Receipt strokeWidth={TRACO} aria-hidden="true" />
          Emitimos recibo para reembolso do seu plano de saúde. Valores fictícios.
        </p>
      </div>
    </section>
  );
}
