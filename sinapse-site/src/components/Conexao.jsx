/**
 * Linha fina que "conecta" uma seção à próxima, como uma sinapse:
 * um traço contínuo que se desenha ao entrar na tela, com nós nas pontas.
 */
const CAMINHOS = {
  a: 'M0 40 C 180 40, 260 12, 420 18 S 700 64, 860 44 S 1120 8, 1440 30',
  b: 'M0 26 C 220 10, 340 60, 560 50 S 860 6, 1040 22 S 1300 58, 1440 44',
};
const NOS = {
  a: [
    [420, 18],
    [860, 44, true],
  ],
  b: [
    [560, 50, true],
    [1040, 22],
  ],
};

export default function Conexao({ variante = 'a' }) {
  return (
    <svg className="conexao" viewBox="0 0 1440 72" preserveAspectRatio="xMidYMid slice" aria-hidden="true" focusable="false">
      <path d={CAMINHOS[variante]} pathLength="1" />
      {NOS[variante].map(([x, y, cheio]) => (
        <circle key={x} cx={x} cy={y} r="4" className={cheio ? 'cheio' : ''} />
      ))}
    </svg>
  );
}
