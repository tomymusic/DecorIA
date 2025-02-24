/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [], // Agrega aquí los dominios permitidos para imágenes si usas `next/image`
  },
};

export default {
  reactStrictMode: true,
  images: {
    domains: ["cdn.shopify.com", "replicate.delivery"],
  },
};
