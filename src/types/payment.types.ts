import { SupportedLangs } from '.';

export interface PaymentFormFields {
  name: string;
  email: string;
  qty: string;
  method: 'paypal' | 'stripe';
}

export interface PaymentConfirmFields {
  name: string;
  email: string;
  password: string;
  lang: SupportedLangs;
}
