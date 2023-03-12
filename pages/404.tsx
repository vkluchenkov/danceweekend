import { Layout } from '@/src/components/Layout';
import { NextPage } from 'next';
import textStyles from '@/styles/Text.module.css';
import styles from '@/styles/Error.module.css';
import useTranslation from 'next-translate/useTranslation';
import clsx from 'clsx';
import { useRouter } from 'next/router';

const Custom404: NextPage = () => {
  const { t, lang } = useTranslation('errors');

  const router = useRouter();

  return (
    <Layout title={t('pagetitle404')}>
      <section className={styles.section}>
        <h1 className={textStyles.h1}>{t('pagetitle404')}</h1>
        <p className={clsx(textStyles.p, textStyles.accent, styles.subtitle)}>
          {t('404description')}
        </p>
        <button type='button' className={styles.cta__button} onClick={() => router.push('/')}>
          {t('button')}
        </button>
      </section>
    </Layout>
  );
};

export default Custom404;
