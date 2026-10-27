/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    // Ignora erros do TypeScript durante o build da Vercel
    ignoreBuildErrors: true,
  },
  eslint: {
    // Ignora erros do ESLint durante o build
    ignoreDuringBuilds: true,
  },
};

module.exports = nextConfig;
