import type { Metadata } from 'next';
import SiteHeader from './components/SiteHeader';
import SiteFooter from './components/SiteFooter';
import { whatsappLink } from './site-config';

export const metadata: Metadata = {
  title: 'Cantinho da Dê | Espaço para workshops e encontros em Brasília',
  description:
    'Salão para até 30 pessoas sentadas, jardim e pomar a 15 minutos do Plano Piloto. Para workshops, treinamentos, aulas e imersões de equipe em Brasília.',
  alternates: { canonical: '/' },
  openGraph: {
    title: 'Cantinho da Dê | Espaço para workshops e encontros em Brasília',
    description:
      'Um dia inteiro de foco, sem cara de escritório. Salão para até 30 pessoas, jardim e pomar no Jockey Club, a 15 minutos do Plano Piloto.',
    url: '/',
    images: [{ url: '/site/og.jpg', width: 1200, height: 630, alt: 'Cantinho da Dê, em Brasília' }],
  },
};

const contato = whatsappLink(
  'Olá! Vi o site do Cantinho da Dê e queria saber sobre o espaço para workshop.',
);

export default function Home() {
  return (
    <main className="site-shell">
      <SiteHeader cta={{ label: 'Falar no WhatsApp', href: contato, external: true }} />

      <section className="hero">
        <img src="/site/salao.jpg" alt="Salão do Cantinho da Dê preparado para receber grupos" width={1600} height={900} />
        <div className="hero-shade" />
        <div className="hero-copy">
          <p className="eyebrow">Espaço para encontros · Jockey Club</p>
          <h1>
            Um dia inteiro de foco.{' '}
            <br />
            Zero cara de escritório.
          </h1>
          <p className="hero-lead">
            A 15 minutos do Plano Piloto, uma casa com salão de encontros, jardim e pomar — para
            workshops, treinamentos e imersões que não terminam com todo mundo olhando o relógio.
          </p>
          <div className="hero-actions">
            <a className="button button-gold" href="/reservar?tipo=workshop">
              Solicitar reserva <span>→</span>
            </a>
            <a className="button button-ghost" href="/explorar">
              Ver o espaço em 360° <span>→</span>
            </a>
          </div>
        </div>
      </section>

      <section className="facts" aria-label="Ficha técnica do espaço">
        <div><strong>30 pessoas</strong><span>sentadas no salão</span></div>
        <div><strong>2 banheiros</strong><span>exclusivos do espaço</span></div>
        <div><strong>10 vagas</strong><span>de estacionamento no lote</span></div>
        <div><strong>15 min</strong><span>do Plano Piloto</span></div>
      </section>

      <section className="intro section">
        <div>
          <p className="eyebrow dark">O espaço de encontros</p>
          <h2>
            O térreo inteiro.{' '}
            <br />
            <em>Só para o seu grupo.</em>
          </h2>
        </div>
        <div className="intro-copy">
          <p>
            O salão ocupa todo o andar de baixo, acomoda 30 pessoas sentadas e tem dois banheiros exclusivos — ninguém precisa
            atravessar a casa no meio de uma dinâmica.
          </p>
          <p>
            A Smart TV de 65 polegadas é móvel e serve tanto de tela de apresentação quanto de som. O
            mobiliário se reconfigura conforme o formato: mesa única para workshop, U para
            treinamento, plateia para palestra.
          </p>
          <p>
            A cozinha completa fica ao lado, com fogão, geladeira, micro-ondas, cafeteira e bancada.
            É estrutura pronta para receber o buffet que você contratar — sem marmita fria e sem
            precisar interromper o dia para sair e almoçar.
          </p>
        </div>
      </section>

      <section className="feature section">
        <div className="feature-image">
          <img src="/site/jardim-interno.jpg" alt="Jardim interno do Cantinho da Dê" width={1600} height={900} loading="lazy" />
          <span>01</span>
        </div>
        <div className="feature-copy">
          <p className="eyebrow dark">O intervalo</p>
          <h2>
            A tarde rende mais{' '}
            <br />
            quando a pausa é de verdade.
          </h2>
          <p>
            É aqui que a casa ganha da sala de reunião de hotel. No intervalo, o grupo não vai para um
            corredor com café de garrafa térmica — vai para fora.
          </p>
          <ul>
            <li>Jardim e pomar para o intervalo ao ar livre</li>
            <li>Fogueira ao ar livre</li>
            <li>Mesa de sinuca no mezanino</li>
            <li>Cozinha completa para coffee break e buffet</li>
            <li>Churrasqueira para o almoço no local</li>
          </ul>
        </div>
      </section>

      <section className="feature feature-reverse section">
        <div className="feature-image">
          <img src="/site/rede.jpg" alt="Mezanino com rede suspensa e mesa de sinuca" width={1600} height={900} loading="lazy" />
          <span>02</span>
        </div>
        <div className="feature-copy">
          <p className="eyebrow dark">Formatos</p>
          <h2>
            Cabe mais coisa{' '}
            <br />
            do que reunião.
          </h2>
          <p>
            Grupos pequenos e médios funcionam melhor aqui do que auditório. A casa foi feita para
            conversa, não para fileira.
          </p>
          <ul>
            <li>Workshops e treinamentos de equipe</li>
            <li>Aulas, cursos e mentorias</li>
            <li>Planejamento e imersão de liderança</li>
            <li>Reuniões de sócios e encontros de conselho</li>
            <li>Retiros com pernoite para até 6 pessoas</li>
          </ul>
        </div>
      </section>

      <section className="section" style={{ background: 'var(--paper)' }}>
        <div className="section-heading">
          <div>
            <p className="eyebrow dark">Como funciona</p>
            <h2>Simples assim.</h2>
          </div>
          <p>Sem plataforma, sem taxa de intermediação. A conversa é direta com a anfitriã.</p>
        </div>
        <div className="steps">
          <div className="step">
            <span>01</span>
            <strong>Conversa</strong>
            <p>Você conta o formato, quantas pessoas e a data pretendida. Respondemos com disponibilidade e valor.</p>
          </div>
          <div className="step">
            <span>02</span>
            <strong>Visita</strong>
            <p>Presencial, com hora marcada — ou pelo tour 360°, se você preferir decidir sem sair do lugar.</p>
          </div>
          <div className="step">
            <span>03</span>
            <strong>O dia</strong>
            <p>A casa fica preparada no formato combinado. Vocês chegam e começam.</p>
          </div>
        </div>
        <p className="note">
          <strong>Disponibilidade:</strong> o calendário na página de reserva mostra as datas já
          ocupadas, atualizadas direto do nosso sistema de reservas.
        </p>
        <p className="note">
          <strong>Grupos acima de 20 pessoas:</strong> são 10 vagas de estacionamento dentro do lote. Para turmas
          maiores, vale combinar van ou carona antes — o condomínio é residencial e a rua não
          comporta o excedente. A gente ajuda a organizar isso no primeiro contato.
        </p>
      </section>

      <section className="section" style={{ background: 'var(--cream)' }}>
        <div className="section-heading">
          <div><p className="eyebrow dark">A casa também recebe</p><h2>Não é só encontro.</h2></div>
          <p>O mesmo espaço atende hospedagem e produção audiovisual.</p>
        </div>
        <div className="doors">
          <a className="door" href="/hospedagem">
            <img src="/site/piscina.jpg" alt="" width={1600} height={900} loading="lazy" />
            <div>
              <p className="eyebrow">Hospedagem</p>
              <h3>A casa inteira para você.</h3>
              <p>Dois quartos para até 6 hóspedes, com piscina, sinuca e churrasqueira.</p>
              <b>Ver a casa →</b>
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

      <section className="closing-cta">
        <div>
          <p className="eyebrow">Seu próximo encontro começa aqui</p>
          <h2>
            Vamos falar{' '}
            <br />
            sobre o seu dia.
          </h2>
        </div>
        <a className="button button-gold" href="/reservar?tipo=workshop">
          Solicitar reserva <span>→</span>
        </a>
      </section>

      <SiteFooter />
    </main>
  );
}
