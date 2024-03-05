import { useEffect, useState } from 'react';
import useTranslation from 'next-translate/useTranslation';
import Trans from 'next-translate/Trans';
import { useRouter } from 'next/router';
import { useQuery } from '@tanstack/react-query';
import clsx from 'clsx';

import { WordpressApi } from '@/src/api/wordpressApi';
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

  const [header, setHeader] = useState('');
  const [text, setText] = useState('');
  const [buttonText, setButtonText] = useState('');
  const [buttonLink, setButtonLink] = useState('');
  const [isBtnEnabled, setIsBtnEnabled] = useState(false);

  useEffect(() => {
    const currentData = data![currentLang];
    if (currentData) {
      setHeader(currentData.header);
      setText(currentData.text);
      setIsBtnEnabled(currentData.buttonEnabled.toLowerCase() === 'true' ? true : false);
      if (currentData.buttonText) setButtonText(currentData.buttonText);
      if (currentData.buttonLink) setButtonLink(currentData.buttonLink);
    }
  }, [data, currentLang]);

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
