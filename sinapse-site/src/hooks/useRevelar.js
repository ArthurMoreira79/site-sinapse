import { useEffect } from 'react';

/**
 * Mostra com suavidade os elementos .revelar e desenha as linhas .conexao
 * quando entram na tela. Sem IntersectionObserver, tudo aparece de uma vez.
 */
export function useRevelar(dependencia) {
  useEffect(() => {
    const alvos = document.querySelectorAll('.revelar:not(.visivel), .conexao:not(.visivel)');
    if (!('IntersectionObserver' in window)) {
      alvos.forEach((el) => el.classList.add('visivel'));
      return undefined;
    }
    const observador = new IntersectionObserver(
      (entradas) => {
        for (const e of entradas) {
          if (e.isIntersecting) {
            e.target.classList.add('visivel');
            observador.unobserve(e.target);
          }
        }
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.12 }
    );
    alvos.forEach((el) => observador.observe(el));
    return () => observador.disconnect();
  }, [dependencia]);
}
