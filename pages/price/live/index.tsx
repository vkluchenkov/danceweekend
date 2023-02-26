import { Layout } from '@/src/components/Layout';
import { NextPage } from 'next';
import styles from '@/styles/Price.module.css';
import homeStyles from '@/styles/Home.module.css';
import useTranslation from 'next-translate/useTranslation';

const Price: NextPage = () => {
  const { t, lang } = useTranslation();

  return (
    <Layout title={t('price:pageTitle')}>
      {/* <div className={styles.contentWrapper}> */}
      <section className={styles.content}>
        <h1 className={homeStyles.content__title}>{t('price:pageTitle')}</h1>
      </section>
      {/* </div> */}
    </Layout>
  );
};

export default Price;
