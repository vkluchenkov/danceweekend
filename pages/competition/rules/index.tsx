import { Layout } from '@/src/components/Layout';
import { NextPage } from 'next';
import homeStyles from '@/styles/Home.module.css';
import useTranslation from 'next-translate/useTranslation';
import { Switcher } from '@/src/ui-kit/Switcher';
import { useState } from 'react';
import { contestCategories } from '@/src/ulis/contestCategories';
import { SupportedLangs } from '@/src/types/langs';

type Version = 'live' | 'online';

const ContestRules: NextPage = () => {
  const { t, lang } = useTranslation('competitionRules');

  const [version, setVersion] = useState<Version>('live');

  const currentLang = lang as SupportedLangs;

  const catsList = contestCategories.map((cat, catIndex) => {
    const title = cat.translations[currentLang].title;
    const levels = cat.levels.reduce((acc, current) => (acc + ', ' + t(current)) as any);

    return (
      <div key={title + catIndex}>
        <h3>{title}</h3>
        <p>{levels}</p>
        <ul key={cat.translations[currentLang] + catIndex.toString()}></ul>
      </div>
    );
  });

  const liveContent = (
    <>
      <p>{t('version', { version: '1', date: '1.03.2023' })}</p>
      <h3>{t('attentionTitle')}</h3>
      <p>{t('attentionText')}</p>
      <h3>{t('categoriesTitle')}</h3>
      {catsList}
    </>
  );

  return (
    <Layout title={t('pageTitle')}>
      <h1 className={homeStyles.content__title}>{t('pageTitle')}</h1>
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
      {version === 'live' && liveContent}
    </Layout>
  );
};

export default ContestRules;
