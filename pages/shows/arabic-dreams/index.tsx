import { Layout } from '@/src/components/Layout';
import { NextPage } from 'next';
import textStyles from '@/styles/Text.module.css';
import styles from '@/styles/ArabicDreams.module.css';
import useTranslation from 'next-translate/useTranslation';
import Trans from 'next-translate/Trans';
import Link from 'next/link';

const ArabicDreams: NextPage = () => {
  const { t, lang } = useTranslation('arabicDreams');

  const content = <></>;

  return (
    <Layout title={t('pageTitle')}>
      <h1 className={textStyles.h1}>{t('pageTitle')}</h1>
      {content}
    </Layout>
  );
};

export default ArabicDreams;
