import { carregarReservas } from './storage.js';
import { toISODate } from './formato.js';

export const DIAS_A_FRENTE = 21;
export const HORA_ALMOCO = 12;

/**
 * Ocupação simulada e determinística por (profissional, data), calculada a partir da data real:
 * a agenda nunca parece vazia nem lotada, e o mesmo dia mostra sempre os mesmos horários.
 */
function hash(texto) {
  let h = 2166136261;
  for (let i = 0; i < texto.length; i++) {
    h ^= texto.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function ocupadosSimulados(profissionalId, dataISO, horas) {
  let semente = hash(`${profissionalId}|${dataISO}`);
  const aleatorio = () => {
    semente = (Math.imul(semente, 1103515245) + 12345) >>> 0;
    return semente / 4294967296;
  };
  // entre 35% e 60% do dia já ocupado (agenda de clínica costuma ter pacientes fixos)
  const taxa = 0.35 + aleatorio() * 0.25;
  return new Set(horas.filter(() => aleatorio() < taxa));
}

function ocupadosNoNavegador(profissionalId, dataISO) {
  const ocupados = new Set();
  for (const r of carregarReservas()) {
    if (r.profissionalId !== profissionalId || r.data !== dataISO) continue;
    for (let i = 0; i < r.slots; i++) ocupados.add(r.hora + i);
  }
  return ocupados;
}

/** Horas de início possíveis no expediente do dia (sem a hora do almoço). */
function horasDoDia(profissional, diaSemana) {
  const faixa = profissional.expediente[String(diaSemana)];
  if (!faixa) return [];
  const [inicio, fim] = faixa;
  const horas = [];
  for (let h = inicio; h < fim; h++) if (h !== HORA_ALMOCO) horas.push(h);
  return horas;
}

/**
 * Grade de um dia: [{ hora: 14, livre: true }].
 * Uma sessão de casal ocupa duas horas seguidas, então só aparece livre se as duas estiverem.
 */
export function gradeDoDia({ profissional, dataISO, slots = 1, agora = new Date() }) {
  const [y, m, d] = dataISO.split('-').map(Number);
  const diaSemana = new Date(y, m - 1, d).getDay();
  const horas = horasDoDia(profissional, diaSemana);
  const simulados = ocupadosSimulados(profissional.id, dataISO, horas);
  const salvos = ocupadosNoNavegador(profissional.id, dataISO);
  const ehHoje = dataISO === toISODate(agora);
  // hoje, só a partir da próxima hora cheia com 2 h de antecedência
  const minimo = ehHoje ? agora.getHours() + 2 : -1;

  return horas.map((hora) => {
    let livre = hora > minimo;
    for (let i = 0; livre && i < slots; i++) {
      const h = hora + i;
      if (!horas.includes(h) || simulados.has(h) || salvos.has(h)) livre = false;
    }
    return { hora, livre };
  });
}

/** Próximos dias com a indicação de quantos horários livres o profissional tem. */
export function proximosDias({ profissional, slots = 1, agora = new Date() }) {
  const dias = [];
  for (let i = 0; i < DIAS_A_FRENTE; i++) {
    const data = new Date(agora.getFullYear(), agora.getMonth(), agora.getDate() + i);
    const iso = toISODate(data);
    const atende = Boolean(profissional.expediente[String(data.getDay())]);
    const livres = atende
      ? gradeDoDia({ profissional, dataISO: iso, slots, agora }).filter((s) => s.livre).length
      : 0;
    dias.push({ iso, data, atende, livres });
  }
  return dias;
}
