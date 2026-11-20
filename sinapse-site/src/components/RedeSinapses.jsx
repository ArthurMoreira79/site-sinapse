import { useEffect, useRef } from 'react';

/**
 * Fundo de "rede neural" desenhado em canvas, no lugar da imagem:
 * os nós ficam concentrados nas laterais e somem em direção ao centro (onde fica o texto),
 * flutuam devagar, se ligam quando estão perto e, de vez em quando, um sinal percorre
 * uma ligação, como uma sinapse disparando.
 * Se adapta a qualquer tamanho de seção, pausa fora da tela e respeita "reduzir movimento".
 */
const COR_LINHA = [116, 148, 234]; // #7494EA
const COR_NO = [79, 111, 209]; // #4F6FD1
const COR_BRILHO = [217, 214, 245]; // #D9D6F5

const rgba = ([r, g, b], a) => `rgba(${r},${g},${b},${a})`;

function criarNos(largura, altura) {
  const estreito = largura < 700;
  const faixa = largura * (estreito ? 0.3 : 0.34); // até onde a rede entra a partir de cada borda
  const quantidade = Math.round(Math.min(150, Math.max(46, (largura * altura) / (estreito ? 6500 : 8000))));
  return Array.from({ length: quantidade }, () => {
    const esquerda = Math.random() < 0.5;
    const dist = faixa * Math.pow(Math.random(), 1.5); // mais nós perto da borda
    return {
      x: esquerda ? dist : largura - dist,
      y: Math.random() * altura,
      vx: (Math.random() - 0.5) * 0.22,
      vy: (Math.random() - 0.5) * 0.22,
      r: 1.1 + Math.random() * 1.5,
      brilho: Math.random() < 0.16, // alguns nós "acesos", que pulsam
      fase: Math.random() * Math.PI * 2,
      esquerda,
    };
  });
}

export default function RedeSinapses({ className = '' }) {
  const ref = useRef(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas.getContext('2d');
    const reduzir = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let largura = 0;
    let altura = 0;
    let nos = [];
    let sinais = [];
    let frame = null;
    let visivel = false;
    let ultimoSinal = 0;

    // peso de 1 (na borda) a 0 (no centro): apaga a rede onde fica o conteúdo
    const peso = (x) => {
      const d = Math.min(x, largura - x) / largura; // 0 na borda, 0.5 no centro
      const t = Math.min(1, Math.max(0, (d - 0.12) / 0.26));
      return 1 - t * t * (3 - 2 * t);
    };

    function medir() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const caixa = canvas.getBoundingClientRect();
      largura = caixa.width;
      altura = caixa.height;
      canvas.width = Math.round(largura * dpr);
      canvas.height = Math.round(altura * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      nos = criarNos(largura, altura);
      sinais = [];
    }

    function mover() {
      const faixa = largura * (largura < 700 ? 0.3 : 0.34);
      for (const n of nos) {
        n.x += n.vx;
        n.y += n.vy;
        // fica na sua lateral: volta ao bater na borda ou ao avançar demais para o centro
        const v = Math.abs(n.vx);
        if (n.esquerda) {
          if (n.x < 0) n.vx = v;
          else if (n.x > faixa) n.vx = -v;
        } else if (n.x > largura) n.vx = -v;
        else if (n.x < largura - faixa) n.vx = v;
        if (n.y < -10) n.y = altura + 10;
        if (n.y > altura + 10) n.y = -10;
      }
    }

    function desenhar(t) {
      ctx.clearRect(0, 0, largura, altura);
      const alcance = Math.min(150, Math.max(95, largura / 11));
      const ligacoes = [];

      for (let i = 0; i < nos.length; i++) {
        const a = nos[i];
        const pa = peso(a.x);
        if (pa <= 0.01) continue;
        for (let j = i + 1; j < nos.length; j++) {
          const b = nos[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          if (Math.abs(dx) > alcance || Math.abs(dy) > alcance) continue;
          const d = Math.hypot(dx, dy);
          if (d > alcance) continue;
          const alfa = (1 - d / alcance) * Math.min(pa, peso(b.x)) * 0.7;
          if (alfa < 0.02) continue;
          ctx.strokeStyle = rgba(COR_LINHA, alfa);
          ctx.lineWidth = 0.8;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
          if (alfa > 0.18) ligacoes.push([a, b]);
        }
      }

      for (const n of nos) {
        const p = peso(n.x);
        if (p <= 0.01) continue;
        if (n.brilho) {
          const pulso = reduzir ? 0.6 : 0.5 + 0.5 * Math.sin(t / 900 + n.fase);
          const raio = 7 + pulso * 7;
          const g = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, raio);
          g.addColorStop(0, rgba(COR_BRILHO, 0.9 * p));
          g.addColorStop(1, rgba(COR_BRILHO, 0));
          ctx.fillStyle = g;
          ctx.beginPath();
          ctx.arc(n.x, n.y, raio, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.fillStyle = rgba(COR_NO, (n.brilho ? 0.85 : 0.55) * p);
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fill();
      }

      // sinais percorrendo ligações
      if (!reduzir) {
        if (t - ultimoSinal > 700 && ligacoes.length && sinais.length < 6) {
          const [a, b] = ligacoes[Math.floor(Math.random() * ligacoes.length)];
          sinais.push(Math.random() < 0.5 ? { a, b, inicio: t } : { a: b, b: a, inicio: t });
          ultimoSinal = t;
        }
        sinais = sinais.filter((s) => t - s.inicio < 1100);
        for (const s of sinais) {
          const k = (t - s.inicio) / 1100;
          const e = k < 0.5 ? 2 * k * k : 1 - Math.pow(-2 * k + 2, 2) / 2;
          const x = s.a.x + (s.b.x - s.a.x) * e;
          const y = s.a.y + (s.b.y - s.a.y) * e;
          const alfa = Math.sin(Math.PI * k) * Math.min(peso(s.a.x), peso(s.b.x));
          const g = ctx.createRadialGradient(x, y, 0, x, y, 6);
          g.addColorStop(0, rgba(COR_NO, alfa));
          g.addColorStop(1, rgba(COR_NO, 0));
          ctx.fillStyle = g;
          ctx.beginPath();
          ctx.arc(x, y, 6, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    }

    function quadro(t) {
      mover();
      desenhar(t);
      frame = requestAnimationFrame(quadro);
    }

    function iniciar() {
      if (frame || reduzir || !visivel || document.hidden) return;
      frame = requestAnimationFrame(quadro);
    }
    function parar() {
      if (frame) cancelAnimationFrame(frame);
      frame = null;
    }

    medir();
    desenhar(0);

    const aoRedimensionar = new ResizeObserver(() => {
      const caixa = canvas.getBoundingClientRect();
      if (Math.abs(caixa.width - largura) < 1 && Math.abs(caixa.height - altura) < 1) return;
      medir();
      desenhar(performance.now());
    });
    aoRedimensionar.observe(canvas);

    const naTela = new IntersectionObserver(([e]) => {
      visivel = e.isIntersecting;
      visivel ? iniciar() : parar();
    });
    naTela.observe(canvas);

    const aoTrocarAba = () => (document.hidden ? parar() : iniciar());
    document.addEventListener('visibilitychange', aoTrocarAba);

    return () => {
      parar();
      aoRedimensionar.disconnect();
      naTela.disconnect();
      document.removeEventListener('visibilitychange', aoTrocarAba);
    };
  }, []);

  return <canvas ref={ref} className={`rede-sinapses ${className}`} aria-hidden="true" />;
}
