import { Link } from 'react-router-dom';
import { asset } from '../utils/asset.js';
import RedeSinapses from '../components/RedeSinapses.jsx';

export default function Chamada() {
  return (
    <section className="secao chamada" aria-labelledby="chamada-titulo">
      <RedeSinapses />
      <div className="container chamada-caixa revelar">
        <img src={asset('img/simbolo-lavanda.png')} alt="" width="72" height="56" loading="lazy" />
        <h2 id="chamada-titulo" className="secao-titulo">
          Dar o primeiro passo já é cuidar de você
        </h2>
        <p className="secao-sub">
          Agende sua primeira conversa. Se não souber com quem, a triagem ajuda a escolher.
        </p>
        <div className="hero-acoes">
          <Link to="/agendar" className="btn btn-primario">
            Agendar primeira consulta
          </Link>
          <Link to="/agendar?caminho=triagem" className="btn btn-secundario" style={{ background: '#fff' }}>
            Fazer a triagem
          </Link>
        </div>
      </div>
    </section>
  );
}
