/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["cdn.shopify.com", "replicate.delivery"], // Agrega los dominios permitidos para imágenes
  },
};

export default nextConfig;
