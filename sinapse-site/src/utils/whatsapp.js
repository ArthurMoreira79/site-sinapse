import contato from '../data/contato.json';
import { formatarMoeda, formatarData, formatarHora } from './formato.js';

export function linkWhatsApp(texto) {
  return `https://wa.me/${contato.whatsapp}?text=${encodeURIComponent(texto)}`;
}

/** Contato geral (botão flutuante e rodapé): fala com o autor do projeto. */
export const MENSAGEM_CONTATO = 'Olá, Arthur! Vi o site da Sinapse, gostei do projeto e quero saber mais.';

export const linkContato = () => linkWhatsApp(MENSAGEM_CONTATO);

export const linkInstagram = () => `https://ig.me/m/${contato.instagram}`;

/** Mensagem pronta do agendamento. Não leva nada sobre o que a pessoa sente, só a área geral da triagem. */
export function mensagemAgendamento({ nome, email, primeira, profissional, modalidade, sessao, data, hora, area }) {
  return [
    'Olá! Quero agendar uma consulta na Sinapse.',
    '',
    `Nome: ${nome}`,
    `Profissional: ${profissional}`,
    `Atendimento: ${modalidade === 'online' ? 'Online' : 'Presencial'} · ${sessao.nome} (${sessao.duracao})`,
    `Data: ${formatarData(data)} às ${formatarHora(hora)}`,
    `Primeira consulta: ${primeira ? 'sim' : 'não'}`,
    ...(area ? [`Área (triagem): ${area}`] : []),
    `E-mail: ${email}`,
    `Valor: ${formatarMoeda(sessao.preco)}`,
  ].join('\n');
}
