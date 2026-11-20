import { Link } from 'react-router-dom';
import { ShieldCheck } from 'lucide-react';
import Opcao from '../Opcao.jsx';
import { mascararWhatsApp, validarEmail, validarNome, validarWhatsApp } from '../../utils/formato.js';

export function errosDados(d) {
  const erros = {};
  if (!validarNome(d.nome)) erros.nome = 'Digite seu nome e sobrenome.';
  if (!validarWhatsApp(d.whatsapp)) erros.whatsapp = 'Digite o WhatsApp com DDD, por exemplo (98) 91234-5678.';
  if (!validarEmail(d.email)) erros.email = 'Digite um e-mail válido, por exemplo nome@email.com.';
  if (!d.primeira) erros.primeira = 'Conte se esta é a sua primeira consulta na Sinapse.';
  if (!d.aceite) erros.aceite = 'Para agendar, é preciso concordar com o uso dos dados.';
  return erros;
}

function Campo({ id, rotulo, erro, mostrarErro, ...props }) {
  const temErro = mostrarErro && erro;
  return (
    <div className="campo">
      <label htmlFor={id}>{rotulo}</label>
      <input id={id} aria-invalid={Boolean(temErro)} aria-describedby={temErro ? `${id}-erro` : undefined} {...props} />
      {temErro && (
        <p id={`${id}-erro`} className="erro-campo">
          {erro}
        </p>
      )}
    </div>
  );
}

export default function PassoDados({ tituloRef, dados, setDados, erros, tentouAvancar }) {
  const mudar = (campo) => (e) => setDados((d) => ({ ...d, [campo]: e.target.value }));

  return (
    <>
      <h2 className="fluxo-titulo" tabIndex={-1} ref={tituloRef}>
        Seus dados para contato
      </h2>
      <p className="fluxo-sub aviso-privacidade">
        <ShieldCheck strokeWidth={1.5} aria-hidden="true" />
        Pedimos só o necessário para marcar a consulta. Você não precisa contar o que está sentindo.
      </p>

      <div className="campos">
        <Campo
          id="nome"
          rotulo="Nome completo"
          autoComplete="name"
          value={dados.nome}
          onChange={mudar('nome')}
          erro={erros.nome}
          mostrarErro={tentouAvancar}
        />
        <Campo
          id="whatsapp"
          rotulo="WhatsApp"
          type="tel"
          inputMode="numeric"
          autoComplete="tel-national"
          placeholder="(98) 90000-0000"
          value={dados.whatsapp}
          onChange={(e) => setDados((d) => ({ ...d, whatsapp: mascararWhatsApp(e.target.value) }))}
          erro={erros.whatsapp}
          mostrarErro={tentouAvancar}
        />
        <Campo
          id="email"
          rotulo="E-mail"
          type="email"
          autoComplete="email"
          placeholder="nome@email.com"
          value={dados.email}
          onChange={mudar('email')}
          erro={erros.email}
          mostrarErro={tentouAvancar}
        />
      </div>

      <fieldset className="grupo">
        <legend>É a sua primeira consulta na Sinapse?</legend>
        <div className="opcoes opcoes-2 opcoes-compactas">
          <Opcao
            nome="primeira"
            titulo="Sim, é a primeira"
            selecionada={dados.primeira === 'sim'}
            onEscolher={() => setDados((d) => ({ ...d, primeira: 'sim' }))}
          />
          <Opcao
            nome="primeira"
            titulo="Não, já sou paciente"
            selecionada={dados.primeira === 'nao'}
            onEscolher={() => setDados((d) => ({ ...d, primeira: 'nao' }))}
          />
        </div>
        {tentouAvancar && erros.primeira && <p className="erro-campo">{erros.primeira}</p>}
      </fieldset>

      <label className="aceite">
        <input type="checkbox" checked={dados.aceite} onChange={(e) => setDados((d) => ({ ...d, aceite: e.target.checked }))} />
        <span>
          Concordo com o uso desses dados para agendar e confirmar a consulta, conforme a{' '}
          <Link to="/privacidade" target="_blank">
            política de privacidade
          </Link>
          .
        </span>
      </label>
      {tentouAvancar && erros.aceite && <p className="erro-campo">{erros.aceite}</p>}
    </>
  );
}
