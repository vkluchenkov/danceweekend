/** @type {import('next').NextConfig} */
const nextTranslate = require('next-translate-plugin');

const nextConfig = {
  reactStrictMode: true,
  env: {
    ADMIN_PIN: process.env.ADMIN_PIN,
  },
  output: 'standalone',
  images: {
    domains: ['wordpress.test', 'backend.danceweekend.art'],
  },
};

module.exports = nextTranslate(nextConfig);
