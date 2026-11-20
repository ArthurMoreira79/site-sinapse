import equipe from '../data/equipe.json';
import especialidades from '../data/especialidades.json';

export const PUBLICOS = [
  { id: 'eu', rotulo: 'Para mim', detalhe: 'Terapia individual para adultos' },
  { id: 'crianca', rotulo: 'Para meu filho ou filha', detalhe: 'Criança de até 12 anos' },
  { id: 'adolescente', rotulo: 'Para um adolescente', detalhe: 'Entre 13 e 17 anos' },
  { id: 'casal', rotulo: 'Para nós dois', detalhe: 'Terapia de casal' },
];

/** Áreas oferecidas na pergunta 2, conforme a pessoa que vai ser atendida. */
const AREAS_POR_PUBLICO = {
  eu: ['ansiedade', 'depressao', 'luto', 'orientacao'],
  crianca: ['infantil', 'ansiedade', 'luto'],
  adolescente: ['adolescentes', 'ansiedade', 'depressao', 'orientacao', 'luto'],
};

const ROTULO_AREA = { infantil: 'Comportamento e emoções', adolescentes: 'Fase da adolescência' };

export const AINDA_NAO_SEI = 'nao-sei';

export function areasPara(publico) {
  const ids = AREAS_POR_PUBLICO[publico] ?? [];
  return [
    ...ids.map((id) => {
      const esp = especialidades.find((e) => e.id === id);
      return { id, rotulo: ROTULO_AREA[id] ?? esp.nome };
    }),
    { id: AINDA_NAO_SEI, rotulo: 'Ainda não sei dizer' },
  ];
}

export const MODALIDADES_TRIAGEM = [
  { id: 'presencial', rotulo: 'Presencial', detalhe: 'No consultório, no Renascença' },
  { id: 'online', rotulo: 'Online', detalhe: 'Por vídeo, de onde você estiver' },
  { id: 'tanto-faz', rotulo: 'Tanto faz', detalhe: 'O que for melhor para o caso' },
];

/** Nome da área geral que vai na mensagem (nunca o relato da pessoa). */
export function nomeArea(publico, area) {
  if (publico === 'casal') return 'Terapia de casal';
  if (!area || area === AINDA_NAO_SEI) return null;
  return especialidades.find((e) => e.id === area)?.nome ?? null;
}

/**
 * Sugere 1 ou 2 profissionais.
 * Elegível = atende esse público e a modalidade escolhida; a pontuação vem da área.
 */
export function sugerirProfissionais({ publico, area, modalidade }) {
  const areaAlvo = publico === 'casal' ? 'casal' : area;
  const atendeModalidade = (p) => modalidade === 'tanto-faz' || p.modalidades.includes(modalidade);

  let elegiveis = equipe.filter((p) => p.publicos.includes(publico) && atendeModalidade(p));
  let modalidadeAjustada = false;
  if (elegiveis.length === 0) {
    elegiveis = equipe.filter((p) => p.publicos.includes(publico));
    modalidadeAjustada = true;
  }

  const pontuar = (p) => {
    let pontos = 0;
    if (areaAlvo && areaAlvo !== AINDA_NAO_SEI) {
      const pos = p.especialidades.indexOf(areaAlvo);
      if (pos >= 0) pontos += 10 - pos; // a área principal do profissional vale mais
    }
    if (publico === 'crianca' && p.especialidades.includes('infantil')) pontos += 5;
    if (publico === 'adolescente' && p.especialidades.includes('adolescentes')) pontos += 3;
    if (areaAlvo === AINDA_NAO_SEI && p.responsavelTecnica) pontos += 1; // acolhimento inicial
    return pontos;
  };

  const ordenados = elegiveis
    .map((p) => ({ profissional: p, pontos: pontuar(p) }))
    .sort((a, b) => b.pontos - a.pontos);

  // "ainda não sei": qualquer profissional do perfil serve, então mostra dois
  if (areaAlvo === AINDA_NAO_SEI) {
    return { sugestoes: ordenados.slice(0, 2).map((o) => o.profissional), semFocoNaArea: false, modalidadeAjustada, focoEmOutraModalidade: false };
  }

  const comFoco = ordenados.filter((o) => o.pontos > 0);
  let sugestoes = (comFoco.length ? comFoco : ordenados).slice(0, 2).map((o) => o.profissional);

  // ninguém com foco nessa modalidade, mas há na outra: mostra essa pessoa primeiro
  let focoEmOutraModalidade = false;
  if (comFoco.length === 0 && !modalidadeAjustada) {
    const naOutra = equipe.find(
      (p) => p.publicos.includes(publico) && p.especialidades.includes(areaAlvo) && !atendeModalidade(p)
    );
    if (naOutra) {
      sugestoes = [naOutra, ...sugestoes].slice(0, 2);
      focoEmOutraModalidade = true;
    }
  }

  return {
    sugestoes,
    semFocoNaArea: comFoco.length === 0 && !focoEmOutraModalidade,
    modalidadeAjustada,
    focoEmOutraModalidade,
  };
}

/** Frase curta explicando por que o profissional foi sugerido. */
export function motivoSugestao(profissional, { publico, area }) {
  const partes = [];
  if (publico === 'crianca') partes.push('atende crianças');
  if (publico === 'adolescente') partes.push('atende adolescentes');
  if (publico === 'casal') partes.push('atende casais');
  const alvo = publico === 'casal' ? 'casal' : area;
  if (alvo && alvo !== AINDA_NAO_SEI && alvo !== 'casal' && profissional.especialidades.includes(alvo)) {
    const esp = especialidades.find((e) => e.id === alvo);
    partes.push(`tem foco em ${esp.nome.toLowerCase()}`);
  }
  if (profissional.responsavelTecnica && area === AINDA_NAO_SEI) {
    partes.push('é a responsável técnica e faz o acolhimento inicial');
  }
  if (profissional.modalidades.length === 1) partes.push('atende só online');
  if (partes.length === 0) return null;
  const texto = partes.join(', ');
  return texto.charAt(0).toUpperCase() + texto.slice(1) + '.';
}
