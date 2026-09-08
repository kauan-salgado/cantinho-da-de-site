import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

// Trocar quando o domínio próprio for registrado — ou definir
// NEXT_PUBLIC_SITE_URL nas variáveis de ambiente do Netlify.
// Precisa ser absoluto: WhatsApp e Google buscam a imagem por URL completa.
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://cantinhodade.com.br';

const TITLE = 'Cantinho da Dê | Espaço para workshops e encontros em Brasília';
const DESCRIPTION =
  'Salão para até 30 pessoas no Jockey Club, a 15 minutos do Plano Piloto. Workshops, imersões, locação para produção e hospedagem.';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    siteName: 'Cantinho da Dê',
    title: TITLE,
    description: DESCRIPTION,
    url: '/',
    images: [
      {
        url: '/site/og.jpg',
        width: 1200,
        height: 630,
        alt: 'Piscina iluminada do Cantinho da Dê, em Brasília',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description: DESCRIPTION,
    images: ['/site/og.jpg'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
