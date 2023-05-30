import { Layout } from '@/src/components/Layout';
import { NextPage } from 'next';
import textStyles from '@/styles/Text.module.css';
import styles from '@/styles/Thanks.module.css';
import useTranslation from 'next-translate/useTranslation';
import Link from 'next/link';
import Trans from 'next-translate/Trans';
import { revolutUrl, telegramUrl } from '@/src/ulis/constants';
import clsx from 'clsx';

const ThankYou: NextPage = () => {
  const { t, lang } = useTranslation('thank-you');
  // Translations with HTML
  const beneficiary = (
    <Trans
      i18nKey='thank-you:beneficiary'
      components={[<span className={textStyles.accent} key={1} />]}
    />
  );

  const bankName = (
    <Trans
      i18nKey='thank-you:bankName'
      components={[<span className={textStyles.accent} key={1} />]}
    />
  );

  const bic = (
    <Trans i18nKey='thank-you:bic' components={[<span className={textStyles.accent} key={1} />]} />
  );

  const iban = (
    <Trans i18nKey='thank-you:iban' components={[<span className={textStyles.accent} key={1} />]} />
  );

  const revolut = (
    <Trans
      i18nKey='thank-you:revolutText'
      components={[
        <Link href={revolutUrl} target='_blank' className={textStyles.accent} key={1} />,
      ]}
    />
  );

  const music = (
    <Trans
      i18nKey='thank-you:musicDescription'
      components={[<Link href='/music' target='_blank' className={textStyles.accent} key={1} />]}
    />
  );

  const photo = (
    <Trans
      i18nKey='thank-you:photoDescription'
      components={[
        <Link href='/registration/photo' target='_blank' className={textStyles.accent} key={1} />,
      ]}
    />
  );

  return (
    <Layout title={t('pageTitle')}>
      <h1 className={textStyles.h1}>{t('pageTitle')}</h1>

      <section className={styles.section}>
        <p className={textStyles.p}>{t('intro')}</p>

        <h2 className={clsx(textStyles.h2, textStyles.accent)}>{t('paymentTitle')}</h2>
        <p className={textStyles.p}>{t('paymentDescription')}</p>
        <h3 className={textStyles.h3}>{t('online')}</h3>

        <p className={textStyles.p}>
          <span className={textStyles.accent}>
            <Link href='/payment' target='_blank'>
              {t('online2')}
            </Link>
          </span>
        </p>

        <h3 className={textStyles.h3}>{t('revolutTitle')}</h3>
        <p className={textStyles.p}>{revolut}</p>

        <h3 className={textStyles.h3}>{t('bank')}</h3>
        <p className={textStyles.p}>
          {beneficiary}
          <br />
          {bankName}
          <br />
          {bic}
          <br />
          {iban}
        </p>

        <h2 className={clsx(textStyles.h2, textStyles.accent)}>{t('musicTitle')}</h2>
        <p className={textStyles.p}>{music}</p>
        <h2 className={clsx(textStyles.h2, textStyles.accent)}>{t('photoTitle')}</h2>
        <p className={textStyles.p}>{photo}</p>
      </section>
    </Layout>
  );
};

export default ThankYou;
