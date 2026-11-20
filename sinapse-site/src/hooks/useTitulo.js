import { useEffect } from 'react';

/** Título e descrição da página (SEO), trocados a cada rota. */
export function useTitulo(titulo, descricao) {
  useEffect(() => {
    document.title = titulo;
    if (descricao) document.querySelector('meta[name="description"]')?.setAttribute('content', descricao);
  }, [titulo, descricao]);
}
