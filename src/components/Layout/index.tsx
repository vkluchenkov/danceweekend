import { Divider } from '@/src/ui-kit/Divider';
import clsx from 'clsx';
import Head from 'next/head';
import { useEffect } from 'react';
import { Footer } from '../Footer';
import { Header } from '../Header';
import styles from './layout.module.css';

interface LayoutProps {
  children: any;
  title?: string;
  isHome?: boolean;
}

export const Layout: React.FC<LayoutProps> = ({ children, title, isHome }) => {
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

  const Main = isHome ? (
    <main className={styles.main}>
      {children}
      <Footer />
    </main>
  ) : (
    <>
      <main className={clsx(styles.main, styles.main_notHome)}>
        {children}
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
        <link rel='icon' href='images/favicon.png' />
      </Head>
      <Header isHome={isHome} />
      {Main}
    </>
  );
};
