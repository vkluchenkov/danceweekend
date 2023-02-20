import clsx from 'clsx';
import styles from './langSwitcher.module.css';
import setLanguage from 'next-translate/setLanguage';
import useTranslation from 'next-translate/useTranslation';

export const LangSwitcher: React.FC = () => {
  const { t, lang } = useTranslation();
  return (
    <div className={styles.langSwitcher}>
      <button
        className={clsx(styles.lang, lang === 'en' && styles.langActive)}
        onClick={async () => await setLanguage('en')}
      >
        English
      </button>
      <button
        className={clsx(styles.lang, lang === 'ru' && styles.langActive)}
        onClick={async () => await setLanguage('ru')}
      >
        Русский
      </button>
    </div>
  );
};
