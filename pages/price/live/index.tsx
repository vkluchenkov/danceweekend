import { Layout } from '@/src/components/Layout';
import { NextPage } from 'next';
import homeStyles from '@/styles/Home.module.css';
import useTranslation from 'next-translate/useTranslation';
import { Schedule } from '@/src/components/Schedule';

const Price: NextPage = () => {
  const { t, lang } = useTranslation();

  return (
    <Layout title={t('price:pageTitle')}>
      <h1 className={homeStyles.content__title}>{t('price:pageTitle')}</h1>
      <Schedule />
    </Layout>
  );
};

export default Price;
