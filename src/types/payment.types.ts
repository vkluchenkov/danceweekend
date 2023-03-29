export interface PaymentFormFields {
  name: string;
  email: string;
  qty: string;
  method: 'paypal' | 'stripe';
}
