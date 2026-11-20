import { Sofa, Lock, Accessibility } from 'lucide-react';
import { fotoPaisagem } from '../utils/asset.js';
import { TRACO } from '../components/Icones.jsx';

const ITENS = [
  {
    icone: Sofa,
    titulo: 'Salas pensadas para o conforto',
    texto: 'Luz natural, poltronas confortáveis e isolamento acústico em todos os consultórios.',
  },
  {
    icone: Lock,
    titulo: 'Privacidade do começo ao fim',
    texto: 'Recepção discreta, horários espaçados e prontuários guardados com segurança.',
  },
  {
    icone: Accessibility,
    titulo: 'Acessível',
    texto: 'Prédio com elevador, rampa de acesso e estacionamento no Renascença.',
  },
];

export default function Sobre() {
  const foto = fotoPaisagem('recepcao');
  return (
    <section id="sobre" className="secao" aria-labelledby="sobre-titulo">
      <div className="container dupla">
        <figure className="dupla-foto arco revelar" style={{ margin: 0 }}>
          <img
            {...foto}
            loading="lazy"
            alt="Recepção da Sinapse com sofá azul-lavanda, almofadas, mesa de centro de madeira, plantas e balcão de atendimento"
            style={{ objectPosition: '42% 50%' }}
          />
        </figure>
        <div className="revelar" style={{ '--atraso': '0.1s' }}>
          <p className="sobretitulo">Sobre a Sinapse</p>
          <h2 id="sobre-titulo" className="secao-titulo">
            Cuidado sem pressa, com quem entende do assunto
          </h2>
          <p className="secao-sub">
            A Sinapse reúne psicólogos de diferentes abordagens para atender crianças, adolescentes,
            adultos e casais. Aqui você é recebido com calma, ouvido sem julgamento e acompanhado por
            um profissional que combina com você.
          </p>
          <ul className="lista-check">
            {ITENS.map(({ icone: Icone, titulo, texto }) => (
              <li key={titulo}>
                <span className="icone-circulo">
                  <Icone strokeWidth={TRACO} aria-hidden="true" />
                </span>
                <span>
                  <strong>{titulo}</strong>
                  <span>{texto}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
