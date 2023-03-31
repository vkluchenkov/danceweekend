import { Layout } from '@/src/components/Layout';
import { NextPage } from 'next';
import textStyles from '@/styles/Text.module.css';
import useTranslation from 'next-translate/useTranslation';

const PaymentThankYou: NextPage = () => {
  const { t, lang } = useTranslation('payment');

  return (
    <Layout title={t('thanks.pageTitle')}>
      <h1 className={textStyles.h1}>{t('thanks.pageTitle')}</h1>
      <h2 className={textStyles.h2}>{t('thanks.subtitle')}</h2>
    </Layout>
  );
};

export default PaymentThankYou;
