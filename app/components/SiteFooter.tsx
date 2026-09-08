import { airbnbUrl, navLinks } from '../site-config';

// O menu do topo some abaixo de 980px, então o rodapé carrega a navegação
// completa — é por aqui que o celular alcança as páginas internas.
export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-brand">
        <span className="site-brand-mark">Dê</span>
        <div>
          <strong>Cantinho da Dê</strong>
          <small>Encontros que se conectam</small>
        </div>
      </div>
      <nav className="footer-nav" aria-label="Navegação do rodapé">
        {navLinks.map((link) => (
          <a key={link.href} href={link.href}>
            {link.label}
          </a>
        ))}
      </nav>
      <div>
        <span>Jockey Club · Brasília, DF</span>
        <a href={airbnbUrl} target="_blank" rel="noreferrer">
          Airbnb ↗
        </a>
      </div>
    </footer>
  );
}
