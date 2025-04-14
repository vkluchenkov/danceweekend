import { NextPage } from 'next';
import useTranslation from 'next-translate/useTranslation';

import { Layout } from '@/src/components/Layout';
import styles from '@/styles/Faq.module.css';
import textStyles from '@/styles/Text.module.css';
import clsx from 'clsx';
import { cpkUrl } from '@/src/ulis/constants';
import { Schedule } from '@/src/components/Schedule';
import Link from 'next/link';

const SchedulePage: NextPage = () => {
  const { t, lang } = useTranslation('schedule');

  return (
    <Layout title={t('pageTitle')}>
      <section className={styles.section}>
        <Schedule />
      </section>
      <section className={styles.section}>
        <h2 className={clsx(textStyles.h2, textStyles.accent)}>{t('addressesTitle')}</h2>
        <h3 className={textStyles.h3}>{t('CpkTitle')}</h3>
        <p className={textStyles.p}>
          <Link href={cpkUrl} target='_blank'>
            {t('CPK')}
          </Link>
        </p>
      </section>
    </Layout>
  );
};

export default SchedulePage;
