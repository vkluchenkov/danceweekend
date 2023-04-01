import useTranslation from 'next-translate/useTranslation';
import Trans from 'next-translate/Trans';

import { Divider } from '../../ui-kit/Divider';
import styles from './cta.module.css';
import { useRouter } from 'next/router';

export const Cta: React.FC = () => {
  const { t } = useTranslation('cta');
  const router = useRouter();
  const subtitle = (
    <Trans
      i18nKey='cta:subtitle'
      components={[<span className={styles.cta__subtitle_accent} key={1} />]}
    />
  );

  return (
    <section className={styles.cta}>
      <h2 className={styles.cta__title}>{t('title')}</h2>
      <p className={styles.cta__subtitle}>{subtitle}</p>
      <button
        type='button'
        className={styles.cta__button}
        onClick={() => router.push('registration')}
      >
        {t('button')}
      </button>
      <Divider inverted />
    </section>
  );
};
