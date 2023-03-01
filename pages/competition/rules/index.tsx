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
        onClick={(value) => setVersion(value as Version)}
      />
    );
  }, [t, version]);

  const catsList = contestCategories.map((group, groupIndex) => {
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
  });

  const liveContent = (
    <section className={styles.section}>
      <p className={textStyles.p}>{t('version', { version: '1', date: '1.03.2023' })}</p>

      <h2 className={clsx(textStyles.h2, textStyles.accent)}>{t('attentionTitle')}</h2>
      <p className={textStyles.p}>{t('attentionText')}</p>

      <h2 className={clsx(textStyles.h2, textStyles.accent)}>1. {t('categoriesTitle')}</h2>
      {catsList}

      <h2 className={clsx(textStyles.h2, textStyles.accent)}>2. {t('timingTitle')}</h2>
      <p className={textStyles.p}>{t('timingSolo')}</p>
      <p className={textStyles.p}>{t('timingGroups')}</p>

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
    </section>
  );

  return (
    <Layout title={t('pageTitle')}>
      <h1 className={textStyles.h1}>{t('pageTitle')}</h1>
      {switcher}
      {version === 'live' && liveContent}
    </Layout>
  );
};

export default ContestRules;
