/** @type {import('next').NextConfig} */
const nextTranslate = require('next-translate-plugin');

const nextConfig = {
  reactStrictMode: true,
  env: {
    NOTION_DATABASE_LIVE: process.env.NOTION_DATABASE_LIVE,
    NOTION_DATABASE_ONLINE: process.env.NOTION_DATABASE_ONLINE,
    NOTION_TOKEN: process.env.NOTION_TOKEN,
    SENDINBLUE_SECRET: process.env.SENDINBLUE_SECRET,
    STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
  },
  output: 'standalone',
  images: {
    domains: ['wordpress.test', 'backend.danceweekend.art'],
  },
};

module.exports = nextTranslate(nextConfig);
