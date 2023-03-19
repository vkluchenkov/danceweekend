import { montserrat } from '@/src/ulis/font';
import '@/styles/globals.css';
import type { AppProps } from 'next/app';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
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
