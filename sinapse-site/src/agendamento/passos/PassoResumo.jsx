import { Receipt } from 'lucide-react';
import { formatarData, formatarHora, formatarMoeda } from '../../utils/formato.js';
import { fotoRetrato } from '../../utils/asset.js';

function Linha({ rotulo, valor, passo, irPara }) {
  return (
    <div className="resumo-linha">
      <dt>{rotulo}</dt>
      <dd>
        {valor}
        {passo !== undefined && (
          <button type="button" className="btn-texto inline" onClick={() => irPara(passo)} aria-label={`Alterar ${rotulo.toLowerCase()}`}>
            Alterar
          </button>
        )}
      </dd>
    </div>
  );
}

export default function PassoResumo({ tituloRef, profissional, modalidade, sessao, dataISO, hora, dados, area, irPara }) {
  const foto = fotoRetrato(profissional);
  return (
    <>
      <h2 className="fluxo-titulo" tabIndex={-1} ref={tituloRef}>
        Confira e confirme
      </h2>

      <div className="resumo-prof">
        <img src={foto.src} style={foto.style} alt="" width="64" height="80" />
        <div>
          <strong>{profissional.nome}</strong>
          <span className="crp">{profissional.crp} (fictício)</span>
        </div>
      </div>

      <dl className="resumo-lista">
        <Linha rotulo="Atendimento" valor={`${modalidade === 'online' ? 'Online' : 'Presencial'} · ${sessao.nome} (${sessao.duracao})`} passo={0} irPara={irPara} />
        <Linha rotulo="Profissional" valor={profissional.nome} passo={1} irPara={irPara} />
        <Linha rotulo="Data" valor={`${formatarData(dataISO)} às ${formatarHora(hora)}`} passo={2} irPara={irPara} />
        <Linha rotulo="Nome" valor={dados.nome.trim()} passo={3} irPara={irPara} />
        <Linha rotulo="WhatsApp" valor={dados.whatsapp} />
        <Linha rotulo="E-mail" valor={dados.email.trim()} />
        <Linha rotulo="Primeira consulta" valor={dados.primeira === 'sim' ? 'Sim' : 'Não'} />
        {area && <Linha rotulo="Área (triagem)" valor={area} />}
      </dl>

      <div className="resumo-total">
        <span>Valor da sessão</span>
        <strong>{formatarMoeda(sessao.preco)}</strong>
      </div>
      <p className="resumo-nota">
        <Receipt strokeWidth={1.5} aria-hidden="true" />
        O pagamento é feito no dia da sessão. Emitimos recibo para reembolso do plano de saúde.
      </p>
      <p className="resumo-nota">
        Ao confirmar, o WhatsApp abre com a mensagem pronta. É só tocar em enviar.
      </p>
    </>
  );
}
