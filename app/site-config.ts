export const airbnbUrl = 'https://www.airbnb.com.br/rooms/1670634373405703050';

// 55 (país) + 61 (DDD) + número. Número pessoal do Kauan, usado como
// contato do negócio por enquanto — trocar aqui se migrar para uma linha
// dedicada com WhatsApp Business.
export const whatsappNumero = '5561996251146';

export function whatsappLink(mensagem: string) {
  return `https://wa.me/${whatsappNumero}?text=${encodeURIComponent(mensagem)}`;
}

export const navLinks = [
  { href: '/', label: 'Workshops' },
  { href: '/hospedagem', label: 'Hospedagem' },
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
  { id: 'workshop', label: 'Workshop ou treinamento', maxPessoas: 30, pernoite: false },
  { id: 'aula', label: 'Aula, curso ou mentoria', maxPessoas: 30, pernoite: false },
  { id: 'imersao', label: 'Planejamento ou imersão de equipe', maxPessoas: 30, pernoite: false },
  { id: 'reuniao', label: 'Reunião de sócios ou conselho', maxPessoas: 30, pernoite: false },
  { id: 'producao', label: 'Produção, gravação ou ensaio', maxPessoas: 30, pernoite: false },
  { id: 'hospedagem', label: 'Hospedagem com pernoite', maxPessoas: 6, pernoite: true },
] as const;

export type TipoDeEvento = (typeof tiposDeEvento)[number];
