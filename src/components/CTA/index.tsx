import { useEffect, useState } from 'react';
import useTranslation from 'next-translate/useTranslation';
import { useQuery } from '@tanstack/react-query';

import { WordpressApi } from '@/src/api/wordpressApi';
import { SupportedLangs } from '@/src/types';
import { CtaComponent } from './ctaComponent';

export const Cta: React.FC = () => {
  const { lang } = useTranslation();
  const currentLang = lang as SupportedLangs;

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

  return (
    <CtaComponent
      header={header}
      text={text}
      buttonText={buttonText}
      buttonLink={buttonLink}
      isBtnEnabled={isBtnEnabled}
    />
  );
};
