import { NextPage } from 'next';
import useTranslation from 'next-translate/useTranslation';
import Trans from 'next-translate/Trans';
import clsx from 'clsx';

import { Layout } from '@/src/components/Layout';
import textStyles from '@/styles/Text.module.css';
import styles from '@/styles/Judging.module.css';
import { StyledAccordeon } from '@/src/ui-kit/StyledAccordeon';

const Judging: NextPage = () => {
  const { t, lang } = useTranslation('competitionJudging');

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

  const content = (
    <>
      <p className={textStyles.p}>{t('criteriaTitle')}</p>
      <ul className={textStyles.list}>
        <li>{t('criteria1')}</li>
        <li>{t('criteria2')}</li>
        <li>{t('criteria3')}</li>
        <li>{t('criteria4')}</li>
        <li>{t('criteria5')}</li>
        <li>{t('criteria6')}</li>
      </ul>

      <p className={textStyles.p}>{t('place')}</p>
      <StyledAccordeon summary={t('example')} details={example1} />

      <p className={textStyles.p}>{t('winner')}</p>
      <StyledAccordeon summary={t('example')} details={example2} />

      <p className={textStyles.p}>{t('equal')}</p>
      <StyledAccordeon summary={t('example')} details={example3} />

      <p className={textStyles.p}>{t('tabla')}</p>
      <ul className={textStyles.list}>
        <li>{t('tablaCriteria1')}</li>
        <li>{t('tablaCriteria2')}</li>
        <li>{t('tablaCriteria3')}</li>
        <li>{t('tablaCriteria4')}</li>
        <li>{t('tablaCriteria5')}</li>
      </ul>

      <p className={textStyles.p}>{t('winnerPro')}</p>
      <StyledAccordeon summary={t('example')} details={example4} />

      <p className={textStyles.p}>{t('winnerProNote')}</p>
    </>
  );

  return (
    <Layout title={t('pageTitle')}>
      <h1 className={textStyles.h1}>{t('pageTitle')}</h1>

      <h2 className={clsx(textStyles.h2, textStyles.accent)}>{t('judgingSystem')}</h2>
      <section className={styles.section}>{content}</section>

      <h2 className={clsx(textStyles.h2, textStyles.accent)}>{t('judgingLineup')}</h2>
      <section className={styles.section}>
        <p className={textStyles.p}>{t('judgesLive')}</p>
      </section>
    </Layout>
  );
};

export default Judging;
