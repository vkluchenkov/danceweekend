/** @type {import('next').NextConfig} */
const nextTranslate = require('next-translate-plugin');

const nextConfig = {
  reactStrictMode: true,
  output: 'standalone',
  images: {
    formats: ['image/webp'],
  },
};

module.exports = nextTranslate(nextConfig);
