import { useRouter } from 'next/router';
import clsx from 'clsx';
import Trans from 'next-translate/Trans';

import styles from './cta.module.css';
import { Divider } from '../../ui-kit/Divider';

interface CtaComponentProps {
  header: string;
  text: string;
  buttonText: string;
  buttonLink: string;
  isBtnEnabled: boolean;
}

export const CtaComponent: React.FC<CtaComponentProps> = ({
  header,
  text,
  buttonText,
  buttonLink,
  isBtnEnabled,
}) => {
  const router = useRouter();

  const formattedText = (
    <Trans
      i18nKey={''}
      defaultTrans={text}
      components={{ b: <span className={styles.cta__subtitle_accent} key={1} /> }}
    />
  );

  return (
    <section className={styles.cta}>
      <h2 className={styles.cta__title}>{header}</h2>
      <p className={clsx(styles.cta__subtitle)}>{formattedText}</p>
      {isBtnEnabled && (
        <button
          type='button'
          className={styles.cta__button}
          onClick={() => router.push(buttonLink!)}
        >
          {buttonText}
        </button>
      )}
      <Divider inverted />
    </section>
  );
};
