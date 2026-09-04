'use client';

import { useEffect, useRef, useState } from 'react';

const scenes = [
  { id: 'jardim', name: 'Jardim', eyebrow: 'Comece por aqui', image: '/panoramas/jardim.jpg', view: { yaw: 0, pitch: 0, fov: 1.35 } },
  { id: 'jardim-proximo', name: 'Jardim próximo', eyebrow: 'Caminho para a casa', image: '/panoramas/jardim-proximo.jpg', view: { yaw: 0, pitch: 0, fov: 1.25 } },
  { id: 'salao-entrada', name: 'Entrada do salão', eyebrow: 'Ambiente principal', image: '/panoramas/salao-entrada.jpg', view: { yaw: 0.1, pitch: 0, fov: 1.25 } },
  { id: 'salao-central', name: 'Salão central', eyebrow: 'Encontros que se conectam', image: '/panoramas/salao-central.jpg', view: { yaw: 0, pitch: 0, fov: 1.25 } },
  { id: 'salao-rede', name: 'Salão e rede', eyebrow: 'Vista para o mezanino', image: '/panoramas/salao-rede.jpg', view: { yaw: 0, pitch: -0.03, fov: 1.3 } },
  { id: 'mezanino', name: 'Mezanino', eyebrow: 'Sinuca e descanso', image: '/panoramas/mezanino.jpg', view: { yaw: 0, pitch: 0, fov: 1.25 } },
  { id: 'sinuca', name: 'Mesa de sinuca', eyebrow: 'Diversão no mezanino', image: '/panoramas/sinuca.jpg', view: { yaw: 0, pitch: -0.04, fov: 1.2 } },
  { id: 'piscina-entrada', name: 'Área da piscina', eyebrow: 'Sol e tranquilidade', image: '/panoramas/piscina-entrada.jpg', view: { yaw: 0, pitch: 0, fov: 1.25 } },
  { id: 'piscina', name: 'Piscina', eyebrow: 'Um mergulho no Cantinho', image: '/panoramas/piscina.jpg', view: { yaw: 0, pitch: 0, fov: 1.25 } },
];

const links: Record<string, { target: string; yaw: number; pitch: number }[]> = {
  jardim: [{ target: 'jardim-proximo', yaw: 0.08, pitch: -0.12 }],
  'jardim-proximo': [
    { target: 'jardim', yaw: -3.02, pitch: -0.13 },
    { target: 'salao-entrada', yaw: 0.08, pitch: -0.1 },
  ],
  'salao-entrada': [
    { target: 'jardim-proximo', yaw: -3.02, pitch: -0.12 },
    { target: 'salao-central', yaw: 0.05, pitch: -0.08 },
  ],
  'salao-central': [
    { target: 'salao-entrada', yaw: -3.02, pitch: -0.1 },
    { target: 'salao-rede', yaw: 0.05, pitch: -0.06 },
  ],
  'salao-rede': [
    { target: 'salao-central', yaw: -3.02, pitch: -0.08 },
    { target: 'mezanino', yaw: 0.72, pitch: 0.04 },
    { target: 'piscina-entrada', yaw: 0.02, pitch: -0.08 },
  ],
  mezanino: [
    { target: 'salao-rede', yaw: -3.02, pitch: -0.03 },
    { target: 'sinuca', yaw: -0.5, pitch: -0.08 },
  ],
  sinuca: [{ target: 'mezanino', yaw: -3.02, pitch: -0.06 }],
  'piscina-entrada': [
    { target: 'salao-rede', yaw: 2.82, pitch: -0.08 },
    { target: 'piscina', yaw: 0.02, pitch: -0.12 },
  ],
  piscina: [{ target: 'piscina-entrada', yaw: 2.82, pitch: -0.1 }],
};

export default function Tour() {
  const element = useRef<HTMLDivElement>(null);
  const viewerRef = useRef<any>(null);
  const sceneRefs = useRef<Record<string, any>>({});
  const [activeId, setActiveId] = useState(scenes[0].id);
  const [menuOpen, setMenuOpen] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!element.current || viewerRef.current) return;
    let disposed = false;
    void import('marzipano').then((Marzipano) => {
      if (disposed || !element.current) return;
      const viewer = new Marzipano.Viewer(element.current, { controls: { mouseViewMode: 'drag' } });
      viewerRef.current = viewer;
      scenes.forEach((item) => {
        const source = Marzipano.ImageUrlSource.fromString(item.image);
        const geometry = new Marzipano.EquirectGeometry([{ width: 4096 }]);
        const limiter = Marzipano.RectilinearView.limit.traditional(1024, Math.PI * 0.66);
        const view = new Marzipano.RectilinearView(item.view, limiter);
        sceneRefs.current[item.id] = viewer.createScene({ source, geometry, view, pinFirstLevel: true });
      });
      Object.entries(links).forEach(([sceneId, sceneLinks]) => {
        sceneLinks.forEach((link) => {
          const target = scenes.find((item) => item.id === link.target);
          if (!target) return;
          const button = document.createElement('button');
          button.type = 'button';
          button.className = 'link-hotspot';
          button.setAttribute('aria-label', `Ir para ${target.name}`);
          const arrow = document.createElement('span');
          arrow.className = 'link-hotspot-arrow';
          arrow.textContent = '↑';
          const label = document.createElement('span');
          label.className = 'link-hotspot-label';
          label.textContent = target.name;
          button.append(arrow, label);
          button.addEventListener('click', () => {
            sceneRefs.current[link.target]?.switchTo({ transitionDuration: 700 });
            setActiveId(link.target);
            setMenuOpen(false);
          });
          sceneRefs.current[sceneId].hotspotContainer().createHotspot(button, { yaw: link.yaw, pitch: link.pitch });
        });
      });
      sceneRefs.current[scenes[0].id].switchTo({ transitionDuration: 0 });
      setReady(true);
    });
    return () => {
      disposed = true;
      viewerRef.current?.destroy();
      viewerRef.current = null;
      sceneRefs.current = {};
    };
  }, []);

  const activeIndex = scenes.findIndex((scene) => scene.id === activeId);
  const active = scenes[activeIndex];

  function goTo(id: string) {
    if (!sceneRefs.current[id] || id === activeId) return;
    sceneRefs.current[id].switchTo({ transitionDuration: 700 });
    setActiveId(id);
    setMenuOpen(false);
  }
  function move(step: number) { goTo(scenes[(activeIndex + step + scenes.length) % scenes.length].id); }
  function toggleFullscreen() {
    if (!document.fullscreenElement) document.documentElement.requestFullscreen?.();
    else document.exitFullscreen?.();
  }

  return (
    <main className="tour-shell">
      <div ref={element} className="viewer" aria-label={`Vista em 360 graus: ${active.name}`} />
      <div className="shade" aria-hidden="true" />
      {!ready && <div className="loader">Preparando sua visita…</div>}

      <header className="topbar">
        <div className="brand" aria-label="Cantinho da Dê">
          <span className="brand-mark">CD</span>
          <span><strong>Cantinho da Dê</strong><small>tour virtual</small></span>
        </div>
        <div className="top-actions">
          <button onClick={() => setMenuOpen(!menuOpen)} aria-expanded={menuOpen}>Ambientes</button>
          <button className="icon-button" onClick={toggleFullscreen} aria-label="Abrir em tela cheia">⛶</button>
        </div>
      </header>

      <section className="scene-copy" aria-live="polite">
        <p>{active.eyebrow}</p><h1>{active.name}</h1><span>Arraste para olhar ao redor</span>
      </section>

      <nav className={`scene-menu ${menuOpen ? 'open' : ''}`} aria-label="Ambientes do tour">
        <div className="menu-heading"><span>Explore o espaço</span><button onClick={() => setMenuOpen(false)} aria-label="Fechar menu">×</button></div>
        {scenes.map((scene, index) => (
          <button key={scene.id} className={scene.id === activeId ? 'active' : ''} onClick={() => goTo(scene.id)}>
            <span>{String(index + 1).padStart(2, '0')}</span>{scene.name}
          </button>
        ))}
      </nav>

      <div className="tour-controls">
        <button onClick={() => move(-1)} aria-label="Ambiente anterior">←</button>
        <div><strong>{String(activeIndex + 1).padStart(2, '0')}</strong><span> / {String(scenes.length).padStart(2, '0')}</span></div>
        <button onClick={() => move(1)} aria-label="Próximo ambiente">→</button>
      </div>
    </main>
  );
}
