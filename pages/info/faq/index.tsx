import { Layout } from '@/src/components/Layout';
import { NextPage } from 'next';
import textStyles from '@/styles/Text.module.css';
import styles from '@/styles/Faq.module.css';
import useTranslation from 'next-translate/useTranslation';
import Trans from 'next-translate/Trans';
import { StyledAccordeon } from '@/src/ui-kit/StyledAccordeon';
import clsx from 'clsx';
import Link from 'next/link';

const FAQ: NextPage = () => {
  const { t, lang } = useTranslation('faq');

  const a1 = (
    <Trans
      i18nKey='faq:a1'
      components={[<Link href='https://www.fhotel.pl/' target='_blank' key={1} />]}
    />
  );

  const a2 = (
    <Trans
      i18nKey='faq:a2'
      components={[<Link href='/competition/rules/' target='_blank' key={1} />]}
    />
  );

  const a3 = (
    <Trans i18nKey='faq:a3' components={[<Link href='/price/' target='_blank' key={1} />]} />
  );

  return (
    <Layout title={t('pageTitle')}>
      <h1 className={textStyles.h1}>{t('pageTitle')}</h1>
      <section className={styles.section}>
        <p className={textStyles.p}>{t('description')}</p>

        <StyledAccordeon summary={t('q1')} details={<p className={textStyles.p}>{a1}</p>} />
        <StyledAccordeon summary={t('q2')} details={<p className={textStyles.p}>{a2}</p>} />
        <StyledAccordeon summary={t('q3')} details={<p className={textStyles.p}>{a3}</p>} />
        <StyledAccordeon summary={t('q4')} details={<p className={textStyles.p}>{t('a4')}</p>} />
      </section>

      {/* <h2 className={clsx(textStyles.h2, textStyles.accent)}>{t('judgingSystem')}</h2> */}
    </Layout>
  );
};

export default FAQ;
