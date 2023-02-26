/** @type {import('next').NextConfig} */
const nextTranslate = require('next-translate-plugin');

const nextConfig = {
  reactStrictMode: true,
  output: 'standalone',
};

module.exports = nextTranslate(nextConfig);
