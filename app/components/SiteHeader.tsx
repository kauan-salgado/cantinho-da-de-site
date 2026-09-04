import { navLinks } from '../site-config';

type Props = {
  cta: { label: string; href: string; external?: boolean };
};

export default function SiteHeader({ cta }: Props) {
  const externo = cta.external ? { target: '_blank', rel: 'noreferrer' } : {};

  return (
    <header className="site-header">
      <a className="site-brand" href="/" aria-label="Cantinho da Dê — início">
        <span className="site-brand-mark">Dê</span>
        <span>
          <strong>Cantinho da Dê</strong>
          <small>Encontros que se conectam</small>
        </span>
      </a>
      <nav className="site-nav" aria-label="Navegação principal">
        {navLinks.map((link) => (
          <a key={link.href} href={link.href}>
            {link.label}
          </a>
        ))}
      </nav>
      <a className="header-cta" href={cta.href} {...externo}>
        {cta.label} <span>↗</span>
      </a>
    </header>
  );
}
