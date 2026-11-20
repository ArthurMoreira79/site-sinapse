import { Plus } from 'lucide-react';
import faq from '../data/faq.json';
import { linkContato } from '../utils/whatsapp.js';

export default function Faq() {
  return (
    <section id="duvidas" className="secao secao-alt" aria-labelledby="faq-titulo">
      <div className="container faq-layout">
        <header className="secao-cabecalho revelar">
          <p className="sobretitulo">Dúvidas</p>
          <h2 id="faq-titulo" className="secao-titulo">
            Perguntas frequentes
          </h2>
          <p className="secao-sub">
            Ficou alguma dúvida?{' '}
            <a href={linkContato()} target="_blank" rel="noopener noreferrer">
              Fale com a gente no WhatsApp
            </a>
            .
          </p>
        </header>
        <div className="faq-lista">
          {faq.map((item, i) => (
            <details key={item.pergunta} className="faq-item revelar" style={{ '--atraso': `${i * 0.05}s` }}>
              <summary>
                {item.pergunta}
                <Plus strokeWidth={1.75} aria-hidden="true" />
              </summary>
              <p>{item.resposta}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
