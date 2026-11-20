import { MapPin, Video, User, Users, Info } from 'lucide-react';
import Opcao from '../Opcao.jsx';
import valores from '../../data/valores.json';
import { formatarMoeda } from '../../utils/formato.js';

export default function PassoAtendimento({
  tituloRef,
  modalidade,
  setModalidade,
  sessaoId,
  setSessaoId,
  profissional,
  liberarProfissional,
  tentouAvancar,
}) {
  const semModalidade = (m) => profissional && !profissional.modalidades.includes(m);
  const semSessao = (s) => profissional && !profissional.sessoes.includes(s);
  const temRestricao = profissional && (semModalidade('presencial') || semSessao('casal'));

  return (
    <>
      <h2 className="fluxo-titulo" tabIndex={-1} ref={tituloRef}>
        Como vai ser o atendimento?
      </h2>

      {temRestricao && (
        <p className="aviso">
          <Info strokeWidth={1.5} aria-hidden="true" />
          <span>
            {profissional.primeiroNome} atende{' '}
            {semModalidade('presencial') ? 'só online' : 'presencial e online'}
            {semSessao('casal') ? ', em sessões individuais' : ''}.{' '}
            <button type="button" className="btn-texto inline" onClick={liberarProfissional}>
              Ver outros profissionais
            </button>
          </span>
        </p>
      )}

      <fieldset className="grupo">
        <legend>Modalidade</legend>
        <div className="opcoes opcoes-2">
          <Opcao
            nome="modalidade"
            icone={MapPin}
            titulo="Presencial"
            detalhe="No consultório, no Renascença, em São Luís"
            selecionada={modalidade === 'presencial'}
            desabilitada={semModalidade('presencial')}
            onEscolher={() => setModalidade('presencial')}
          />
          <Opcao
            nome="modalidade"
            icone={Video}
            titulo="Online"
            detalhe="Por vídeo, de qualquer lugar do Brasil"
            selecionada={modalidade === 'online'}
            desabilitada={semModalidade('online')}
            onEscolher={() => setModalidade('online')}
          />
        </div>
        {tentouAvancar && !modalidade && (
          <p className="erro-campo" role="alert">
            Escolha presencial ou online para continuar.
          </p>
        )}
      </fieldset>

      <fieldset className="grupo">
        <legend>Tipo de sessão</legend>
        <div className="opcoes opcoes-2">
          {Object.values(valores.sessoes).map((s) => (
            <Opcao
              key={s.id}
              nome="sessao"
              icone={s.id === 'casal' ? Users : User}
              titulo={s.nome}
              detalhe={`${s.duracao} · ${formatarMoeda(s.preco)}`}
              selecionada={sessaoId === s.id}
              desabilitada={semSessao(s.id)}
              onEscolher={() => setSessaoId(s.id)}
            />
          ))}
        </div>
      </fieldset>
    </>
  );
}
