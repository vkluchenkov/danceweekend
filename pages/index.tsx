import styles from '@/styles/Home.module.css';
import { Layout } from '@/src/components/Layout';
import { Divider } from '@/src/ui-kit/Divider';
import { Cta } from '@/src/components/CTA';
import Image from 'next/image';
import teachers from 'public/images/teachers.png';
import LiteYouTubeEmbed from 'react-lite-youtube-embed';
import Trans from 'next-translate/Trans';
import useTranslation from 'next-translate/useTranslation';
import { Schedule } from '@/src/components/Schedule';

export default function Home() {
  const { t } = useTranslation();

  // Translations with HTML
  const welcomeTitle = <Trans i18nKey='home:welcomeTitle' components={[<br key={1} />]} />;
  const welcomeText = (
    <Trans
      i18nKey='home:welcomeText'
      components={[
        <p className={styles.content__text} key={0} />,
        <span className={styles.content__text_accent} key={1} />,
      ]}
    />
  );

  return (
    <Layout>
      <section className={styles.coverContainer}>
        <div className={styles.imageContainer}>
          <Image src={teachers} alt={t('home:coverImageAlt')} fill priority />
        </div>
        <div className={styles.imageDivider}>
          <Divider />
        </div>
      </section>

      <div className={styles.contentWrapper}>
        <Cta />
        <section className={styles.content}>
          <h1 className={styles.content__title}>{welcomeTitle}</h1>
          {welcomeText}
        </section>
        <section className={styles.video}>
          <LiteYouTubeEmbed
            id='O2bM1PcpQTc'
            title='Dance weekend in Warsaw festival 2019 / Promo'
          />
        </section>
        <Divider />
        <section className={styles.schedule}>
          <Schedule />
        </section>
      </div>
    </Layout>
  );
}
