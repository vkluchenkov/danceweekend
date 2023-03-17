import { Divider } from '@/src/ui-kit/Divider';
import clsx from 'clsx';
import Head from 'next/head';
import { MutableRefObject, useEffect, useRef, useState } from 'react';
import { Footer } from '../Footer';
import { Header } from '../Header';
import styles from './layout.module.css';

interface LayoutProps {
  children: any;
  title?: string;
  isHome?: boolean;
  imageRef?: MutableRefObject<HTMLDivElement | null>;
}

export const Layout: React.FC<LayoutProps> = ({ children, title, isHome, imageRef }) => {
  const mainRef = useRef<HTMLDivElement | null>(null);
  const mainHomeRef = useRef<HTMLDivElement | null>(null);
  const lineRef = useRef<HTMLDivElement | null>(null);

  // Handle viewport changes on mobile (and not)
  useEffect(() => {
    const handleVh = () => {
      if (typeof window != 'undefined') {
        const vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
      }
    };
    handleVh();
    window.addEventListener('resize', handleVh);
    return () => window.removeEventListener('resize', handleVh);
  }, []);

  // Handle "sticky" line on Home page
  useEffect(() => {
    if (isHome) {
      const mainEl = mainHomeRef.current;
      const imageEl = imageRef?.current;
      const lineEl = lineRef.current;

      const handleScroll = () => {
        if (lineEl && imageEl && mainEl) {
          const imageBottom = imageEl.getBoundingClientRect().bottom;
          const mainTop = mainEl.getBoundingClientRect().top;
          const diff = imageBottom - mainTop;

          if (diff <= 0) lineEl.style.top = mainTop.toFixed(0) + 'px';
          else lineEl.style.top = imageBottom.toFixed(0) + 'px';
        }
      };

      handleScroll();
      mainEl?.addEventListener('scroll', handleScroll);
      window.addEventListener('resize', handleScroll);
      return () => {
        mainEl?.removeEventListener('scroll', handleScroll);
        window.removeEventListener('resize', handleScroll);
      };
    }
  }, [imageRef, isHome]);

  const Main = isHome ? (
    <>
      <div className={styles.imageDivider} ref={lineRef}>
        <Divider />
      </div>
      <main ref={mainHomeRef} className={styles.main}>
        {children}
        <Footer />
      </main>
    </>
  ) : (
    <>
      <main ref={mainRef} className={clsx(styles.main, styles.main_notHome)}>
        <div className={styles.contentWrapper}>{children}</div>
        <Footer />
      </main>
    </>
  );

  return (
    <>
      <Head>
        <title>{title ? title + ' – Dance Weekend in Warsaw' : 'Dance Weekend in Warsaw'}</title>
        <meta name='description' content='International bellydance festival' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <meta
          name='og:title'
          content={title ? title + ' – Dance Weekend in Warsaw' : 'Dance Weekend in Warsaw'}
        />
        <meta name='og:description' content='International bellydance festival' />
        <meta name='og:image' content='images/social_poster.jpg' />
        <meta name='og:image:width' content='1500' />
        <meta name='og:image:height' content='1500' />
        <link rel='icon' href='images/favicon.png' />
      </Head>
      <Header isHome={isHome} mainHomeRef={mainHomeRef} mainRef={mainRef} lineRef={lineRef} />
      {Main}
    </>
  );
};
