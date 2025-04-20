import { must } from './ulis/must';

// All non NEXT_PUBLIC should be listed in next.config
export const config = {
  wordpress: {
    grapqlBackend: must(process.env.NEXT_PUBLIC_GRAPHQL_BACKEND, 'Wordpress backend is missing'),
  },
  notion: {
    token: must(process.env.NOTION_TOKEN, 'Notion token is missing'),
    liveDbId: must(process.env.NOTION_DATABASE_LIVE, 'Notion live database is missing'),
  },
  brevo: {
    token: must(process.env.SENDINBLUE_SECRET, 'Sendinblue token is missing'),
  },
  stripe: {
    stripeKey: must(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY, 'Stripe key is missing'),
    stripeSecretKey: must(process.env.STRIPE_SECRET_KEY, 'Stripe secret key is missing'),
  },
  paypal: {
    paypalClientId: must(process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID, 'Paypal client id is missing'),
  },
  ftp: {
    musicDir: must(process.env.FTP_DIR, 'FTP directory is missing'),
    ftpHost: must(process.env.FTP_HOST, 'FTP host is missing'),
    ftpUser: must(process.env.FTP_USER, 'FTP user is missing'),
    ftpPassword: must(process.env.FTP_PASSWORD, 'FTP password is missing'),
  },
  telegram: {
    botToken: must(process.env.TELEGRAM_BOT_TOKEN, 'Telegram bot token is missing'),
    chatId: must(process.env.TELEGRAM_CHAT_ID, 'Telegram chat id is missing'),
    threadId: must(process.env.TELEGRAM_THREAD_ID, 'Telegram thread id is missing'),
  },
  other: {
    adminPin: must(process.env.ADMIN_PIN, 'Admin pin is missing'),
  },
};
