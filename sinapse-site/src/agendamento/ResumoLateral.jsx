import { MapPin, Video, CalendarDays, User } from 'lucide-react';
import { formatarData, formatarHora, formatarMoeda } from '../utils/formato.js';
import { fotoRetrato } from '../utils/asset.js';

export default function ResumoLateral({ profissional, modalidade, sessao, dataISO, hora, area }) {
  const foto = profissional ? fotoRetrato(profissional) : null;
  return (
    <aside className="resumo-lateral" aria-label="Resumo do agendamento">
      <h2>Seu agendamento</h2>
      <ul>
        <li>
          {modalidade === 'online' ? <Video strokeWidth={1.5} aria-hidden="true" /> : <MapPin strokeWidth={1.5} aria-hidden="true" />}
          <span>
            {modalidade ? (modalidade === 'online' ? 'Online' : 'Presencial') : <em>Modalidade a escolher</em>}
            <small>
              {sessao.nome} · {sessao.duracao}
            </small>
          </span>
        </li>
        <li>
          {foto ? <img src={foto.src} alt="" width="40" height="40" /> : <User strokeWidth={1.5} aria-hidden="true" />}
          <span>{profissional ? profissional.nome : <em>Profissional a escolher</em>}</span>
        </li>
        <li>
          <CalendarDays strokeWidth={1.5} aria-hidden="true" />
          <span>
            {dataISO ? formatarData(dataISO) : <em>Data a escolher</em>}
            {dataISO && hora !== null && <small>às {formatarHora(hora)}</small>}
          </span>
        </li>
      </ul>
      {area && <p className="resumo-area">Área da triagem: {area}</p>}
      <div className="resumo-lateral-total">
        <span>Valor</span>
        <strong>{formatarMoeda(sessao.preco)}</strong>
      </div>
    </aside>
  );
}
