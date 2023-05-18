import { montserrat } from '@/src/ulis/font';
import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { GoogleAnalytics } from 'nextjs-google-analytics';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <GoogleAnalytics trackPageViews strategy='lazyOnload' />
      <style jsx global>{`
        html {
          font-family: ${montserrat.style.fontFamily};
        }

        button {
          font-family: ${montserrat.style.fontFamily};
        }
      `}</style>
      <Component {...pageProps} />
    </>
  );
}
