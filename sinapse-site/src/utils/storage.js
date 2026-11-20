/**
 * Horários reservados neste navegador, só para bloquear a grade de quem agenda de novo.
 * Não guarda nome, contato nem área da triagem: só profissional, data e hora.
 */
const CHAVE = 'sinapse:horarios';

export function carregarReservas() {
  try {
    const lista = JSON.parse(localStorage.getItem(CHAVE) ?? '[]');
    return Array.isArray(lista) ? lista : [];
  } catch {
    return [];
  }
}

export function salvarReserva({ profissionalId, data, hora, slots }) {
  const lista = [...carregarReservas(), { profissionalId, data, hora, slots }];
  try {
    localStorage.setItem(CHAVE, JSON.stringify(lista));
  } catch {
    /* localStorage indisponível: o agendamento segue pelo WhatsApp sem bloquear a grade */
  }
}
