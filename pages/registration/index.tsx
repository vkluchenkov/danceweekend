import { GetStaticProps, NextPage } from 'next';
import { useEffect, useMemo, useState } from 'react';
import useTranslation from 'next-translate/useTranslation';
import { QueryClient, dehydrate, useQuery } from '@tanstack/react-query';

import { Layout } from '@/src/components/Layout';
import textStyles from '@/styles/Text.module.css';
import styles from '@/styles/Registration.module.css';
import { Version } from '@/src/types';
import { Switcher } from '@/src/ui-kit/Switcher';
import { FormRegistration } from '@/src/components/FormRegistration';
import { ThemeProvider } from '@mui/material';
import { darkTheme } from '@/src/ulis/constants';
import { WordpressApi } from '@/src/api/wordpressApi';

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

  const isLiveRegOpen = regState?.isLiveOpen === 'true' ? true : false;
  const isOnlineRegOpen = regState?.isOnlineOpen === 'true' ? true : false;

  return (
    <Layout title={t('pageTitle')}>
      <h1 className={textStyles.h1}>{t('pageTitle')}</h1>
      {switcher}
      <section className={styles.section}>
        <ThemeProvider theme={darkTheme}>
          {/* {version === 'live' && isLiveRegOpen && <FormRegistration version={version} />} */}
          {version === 'live' && !isLiveRegOpen && <h1>{t('liveClosed')}</h1>}
          {/* {version === 'online' && isOnlineRegOpen && <FormRegistration version={version} />} */}
          {version === 'online' && !isOnlineRegOpen && <h1>{t('onlineClosed')}</h1>}
        </ThemeProvider>
      </section>
    </Layout>
  );
};

export default Registration;
