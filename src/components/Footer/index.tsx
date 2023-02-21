import { Divider } from '@/src/ui-kit/Divider';
import clsx from 'clsx';
import useTranslation from 'next-translate/useTranslation';
import Link from 'next/link';
import styles from './footer.module.css';

export const Footer: React.FC = () => {
  const { t, lang } = useTranslation();
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.footer__divider}>
        <Divider />
      </div>
      <div className={styles.footer__social}>
        <button type='button' className={clsx(styles.social__button, styles.social__button_fb)} />
        <button
          type='button'
          className={clsx(styles.social__button, styles.social__button_insta)}
        />
        <button
          type='button'
          className={clsx(styles.social__button, styles.social__button_email)}
        />
      </div>
      <p className={styles.footer__text}>
        {t('common:footerAddress')}:{' '}
        <Link
          href='https://goo.gl/maps/SnjPT318FQs6SeTW8'
          target='_blank'
          className={styles.footer__link}
        >
          Podskarbińska 2, Warszawa
        </Link>
      </p>
      <p className={styles.footer__copyright}>
        ©2016-{year} Dance Weekend in Warsaw festival
        <br />
        {t('common:footerCopyright')}
      </p>
    </footer>
  );
};
