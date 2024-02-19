import useTranslation from 'next-translate/useTranslation';
import { useRouter } from 'next/router';
import { useQuery } from '@tanstack/react-query';
import { WordpressApi } from '@/src/api/wordpressApi';
import clsx from 'clsx';
import { useEffect, useState } from 'react';

import { Divider } from '../../ui-kit/Divider';
import styles from './cta.module.css';
import { SupportedLangs } from '@/src/types';

export const Cta: React.FC = () => {
  const { lang } = useTranslation();
  const currentLang = lang as SupportedLangs;

  const router = useRouter();

  const { data, isLoading, status, error } = useQuery({
    queryKey: ['cta'],
    queryFn: () => WordpressApi.getCta(),
    refetchOnMount: false,
  });

  const [cta, setCta] = useState(data);

  useEffect(() => {
    if (data) setCta(data);
  }, [data]);

  const title = cta ? cta[currentLang]?.header : '';
  const text = cta ? cta[currentLang]?.text : '';
  const buttonText = cta ? cta[currentLang]?.buttonText : '';
  const buttonLink = cta ? cta[currentLang]?.buttonLink : '';
  const isBtnEnabled = cta && cta[currentLang]?.buttonEnabled === 'True' ? true : false;

  return (
    <section className={styles.cta}>
      <h2 className={styles.cta__title}>{title}</h2>
      <p className={clsx(styles.cta__subtitle, styles.cta__subtitle_accent)}>{text}</p>
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
