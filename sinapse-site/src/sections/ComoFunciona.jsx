import { Link } from 'react-router-dom';
import { fotoPaisagem } from '../utils/asset.js';

const PASSOS = [
  {
    titulo: 'Escolha o profissional',
    texto: 'Veja a equipe e escolha com quem quer conversar. Se preferir, a triagem indica quem combina com você.',
  },
  {
    titulo: 'Escolha presencial ou online, dia e horário',
    texto: 'A agenda mostra só os horários livres de cada profissional nas próximas três semanas.',
  },
  {
    titulo: 'Receba a confirmação pelo WhatsApp',
    texto: 'A mensagem já vai pronta. A recepção confirma o horário e, se for online, envia o link da sessão.',
  },
  {
    titulo: 'Primeira sessão',
    texto: 'Uma conversa de acolhimento, sem pressa. Você conta o que quiser, no seu tempo.',
  },
];

export default function ComoFunciona() {
  const foto = fotoPaisagem('sessao-detalhe');
  return (
    <section id="como-funciona" className="secao secao-alt" aria-labelledby="como-titulo">
      <div className="container dupla">
        <div>
          <header className="secao-cabecalho revelar" style={{ marginBottom: 28 }}>
            <p className="sobretitulo">Como funciona</p>
            <h2 id="como-titulo" className="secao-titulo">
              Do agendamento à primeira conversa
            </h2>
          </header>
          <ol className="passos">
            {PASSOS.map((p, i) => (
              <li key={p.titulo} className="passo revelar" style={{ '--atraso': `${i * 0.08}s` }}>
                <span className="passo-num" aria-hidden="true">
                  {i + 1}
                </span>
                <div>
                  <h3>{p.titulo}</h3>
                  <p>{p.texto}</p>
                </div>
              </li>
            ))}
          </ol>
          <Link to="/agendar" className="btn btn-primario revelar" style={{ marginTop: 28, marginLeft: 66 }}>
            Começar agendamento
          </Link>
        </div>
        <figure className="dupla-foto revelar" style={{ margin: 0, '--atraso': '0.1s' }}>
          <img
            {...foto}
            loading="lazy"
            alt="Mãos da psicóloga sobre um caderno azul em uma mesinha de madeira, com um copo d'água; ao fundo, as mãos do paciente apoiadas no joelho"
            style={{ objectPosition: '40% 50%' }}
          />
        </figure>
      </div>
    </section>
  );
}
