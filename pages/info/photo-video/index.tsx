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

  const videographerText = (
    <Trans
      i18nKey='photoVideo:videographerText'
      components={[<Link href='https://www.bestpicture.pro' target='_blank' key={1} />]}
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

        <h3 className={clsx(textStyles.h3, textStyles.accent)}>{t('price')}:</h3>
        <ul className={textStyles.list}>
          <li>{t('photoPack')} 20€</li>
          <li>10 {t('pictures')}: 30€*</li>
          <li>20 {t('pictures')}: 50€*</li>
          <li>30 {t('pictures')}: 60€*</li>
        </ul>
        <p className={textStyles.p}>{t('photoNote')}</p>

        <h3 className={clsx(textStyles.h3, textStyles.accent)}>{t('photoshootTitle')}:</h3>
        <p className={textStyles.p}>{t('photoshootIntro')}</p>
        <h4 className={textStyles.h4}>{t('photoshootPriceTitle')}</h4>
        <p className={textStyles.p}>{t('photoshootPriceText')}</p>
        <p className={textStyles.p}>{photoshootBooking}</p>
      </section>

      <section className={styles.section}>
        <Hero name={t('vladimir')} title={t('videographer')} image={vladimir} />
        <p className={textStyles.p}>{videographerText}</p>
        <h3 className={clsx(textStyles.h3, textStyles.accent)}>{t('price')}:</h3>
        <ul className={textStyles.list}>
          <li>{t('videoPrice')}</li>
        </ul>
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
