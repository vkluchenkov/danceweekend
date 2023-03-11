import { Layout } from '@/src/components/Layout';
import { NextPage } from 'next';
import textStyles from '@/styles/Text.module.css';
import styles from '@/styles/Bazaar.module.css';
import useTranslation from 'next-translate/useTranslation';
import { Hero } from '@/src/ui-kit/Hero';
import aliah from '/public/images/aliah_fashion_logo.png';
import ostrovska from '/public/images/anna_ostrovska_logo.png';
import Trans from 'next-translate/Trans';
import Link from 'next/link';
import clsx from 'clsx';
import Image from 'next/image';

const Bazaar: NextPage = () => {
  const { t, lang } = useTranslation('bazaar');

  // HTML Translations
  const aliahText = (
    <Trans i18nKey='bazaar:aliah.text' components={[<p className={textStyles.p} key={1} />]} />
  );

  const ostrovskaText = (
    <Trans i18nKey='bazaar:ostrovska.text' components={[<p className={textStyles.p} key={1} />]} />
  );

  const content = (
    <div className={styles.contentWrapper}>
      <section className={styles.section}>
        <div className={clsx(styles.logoWrapper, styles.logoWrapper_aliah)}>
          <Link href='https://aliah.fashion' target='_blank'>
            <Image src={aliah} alt={t('aliah.title')} style={{ objectFit: 'contain' }} fill />
          </Link>
        </div>
        <h2 className={clsx(textStyles.h2, textStyles.accent)}>{t('aliah.title')}</h2>
        {aliahText}
        <Link href='https://aliah.fashion' target='_blank'>
          www.aliah.fashion
        </Link>
      </section>

      <section className={styles.section}>
        <div className={clsx(styles.logoWrapper, styles.logoWrapper_ostrovska)}>
          <Image src={ostrovska} alt={t('ostrovska.title')} style={{ objectFit: 'contain' }} fill />
        </div>
        <h2 className={clsx(textStyles.h2, textStyles.accent)}>{t('ostrovska.title')}</h2>
        {ostrovskaText}
      </section>
    </div>
  );

  return (
    <Layout title={t('pageTitle')}>
      <h1 className={textStyles.h1}>{t('pageTitle')}</h1>
      {content}
    </Layout>
  );
};

export default Bazaar;
