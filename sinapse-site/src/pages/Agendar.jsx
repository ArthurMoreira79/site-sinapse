import { useState } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import EscolhaCaminho from '../agendamento/EscolhaCaminho.jsx';
import Triagem from '../agendamento/Triagem.jsx';
import FluxoAgendamento from '../agendamento/FluxoAgendamento.jsx';
import equipe from '../data/equipe.json';
import { useTitulo } from '../hooks/useTitulo.js';

function inicialDaUrl(params) {
  const profissionalId = equipe.some((p) => p.id === params.get('profissional')) ? params.get('profissional') : null;
  const modalidade = ['presencial', 'online'].includes(params.get('modalidade')) ? params.get('modalidade') : null;
  const sessao = params.get('sessao') === 'casal' ? 'casal' : null;
  return { profissionalId, modalidade, sessao, area: null };
}

function PaginaAgendar() {
  const [params] = useSearchParams();
  const inicialUrl = inicialDaUrl(params);
  const temEscolha = inicialUrl.profissionalId || inicialUrl.modalidade || inicialUrl.sessao;

  const [modo, setModo] = useState(
    params.get('caminho') === 'triagem' ? 'triagem' : temEscolha ? 'fluxo' : 'escolha'
  );
  const [inicial, setInicial] = useState(inicialUrl);

  function irParaFluxo(dados = {}) {
    setInicial({ ...inicialUrl, ...dados });
    setModo('fluxo');
    window.scrollTo(0, 0);
  }

  function irPara(novoModo) {
    setModo(novoModo);
    window.scrollTo(0, 0);
  }

  const titulos = {
    escolha: ['Agendar consulta', 'Escolha como prefere começar. Leva menos de dois minutos.'],
    triagem: ['Encontre o profissional certo', 'Três perguntas rápidas. Não é preciso contar o que você está sentindo.'],
    fluxo: ['Agendar consulta', 'Escolha o atendimento, o profissional e o melhor horário para você.'],
  };

  return (
    <div className="pagina agendar">
      <div className="container">
        <h1 className="pagina-titulo">{titulos[modo][0]}</h1>
        <p className="pagina-sub">{titulos[modo][1]}</p>

        {modo === 'escolha' && (
          <EscolhaCaminho onTriagem={() => irPara('triagem')} onJaSei={() => irParaFluxo()} />
        )}
        {modo === 'triagem' && (
          <Triagem onEscolher={irParaFluxo} onVoltar={() => irPara('escolha')} onVerEquipe={() => irParaFluxo()} />
        )}
        {modo === 'fluxo' && <FluxoAgendamento inicial={inicial} onTriagem={() => irPara('triagem')} />}
      </div>
    </div>
  );
}

/** A chave pela URL reinicia o agendamento ao clicar de novo em "Agendar consulta". */
export default function Agendar() {
  useTitulo('Agendar consulta — Sinapse', 'Agende sua consulta presencial ou online na Sinapse. Faça a triagem ou escolha direto o profissional.');
  const location = useLocation();
  return <PaginaAgendar key={location.key} />;
}
