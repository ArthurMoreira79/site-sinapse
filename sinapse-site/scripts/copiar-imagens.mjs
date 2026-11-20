// Copia as imagens originais de ../imagens para public/img, sem conversão nem compressão
// (só troca o nome do arquivo por um sem espaços). Os recortes são feitos no CSS.
// Rode com: npm run imagens
import { copyFileSync, mkdirSync, readdirSync, rmSync, statSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const raiz = join(dirname(fileURLToPath(import.meta.url)), '..');
const origem = join(raiz, '..', 'imagens');
const destino = join(raiz, 'public', 'img');

// arquivo original -> nome no site
const IMAGENS = {
  'sinapse sala atendimento.jpg': 'consultorio.jpg',
  'sinapse recepcao.jpg': 'recepcao.jpg',
  'sinapse atendimento online.jpg': 'atendimento-online.jpg',
  'sinapse como funciona.jpg': 'sessao-detalhe.jpg',
  'sinapse Marina.jpg': 'equipe-marina.jpg',
  'sinapse rafael.jpg': 'equipe-rafael.jpg',
  'sinapse lucia.jpg': 'equipe-lucia.jpg',
  'sinapse caio.jpg': 'equipe-caio.jpg',
  'simbolo-marinho.png': 'simbolo-marinho.png',
  'simbolo-branco.png': 'simbolo-branco.png',
  'simbolo-lavanda.png': 'simbolo-lavanda.png',
};

rmSync(destino, { recursive: true, force: true });
mkdirSync(destino, { recursive: true });
for (const [arq, nome] of Object.entries(IMAGENS)) {
  copyFileSync(join(origem, arq), join(destino, nome));
  console.log(nome.padEnd(28), `${Math.round(statSync(join(destino, nome)).size / 1024)} KB`);
}
const sobrando = readdirSync(origem).filter((f) => !(f in IMAGENS));
if (sobrando.length) console.log('Não usadas no site:', sobrando.join(', '));
