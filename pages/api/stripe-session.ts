// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';
import Stripe from 'stripe';
import { PaymentFormFields } from '@/src/types/payment.types';

//@ts-ignore
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: null });

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const orderPayload: PaymentFormFields = req.body;
  const { name, email, qty } = orderPayload;

  const amount = parseFloat(qty).toFixed(2);

  const item = {
    price_data: {
      currency: 'eur',
      product_data: {
        name,
      },
      unit_amount: parseFloat(amount) * 100,
    },
    quantity: 1,
  };

  if (req.method === 'POST') {
    try {
      const session = await stripe.checkout.sessions.create({
        customer_email: email,
        line_items: [item],
        mode: 'payment',
        success_url: `${req.headers.origin}/payment/thank-you`,
        cancel_url: `${req.headers.origin}/payment`,
        payment_method_types: [],
      });
      res.status(200).send({ url: session.url });
    } catch (err: any) {
      res.status(err.statusCode || 500).json(err.message);
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
}

export default handler;
