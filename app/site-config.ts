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
  { href: '/explorar', label: 'Tour 360°' },
];
