import { Layout } from '@/src/components/Layout';
import { NextPage } from 'next';
import textStyles from '@/styles/Text.module.css';
import useTranslation from 'next-translate/useTranslation';
import { useMemo, useState } from 'react';
import { Version, SupportedLangs } from '@/src/types';
import { Switcher } from '@/src/ui-kit/Switcher';

const Judging: NextPage = () => {
  const { t, lang } = useTranslation('competitionJudging');

  const [version, setVersion] = useState<Version>('live');

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

  const liveContent = <></>;

  return (
    <Layout title={t('pageTitle')}>
      <h1 className={textStyles.h1}>{t('pageTitle')}</h1>
      {switcher}
      {version === 'live' && liveContent}
    </Layout>
  );
};

export default Judging;
