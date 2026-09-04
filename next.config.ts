import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Gera HTML/CSS/JS estáticos em ./out — publicável em qualquer hospedagem,
  // sem servidor Node. É o que permite sair da infraestrutura do ChatGPT.
  output: 'export',
  images: { unoptimized: true },
  trailingSlash: true,
};

export default nextConfig;
