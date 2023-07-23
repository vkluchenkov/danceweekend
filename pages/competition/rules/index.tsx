import { Layout } from '@/src/components/Layout';
import { NextPage } from 'next';
import useTranslation from 'next-translate/useTranslation';
import { Switcher } from '@/src/ui-kit/Switcher';
import { useMemo, useState } from 'react';
import { contestCategories } from '@/src/ulis/contestCategories';
import Trans from 'next-translate/Trans';
import Link from 'next/link';
import textStyles from '@/styles/Text.module.css';
import styles from '@/styles/Rules.module.css';
import clsx from 'clsx';
import { Version, SupportedLangs } from '@/src/types';
import { AnimatePresence, motion } from 'framer-motion';
import { motionVariants } from '@/src/ulis/constants';

const ContestRules: NextPage = () => {
  const { t, lang } = useTranslation('competitionRules');

  const [version, setVersion] = useState<Version>('live');

  const currentLang = lang as SupportedLangs;

  // translations with HTML
  const profiRulesText = (
    <Trans
      i18nKey='competitionRules:profiRulesText'
      components={[<Link href='/competition/judging' key={1} />]}
    />
  );

  const videoSpecText = (
    <Trans
      i18nKey='competitionRules:videoSpecText'
      components={[
        <p className={textStyles.p} key={1} />,
        <Link href='/competition/judging' key={2} />,
      ]}
    />
  );

  const switcher = useMemo(() => {
    return (
      <Switcher
        value={version}
        option1={{
          value: 'live',
          label: t('live'),
        }}
        option2={{
          value: 'online',
          label: t('online'),
        }}
        onClick={(value) => setVersion(value)}
      />
    );
  }, [t, version]);

  const getCatsList = (version: Version) =>
    contestCategories.map((group, groupIndex) => {
      const title = group.translations[currentLang].title;
      const levels = group.levels.map((l) => t(l)).join(', ');

      const categories = group.categories?.map((cat, catIndex) => {
        const catTitle = cat.translations[currentLang].categoryTitle;
        return cat.types.includes(version) && <li key={catTitle + catIndex}>{catTitle}</li>;
      });

      return (
        group.types.includes(version) && (
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
        )
      );
    });

  const commonContent = (
    <>
      <p className={textStyles.p}>{t('version', { version: '4', date: '23.07.2023' })}</p>

      <h2 className={clsx(textStyles.h2, textStyles.accent)}>{t('attentionTitle')}</h2>
      <p className={textStyles.p}>{t('attentionText')}</p>

      <h2 className={clsx(textStyles.h2, textStyles.accent)}>1. {t('categoriesTitle')}</h2>
      {getCatsList(version)}

      <h2 className={clsx(textStyles.h2, textStyles.accent)}>2. {t('timingTitle')}</h2>
      <p className={textStyles.p}>{t('timingSolo')}</p>
      <p className={textStyles.p}>{t('timingGroups')}</p>
    </>
  );

  const liveContent = (
    <>
      {commonContent}
      <h2 className={clsx(textStyles.h2, textStyles.accent)}>3. {t('profiRulesTitle')}</h2>
      <p className={textStyles.p}>{profiRulesText}</p>

      <h2 className={clsx(textStyles.h2, textStyles.accent)}>4. {t('limitationsTitle')}</h2>
      <p className={textStyles.p}>{t('limitationsText')}</p>

      <h2 className={clsx(textStyles.h2, textStyles.accent)}>5. {t('prizesTitle')}</h2>
      <p className={textStyles.p}>{t('prizesMain')}</p>
      <p className={textStyles.p}>{t('prizesSolo')}</p>
      <p className={textStyles.p}>{t('prizesGroups')}</p>
      <p className={textStyles.p}>{t('prizesQueen')}</p>
      <p className={textStyles.p}>{t('prizesAdditional')}</p>
      <p className={textStyles.p}>{t('prizesKids')}</p>

      <h2 className={clsx(textStyles.h2, textStyles.accent)}>{t('additionalTitle')}:</h2>
      <p className={textStyles.p}>{t('additionalText')}</p>
    </>
  );

  const onlineContent = (
    <>
      {commonContent}
      <h2 className={clsx(textStyles.h2, textStyles.accent)}>3. {t('limitationsTitle')}</h2>
      <p className={textStyles.p}>{t('limitationsText')}</p>

      <h2 className={clsx(textStyles.h2, textStyles.accent)}>4. {t('videoSpecTitle')}</h2>
      {videoSpecText}

      <h2 className={clsx(textStyles.h2, textStyles.accent)}>5. {t('prizesTitle')}</h2>
      <p className={textStyles.p}>{t('onlinePrizesMain')}</p>
      <p className={textStyles.p}>{t('onlinePrizesSolo')}</p>
      <p className={textStyles.p}>{t('onlinePrizesGroups')}</p>
      <p className={textStyles.p}>{t('onlinepPizesAdditional')}</p>
      <p className={textStyles.p}>{t('onlinepPizesAdditional2')}</p>
    </>
  );

  return (
    <Layout title={t('pageTitle')}>
      <h1 className={textStyles.h1}>{t('pageTitle')}</h1>
      {switcher}
      <section className={styles.section}>
        {version === 'live' && (
          <AnimatePresence>
            <motion.div
              initial='hidden'
              animate='enter'
              exit='exit'
              variants={motionVariants}
              transition={{ type: 'linear', duration: 0.3 }}
            >
              {liveContent}
            </motion.div>
          </AnimatePresence>
        )}

        {version === 'online' && (
          <AnimatePresence>
            <motion.div
              initial='hidden'
              animate='enter'
              exit='exit'
              variants={motionVariants}
              transition={{ type: 'linear', duration: 0.3 }}
            >
              {onlineContent}
            </motion.div>
          </AnimatePresence>
        )}
      </section>
    </Layout>
  );
};

export default ContestRules;
