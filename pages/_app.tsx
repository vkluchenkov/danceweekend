import { HydrationBoundary, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { montserrat } from '@/src/ulis/font';
import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { GoogleAnalytics } from 'nextjs-google-analytics';
import { useState } from 'react';

export default function App({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            // With SSR, we usually want to set some default staleTime
            // above 0 to avoid refetching immediately on the client
            staleTime: 60 * 1000,
          },
        },
      })
  );
  const dehydratedState = pageProps.dehydratedState;

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
      <QueryClientProvider client={queryClient}>
        <HydrationBoundary state={dehydratedState}>
          <Component {...pageProps} />
        </HydrationBoundary>
      </QueryClientProvider>
    </>
  );
}
