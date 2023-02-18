import Head from 'next/head';
import { Header } from '../Header';
import styles from './layout.module.css';

interface LayoutProps {
  children: any;
  title?: string;
}

export const Layout: React.FC<LayoutProps> = ({ children, title }) => {
  return (
    <>
      <Head>
        <title>{title ? title + ' – Dance Weekend in Warsaw' : 'Dance Weekend in Warsaw'}</title>
        <meta name='description' content='International bellydance festival' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='images/favicon.png' />
      </Head>
      <Header />
      <main className={styles.main}>{children}</main>
    </>
  );
};
