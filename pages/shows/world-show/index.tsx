import { Layout } from '@/src/components/Layout';
import { NextPage } from 'next';
import textStyles from '@/styles/Text.module.css';
import styles from '@/styles/WorldShow.module.css';
import useTranslation from 'next-translate/useTranslation';
import worldShowLogo from '/public/images/world_show_logo.png';
import Image from 'next/image';
import clsx from 'clsx';

const WorldShow: NextPage = () => {
  const { t, lang } = useTranslation('worldShow');

  const content = (
    <>
      <div className={styles.logoWrapper}>
        <Image src={worldShowLogo} alt={t('pageTitle')} fill />
      </div>
      <p className={textStyles.p}>
        <span className={textStyles.accent}>{t('dateTitle')}:</span> 20.08.2023 / 19:00
      </p>
      <p className={textStyles.p}>{t('description')}</p>
      <h2 className={clsx(textStyles.h2, textStyles.accent)}>{t('conditionsTitle')}</h2>
      <p className={textStyles.p}>{t('conditionsSolo')} 30€</p>
      <p className={textStyles.p}>{t('conditionsSoloFullPass')} 20€</p>
      <p className={textStyles.p}>
        {t('conditionsGroup')} 20€ {t('perPerson')}
      </p>
    </>
  );

  return (
    <Layout title={t('pageTitle')}>
      <h1 className={textStyles.h1}>{t('pageTitle')}</h1>
      {content}
    </Layout>
  );
};

export default WorldShow;
