import { Layout } from '@/src/components/Layout';
import { NextPage } from 'next';
import textStyles from '@/styles/Text.module.css';
import styles from '@/styles/Registration.module.css';
import useTranslation from 'next-translate/useTranslation';
import { Version } from '@/src/types';
import { useMemo, useState } from 'react';
import { Switcher } from '@/src/ui-kit/Switcher';
import { FormRegistration } from '@/src/components/FormRegistration';
import { ThemeProvider } from '@mui/material';
import { darkTheme } from '@/src/ulis/constants';

const Registration: NextPage = () => {
  const { t, lang } = useTranslation('registration');
  const [version, setVersion] = useState<Version>('online');

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

  return (
    <Layout title={t('pageTitle')}>
      <h1 className={textStyles.h1}>{t('pageTitle')}</h1>
      {switcher}
      <section className={styles.section}>
        <ThemeProvider theme={darkTheme}>
          {/* {version === 'live' && <FormRegistration version={version} />} */}
          {version === 'live' && <h1>{t('liveClosed')}</h1>}
          {/* {version === 'online' && <FormRegistration version={version} />} */}
          {version === 'online' && <h1>{t('onlineClosed')}</h1>}
        </ThemeProvider>
      </section>
    </Layout>
  );
};

export default Registration;
