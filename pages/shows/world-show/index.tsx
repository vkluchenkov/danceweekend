import { useEffect, useState } from 'react';
import { GetStaticProps, NextPage } from 'next';
import { QueryClient, dehydrate, useQuery } from '@tanstack/react-query';
import useTranslation from 'next-translate/useTranslation';
import Image from 'next/image';
import clsx from 'clsx';

import { Layout } from '@/src/components/Layout';
import textStyles from '@/styles/Text.module.css';
import styles from '@/styles/WorldShow.module.css';
import worldShowLogo from '/public/images/world_show_logo.png';
import { worldShowLimit } from '@/src/ulis/constants';
import { WordpressApi } from '@/src/api/wordpressApi';
import Trans from 'next-translate/Trans';
import Link from 'next/link';

export const getStaticProps: GetStaticProps = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['settings'],
    queryFn: WordpressApi.getSettings,
  });

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
    revalidate: 60,
  };
};

const WorldShow: NextPage = () => {
  const { t, lang } = useTranslation('worldShow');

  const { data, isLoading, status, error } = useQuery({
    queryKey: ['settings'],
    queryFn: WordpressApi.getSettings,
    refetchOnMount: false,
  });

  const [price, setPrice] = useState(data?.price);

  useEffect(() => {
    if (data?.price) setPrice(data.price);
  }, [data]);

  const attentionText2 = (
    <Trans
      i18nKey='worldShow:attentionText2'
      components={[
        <span className={textStyles.accent} key={1} />,
        <Link href='/info/photo-video' key={2} />,
      ]}
    />
  );

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
        <span className={textStyles.accent}>{t('dateTitle')}:</span> 22.08.2024 / 20:00
      </p>
      <p className={textStyles.p}>{t('description')}</p>
      <h2 className={clsx(textStyles.h2, textStyles.accent)}>{t('conditionsTitle')}</h2>
      <p className={textStyles.p}>{t('conditionsGeneral')}</p>
      <p className={textStyles.p}>{attentionText2}</p>
      <p className={textStyles.p}>
        {t('conditionsSolo')}
        <span className={textStyles.accent}> {price?.worldShow?.solo}€</span>.
      </p>

      <p className={textStyles.p}>
        {t('conditionsGroup')}{' '}
        <span className={textStyles.accent}>
          {' '}
          {price?.worldShow?.groups}€ {t('perPerson')}
        </span>
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
