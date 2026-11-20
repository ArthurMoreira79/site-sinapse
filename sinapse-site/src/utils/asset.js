/**
 * Monta a URL de um arquivo da pasta public/ respeitando o "base" do Vite,
 * para funcionar tanto na raiz (Vercel) quanto em subpasta.
 */
export const asset = (caminho) => import.meta.env.BASE_URL + caminho.replace(/^\//, '');

/**
 * Fotos originais da pasta ../imagens, copiadas sem conversão por scripts/copiar-imagens.mjs.
 * Ambientes em 16:9 (1376 x 768).
 */
export function fotoPaisagem(nome) {
  return { src: asset(`img/${nome}.jpg`), width: 1376, height: 768 };
}

/**
 * Retratos da equipe em 9:16 (768 x 1376). O recorte é feito no CSS (object-fit: cover);
 * "foco" é a altura do rosto, em %, para o enquadramento ficar no rosto e no peito.
 */
export function fotoRetrato(profissional) {
  return {
    src: asset(`img/${profissional.foto}.jpg`),
    width: 768,
    height: 1376,
    style: { objectPosition: `50% ${profissional.foco}%` },
  };
}
