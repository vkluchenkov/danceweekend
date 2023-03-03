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

  const content = (
    <>
      <section>
        <Hero name={t('andre')} title={t('photographer')} image={andre} />
        <p className={textStyles.p}>{photographerText}</p>
      </section>
      <section>
        <Hero name={t('vladimir')} title={t('videographer')} image={vladimir} />
        <p className={textStyles.p}>{videographerText}</p>
      </section>
    </>
  );

  return (
    <Layout title={t('pageTitle')}>
      <h1 className={textStyles.h1}>{t('pageTitle')}</h1>
      {content}
    </Layout>
  );
};

export default PhotoVideo;
