import { GetStaticProps, NextPage } from 'next';
import { useEffect, useMemo, useState } from 'react';
import useTranslation from 'next-translate/useTranslation';
import clsx from 'clsx';
import Trans from 'next-translate/Trans';
import { motion, AnimatePresence } from 'framer-motion';
import { QueryClient, dehydrate, useQuery } from '@tanstack/react-query';
import Link from 'next/link';

import { Layout } from '@/src/components/Layout';
import textStyles from '@/styles/Text.module.css';
import styles from '@/styles/Price.module.css';
import { SupportedLangs, Version } from '@/src/types';
import { Switcher } from '@/src/ui-kit/Switcher';
import { isFullPassSoldOut, isOnlineFullPassSoldOut, singleWsPrice } from '@/src/ulis/price';
import { defaultUrl, motionVariants } from '@/src/ulis/constants';
import { WordpressApi } from '@/src/api/wordpressApi';
import { DateTime } from 'luxon';

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
    revalidate: 30,
  };
};

const Price: NextPage = () => {
  const { t, lang } = useTranslation('price');
  const currentLang = lang as SupportedLangs;

  const { data, isLoading, status, error } = useQuery({
    queryKey: ['settings'],
    queryFn: WordpressApi.getSettings,
    refetchOnMount: false,
  });

  const [isDev, setIsDev] = useState(false);

  const [price, setPrice] = useState(data?.price);

  const [version, setVersion] = useState<Version>('live');

  useEffect(() => {
    setIsDev(!window.location.href.startsWith(defaultUrl));
  }, [setIsDev]);

  useEffect(() => {
    if (data?.price) setPrice(data.price);
  }, [data]);

  const isSoldOut =
    (isFullPassSoldOut && version === 'live') || (isOnlineFullPassSoldOut && version === 'online');

  // HTML translations
  const contestAttention = (
    <Trans
      i18nKey='price:competition.attention'
      components={[<span className={textStyles.accent} key={1} />]}
    />
  );

  const photoAttention = (
    <Trans
      i18nKey='price:competition.attention2'
      components={[
        <span className={textStyles.accent} key={1} />,
        <Link href='/info/photo-video' key={2} target='_blank' />,
      ]}
    />
  );

  const worldShowAttention = (
    <Trans
      i18nKey='price:worldShow.attention'
      components={[<span className={textStyles.accent} key={1} />]}
    />
  );

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

  const priceCards = () => {
    const isPromo = (): boolean => {
      const livePromo = isDev
        ? price?.promoPeriodDev?.isLivePromo.toLowerCase()
        : price?.promoPeriod?.isLivePromo.toLowerCase();
      const onlinePromo = isDev
        ? price?.promoPeriodDev?.isOnlinePromo.toLowerCase()
        : price?.promoPeriod?.isOnlinePromo.toLowerCase();
      if (version === 'live') return livePromo === 'true' ? true : false;
      else return onlinePromo === 'true' ? true : false;
    };

    const promoPrice = isDev
      ? price?.promoPeriodDev?.price[version]
      : price?.promoPeriod?.price[version];

    const promoText = isDev ? price?.promoPeriodDev[currentLang] : price?.promoPeriod[currentLang];

    const promoCard = (
      <div
        key='promoCard'
        className={clsx(
          styles.period,
          // Promo styles
          isPromo() && styles.period_active,
          !isPromo() && styles.period_expired
        )}
      >
        <h4 className={styles.period__title}>
          {promoText?.length ? promoText : t('workshops.promo')}
        </h4>

        <p className={clsx(textStyles.p, styles.period__fullPass)}>
          {isSoldOut
            ? `${t('workshops.fullPass')}: ${t('workshops.soldOut')}`
            : `${t('workshops.fullPass')}: ${promoPrice}€`}
        </p>

        <h5 className={styles.period__singleTitle}>
          {t('workshops.singleTitle')}:{' '}
          <span className={textStyles.accent}>&nbsp;{singleWsPrice[version]}€</span>
        </h5>
      </div>
    );

    const allCards = [];
    allCards.push(promoCard);

    const periods = Object.entries(price?.periods!);

    periods.forEach((period, index) => {
      const today = DateTime.now().setZone('Europe/Warsaw');

      const startDate = DateTime.fromISO(period[1].start)
        .setZone('UTC')
        .setZone('Europe/Warsaw', { keepLocalTime: true });

      const endDate = DateTime.fromISO(period[1].end)
        .setZone('UTC')
        .setZone('Europe/Warsaw', { keepLocalTime: true });

      const cardTitle = `${startDate.setLocale('pl').toLocaleString()} – ${endDate
        .setLocale('pl')
        .toLocaleString()}`;

      const isPast = endDate && today > endDate;
      const isNow = endDate && startDate && today <= endDate && today >= startDate;

      const card = (
        <div
          key={period[0]}
          className={clsx(
            styles.period,
            isPromo() && styles.period_expired,
            // Date based styles, ignored if promo is active
            !isPromo() && isPast && styles.period_expired,
            !isPromo() && isNow && styles.period_active
          )}
        >
          <h4 className={styles.period__title}>{cardTitle}</h4>

          <p className={clsx(textStyles.p, styles.period__fullPass)}>
            {isSoldOut
              ? `${t('workshops.fullPass')}: ${t('workshops.soldOut')}`
              : `${t('workshops.fullPass')}: ${period[1].price[version]}€`}
          </p>
          <h5 className={styles.period__singleTitle}>
            {t('workshops.singleTitle')}:{' '}
            <span className={textStyles.accent}>&nbsp;{singleWsPrice[version]}€</span>
          </h5>
        </div>
      );

      allCards.push(card);
    });

    return allCards;
  };

  const contestSoloPrice = price?.contest?.contestsoloprice;

  const soloPassTable = (
    <>
      <div className={styles.table__row}>
        <div className={clsx(styles.table__cell, styles.table__cell_fullWidth)}>
          <h3 className={clsx(textStyles.h3)}>{t('competition.soloPass')}</h3>
          <p className={textStyles.p}>{t('competition.solosPassDescription')}</p>
        </div>
      </div>

      <div className={styles.table__row}>
        <p className={clsx(textStyles.p, styles.table__cell)}>{t('competition.soloPassKids')}</p>
        <p
          className={clsx(
            textStyles.p,
            textStyles.accent,
            styles.table__cell,
            styles.table__cell_singlePrice
          )}
        >
          {contestSoloPrice?.soloPassKids}€
        </p>
      </div>

      <div className={styles.table__row}>
        <p className={clsx(textStyles.p, styles.table__cell)}>
          {t('competition.soloPassRisingStar')}
        </p>
        <p
          className={clsx(
            textStyles.p,
            textStyles.accent,
            styles.table__cell,
            styles.table__cell_singlePrice
          )}
        >
          {contestSoloPrice?.soloPassRisingStar}€
        </p>
      </div>

      <div className={styles.table__row}>
        <p className={clsx(textStyles.p, styles.table__cell)}>
          {t('competition.soloPassProfessionals')}
        </p>
        <p
          className={clsx(
            textStyles.p,
            textStyles.accent,
            styles.table__cell,
            styles.table__cell_singlePrice
          )}
        >
          {contestSoloPrice?.soloPassProfessionals}€
        </p>
      </div>
    </>
  );

  const workshopsContent = (
    <>
      <h2 className={clsx(textStyles.h2, textStyles.accent)}>{t('workshops.title')}</h2>
      <p className={textStyles.p}>{t('workshops.description')}</p>
      {version === 'live' && <p className={textStyles.p}>{t('workshops.kidsDiscount')}</p>}
      <div className={styles.workshopsContainer}>{priceCards()}</div>

      {version === 'live' && (
        <>
          <h3 className={textStyles.h3}>{t('workshops.groupOfferTitle')}</h3>
          <p className={textStyles.p}>{t('workshops.groupOfferText')}</p>
        </>
      )}
    </>
  );

  const competitionContent = (
    <>
      <h2 className={clsx(textStyles.h2, textStyles.accent)}>{t('competition.title')}</h2>
      <p className={textStyles.p}>{contestAttention}</p>
      <p className={textStyles.p}>{photoAttention}</p>

      {/* Price table */}
      <div className={styles.table}>
        <div className={styles.table__row}>
          <h4 className={clsx(textStyles.h4, styles.table__header, styles.table__cell)}>
            {t('competition.categoryTitle')}
          </h4>
          <h4
            className={clsx(
              textStyles.h4,
              styles.table__header,
              styles.table__cell,
              styles.table__cell_singlePrice
            )}
          >
            {t('competition.price')}
          </h4>
        </div>

        <div className={styles.table__row}>
          <h3 className={clsx(textStyles.h3, styles.table__cell, styles.table__cell_fullWidth)}>
            {t('competition.kids')}
          </h3>
        </div>

        <div className={styles.table__row}>
          <p className={clsx(textStyles.p, styles.table__cell)}>{t('competition.allLevels')}</p>
          <p
            className={clsx(
              textStyles.p,
              textStyles.accent,
              styles.table__cell,
              styles.table__cell_singlePrice
            )}
          >
            {contestSoloPrice?.kids}€
          </p>
        </div>

        <div className={styles.table__row}>
          <h3 className={clsx(textStyles.h3, styles.table__cell, styles.table__cell_fullWidth)}>
            {t('competition.juniors+')}
          </h3>
        </div>

        <div className={styles.table__row}>
          <p className={clsx(textStyles.p, styles.table__cell)}>{t('competition.risingStar')}</p>
          <p
            className={clsx(
              textStyles.p,
              textStyles.accent,
              styles.table__cell,
              styles.table__cell_singlePrice
            )}
          >
            {contestSoloPrice?.risingstar}€
          </p>
        </div>

        <div className={styles.table__row}>
          <p className={clsx(textStyles.p, styles.table__cell)}>
            {version === 'live'
              ? t('competition.professionals')
              : t('competition.professionalsOnline')}
          </p>
          <p
            className={clsx(
              textStyles.p,
              textStyles.accent,
              styles.table__cell,
              styles.table__cell_singlePrice
            )}
          >
            {contestSoloPrice?.professionals}€
          </p>
        </div>

        {version === 'live' && soloPassTable}

        <div className={styles.table__row}>
          <div className={clsx(styles.table__cell, styles.table__cell_fullWidth)}>
            <h3 className={clsx(textStyles.h3)}>{t('competition.groups')}</h3>
          </div>
        </div>

        <div className={styles.table__row}>
          <p className={clsx(textStyles.p, styles.table__cell)}>{t('competition.perPerson')}</p>
          <p
            className={clsx(
              textStyles.p,
              textStyles.accent,
              styles.table__cell,
              styles.table__cell_singlePrice
            )}
          >
            {price?.contest?.contestGroupPrice}€
          </p>
        </div>
      </div>
    </>
  );

  const worldShowContent = (
    <>
      <h2 className={clsx(textStyles.h2, textStyles.accent)}>{t('worldShow.title')}</h2>
      <p className={textStyles.p}>{worldShowAttention}</p>
      <ul className={textStyles.list}>
        <li>
          {t('worldShow.soloNormal')}:{' '}
          <span className={textStyles.accent}>{price?.worldShow?.solo}€</span>
        </li>
        <li>
          {t('worldShow.groups')}:{' '}
          <span className={textStyles.accent}>{price?.worldShow?.groups}€</span>{' '}
          {t('worldShow.perPerson')}
        </li>
      </ul>
    </>
  );

  const paymentContent = (
    <>
      <h2 className={clsx(textStyles.h2, textStyles.accent)}>{t('payment.title')}</h2>

      <h3 className={clsx(textStyles.h3)}>{t('payment.conditionsTitle')}</h3>
      <p className={textStyles.p}>{t('payment.conditionsText')}</p>

      {version === 'live' && (
        <>
          <h3 className={clsx(textStyles.h3)}>{t('payment.installmentsTitle')}</h3>
          <p className={textStyles.p}>{t('payment.installmentsText')}</p>
          <p className={textStyles.p}>{t('payment.installmentsWarning')}</p>
        </>
      )}

      <h3 className={clsx(textStyles.h3)}>{t('payment.optionsTitle')}</h3>
      <ul className={textStyles.list}>
        <li>
          <span className={textStyles.accent}>{t('payment.optionsCards')}</span> (
          {t('payment.ImmediateArrival')})
        </li>
        <li>
          <span className={textStyles.accent}>{t('payment.optionsPayPal')}</span> (
          {t('payment.ImmediateArrival')})
        </li>
        <li>
          <span className={textStyles.accent}>{t('payment.optionsBank')}</span> (
          {t('payment.bankeArrival')})
        </li>
      </ul>
      <p className={textStyles.p}>{t('payment.optionsDescription')}</p>

      <h3 className={clsx(textStyles.h3)}>{t('payment.termsTitle')}</h3>
      <ul className={textStyles.list}>
        <li>{t('payment.term1')}</li>
        <li>{t('payment.term2')}</li>
        <li>{t('payment.term3')}</li>
        <li>{t('payment.term4')}</li>
      </ul>
    </>
  );

  const privacyPolicy = (
    <>
      <h2 className={clsx(textStyles.h2, textStyles.accent)}>{t('privacyPolicy.title')}</h2>
      <p className={textStyles.p}>{t('privacyPolicy.p1')}</p>
      <p className={textStyles.p}>{t('privacyPolicy.p2')}</p>
      <p className={textStyles.p}>{t('privacyPolicy.p3')}</p>
    </>
  );

  const liveContent = (
    <AnimatePresence>
      <motion.section
        className={styles.section}
        initial='hidden'
        animate='enter'
        exit='exit'
        variants={motionVariants}
        transition={{ type: 'linear', duration: 0.3 }}
      >
        {workshopsContent}

        {competitionContent}
        {worldShowContent}
        {paymentContent}
        {privacyPolicy}
      </motion.section>
    </AnimatePresence>
  );

  const onlineContent = (
    <AnimatePresence>
      <motion.section
        className={styles.section}
        initial='hidden'
        animate='enter'
        exit='exit'
        variants={motionVariants}
        transition={{ type: 'linear', duration: 0.3 }}
      >
        {workshopsContent}
        {paymentContent}
        {privacyPolicy}
      </motion.section>
    </AnimatePresence>
  );

  return (
    <Layout title={t('pageTitle')}>
      <h1 className={textStyles.h1}>{t('pageTitle')}</h1>
      {switcher}
      {version === 'live' && liveContent}
      {version === 'online' && onlineContent}
    </Layout>
  );
};

export default Price;
