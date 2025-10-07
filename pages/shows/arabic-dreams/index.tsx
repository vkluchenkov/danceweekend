import { Layout } from '@/src/components/Layout';
import { NextPage } from 'next';
import Image from 'next/image';
import useTranslation from 'next-translate/useTranslation';

import textStyles from '@/styles/Text.module.css';
import styles from '@/styles/ArabicDreams.module.css';
import arabicDreamsLogo from '/public/images/arabicDreams_logo.png';

const ArabicDreams: NextPage = () => {
  const { t, lang } = useTranslation('arabicDreams');

  const content = (
    <>
      <div className={styles.logoWrapper}>
        <Image src={arabicDreamsLogo} alt={t('pageTitle')} fill />
      </div>
      <p className={textStyles.p}>
        <span className={textStyles.accent}>{t('dateTitle')}:</span> 21.08.2026 / 20:00
      </p>
      <p className={textStyles.p}>{t('description')}</p>
      <p className={textStyles.p}>{t('videoDescription')}</p>
      <div className={styles.playerWrapper}>
        <iframe
          src='https://player.vimeo.com/video/1113180790'
          width='100%'
          height='100%'
          frameBorder='0'
          allow='autoplay; fullscreen'
          allowFullScreen
        />
      </div>
    </>
  );

  return (
    <Layout title={t('pageTitle')}>
      <h1 className={textStyles.h1}>{t('pageTitle')}</h1>
      {content}
    </Layout>
  );
};

export default ArabicDreams;
