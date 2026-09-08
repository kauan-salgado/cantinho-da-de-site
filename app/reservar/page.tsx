import type { Metadata } from 'next';
import SiteHeader from '../components/SiteHeader';
import SiteFooter from '../components/SiteFooter';
import SolicitacaoReserva from '../components/SolicitacaoReserva';
import { whatsappLink } from '../site-config';

export const metadata: Metadata = {
  title: 'Solicitar reserva | Cantinho da Dê',
  description:
    'Escolha as datas, o formato e o número de pessoas. A solicitação abre direto no WhatsApp com o resumo pronto.',
  alternates: { canonical: '/reservar' },
  openGraph: {
    title: 'Solicitar reserva | Cantinho da Dê',
    description: 'Escolha as datas, o formato e o número de pessoas para o seu encontro no Cantinho da Dê.',
    url: '/reservar',
    images: [{ url: '/site/og.jpg', width: 1200, height: 630, alt: 'Cantinho da Dê, em Brasília' }],
  },
};

export default function ReservarPage() {
  return (
    <main className="site-shell">
      <SiteHeader
        cta={{
          label: 'Falar no WhatsApp',
          href: whatsappLink('Olá! Vi o site do Cantinho da Dê e queria tirar uma dúvida.'),
          external: true,
        }}
      />

      <section className="reserva-topo">
        <p className="eyebrow">Solicitação de reserva</p>
        <h1>Monte o seu dia.</h1>
        <p>
          Escolha o formato, as datas e o tamanho do grupo. No fim, a conversa abre no WhatsApp com
          tudo já escrito — você só aperta enviar.
        </p>
      </section>

      <section className="section reserva-secao">
        <SolicitacaoReserva />
      </section>

      <SiteFooter />
    </main>
  );
}
