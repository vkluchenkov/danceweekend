import { Layout } from '@/src/components/Layout';
import { NextPage } from 'next';
import textStyles from '@/styles/Text.module.css';
import styles from '@/styles/Price.module.css';
import useTranslation from 'next-translate/useTranslation';
import { useMemo, useState } from 'react';
import { Version, SupportedLangs } from '@/src/types';
import { Switcher } from '@/src/ui-kit/Switcher';
import clsx from 'clsx';
import {
  contestGroupPrice,
  contestSoloPrice,
  ispromoPeriod,
  isOnlinePromoPeriod,
  teachersWsGroups,
  workshopsPrice,
  worldShowPrice,
  isFullPassSoldOut,
  isOnlineFullPassSoldOut,
} from '@/src/ulis/price';
import Trans from 'next-translate/Trans';
import { motion, AnimatePresence } from 'framer-motion';
import { motionVariants } from '@/src/ulis/constants';

const Price: NextPage = () => {
  const { t, lang } = useTranslation('price');

  const [version, setVersion] = useState<Version>('live');

  const isSoldOut =
    (isFullPassSoldOut && version === 'live') || (isOnlineFullPassSoldOut && version === 'online');

  // HTML translations
  const contestAttention = (
    <Trans
      i18nKey='price:competition.attention'
      components={[<span className={textStyles.accent} key={1} />]}
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

  const group1Names = teachersWsGroups.group1.map((n) => t(`workshops.teachers.${n}`)).join(', ');
  const group2Names = teachersWsGroups.group2.map((n) => t(`workshops.teachers.${n}`)).join(', ');

  const workshops = workshopsPrice.map((period, index) => {
    const getTitle = () => {
      const startDate = period.startDate?.toLocaleDateString('pl');
      const endDate = period.endDate?.toLocaleDateString('pl');
      if (period.isPromo) return t('workshops.promo');
      else return `${startDate} – ${endDate}`;
    };

    const today = new Date();
    const isPast = period.endDate && today > period.endDate;
    const isNow =
      period.endDate && period.startDate && today <= period.endDate && today >= period.startDate;

    const isPromo = version === 'live' ? ispromoPeriod : isOnlinePromoPeriod;

    return (
      <div
        key={period.price[version].fullPassPrice + index}
        className={clsx(
          styles.period,
          // Promo styles
          period.isPromo && isPromo && styles.period_active,
          period.isPromo && !isPromo && styles.period_expired,
          // Date based styles, ignored if promo is active
          !period.isPromo && !isPromo && isPast && styles.period_expired,
          !period.isPromo && !isPromo && isNow && styles.period_active
        )}
      >
        <h4 className={styles.period__title}>{getTitle()}</h4>

        <p className={clsx(textStyles.p, styles.period__fullPass)}>
          {isSoldOut
            ? `${t('workshops.fullPass')}: ${t('workshops.soldOut')}`
            : `${t('workshops.fullPass')}: ${period.price[version].fullPassPrice}€`}
        </p>

        {period.description && (
          <p className={clsx(textStyles.p, styles.period__description)}>
            {t(`workshops.${period.description}`)}
          </p>
        )}
        <h5 className={styles.period__singleTitle}>{t('workshops.singleTitle')}:</h5>
        <p className={textStyles.p}>
          {group1Names}:
          <span className={textStyles.accent}>&nbsp;{period.price[version].group1Price}€</span>
        </p>

        <p className={textStyles.p}>
          {group2Names}:
          <span className={textStyles.accent}> {period.price[version].group2Price}€</span>
        </p>
      </div>
    );
  });

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
        <p className={clsx(textStyles.p, textStyles.accent, styles.table__cell)}>
          {contestSoloPrice.soloPassKids.price[version].priceDiscounted}€
        </p>
        <p className={clsx(textStyles.p, textStyles.accent, styles.table__cell)}>
          {contestSoloPrice.soloPassKids.price[version].priceNormal}€
        </p>
      </div>

      <div className={styles.table__row}>
        <p className={clsx(textStyles.p, styles.table__cell)}>
          {t('competition.soloPassRisingStar')}
        </p>
        <p className={clsx(textStyles.p, textStyles.accent, styles.table__cell)}>
          {contestSoloPrice.soloPassRisingStar.price.live.priceDiscounted}€
        </p>
        <p className={clsx(textStyles.p, textStyles.accent, styles.table__cell)}>
          {contestSoloPrice.soloPassRisingStar.price.live.priceNormal}€
        </p>
      </div>

      <div className={styles.table__row}>
        <p className={clsx(textStyles.p, styles.table__cell)}>
          {t('competition.soloPassProfessionals')}
        </p>
        <p className={clsx(textStyles.p, textStyles.accent, styles.table__cell)}>
          {contestSoloPrice.soloPassProfessionals.price.live.priceDiscounted}€
        </p>
        <p className={clsx(textStyles.p, textStyles.accent, styles.table__cell)}>
          {contestSoloPrice.soloPassProfessionals.price.live.priceNormal}€
        </p>
      </div>
    </>
  );

  const workshopsContent = (
    <>
      <h2 className={clsx(textStyles.h2, textStyles.accent)}>{t('workshops.title')}</h2>
      <p className={textStyles.p}>{t('workshops.description')}</p>
      {version === 'live' && <p className={textStyles.p}>{t('workshops.kidsDiscount')}</p>}
      <div className={styles.workshopsContainer}>{workshops}</div>

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

      {/* Price table */}
      <div className={styles.table}>
        <div className={styles.table__row}>
          <h4 className={clsx(textStyles.h4, styles.table__header, styles.table__cell)}>
            {t('competition.categoryTitle')}
          </h4>
          <h4 className={clsx(textStyles.h4, styles.table__header, styles.table__cell)}>
            {t('competition.with')} Full&nbsp;Pass
          </h4>
          <h4 className={clsx(textStyles.h4, styles.table__header, styles.table__cell)}>
            {t('competition.without')} Full&nbsp;Pass
          </h4>
        </div>

        <div className={styles.table__row}>
          <h3 className={clsx(textStyles.h3, styles.table__cell, styles.table__cell_fullWidth)}>
            {t('competition.kids')}
          </h3>
        </div>

        <div className={styles.table__row}>
          <p className={clsx(textStyles.p, styles.table__cell)}>{t('competition.allLevels')}</p>
          <p className={clsx(textStyles.p, textStyles.accent, styles.table__cell)}>
            {contestSoloPrice.kids.price[version].priceDiscounted}€
          </p>
          <p className={clsx(textStyles.p, textStyles.accent, styles.table__cell)}>
            {contestSoloPrice.kids.price[version].priceNormal}€
          </p>
        </div>

        <div className={styles.table__row}>
          <h3 className={clsx(textStyles.h3, styles.table__cell, styles.table__cell_fullWidth)}>
            {t('competition.juniors+')}
          </h3>
        </div>

        <div className={styles.table__row}>
          <p className={clsx(textStyles.p, styles.table__cell)}>{t('competition.risingStar')}</p>
          <p className={clsx(textStyles.p, textStyles.accent, styles.table__cell)}>
            {contestSoloPrice.risingStar.price[version].priceDiscounted}€
          </p>
          <p className={clsx(textStyles.p, textStyles.accent, styles.table__cell)}>
            {contestSoloPrice.risingStar.price[version].priceNormal}€
          </p>
        </div>

        <div className={styles.table__row}>
          <p className={clsx(textStyles.p, styles.table__cell)}>
            {version === 'live'
              ? t('competition.professionals')
              : t('competition.professionalsOnline')}
          </p>
          <p className={clsx(textStyles.p, textStyles.accent, styles.table__cell)}>
            {contestSoloPrice.professionals.price[version].priceDiscounted}€
          </p>
          <p className={clsx(textStyles.p, textStyles.accent, styles.table__cell)}>
            {contestSoloPrice.professionals.price[version].priceNormal}€
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
            {contestGroupPrice[version]}€
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
          <span className={textStyles.accent}>{worldShowPrice.soloPriceNormal}€</span>
        </li>
        <li>
          {t('worldShow.soloDiscounted')}:{' '}
          <span className={textStyles.accent}>{worldShowPrice.soloPriceDicounted}€</span>
        </li>
        <li>
          {t('worldShow.groups')}:{' '}
          <span className={textStyles.accent}>{worldShowPrice.groups}€</span>{' '}
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
        {competitionContent}
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
