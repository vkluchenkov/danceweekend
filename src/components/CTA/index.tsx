import { Divider } from '../Divider';
import styles from './cta.module.css';

export const Cta: React.FC = () => {
  return (
    <section className={styles.cta}>
      <h1 className={styles.cta__title}>Registration is&nbsp;open!</h1>
      <p className={styles.cta__subtitle}>
        first 10 packages for <span className={styles.cta__subtitle_accent}>€249</span>
      </p>
      <button type='button' className={styles.cta__button}>
        Sign Up!
      </button>
      <Divider />
    </section>
  );
};
