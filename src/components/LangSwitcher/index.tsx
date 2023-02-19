import clsx from 'clsx';
import styles from './langSwitcher.module.css';

export const LangSwitcher: React.FC = () => {
  return (
    <div className={styles.langSwitcher}>
      <span className={clsx(styles.lang, styles.langActive)}>English</span>
      <span className={clsx(styles.lang)}>Русский</span>
    </div>
  );
};
