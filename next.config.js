/** @type {import('next').NextConfig} */
const nextTranslate = require('next-translate-plugin');

const nextConfig = {
  reactStrictMode: true,
  output: 'standalone',
  images: {
    domains: ['wordpress.test'],
  },
};

module.exports = nextTranslate(nextConfig);
