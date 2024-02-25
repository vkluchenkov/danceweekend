import clsx from 'clsx';
import Link from 'next/link';
import useTranslation from 'next-translate/useTranslation';

import { Divider } from '@/src/ui-kit/Divider';
import styles from './footer.module.css';
import { cpkUrl, emailUrl, facebookUrl, instagramUrl } from '@/src/ulis/constants';

export const Footer: React.FC = () => {
  const { t, lang } = useTranslation();
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.footer__divider}>
        <Divider />
      </div>
      <div className={styles.footer__social}>
        <Link
          href={facebookUrl}
          target='_blank'
          className={clsx(styles.social__button, styles.social__button_fb)}
        />
        <Link
          href={instagramUrl}
          target='_blank'
          className={clsx(styles.social__button, styles.social__button_insta)}
        />
        <Link
          type='button'
          href={emailUrl}
          className={clsx(styles.social__button, styles.social__button_email)}
        />
      </div>
      <div className={styles.footer__copyrightWrapper}>
        <p className={styles.footer__text}>
          {t('common:footerAddress')}:{' '}
          <Link href={cpkUrl} target='_blank' className={styles.footer__link}>
            Podskarbińska 2, Warszawa
          </Link>
        </p>
        <p className={styles.footer__copyright}>
          ©2016-{year} Dance Weekend in Warsaw festival
          <br />
          {t('common:footerCopyright')}
        </p>
      </div>
    </footer>
  );
};
