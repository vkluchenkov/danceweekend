import { GetStaticProps, NextPage } from 'next';
import { useEffect, useMemo, useState } from 'react';
import useTranslation from 'next-translate/useTranslation';
import { QueryClient, dehydrate, useQuery } from '@tanstack/react-query';
import { ThemeProvider } from '@mui/material';

import { Layout } from '@/src/components/Layout';
import textStyles from '@/styles/Text.module.css';
import styles from '@/styles/Registration.module.css';
import { Version } from '@/src/types';
import { Switcher } from '@/src/ui-kit/Switcher';
import { darkTheme } from '@/src/ulis/constants';
import { WordpressApi } from '@/src/api/wordpressApi';
import { FormRegistration } from '@/src/components/FormRegistration';

export const getStaticProps: GetStaticProps = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['settings'],
    queryFn: WordpressApi.getSettings,
  });

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
    revalidate: 60,
  };
};

const Registration: NextPage = () => {
  const { t, lang } = useTranslation('registration');
  const [version, setVersion] = useState<Version>('live');

  const { data, isLoading, status, error } = useQuery({
    queryKey: ['settings'],
    queryFn: WordpressApi.getSettings,
    refetchOnMount: false,
  });

  const [regState, setRegState] = useState(data?.registrationState);

  useEffect(() => {
    if (data?.registrationState) setRegState(data.registrationState);
  }, [data]);

  const switcher = useMemo(() => {
    return (
      <Switcher
        value={version}
        option1={{
          value: 'live',
          label: t('live'),
        }}
        option2={{
          value: 'online',
          label: t('online'),
        }}
        onClick={(value) => setVersion(value)}
      />
    );
  }, [t, version]);

  // check the settings for dev and production env whether to open or close forms
  const isLiveRegOpen = useMemo(() => {
    if (process.env.NEXT_PUBLIC_ENVIRONMENT === 'development')
      return regState?.isLiveOpenDev.toLowerCase() === 'true' ? true : false;
    if (process.env.NEXT_PUBLIC_ENVIRONMENT === 'production')
      return regState?.isLiveOpen.toLowerCase() === 'true' ? true : false;
    else return false;
  }, [regState]);

  const isOnlineRegOpen = useMemo(() => {
    if (process.env.NEXT_PUBLIC_ENVIRONMENT === 'development')
      return regState?.isOnlineOpenDev.toLowerCase() === 'true' ? true : false;
    if (process.env.NEXT_PUBLIC_ENVIRONMENT === 'production')
      return regState?.isOnlineOpen.toLowerCase() === 'true' ? true : false;
    else return false;
  }, [regState]);

  return (
    <Layout title={t('pageTitle')}>
      <h1 className={textStyles.h1}>{t('pageTitle')}</h1>
      {switcher}
      <section className={styles.section} translate='no'>
        {version === 'live' && !isLiveRegOpen && <h1>{t('liveClosed')}</h1>}
        {version === 'online' && !isOnlineRegOpen && <h1>{t('onlineClosed')}</h1>}
        <ThemeProvider theme={darkTheme}>
          {version === 'live' && isLiveRegOpen && (
            <FormRegistration version={version} priceData={data} />
          )}
          {version === 'online' && isOnlineRegOpen && (
            <FormRegistration version={version} priceData={data} />
          )}
        </ThemeProvider>
      </section>
    </Layout>
  );
};

export default Registration;
