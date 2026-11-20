import { Check } from 'lucide-react';

/** Cartão de escolha única (funciona como um radio, com teclado e leitor de tela). */
export default function Opcao({ selecionada, onEscolher, titulo, detalhe, icone: Icone, desabilitada, nome }) {
  return (
    <label className={`opcao ${selecionada ? 'selecionada' : ''} ${desabilitada ? 'desabilitada' : ''}`}>
      <input
        type="radio"
        className="visualmente-oculto"
        name={nome}
        checked={selecionada}
        disabled={desabilitada}
        onChange={onEscolher}
      />
      {Icone && (
        <span className="icone-circulo">
          <Icone strokeWidth={1.5} aria-hidden="true" />
        </span>
      )}
      <span className="opcao-texto">
        <strong>{titulo}</strong>
        {detalhe && <span>{detalhe}</span>}
      </span>
      <span className="opcao-marca" aria-hidden="true">
        {selecionada && <Check strokeWidth={2.5} />}
      </span>
    </label>
  );
}
