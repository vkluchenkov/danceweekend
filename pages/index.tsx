import { useRef } from 'react';
import Image from 'next/image';
import { GetStaticProps } from 'next';
import LiteYouTubeEmbed from 'react-lite-youtube-embed';
import useTranslation from 'next-translate/useTranslation';
import { QueryClient, dehydrate } from '@tanstack/react-query';
import Trans from 'next-translate/Trans';
import clsx from 'clsx';

import styles from '@/styles/Home.module.css';
import { Layout } from '@/src/components/Layout';
import { Divider } from '@/src/ui-kit/Divider';
import { Cta } from '@/src/components/CTA';
import teachers from 'public/images/teachers.png';
import teachers1Line from 'public/images/teachers_1_line.png';
import prize from 'public/images/Prize.png';
import { Schedule } from '@/src/components/Schedule';
import { Partners } from '@/src/components/Partners';
import { WordpressApi } from '@/src/api/wordpressApi';

export const getStaticProps: GetStaticProps = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['cta'],
    queryFn: () => WordpressApi.getCta(),
  });

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
    revalidate: 60,
  };
};

export default function Home() {
  const { t } = useTranslation();
  const imageRef = useRef<HTMLDivElement | null>(null);

  // Translations with HTML
  const welcomeTitle = <Trans i18nKey='home:welcomeTitle' components={[<br key={1} />]} />;
  const welcomeText1 = (
    <Trans
      i18nKey='home:welcomeText'
      components={[
        <p className={styles.content__text} key={0} />,
        <span className={styles.content__text_accent} key={1} />,
      ]}
    />
  );
  const welcomeText2 = (
    <Trans
      i18nKey='home:welcomeText2'
      components={[
        <p className={styles.content__text} key={0} />,
        <span className={styles.content__text_accent} key={1} />,
      ]}
    />
  );

  return (
    <Layout isHome imageRef={imageRef}>
      <section className={styles.coverContainer} ref={imageRef}>
        <div className={styles.imageContainerMobile}>
          <Image src={teachers} alt={t('home:coverImageAlt')} fill priority />
        </div>
        <div className={styles.imageContainerDesktop}>
          <Image src={teachers1Line} alt={t('home:coverImageAlt')} fill priority />
        </div>
      </section>

      <div className={styles.contentWrapper}>
        <Cta />
        <section className={styles.content}>
          <h1 className={styles.content__title}>{welcomeTitle}</h1>
          {welcomeText1}
          <Image src={prize} alt='' width={250} className={styles.prize} />
          {welcomeText2}
        </section>
        <section className={styles.video}>
          <LiteYouTubeEmbed
            id='O2bM1PcpQTc'
            title='Dance weekend in Warsaw festival 2019 / Promo'
          />
        </section>
        <Divider inverted />
        <section className={styles.partners}>
          <h2 className={clsx(styles.content__title)}>{t('home:partnersTitle')}</h2>
          <Partners />
        </section>
        <Divider />
        <section className={styles.schedule}>
          <Schedule />
        </section>
      </div>
    </Layout>
  );
}
