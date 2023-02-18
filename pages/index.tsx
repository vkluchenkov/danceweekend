import Head from 'next/head';
import Image from 'next/image';
import { Montserrat } from '@next/font/google';
import styles from '@/styles/Home.module.css';
import { Layout } from '@/src/components/Layout';

const montserrat = Montserrat({
  subsets: ['latin', 'cyrillic', 'latin-ext', 'cyrillic-ext'],
});

export default function Home() {
  return (
    <>
      <Layout>
        <></>
      </Layout>
    </>
  );
}
