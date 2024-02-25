import { NextPage } from 'next';
import useTranslation from 'next-translate/useTranslation';

import { Layout } from '@/src/components/Layout';
import styles from '@/styles/Faq.module.css';
import { Schedule } from '@/src/components/Schedule';

const SchedulePage: NextPage = () => {
  const { t, lang } = useTranslation('schedule');

  return (
    <Layout title={t('pageTitle')}>
      <section className={styles.section}>
        <Schedule />
      </section>
    </Layout>
  );
};

export default SchedulePage;
