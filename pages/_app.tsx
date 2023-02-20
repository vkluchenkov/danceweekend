import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { Montserrat } from '@next/font/google';

const montserrat = Montserrat({
  subsets: ['latin', 'cyrillic', 'latin-ext', 'cyrillic-ext'],
});

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
