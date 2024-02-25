import { Layout } from '@/src/components/Layout';
import { NextPage } from 'next';
import textStyles from '@/styles/Text.module.css';
import styles from '@/styles/PhotoVideo.module.css';
import useTranslation from 'next-translate/useTranslation';
import { Hero } from '@/src/ui-kit/Hero';
import andre from '/public/images/andre.jpg';
import vladimir from '/public/images/vladimir.jpg';
import Trans from 'next-translate/Trans';
import Link from 'next/link';
import clsx from 'clsx';

const PhotoVideo: NextPage = () => {
  const { t, lang } = useTranslation('photoVideo');

  // Translations with HTML
  const photographerText = (
    <Trans
      i18nKey='photoVideo:photographerText'
      components={[<Link href='http://www.andre-elbing.de' target='_blank' key={1} />]}
    />
  );

  const photoshootBooking = (
    <Trans
      i18nKey='photoVideo:photoshootBooking'
      components={[<Link href='https://facebook.com/andre.elbing' target='_blank' key={1} />]}
    />
  );

  const content = (
    <div className={styles.contentWrapper}>
      <section className={styles.section}>
        <Hero name={t('andre')} title={t('photographer')} image={andre} />
        <p className={textStyles.p}>{photographerText}</p>

        <h3 className={clsx(textStyles.h3, textStyles.accent)}>{t('photoshootTitle')}:</h3>
        <p className={textStyles.p}>{t('photoshootIntro')}</p>
        <h4 className={textStyles.h4}>{t('photoshootPriceTitle')}</h4>
        <p className={textStyles.p}>{t('photoshootPriceText')}</p>
        <p className={textStyles.p}>{photoshootBooking}</p>
      </section>

      <section className={styles.section}>
        <Hero name={t('vladimir')} title={t('videographer')} image={vladimir} />
        <p className={textStyles.p}>{t('videographerText')}</p>
      </section>
    </div>
  );

  return (
    <Layout title={t('pageTitle')}>
      <h1 className={textStyles.h1}>{t('pageTitle')}</h1>
      {content}
    </Layout>
  );
};

export default PhotoVideo;
