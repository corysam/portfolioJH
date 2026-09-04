import type { NextConfig } from 'next';

const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_URL ?? process.env.STRAPI_URL;
const strapiPattern = (() => {
  if (!strapiUrl) return undefined;
  try {
    const u = new URL(strapiUrl);
    return {
      protocol: u.protocol.replace(':', '') as 'http' | 'https',
      hostname: u.hostname,
      port: u.port || undefined,
      pathname: '/uploads/**',
    };
  } catch {
    return undefined;
  }
})();

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'admin.juliette-herlem.duckdns.org' },
      ...(strapiPattern ? [strapiPattern] : []),
    ],
  },
};

export default nextConfig;
