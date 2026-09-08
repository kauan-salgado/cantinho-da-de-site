export const airbnbUrl = 'https://www.airbnb.com.br/rooms/1670634373405703050';

// ⚠️ TROCAR PELO NÚMERO REAL ANTES DE PUBLICAR.
// Formato: 55 (país) + DDD + número, só dígitos.
export const whatsappNumero = '5561900000000';

export function whatsappLink(mensagem: string) {
  return `https://wa.me/${whatsappNumero}?text=${encodeURIComponent(mensagem)}`;
}

export const navLinks = [
  { href: '/', label: 'Hospedagem' },
  { href: '/workshops', label: 'Workshops' },
  { href: '/producao', label: 'Produção' },
  { href: '/reservar', label: 'Reservar' },
  { href: '/explorar', label: 'Tour 360°' },
];

// Datas já comprometidas, no formato AAAA-MM-DD. Bloqueiam o calendário
// de solicitação. Manutenção manual por enquanto — a sincronia automática
// com o Airbnb (calendário .ics) fica para uma segunda etapa.
export const datasIndisponiveis: string[] = [
  // '2026-10-15',
];

export const tiposDeEvento = [
  { id: 'workshop', label: 'Workshop ou treinamento', maxPessoas: 30, apenasDiasUteis: true },
  { id: 'aula', label: 'Aula, curso ou mentoria', maxPessoas: 30, apenasDiasUteis: true },
  { id: 'imersao', label: 'Planejamento ou imersão de equipe', maxPessoas: 30, apenasDiasUteis: true },
  { id: 'reuniao', label: 'Reunião de sócios ou conselho', maxPessoas: 30, apenasDiasUteis: true },
  { id: 'producao', label: 'Produção, gravação ou ensaio', maxPessoas: 30, apenasDiasUteis: true },
  { id: 'hospedagem', label: 'Hospedagem com pernoite', maxPessoas: 6, apenasDiasUteis: false },
] as const;

export type TipoDeEvento = (typeof tiposDeEvento)[number];
