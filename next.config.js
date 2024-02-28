/** @type {import('next').NextConfig} */
const nextTranslate = require('next-translate-plugin');

const nextConfig = {
  reactStrictMode: true,
  env: {
    NOTION_DATABASE_LIVE: process.env.NOTION_DATABASE_LIVE,
  },
  output: 'standalone',
  images: {
    domains: ['wordpress.test', 'backend.danceweekend.art'],
  },
};

module.exports = nextTranslate(nextConfig);
