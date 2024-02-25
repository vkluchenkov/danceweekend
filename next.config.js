/** @type {import('next').NextConfig} */
const nextTranslate = require('next-translate-plugin');

const nextConfig = {
  reactStrictMode: true,
  output: 'standalone',
  images: {
    domains: ['wordpress.test', 'backend.danceweekend.art'],
  },
};

module.exports = nextTranslate(nextConfig);
