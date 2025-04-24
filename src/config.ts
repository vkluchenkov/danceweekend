import { must } from './ulis/must';

// All non NEXT_PUBLIC should be listed in next.config
export const config = {
  wordpress: {
    grapqlBackend: must(process.env.NEXT_PUBLIC_GRAPHQL_BACKEND, 'Wordpress backend is missing'),
  },
  stripe: {
    stripeKey: must(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY, 'Stripe key is missing'),
    // stripeSecretKey: must(process.env.STRIPE_SECRET_KEY, 'Stripe secret key is missing'),
  },
  paypal: {
    paypalClientId: must(process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID, 'Paypal client id is missing'),
  },
  other: {
    adminPin: must(process.env.ADMIN_PIN, 'Admin pin is missing'),
  },
};
