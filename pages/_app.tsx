import { montserrat } from '@/src/ulis/font';
import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';

export default function App({ Component, pageProps }: AppProps) {
  const paypalClientId = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID!;

  return (
    <>
      <PayPalScriptProvider options={{ 'client-id': paypalClientId, currency: 'EUR' }}>
        <style jsx global>{`
          html {
            font-family: ${montserrat.style.fontFamily};
          }

          button {
            font-family: ${montserrat.style.fontFamily};
          }
        `}</style>
        <Component {...pageProps} />
      </PayPalScriptProvider>
    </>
  );
}
