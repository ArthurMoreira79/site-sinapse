import { useEffect, useRef, useState } from 'react';
import { ArrowLeft, User, Baby, Smile, Heart, MapPin, Video, Shuffle, ArrowRight, Info } from 'lucide-react';
import {
  PUBLICOS,
  MODALIDADES_TRIAGEM,
  areasPara,
  sugerirProfissionais,
  motivoSugestao,
  nomeArea,
} from '../utils/triagem.js';
import especialidades from '../data/especialidades.json';
import abordagens from '../data/abordagens.json';
import { fotoRetrato } from '../utils/asset.js';
import { IconeEspecialidade, TRACO } from '../components/Icones.jsx';

const ICONE_PUBLICO = { eu: User, crianca: Baby, adolescente: Smile, casal: Heart };
const ICONE_MODALIDADE = { presencial: MapPin, online: Video, 'tanto-faz': Shuffle };

function BotaoResposta({ icone: Icone, titulo, detalhe, onClick, marcado }) {
  return (
    <button type="button" className={`opcao opcao-botao ${marcado ? 'selecionada' : ''}`} onClick={onClick} aria-pressed={marcado}>
      {Icone && (
        <span className="icone-circulo">
          <Icone strokeWidth={TRACO} aria-hidden="true" />
        </span>
      )}
      <span className="opcao-texto">
        <strong>{titulo}</strong>
        {detalhe && <span>{detalhe}</span>}
      </span>
      <ArrowRight className="opcao-seta" strokeWidth={1.75} aria-hidden="true" />
    </button>
  );
}

export default function Triagem({ onEscolher, onVoltar, onVerEquipe }) {
  const [respostas, setRespostas] = useState({ publico: null, area: null, modalidade: null });
  const [etapa, setEtapa] = useState(0); // 0 público · 1 área · 2 modalidade · 3 resultado
  const tituloRef = useRef(null);

  const pulaArea = respostas.publico === 'casal';
  const totalPerguntas = pulaArea ? 2 : 3;
  const numeroPergunta = etapa === 0 ? 1 : etapa === 1 ? 2 : pulaArea ? 2 : 3;

  // leva o foco para a pergunta nova (teclado e leitor de tela acompanham a troca)
  useEffect(() => {
    tituloRef.current?.focus();
  }, [etapa]);

  function responder(campo, valor) {
    const novas = { ...respostas, [campo]: valor };
    if (campo === 'publico') {
      novas.area = valor === 'casal' ? 'casal' : null;
      setRespostas(novas);
      setEtapa(valor === 'casal' ? 2 : 1);
      return;
    }
    setRespostas(novas);
    setEtapa(campo === 'area' ? 2 : 3);
  }

  function voltar() {
    if (etapa === 0) return onVoltar();
    if (etapa === 2 && pulaArea) return setEtapa(0);
    setEtapa(etapa - 1);
  }

  if (etapa === 3) {
    const { sugestoes, semFocoNaArea, modalidadeAjustada, focoEmOutraModalidade } = sugerirProfissionais(respostas);
    const outra = respostas.modalidade === 'online' ? 'presencialmente' : 'online';
    const area = nomeArea(respostas.publico, respostas.area);
    return (
      <div className="triagem">
        <div className="triagem-topo">
          <button type="button" className="btn-texto" onClick={voltar}>
            <ArrowLeft strokeWidth={1.75} aria-hidden="true" /> Voltar
          </button>
        </div>
        <h2 className="triagem-pergunta" tabIndex={-1} ref={tituloRef}>
          {sugestoes.length > 1 ? 'Estes profissionais combinam com o que você procura' : 'Este profissional combina com o que você procura'}
        </h2>
        {(semFocoNaArea || modalidadeAjustada || focoEmOutraModalidade) && (
          <p className="aviso">
            <Info strokeWidth={TRACO} aria-hidden="true" />
            {modalidadeAjustada
              ? 'Ninguém da equipe atende esse perfil na modalidade escolhida, então mostramos quem atende na outra.'
              : focoEmOutraModalidade
                ? `Quem tem foco nessa área atende só ${outra}. Mostramos essa opção e quem atende do jeito que você preferiu.`
                : 'Ninguém da equipe tem essa área como foco principal, mas estes profissionais atendem o seu perfil e podem te acolher.'}
          </p>
        )}
        <div className="sugestoes">
          {sugestoes.map((p) => {
            const foto = fotoRetrato(p);
            const modalidade =
              respostas.modalidade !== 'tanto-faz' && p.modalidades.includes(respostas.modalidade)
                ? respostas.modalidade
                : p.modalidades.length === 1
                  ? p.modalidades[0]
                  : null;
            return (
              <article key={p.id} className="sugestao">
                <img {...foto} alt={`Retrato de ${p.nome}`} />
                <div className="sugestao-corpo">
                  <h3>{p.nome}</h3>
                  <p className="crp">{p.crp} (fictício) · {p.abordagens.map((id) => abordagens.find((a) => a.id === id).sigla).join(' e ')}</p>
                  {motivoSugestao(p, respostas) && <p className="sugestao-motivo">{motivoSugestao(p, respostas)}</p>}
                  <ul className="chips">
                    {p.especialidades.map((id) => (
                      <li key={id} className="chip">
                        <IconeEspecialidade nome={especialidades.find((e) => e.id === id).icone} />
                        {especialidades.find((e) => e.id === id).nome}
                      </li>
                    ))}
                  </ul>
                  <button
                    type="button"
                    className="btn btn-primario"
                    onClick={() =>
                      onEscolher({
                        profissionalId: p.id,
                        modalidade,
                        sessao: respostas.publico === 'casal' ? 'casal' : 'individual',
                        area,
                      })
                    }
                  >
                    Agendar com {p.primeiroNome}
                  </button>
                </div>
              </article>
            );
          })}
        </div>
        <p className="triagem-rodape">
          Prefere escolher por conta própria?{' '}
          <button type="button" className="btn-texto inline" onClick={onVerEquipe}>
            Ver toda a equipe na agenda
          </button>
        </p>
      </div>
    );
  }

  return (
    <div className="triagem">
      <div className="triagem-topo">
        <button type="button" className="btn-texto" onClick={voltar}>
          <ArrowLeft strokeWidth={1.75} aria-hidden="true" /> Voltar
        </button>
        <span className="triagem-contador">
          Pergunta {numeroPergunta} de {etapa === 0 ? 3 : totalPerguntas}
        </span>
      </div>
      <div className="triagem-barra" aria-hidden="true">
        <span style={{ width: `${(numeroPergunta / (etapa === 0 ? 3 : totalPerguntas)) * 100}%` }} />
      </div>

      {etapa === 0 && (
        <fieldset className="pergunta">
          <legend className="triagem-pergunta" tabIndex={-1} ref={tituloRef}>
            Para quem é a terapia?
          </legend>
          <div className="opcoes">
            {PUBLICOS.map((o) => (
              <BotaoResposta
                key={o.id}
                icone={ICONE_PUBLICO[o.id]}
                titulo={o.rotulo}
                detalhe={o.detalhe}
                marcado={respostas.publico === o.id}
                onClick={() => responder('publico', o.id)}
              />
            ))}
          </div>
        </fieldset>
      )}

      {etapa === 1 && (
        <fieldset className="pergunta">
          <legend className="triagem-pergunta" tabIndex={-1} ref={tituloRef}>
            O que você está buscando?
          </legend>
          <p className="pergunta-ajuda">Escolha só uma área geral. Os detalhes você conta na sessão, se quiser.</p>
          <div className="opcoes">
            {areasPara(respostas.publico).map((o) => {
              const esp = especialidades.find((e) => e.id === o.id);
              return (
                <BotaoResposta
                  key={o.id}
                  icone={esp ? (props) => <IconeEspecialidade nome={esp.icone} {...props} /> : Shuffle}
                  titulo={o.rotulo}
                  marcado={respostas.area === o.id}
                  onClick={() => responder('area', o.id)}
                />
              );
            })}
          </div>
        </fieldset>
      )}

      {etapa === 2 && (
        <fieldset className="pergunta">
          <legend className="triagem-pergunta" tabIndex={-1} ref={tituloRef}>
            Prefere presencial ou online?
          </legend>
          <div className="opcoes">
            {MODALIDADES_TRIAGEM.map((o) => (
              <BotaoResposta
                key={o.id}
                icone={ICONE_MODALIDADE[o.id]}
                titulo={o.rotulo}
                detalhe={o.detalhe}
                marcado={respostas.modalidade === o.id}
                onClick={() => responder('modalidade', o.id)}
              />
            ))}
          </div>
        </fieldset>
      )}
    </div>
  );
}
