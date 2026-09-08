import type { Metadata } from 'next';
import SiteHeader from '../components/SiteHeader';
import SiteFooter from '../components/SiteFooter';
import { whatsappLink } from '../site-config';

export const metadata: Metadata = {
  title: 'Locação para produção e gravação | Cantinho da Dê',
  description:
    'Casa de arquitetura industrial em Brasília para ensaios, gravações e produção de conteúdo. Dez cenários distintos em um só endereço, com tour 360° para visita técnica.',
  alternates: { canonical: '/producao' },
  openGraph: {
    title: 'Locação para produção e gravação | Cantinho da Dê',
    description:
      'Cimento, viga preta e pé-direito alto. Dez cenários diferentes em um endereço só, no Jockey Club.',
    url: '/producao',
    images: [{ url: '/site/og.jpg', width: 1200, height: 630, alt: 'Cantinho da Dê, em Brasília' }],
  },
};

const contato = whatsappLink(
  'Olá! Vi o site do Cantinho da Dê e queria saber sobre locação para gravação.',
);

const cenarios = [
  { src: '/site/salao.jpg', alt: 'Salão de pé-direito alto com vigas aparentes', className: 'gallery-wide' },
  { src: '/site/rede.jpg', alt: 'Mezanino com rede suspensa', className: '' },
  { src: '/site/piscina.jpg', alt: 'Piscina iluminada durante a noite', className: '' },
  { src: '/site/sinuca.jpg', alt: 'Mesa de sinuca no mezanino', className: '' },
  { src: '/site/cozinha.jpg', alt: 'Cozinha integrada ao salão', className: '' },
  { src: '/site/bar.jpg', alt: 'Bar da área de convivência', className: '' },
  { src: '/site/quarto.jpg', alt: 'Quarto em tons neutros', className: '' },
  { src: '/site/banheiro.jpg', alt: 'Banheiro com acabamento escuro', className: '' },
];

export default function ProducaoPage() {
  return (
    <main className="site-shell">
      <SiteHeader cta={{ label: 'Falar no WhatsApp', href: contato, external: true }} />

      <section className="hero">
        <img src="/site/rede.jpg" alt="Mezanino do Cantinho da Dê com rede suspensa e vigas pretas" width={1600} height={900} />
        <div className="hero-shade" />
        <div className="hero-copy">
          <p className="eyebrow">Locação para produção · Brasília</p>
          <h1>
            Dez cenários.{' '}
            <br />
            Um endereço só.
          </h1>
          <p className="hero-lead">
            Cimento queimado, viga de madeira preta, pé-direito alto e luz natural. Uma casa inteira
            para ensaio, gravação e produção de conteúdo — sem montar cenário do zero.
          </p>
          <div className="hero-actions">
            <a className="button button-gold" href="/reservar?tipo=producao">
              Solicitar reserva <span>→</span>
            </a>
            <a className="button button-ghost" href="/explorar">
              Visita técnica em 360° <span>→</span>
            </a>
          </div>
        </div>
      </section>

      <section className="facts" aria-label="Ficha técnica para produção">
        <div><strong>10 cenários</strong><span>em um só local</span></div>
        <div><strong>Tour 360°</strong><span>visita técnica remota</span></div>
        <div><strong>10 vagas</strong><span>de estacionamento</span></div>
        <div><strong>Condomínio</strong><span>fechado e reservado</span></div>
      </section>

      <section className="intro section">
        <div>
          <p className="eyebrow dark">A direção de arte</p>
          <h2>
            A casa já vem{' '}
            <br />
            <em>com identidade.</em>
          </h2>
        </div>
        <div className="intro-copy">
          <p>
            Arquitetura industrial de verdade: parede de textura de cimento, estrutura de madeira
            preta aparente, metal escuro, piso claro e detalhe em dourado.
          </p>
          <p>
            O salão tem pé-direito alto e mezanino, o que abre enquadramento de baixo, de cima e em
            plano aberto no mesmo ambiente. As esquadrias grandes entregam luz natural boa durante
            quase todo o dia.
          </p>
        </div>
      </section>

      <section className="feature section">
        <div className="feature-image">
          <img src="/site/salao.jpg" alt="Salão principal visto do mezanino" width={1600} height={900} loading="lazy" />
          <span>01</span>
        </div>
        <div className="feature-copy">
          <p className="eyebrow dark">Antes de agendar</p>
          <h2>
            Faça a visita técnica{' '}
            <br />
            sem sair da mesa.
          </h2>
          <p>
            O tour em 360° cobre nove ambientes com navegação livre. Dá para medir enquadramento,
            conferir a luz e decidir a locação antes de deslocar equipe.
          </p>
          <ul>
            <li>Nove ambientes navegáveis</li>
            <li>Tela cheia e visão livre em cada ponto</li>
            <li>Link aberto, sem cadastro</li>
          </ul>
          <div className="hero-actions" style={{ marginTop: 30 }}>
            <a className="button button-gold" href="/explorar">
              Abrir o tour 360° <span>→</span>
            </a>
          </div>
        </div>
      </section>

      <section className="feature feature-reverse section">
        <div className="feature-image">
          <img src="/site/cozinha.jpg" alt="Cozinha completa da casa" width={1600} height={900} loading="lazy" />
          <span>02</span>
        </div>
        <div className="feature-copy">
          <p className="eyebrow dark">Estrutura</p>
          <h2>
            Pensada para{' '}
            <br />
            uma diária inteira.
          </h2>
          <p>
            Equipe em pé o dia todo precisa de mais do que cenário bonito. A casa resolve o resto da
            operação.
          </p>
          <ul>
            <li>Cozinha completa para apoio e catering</li>
            <li>Três banheiros, sendo dois no térreo</li>
            <li>10 vagas de estacionamento no lote, sem carga na rua</li>
            <li>Wi-Fi e pontos de energia distribuídos</li>
            <li>Condomínio fechado — set reservado e silencioso</li>
          </ul>
        </div>
      </section>

      <section className="gallery-section section">
        <div className="section-heading">
          <div>
            <p className="eyebrow dark">Os cenários</p>
            <h2>Cada canto é um set.</h2>
          </div>
          <p>Do salão à piscina, do bar ao pomar — ambientes com caras diferentes na mesma diária.</p>
        </div>
        <div className="gallery-grid">
          {cenarios.map((item) => (
            <figure key={item.src} className={item.className}>
              <img src={item.src} alt={item.alt} width={1600} height={900} loading="lazy" />
            </figure>
          ))}
        </div>
      </section>

      <section className="section" style={{ background: 'var(--cream)' }}>
        <div className="section-heading">
          <div>
            <p className="eyebrow dark">Como funciona</p>
            <h2>Direto com a casa.</h2>
          </div>
          <p>Diária ou meia diária, conforme o projeto. Sem intermediário.</p>
        </div>
        <div className="steps">
          <div className="step">
            <span>01</span>
            <strong>Conte o projeto</strong>
            <p>Tipo de produção, tamanho da equipe, data e horário. Respondemos com disponibilidade e valor.</p>
          </div>
          <div className="step">
            <span>02</span>
            <strong>Visita técnica</strong>
            <p>Pelo tour 360° na hora, ou presencial com hora marcada antes de fechar.</p>
          </div>
          <div className="step">
            <span>03</span>
            <strong>Dia da gravação</strong>
            <p>Casa liberada no horário combinado, com acesso pela portaria já autorizado.</p>
          </div>
        </div>
        <p className="note">
          <strong>Antes de fechar:</strong> uso comercial de imagem, alteração de cenário e
          equipamento pesado a gente combina caso a caso — é só falar no primeiro contato.
        </p>
      </section>

      <section className="closing-cta">
        <div>
          <p className="eyebrow">Locação para produção</p>
          <h2>
            Conta o que você{' '}
            <br />
            precisa gravar.
          </h2>
        </div>
        <a className="button button-gold" href="/reservar?tipo=producao">
          Solicitar reserva <span>→</span>
        </a>
      </section>

      <SiteFooter />
    </main>
  );
}
