import { Layout } from '@/src/components/Layout';
import { NextPage } from 'next';
import textStyles from '@/styles/Text.module.css';
import styles from '@/styles/WorldShow.module.css';
import useTranslation from 'next-translate/useTranslation';
import worldShowLogo from '/public/images/world_show_logo.png';
import Image from 'next/image';
import clsx from 'clsx';
import { worldShowPrice } from '@/src/ulis/price';
import { worldShowLimit } from '@/src/ulis/constants';

const WorldShow: NextPage = () => {
  const { t, lang } = useTranslation('worldShow');

  const formatTime = (time: number) => {
    const min = Math.floor(time / 60);
    const sec = Math.round(time % 60);
    return `${min}:${sec < 10 ? '0' + sec : sec}`;
  };

  const content = (
    <>
      <div className={styles.logoWrapper}>
        <Image src={worldShowLogo} alt={t('pageTitle')} fill />
      </div>
      <p className={textStyles.p}>
        <span className={textStyles.accent}>{t('dateTitle')}:</span> 20.08.2023 / 19:30
      </p>
      <p className={textStyles.p}>{t('description')}</p>
      <h2 className={clsx(textStyles.h2, textStyles.accent)}>{t('conditionsTitle')}</h2>
      <p className={textStyles.p}>{t('conditionsGeneral')}</p>
      <p className={textStyles.p}>
        {t('conditionsSolo')}
        <span className={textStyles.accent}> {worldShowPrice.soloPriceNormal}€</span>.
      </p>
      <p className={textStyles.p}>
        {t('conditionsSoloFullPass')}{' '}
        <span className={textStyles.accent}> {worldShowPrice.soloPriceDicounted}€</span>.
      </p>
      <p className={textStyles.p}>
        {t('conditionsGroup')} <span className={textStyles.accent}> {worldShowPrice.groups}€</span>{' '}
        {t('perPerson')}.
      </p>
      <p className={textStyles.p}>
        {t('musicLimit')} <span className={textStyles.accent}> {formatTime(worldShowLimit)}</span>.
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
