import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* Tus otras opciones de config */
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'storage.googleapis.com',
      },
      {
        protocol: 'https',
        hostname: 'picsum.photos',
      },
      {
        protocol: 'https',
        hostname: 'iili.io',
      },
    ],
  },
  experimental: {
    serverActions: {
      allowedOrigins: ['localhost:9002', '127.0.0.1:51559'],
    },
  },
  // --- Bloque de reescritura para el nuevo subdominio ---
  async rewrites() {
    return {
      beforeFiles: [
        {
          source: '/:path*',
          has: [
            {
              type: 'host',
              value: 'ofertas.evolvance.es', // <-- ¡Importante! Usamos el nuevo subdominio .es
            },
          ],
          destination: '/view-html/n2JQomEcEEmuQ5NY1Rwp',
        },
      ],
    };
  },
};

export default nextConfig;
