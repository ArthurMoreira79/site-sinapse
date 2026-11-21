import abordagens from '../data/abordagens.json';
import equipe from '../data/equipe.json';
import RedeSinapses from '../components/RedeSinapses.jsx';

const nomes = (lista) =>
  lista.length <= 1 ? lista.join('') : `${lista.slice(0, -1).join(', ')} e ${lista[lista.length - 1]}`;

export default function Abordagens() {
  return (
    <section className="secao abordagens" aria-labelledby="abordagens-titulo">
      <RedeSinapses />
      <div className="container">
        <header className="secao-cabecalho centro revelar">
          <p className="sobretitulo">Abordagens</p>
          <h2 id="abordagens-titulo" className="secao-titulo">
            Caminhos diferentes para o mesmo cuidado
          </h2>
          <p className="secao-sub">
            Cada abordagem é uma forma de conduzir a terapia. Todas têm base científica. O mais
            importante é você se sentir à vontade com o profissional.
          </p>
        </header>

        <div className="grade-abordagens">
          {abordagens.map((a, i) => {
            const quem = equipe.filter((p) => p.abordagens.includes(a.id)).map((p) => p.primeiroNome);
            return (
              <article key={a.id} className="card-abordagem revelar" style={{ '--atraso': `${(i % 2) * 0.08}s` }}>
                <span className="sigla">{a.sigla}</span>
                <h3>{a.nome}</h3>
                <p>{a.texto}</p>
                <p className="quem">
                  Na equipe: <strong>{nomes(quem)}</strong>
                </p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
