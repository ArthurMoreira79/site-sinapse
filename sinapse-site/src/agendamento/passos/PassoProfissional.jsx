import { useState } from 'react';
import { Check, Sparkles } from 'lucide-react';
import especialidades from '../../data/especialidades.json';
import abordagens from '../../data/abordagens.json';
import { fotoRetrato } from '../../utils/asset.js';

const TODAS = 'todas';

export default function PassoProfissional({ tituloRef, profissionalId, escolher, compativeis, modalidade, sessaoId, onTriagem, tentouAvancar }) {
  const [filtro, setFiltro] = useState(TODAS);

  // só mostra no filtro as áreas que algum profissional compatível atende
  const areas = especialidades.filter((e) => compativeis.some((p) => p.especialidades.includes(e.id)));
  const lista = filtro === TODAS ? compativeis : compativeis.filter((p) => p.especialidades.includes(filtro));

  return (
    <>
      <h2 className="fluxo-titulo" tabIndex={-1} ref={tituloRef}>
        Com quem você quer conversar?
      </h2>
      <p className="fluxo-sub">
        {compativeis.length} {compativeis.length === 1 ? 'profissional atende' : 'profissionais atendem'}{' '}
        {sessaoId === 'casal' ? 'casais' : 'sessão individual'} {modalidade === 'online' ? 'online' : 'presencialmente'}.
      </p>

      {areas.length > 1 && (
        <div className="filtros" role="group" aria-label="Filtrar por especialidade">
          <button type="button" className={`filtro ${filtro === TODAS ? 'ativo' : ''}`} aria-pressed={filtro === TODAS} onClick={() => setFiltro(TODAS)}>
            Todas
          </button>
          {areas.map((e) => (
            <button
              key={e.id}
              type="button"
              className={`filtro ${filtro === e.id ? 'ativo' : ''}`}
              aria-pressed={filtro === e.id}
              onClick={() => setFiltro(e.id)}
            >
              {e.nome}
            </button>
          ))}
        </div>
      )}

      <div className="profissionais" role="radiogroup" aria-label="Profissional">
        {lista.map((p) => {
          const foto = fotoRetrato(p);
          const selecionado = p.id === profissionalId;
          return (
            <label key={p.id} className={`prof-opcao ${selecionado ? 'selecionada' : ''}`}>
              <input
                type="radio"
                name="profissional"
                className="visualmente-oculto"
                checked={selecionado}
                onChange={() => escolher(p.id)}
              />
              <img src={foto.src} style={foto.style} alt="" width="88" height="110" loading="lazy" />
              <span className="prof-opcao-texto">
                <strong>{p.nome}</strong>
                <span className="crp">
                  {p.crp} (fictício) · {p.abordagens.map((id) => abordagens.find((a) => a.id === id).sigla).join(' e ')}
                </span>
                <span className="prof-opcao-esp">
                  {p.especialidades.map((id) => especialidades.find((e) => e.id === id).nome).join(' · ')}
                </span>
              </span>
              <span className="opcao-marca" aria-hidden="true">
                {selecionado && <Check strokeWidth={2.5} />}
              </span>
            </label>
          );
        })}
      </div>

      {tentouAvancar && !profissionalId && (
        <p className="erro-campo" role="alert">
          Escolha um profissional para continuar.
        </p>
      )}

      <button type="button" className="ajuda-triagem" onClick={onTriagem}>
        <Sparkles strokeWidth={1.5} aria-hidden="true" />
        Não sabe quem escolher? Faça a triagem rápida
      </button>
    </>
  );
}
