import { useMemo } from 'react';
import { proximosDias, gradeDoDia } from '../../utils/agenda.js';
import { DIAS_SEMANA, DIAS_SEMANA_CURTO, MESES_CURTO, formatarData, formatarHora } from '../../utils/formato.js';

const PERIODOS = [
  { id: 'manha', rotulo: 'Manhã', teste: (h) => h < 12 },
  { id: 'tarde', rotulo: 'Tarde', teste: (h) => h >= 12 && h < 18 },
  { id: 'noite', rotulo: 'Noite', teste: (h) => h >= 18 },
];

const MESES_LONGO = ['janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho', 'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro'];

export default function PassoHorario({ tituloRef, profissional, sessao, dataISO, setDataISO, hora, setHora, tentouAvancar }) {
  const dias = useMemo(() => proximosDias({ profissional, slots: sessao.slots }), [profissional, sessao.slots]);
  const grade = useMemo(
    () => (dataISO ? gradeDoDia({ profissional, dataISO, slots: sessao.slots }) : []),
    [profissional, dataISO, sessao.slots]
  );

  // completa a primeira semana com espaços vazios para o calendário começar no domingo
  const vazios = dias[0].data.getDay();
  const meses = [...new Set(dias.map((d) => d.data.getMonth()))].map((m) => MESES_LONGO[m]);
  const nomesDias = Object.keys(profissional.expediente).map((d) => DIAS_SEMANA[Number(d)]);
  const diasAtendimento =
    nomesDias.length > 1 ? `${nomesDias.slice(0, -1).join(', ')} e ${nomesDias[nomesDias.length - 1]}` : nomesDias[0];

  return (
    <>
      <h2 className="fluxo-titulo" tabIndex={-1} ref={tituloRef}>
        Escolha o dia e o horário
      </h2>
      <p className="fluxo-sub">
        Dias de atendimento de {profissional.primeiroNome}: {diasAtendimento}. Sessão de {sessao.duracao}.
      </p>

      <div className="calendario">
        <p className="calendario-mes">{meses.join(' / ')}</p>
        <div className="calendario-grade" role="group" aria-label="Próximos dias">
          {DIAS_SEMANA_CURTO.map((d) => (
            <span key={d} className="calendario-semana" aria-hidden="true">
              {d}
            </span>
          ))}
          {Array.from({ length: vazios }, (_, i) => (
            <span key={`v${i}`} aria-hidden="true" />
          ))}
          {dias.map((d) => {
            const disponivel = d.atende && d.livres > 0;
            const selecionado = d.iso === dataISO;
            const rotulo = `${d.data.getDate()} de ${MESES_CURTO[d.data.getMonth()]}, ${DIAS_SEMANA[d.data.getDay()]}: ${
              !d.atende ? 'sem atendimento' : d.livres > 0 ? `${d.livres} horários livres` : 'agenda cheia'
            }`;
            return (
              <button
                key={d.iso}
                type="button"
                className={`dia ${selecionado ? 'selecionado' : ''} ${!d.atende ? 'fechado' : ''}`}
                disabled={!disponivel}
                aria-pressed={selecionado}
                aria-label={rotulo}
                onClick={() => setDataISO(d.iso)}
              >
                <span className="dia-num">{d.data.getDate()}</span>
                {d.atende && <span className={`dia-ponto ${d.livres === 0 ? 'cheio' : d.livres <= 2 ? 'poucos' : ''}`} />}
              </button>
            );
          })}
        </div>
        <p className="calendario-legenda">
          <span><i className="dia-ponto" /> horários livres</span>
          <span><i className="dia-ponto poucos" /> poucos horários</span>
        </p>
      </div>

      {dataISO ? (
        <div className="horarios" aria-live="polite">
          <h3 className="horarios-titulo">Horários em {formatarData(dataISO)}</h3>
          {PERIODOS.map((per) => {
            const slots = grade.filter((s) => per.teste(s.hora));
            if (slots.length === 0) return null;
            return (
              <div key={per.id} className="periodo">
                <p className="periodo-rotulo">{per.rotulo}</p>
                <div className="slots" role="radiogroup" aria-label={`Horários da ${per.rotulo.toLowerCase()}`}>
                  {slots.map((s) => (
                    <button
                      key={s.hora}
                      type="button"
                      role="radio"
                      aria-checked={hora === s.hora}
                      className={`slot ${hora === s.hora ? 'selecionado' : ''}`}
                      disabled={!s.livre}
                      aria-label={`${formatarHora(s.hora)}${s.livre ? '' : ', ocupado'}`}
                      onClick={() => setHora(s.hora)}
                    >
                      {formatarHora(s.hora)}
                    </button>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <p className="horarios-vazio">
          Toque em um dia do calendário para ver os horários livres.
        </p>
      )}

      {tentouAvancar && (!dataISO || hora === null) && (
        <p className="erro-campo" role="alert">
          {dataISO ? 'Escolha um horário para continuar.' : 'Escolha um dia para continuar.'}
        </p>
      )}
    </>
  );
}
