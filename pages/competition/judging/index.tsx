import { Layout } from '@/src/components/Layout';
import { NextPage } from 'next';
import textStyles from '@/styles/Text.module.css';
import styles from '@/styles/Judging.module.css';
import useTranslation from 'next-translate/useTranslation';
import { useMemo, useState } from 'react';
import { Version, SupportedLangs } from '@/src/types';
import { Switcher } from '@/src/ui-kit/Switcher';
import Trans from 'next-translate/Trans';

const Judging: NextPage = () => {
  const { t, lang } = useTranslation('competitionJudging');

  const [version, setVersion] = useState<Version>('live');

  // translations with HTML
  const example1 = (
    <Trans
      i18nKey='competitionJudging:example1'
      components={[<p className={textStyles.p} key={1} />]}
    />
  );

  const example2 = (
    <Trans
      i18nKey='competitionJudging:example2'
      components={[<p className={textStyles.p} key={1} />]}
    />
  );

  const example3 = (
    <Trans
      i18nKey='competitionJudging:example3'
      components={[<p className={textStyles.p} key={1} />]}
    />
  );

  const example4 = (
    <Trans
      i18nKey='competitionJudging:example4'
      components={[<p className={textStyles.p} key={1} />]}
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

  const content = (
    <>
      <p className={textStyles.p}>{t('criteriaTitle')}</p>
      <ul className={textStyles.list}>
        <li>{t('criteria1')}</li>
        <li>{t('criteria2')}</li>
        <li>
          {t('criteria3')}
          {version === 'online' && <p className={textStyles.p}>{t('criteria3Note')}</p>}
        </li>
        <li>{t('criteria4')}</li>
        <li>{t('criteria5')}</li>
        <li>{t('criteria6')}</li>
      </ul>
      <p className={textStyles.p}>{t('place')}</p>
      <details className={styles.details}>
        <summary className={styles.details__summary}>{t('example')}</summary>
        {example1}
      </details>
      <p className={textStyles.p}>{t('winner')}</p>
      <details className={styles.details}>
        <summary className={styles.details__summary}>{t('example')}</summary>
        {example2}
      </details>
      <p className={textStyles.p}>{t('equal')}</p>
      <details className={styles.details}>
        <summary className={styles.details__summary}>{t('example')}</summary>
        {example3}
      </details>
      <p className={textStyles.p}>{t('tabla')}</p>
      <ul className={textStyles.list}>
        <li>{t('tablaCriteria1')}</li>
        <li>{t('tablaCriteria2')}</li>
        <li>
          {t('tablaCriteria3')}
          {version === 'online' && <p className={textStyles.p}>{t('criteria3Note')}</p>}
        </li>
        <li>{t('tablaCriteria4')}</li>
        <li>{t('tablaCriteria5')}</li>
      </ul>
      <p className={textStyles.p}>{t('winnerPro')}</p>
      <details className={styles.details}>
        <summary className={styles.details__summary}>{t('example')}</summary>
        {example4}
      </details>
      <p className={textStyles.p}>{t('winnerProNote')}</p>
    </>
  );

  return (
    <Layout title={t('pageTitle')}>
      <h1 className={textStyles.h1}>{t('pageTitle')}</h1>
      {switcher}
      <section className={styles.section}>{content}</section>
    </Layout>
  );
};

export default Judging;
