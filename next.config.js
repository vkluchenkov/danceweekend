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
    FTP_DIR: process.env.FTP_DIR,
    // FTP_PHOTO_DIR: process.env.FTP_PHOTO_DIR,
    FTP_HOST: process.env.FTP_HOST,
    FTP_USER: process.env.FTP_USER,
    FTP_PASSWORD: process.env.FTP_PASSWORD,
    TELEGRAM_BOT_TOKEN: process.env.TELEGRAM_BOT_TOKEN,
    TELEGRAM_CHAT_ID: process.env.TELEGRAM_CHAT_ID,
    TELEGRAM_THREAD_ID: process.env.TELEGRAM_THREAD_ID,
    ADMIN_PIN: process.env.ADMIN_PIN,
  },
  output: 'standalone',
  images: {
    domains: ['wordpress.test', 'backend.danceweekend.art'],
  },
};

module.exports = nextTranslate(nextConfig);
