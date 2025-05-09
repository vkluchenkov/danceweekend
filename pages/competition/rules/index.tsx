import Image from 'next/image';
import { dehydrate, QueryClient, useQuery } from '@tanstack/react-query';
import { useEffect, useMemo, useState } from 'react';
import { GetStaticProps, NextPage } from 'next';
import useTranslation from 'next-translate/useTranslation';
import Trans from 'next-translate/Trans';
import Link from 'next/link';
import clsx from 'clsx';
import { AnimatePresence, motion } from 'framer-motion';
import { DateTime } from 'luxon';

import { Layout } from '@/src/components/Layout';
import { contestCategories } from '@/src/ulis/contestCategories';
import textStyles from '@/styles/Text.module.css';
import styles from '@/styles/Rules.module.css';
import { SupportedLangs } from '@/src/types';
import {
  groupsLimit,
  motionVariants,
  soloLimit,
  soloProfessionalsLimit,
} from '@/src/ulis/constants';
import { WordpressApi } from '@/src/api/wordpressApi';
import { formatTime } from '@/src/ulis/formatTime';
import prize from 'public/images/Prize.png';

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
    revalidate: 30,
  };
};

const ContestRules: NextPage = () => {
  const { t, lang } = useTranslation('competitionRules');

  const currentLang = lang as SupportedLangs;

  // translations with HTML
  const winnerRulesText = (
    <Trans
      i18nKey='competitionRules:winnerRulesText'
      components={[<Link href='/competition/judging' key={1} />]}
    />
  );

  const attentionText2 = (
    <Trans
      i18nKey='competitionRules:attentionText2'
      components={[
        <span className={textStyles.accent} key={1} />,
        <Link href='/info/photo-video' key={2} />,
      ]}
    />
  );

  const { data, isLoading, status, error } = useQuery({
    queryKey: ['settings'],
    queryFn: WordpressApi.getSettings,
    refetchOnMount: false,
  });

  const [contestSettings, setContestSettings] = useState(data?.price.contest);

  useEffect(() => {
    if (data?.price.contest) setContestSettings(data.price.contest);
  }, [data]);

  const getCatsList = useMemo(
    () =>
      contestCategories.map((group, groupIndex) => {
        const title = group.translations[currentLang].title;
        const levels = group.levels.map((l) => t(l)).join(', ');

        const categories = group.categories?.map((cat, catIndex) => {
          const catTitle = cat.translations[currentLang].categoryTitle;
          return <li key={catTitle + catIndex}>{catTitle}</li>;
        });

        return (
          <div key={title + groupIndex} className={styles.categories}>
            <h3 className={textStyles.h3}>{title + ` (${group.age} ${t('age')})`}</h3>
            <p className={textStyles.p}>
              <span className={styles.levels}>{t('levels')}</span>
              {levels}
            </p>
            {categories && (
              <>
                <h4 className={textStyles.h4}>{t('styles')}</h4>
                <ul
                  className={textStyles.list}
                  key={group.translations[currentLang] + groupIndex.toString()}
                >
                  {categories}
                </ul>
              </>
            )}
            {group.description && <p className={textStyles.p}>{t(group.description)}</p>}
          </div>
        );
      }),
    [currentLang, t]
  );

  const changeDate = DateTime.fromISO(contestSettings?.from!)
    .setZone('UTC')
    .setZone('Europe/Warsaw', { keepLocalTime: true })
    .setLocale('pl')
    .toLocaleString();

  const commonContent = (
    <>
      <p className={textStyles.p}>
        {t('version', { version: contestSettings?.version, date: changeDate })}
      </p>

      <h2 className={clsx(textStyles.h2, textStyles.accent)}>{t('attentionTitle')}</h2>
      <p className={textStyles.p}>{t('attentionText')}</p>
      <p className={textStyles.p}>{attentionText2}</p>

      <h2 className={clsx(textStyles.h2, textStyles.accent)}>1. {t('categoriesTitle')}</h2>
      {getCatsList}

      <h2 className={clsx(textStyles.h2, textStyles.accent)}>2. {t('timingTitle')}</h2>
      <p className={textStyles.p}>
        {t('timingSolo')} {formatTime(soloLimit)}
      </p>
      <p className={textStyles.p}>
        {t('timingProfessionals')} {formatTime(soloProfessionalsLimit)}
      </p>
      <p className={textStyles.p}>
        {t('timingGroups')} {formatTime(groupsLimit)}
      </p>
    </>
  );

  const liveContent = (
    <>
      {commonContent}
      <h2 className={clsx(textStyles.h2, textStyles.accent)}>3. {t('winnerRulesTitle')}</h2>
      <p className={textStyles.p}>{winnerRulesText}</p>

      <h2 className={clsx(textStyles.h2, textStyles.accent)}>4. {t('limitationsTitle')}</h2>
      <p className={textStyles.p}>{t('limitationsText')}</p>

      <h2 className={clsx(textStyles.h2, textStyles.accent)}>5. {t('prizesTitle')}</h2>

      <Image src={prize} alt='' width={250} className={styles.prize} />

      <p className={textStyles.p}>{t('prizesMain')}</p>
      <p className={textStyles.p}>{t('prizesSolo')}</p>
      <p className={textStyles.p}>{t('prizesGroups')}</p>
      <p className={textStyles.p}>{t('prizesAdditional')}</p>
      <p className={textStyles.p}>{t('prizesKids')}</p>

      <h2 className={clsx(textStyles.h2, textStyles.accent)}>{t('additionalTitle')}:</h2>
      <p className={textStyles.p}>{t('additionalText')}</p>
    </>
  );

  return (
    <Layout title={t('pageTitle')}>
      <AnimatePresence>
        <motion.div
          initial='hidden'
          animate='enter'
          exit='exit'
          variants={motionVariants}
          transition={{ type: 'linear', duration: 0.3 }}
        >
          <h1 className={textStyles.h1}>{t('pageTitle')}</h1>
          <section className={styles.section}>{liveContent}</section>
        </motion.div>
      </AnimatePresence>
    </Layout>
  );
};

export default ContestRules;
