import { useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Check } from 'lucide-react';
import equipe from '../data/equipe.json';
import valores from '../data/valores.json';
import PassoAtendimento from './passos/PassoAtendimento.jsx';
import PassoProfissional from './passos/PassoProfissional.jsx';
import PassoHorario from './passos/PassoHorario.jsx';
import PassoDados, { errosDados } from './passos/PassoDados.jsx';
import PassoResumo from './passos/PassoResumo.jsx';
import ResumoLateral from './ResumoLateral.jsx';
import { gradeDoDia } from '../utils/agenda.js';
import { salvarReserva } from '../utils/storage.js';
import { linkWhatsApp, mensagemAgendamento } from '../utils/whatsapp.js';
import { formatarData, formatarHora, formatarMoeda } from '../utils/formato.js';

export const PASSOS = [
  { id: 'atendimento', rotulo: 'Atendimento' },
  { id: 'profissional', rotulo: 'Profissional' },
  { id: 'horario', rotulo: 'Data e horário' },
  { id: 'dados', rotulo: 'Seus dados' },
  { id: 'resumo', rotulo: 'Confirmar' },
];

const atende = (p, { modalidade, sessao }) =>
  (!modalidade || p.modalidades.includes(modalidade)) && (!sessao || p.sessoes.includes(sessao));

export default function FluxoAgendamento({ inicial, onTriagem }) {
  const profInicial = equipe.find((p) => p.id === inicial.profissionalId) ?? null;

  const [passo, setPasso] = useState(0);
  const [modalidade, setModalidade] = useState(
    inicial.modalidade ?? (profInicial?.modalidades.length === 1 ? profInicial.modalidades[0] : null)
  );
  const [sessaoId, setSessaoId] = useState(inicial.sessao ?? 'individual');
  const [profissionalId, setProfissionalId] = useState(profInicial?.id ?? null);
  const [dataISO, setDataISO] = useState(null);
  const [hora, setHora] = useState(null);
  const [dados, setDados] = useState({ nome: '', whatsapp: '', email: '', primeira: null, aceite: false });
  const [tentouAvancar, setTentouAvancar] = useState(false);
  const [aviso, setAviso] = useState(null);
  const [concluido, setConcluido] = useState(null);
  const tituloRef = useRef(null);

  const sessao = valores.sessoes[sessaoId];
  const profissional = equipe.find((p) => p.id === profissionalId) ?? null;
  const area = inicial.area ?? null;

  // se o atendimento escolhido não combina mais com o profissional, ele sai da seleção
  useEffect(() => {
    if (profissional && !atende(profissional, { modalidade, sessao: sessaoId })) {
      setProfissionalId(null);
      setDataISO(null);
      setHora(null);
    }
  }, [modalidade, sessaoId, profissional]);

  useEffect(() => {
    tituloRef.current?.focus({ preventScroll: true });
  }, [passo]);

  const erros = useMemo(() => errosDados(dados), [dados]);

  const podeAvancar = {
    atendimento: Boolean(modalidade && sessaoId),
    profissional: Boolean(profissional),
    horario: Boolean(dataISO && hora !== null),
    dados: Object.keys(erros).length === 0,
    resumo: true,
  };
  const idPasso = PASSOS[passo].id;

  function irPara(novo) {
    setPasso(novo);
    setTentouAvancar(false);
    const topo = document.querySelector('.fluxo');
    if (topo && topo.getBoundingClientRect().top < 0) topo.scrollIntoView({ behavior: 'smooth' });
  }

  function avancar() {
    if (!podeAvancar[idPasso]) {
      setTentouAvancar(true);
      return;
    }
    setAviso(null);
    irPara(passo + 1);
  }

  function escolherProfissional(id) {
    if (id !== profissionalId) {
      setDataISO(null);
      setHora(null);
    }
    setProfissionalId(id);
  }

  function escolherSessao(id) {
    setSessaoId(id);
    setHora(null);
  }

  function confirmar() {
    // confere de novo: o horário pode ter sido reservado em outra aba
    const livre = gradeDoDia({ profissional, dataISO, slots: sessao.slots }).find((s) => s.hora === hora)?.livre;
    if (!livre) {
      setAviso('Esse horário acabou de ser ocupado. Escolha outro, por favor.');
      setHora(null);
      irPara(2);
      return;
    }

    salvarReserva({ profissionalId: profissional.id, data: dataISO, hora, slots: sessao.slots });
    const mensagem = mensagemAgendamento({
      nome: dados.nome.trim(),
      email: dados.email.trim(),
      primeira: dados.primeira === 'sim',
      profissional: profissional.nome,
      modalidade,
      sessao,
      data: dataISO,
      hora,
      area,
    });
    const link = linkWhatsApp(mensagem);
    window.open(link, '_blank', 'noopener');
    setConcluido({ link });
    window.scrollTo(0, 0);
  }

  if (concluido) {
    return (
      <div className="sucesso" role="status">
        <span className="sucesso-icone" aria-hidden="true">
          <Check strokeWidth={2} />
        </span>
        <h2>Pedido de agendamento enviado</h2>
        <p>
          A recepção confirma o horário pelo WhatsApp em instantes. Se o WhatsApp não abriu sozinho,{' '}
          <a href={concluido.link} target="_blank" rel="noopener noreferrer">
            toque aqui para abrir a mensagem
          </a>
          .
        </p>
        <div className="sucesso-cartao">
          <p>
            <strong>{profissional.nome}</strong>
            <br />
            {modalidade === 'online' ? 'Online' : 'Presencial'} · {sessao.nome} ({sessao.duracao})
            <br />
            {formatarData(dataISO)} às {formatarHora(hora)} · {formatarMoeda(sessao.preco)}
          </p>
        </div>
        <p className="sucesso-dica">
          {modalidade === 'online'
            ? 'O link da sessão chega pelo WhatsApp. Separe um lugar reservado e fones de ouvido.'
            : 'Chegue com 10 minutos de antecedência. Estamos na Av. dos Holandeses, no Renascença.'}
        </p>
        <Link to="/" className="btn btn-secundario">
          Voltar ao início
        </Link>
      </div>
    );
  }

  return (
    <div className="fluxo">
      <ol className="progresso" aria-label="Etapas do agendamento">
        {PASSOS.map((p, i) => (
          <li key={p.id} className={i < passo ? 'feito' : i === passo ? 'atual' : ''} aria-current={i === passo ? 'step' : undefined}>
            <span className="progresso-no" aria-hidden="true">
              {i < passo ? <Check strokeWidth={2.5} /> : i + 1}
            </span>
            <span className="progresso-rotulo">{p.rotulo}</span>
          </li>
        ))}
      </ol>

      <div className="fluxo-layout">
        <div className="fluxo-card">
          <p className="fluxo-passo">
            Passo {passo + 1} de {PASSOS.length}
          </p>
          {aviso && (
            <p className="aviso aviso-erro" role="alert">
              {aviso}
            </p>
          )}

          {idPasso === 'atendimento' && (
            <PassoAtendimento
              tituloRef={tituloRef}
              modalidade={modalidade}
              setModalidade={setModalidade}
              sessaoId={sessaoId}
              setSessaoId={escolherSessao}
              profissional={profissional}
              liberarProfissional={() => escolherProfissional(null)}
              tentouAvancar={tentouAvancar}
            />
          )}
          {idPasso === 'profissional' && (
            <PassoProfissional
              tituloRef={tituloRef}
              profissionalId={profissionalId}
              escolher={escolherProfissional}
              compativeis={equipe.filter((p) => atende(p, { modalidade, sessao: sessaoId }))}
              modalidade={modalidade}
              sessaoId={sessaoId}
              onTriagem={onTriagem}
              tentouAvancar={tentouAvancar}
            />
          )}
          {idPasso === 'horario' && (
            <PassoHorario
              tituloRef={tituloRef}
              profissional={profissional}
              sessao={sessao}
              dataISO={dataISO}
              setDataISO={(iso) => {
                setDataISO(iso);
                setHora(null);
              }}
              hora={hora}
              setHora={setHora}
              tentouAvancar={tentouAvancar}
            />
          )}
          {idPasso === 'dados' && (
            <PassoDados tituloRef={tituloRef} dados={dados} setDados={setDados} erros={erros} tentouAvancar={tentouAvancar} />
          )}
          {idPasso === 'resumo' && (
            <PassoResumo
              tituloRef={tituloRef}
              profissional={profissional}
              modalidade={modalidade}
              sessao={sessao}
              dataISO={dataISO}
              hora={hora}
              dados={dados}
              area={area}
              irPara={irPara}
            />
          )}

          <div className="fluxo-acoes">
            <button
              type="button"
              className="btn btn-secundario"
              onClick={() => irPara(passo - 1)}
              disabled={passo === 0}
            >
              <ArrowLeft strokeWidth={1.75} aria-hidden="true" /> Voltar
            </button>
            {idPasso === 'resumo' ? (
              <button type="button" className="btn btn-primario" onClick={confirmar}>
                Confirmar pelo WhatsApp
              </button>
            ) : (
              <button type="button" className="btn btn-primario" onClick={avancar} aria-disabled={!podeAvancar[idPasso]}>
                Continuar <ArrowRight strokeWidth={1.75} aria-hidden="true" />
              </button>
            )}
          </div>
        </div>

        <ResumoLateral
          profissional={profissional}
          modalidade={modalidade}
          sessao={sessao}
          dataISO={dataISO}
          hora={hora}
          area={area}
        />
      </div>
    </div>
  );
}
