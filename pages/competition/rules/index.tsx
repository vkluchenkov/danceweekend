import { Layout } from '@/src/components/Layout';
import { NextPage } from 'next';
import homeStyles from '@/styles/Home.module.css';
import useTranslation from 'next-translate/useTranslation';
import { Switcher } from '@/src/ui-kit/Switcher';
import { useMemo, useState } from 'react';
import { contestCategories } from '@/src/ulis/contestCategories';
import { SupportedLangs } from '@/src/types/langs';
import Trans from 'next-translate/Trans';
import Link from 'next/link';

type Version = 'live' | 'online';

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
      <div key={title + groupIndex}>
        <h3>{title + ` (${group.age} ${t('age')})`}</h3>
        <p>{t('levels') + levels}</p>
        {categories && (
          <>
            <h4>{t('styles')}</h4>
            <ul key={group.translations[currentLang] + groupIndex.toString()}>{categories}</ul>
          </>
        )}
        {group.description && <p>{t(group.description)}</p>}
      </div>
    );
  });

  const liveContent = (
    <>
      <p>{t('version', { version: '1', date: '1.03.2023' })}</p>

      <h3>{t('attentionTitle')}</h3>
      <p>{t('attentionText')}</p>

      <h3>1. {t('categoriesTitle')}</h3>
      {catsList}

      <h3>2. {t('timingTitle')}</h3>
      <p>{t('timingSolo')}</p>
      <p>{t('timingGroups')}</p>

      <h3>3. {t('profiRulesTitle')}</h3>
      <p>{profiRulesText}</p>

      <h3>4. {t('limitationsTitle')}</h3>
      <p>{t('limitationsText')}</p>

      <h3>5. {t('prizesTitle')}</h3>
      <p>{t('prizesMain')}</p>
      <p>{t('prizesSolo')}</p>
      <p>{t('prizesGroups')}</p>
      <p>{t('prizesQueen')}</p>
      <p>{t('prizesAdditional')}</p>
      <p>{t('prizesKids')}</p>

      <h3>{t('additionalTitle')}:</h3>
      <p>{t('additionalText')}</p>
    </>
  );

  return (
    <Layout title={t('pageTitle')}>
      <h1 className={homeStyles.content__title}>{t('pageTitle')}</h1>
      {switcher}
      {version === 'live' && liveContent}
    </Layout>
  );
};

export default ContestRules;
