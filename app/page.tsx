import SiteHeader from './components/SiteHeader';
import SiteFooter from './components/SiteFooter';
import { airbnbUrl } from './site-config';

const gallery = [
  { src: '/site/piscina.jpg', alt: 'Piscina iluminada durante a noite', className: 'gallery-wide' },
  { src: '/site/rede.jpg', alt: 'Rede suspensa e área de jogos no mezanino', className: '' },
  { src: '/site/salao.jpg', alt: 'Salão amplo preparado para receber', className: '' },
  { src: '/site/quarto.jpg', alt: 'Quarto confortável do Cantinho da Dê', className: '' },
  { src: '/site/cozinha.jpg', alt: 'Cozinha equipada integrada ao salão', className: '' },
  { src: '/site/sinuca.jpg', alt: 'Mesa de sinuca no mezanino', className: '' },
  { src: '/site/bar.jpg', alt: 'Bar da área de convivência', className: '' },
  { src: '/site/banheiro.jpg', alt: 'Banheiro completo do Cantinho da Dê', className: '' },
];

export default function Home() {
  return (
    <main className="site-shell">
      <SiteHeader cta={{ label: 'Ver no Airbnb', href: airbnbUrl, external: true }} />

      <section className="hero" id="inicio">
        <video autoPlay muted loop playsInline poster="/site/fachada.jpg" preload="metadata" aria-hidden="true">
          <source src="/site/abertura-drone.m4v" type="video/mp4" />
        </video>
        <div className="hero-shade" />
        <div className="hero-copy">
          <p className="eyebrow">Jockey · Brasília</p>
          <h1>Um lugar inteiro{' '}<br />para viver bons encontros.</h1>
          <p className="hero-lead">Conforto, lazer e natureza em um espaço amplo, acolhedor e cheio de personalidade.</p>
          <div className="hero-actions">
            <a className="button button-gold" href={airbnbUrl} target="_blank" rel="noreferrer">Consultar disponibilidade <span>↗</span></a>
            <a className="button button-ghost" href="/explorar">Explorar em 360° <span>→</span></a>
          </div>
        </div>
        <a className="scroll-cue" href="#espaco"><span>Conheça o espaço</span><b>↓</b></a>
      </section>

      <section className="facts" aria-label="Informações da hospedagem">
        <div><strong>Até 6</strong><span>hóspedes</span></div><div><strong>2</strong><span>quartos</span></div><div><strong>3</strong><span>banheiros</span></div><div><strong>1 experiência</strong><span>inteira para você</span></div>
      </section>

      <section className="intro section" id="espaco">
        <div><p className="eyebrow dark">O Cantinho</p><h2>Espaço para desacelerar.{' '}<br /><em>Liberdade para aproveitar.</em></h2></div>
        <div className="intro-copy"><p>O Cantinho da Dê une arquitetura contemporânea, ambientes integrados e áreas de lazer pensadas para quem valoriza tempo de qualidade.</p><p>Da piscina ao salão, da sinuca ao jardim: cada espaço convida a ficar mais um pouco.</p></div>
      </section>

      <section className="feature section" id="experiencias">
        <div className="feature-image"><img src="/site/piscina.jpg" alt="Piscina iluminada do Cantinho da Dê" width={1600} height={900} loading="lazy" /><span>01</span></div>
        <div className="feature-copy"><p className="eyebrow dark">Lazer ao ar livre</p><h2>Dias de sol.{' '}<br />Noites inesquecíveis.</h2><p>A área externa é um convite para relaxar, reunir quem importa e aproveitar o clima de Brasília com privacidade.</p><ul><li>Piscina privativa</li><li>Jardim e pomar</li><li>Ambiente reservado</li></ul></div>
      </section>

      <section className="feature feature-reverse section">
        <div className="feature-image"><img src="/site/rede.jpg" alt="Rede suspensa e mesa de sinuca no mezanino" width={1600} height={900} loading="lazy" /><span>02</span></div>
        <div className="feature-copy"><p className="eyebrow dark">Diversão em outro nível</p><h2>Um espaço que{' '}<br />não parece com nenhum outro.</h2><p>O mezanino reúne sinuca, cantinhos de descanso e a rede suspensa — um dos detalhes mais marcantes da casa.</p><ul><li>Mesa de sinuca</li><li>Rede suspensa</li><li>TV móvel de 65”</li></ul></div>
      </section>

      <section className="tour-invite">
        <img src="/site/salao.jpg" alt="Salão principal do Cantinho da Dê" width={1600} height={900} loading="lazy" /><div className="tour-invite-shade" />
        <div className="tour-invite-copy"><span className="tour-orbit">360°</span><p className="eyebrow">Visita imersiva</p><h2>Entre antes{' '}<br />mesmo de chegar.</h2><p>Passeie por cada ambiente e descubra os detalhes do Cantinho da Dê.</p><a className="button button-gold" href="/explorar">Iniciar tour virtual <span>→</span></a></div>
      </section>

      <section className="gallery-section section" id="galeria">
        <div className="section-heading"><div><p className="eyebrow dark">Galeria</p><h2>Um olhar mais de perto.</h2></div><p>Ambientes reais, preparados com carinho para receber.</p></div>
        <div className="gallery-grid">{gallery.map((item) => <figure key={item.src} className={item.className}><img src={item.src} alt={item.alt} width={1600} height={900} loading="lazy" /></figure>)}</div>
      </section>

      <section className="section" style={{ background: 'var(--cream)' }}>
        <div className="section-heading">
          <div><p className="eyebrow dark">A casa também recebe</p><h2>Mais do que hospedagem.</h2></div>
          <p>De segunda a quinta o Cantinho abre para grupos, encontros e produções.</p>
        </div>
        <div className="doors">
          <a className="door" href="/workshops">
            <img src="/site/salao.jpg" alt="" width={1600} height={900} loading="lazy" />
            <div>
              <p className="eyebrow">Workshops e imersões</p>
              <h3>Um dia inteiro de foco.</h3>
              <p>Salão para 30 pessoas sentadas, com dois banheiros exclusivos. Piscina e pomar no intervalo.</p>
              <b>Conhecer o espaço →</b>
            </div>
          </a>
          <a className="door" href="/producao">
            <img src="/site/rede.jpg" alt="" width={1600} height={900} loading="lazy" />
            <div>
              <p className="eyebrow">Locação para produção</p>
              <h3>Dez cenários, um endereço.</h3>
              <p>Arquitetura industrial pronta para ensaio, gravação e produção de conteúdo.</p>
              <b>Ver detalhes →</b>
            </div>
          </a>
        </div>
      </section>

      <section className="closing-cta"><div><p className="eyebrow">Seu próximo encontro começa aqui</p><h2>Venha viver o{' '}<br />Cantinho da Dê.</h2></div><a className="button button-gold" href={airbnbUrl} target="_blank" rel="noreferrer">Ver datas disponíveis <span>↗</span></a></section>

      <SiteFooter />
    </main>
  );
}
