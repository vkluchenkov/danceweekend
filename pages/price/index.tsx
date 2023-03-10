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
  teachersWsGroups,
  workshopsPrice,
  worldShowPrice,
} from '@/src/ulis/price';
import Trans from 'next-translate/Trans';

const Price: NextPage = () => {
  const { t, lang } = useTranslation('price');

  const [version, setVersion] = useState<Version>('live');

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

  const ispromoPeriod = process.env.NEXT_PUBLIC_PROMO_PERIOD === 'true' ? true : false;

  const workshops = workshopsPrice.map((period, index) => {
    const getTitle = () => {
      if (period.isPromo) return t('workshops.promo');
      if (period.startDate && period.endDate) {
        return `${period.startDate.toLocaleDateString('pl')} – ${period.endDate.toLocaleDateString(
          'pl'
        )}`;
      }
      if (period.startDate && !period.endDate) {
        return `${t('workshops.from') + ' ' + period.startDate.toLocaleDateString('pl')}`;
      }
      if (!period.startDate && period.endDate) {
        return `${t('workshops.till') + ' ' + period.endDate.toLocaleDateString('pl')}`;
      } else {
        return <></>;
      }
    };

    const today = new Date();
    const isPast = period.endDate && today > period.endDate;
    const isNow =
      period.endDate && period.startDate && today <= period.endDate && today >= period.startDate;

    return (
      <div
        key={period.fullPassPrice + index}
        className={clsx(
          styles.period,
          // Promo styles
          period.isPromo && ispromoPeriod && styles.period_active,
          period.isPromo && !ispromoPeriod && styles.period_expired,
          // Date based styles, ignored if promo is active
          !period.isPromo && !ispromoPeriod && isPast && styles.period_expired,
          !period.isPromo && !ispromoPeriod && isNow && styles.period_active
        )}
      >
        <h4 className={styles.period__title}>{getTitle()}</h4>

        <p className={clsx(textStyles.p, styles.period__fullPass)}>
          {`${t('workshops.fullPass')}: ${period.fullPassPrice}€`}
        </p>

        <p className={textStyles.p}>
          {group1Names}:<span className={textStyles.accent}> {period.group1Price}€</span>
        </p>

        <p className={textStyles.p}>
          {group2Names}:<span className={textStyles.accent}> {period.group2Price}€</span>
        </p>

        {period.description && (
          <p className={clsx(textStyles.p, styles.period__description)}>
            {t(`workshops.${period.description}`)}
          </p>
        )}
      </div>
    );
  });

  const liveContent = (
    <>
      <h2 className={clsx(textStyles.h2, textStyles.accent)}>{t('workshops.title')}</h2>

      <p className={textStyles.p}>{t('workshops.description')}</p>
      <p className={textStyles.p}>{t('workshops.kidsDiscount')}</p>
      <div className={styles.workshopsContainer}>{workshops}</div>

      <h3 className={textStyles.h3}>{t('workshops.groupOfferTitle')}</h3>
      <p className={textStyles.p}>{t('workshops.groupOfferText')}</p>

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
          <p className={clsx(textStyles.p, styles.table__cell)}>{t('competition.openLevel')}</p>
          <p className={clsx(textStyles.p, textStyles.accent, styles.table__cell)}>
            {contestSoloPrice.kids.priceDiscounted}€
          </p>
          <p className={clsx(textStyles.p, textStyles.accent, styles.table__cell)}>
            {contestSoloPrice.kids.priceNormal}€
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
            {contestSoloPrice.risingStar.priceDiscounted}€
          </p>
          <p className={clsx(textStyles.p, textStyles.accent, styles.table__cell)}>
            {contestSoloPrice.risingStar.priceNormal}€
          </p>
        </div>

        <div className={styles.table__row}>
          <p className={clsx(textStyles.p, styles.table__cell)}>{t('competition.professionals')}</p>
          <p className={clsx(textStyles.p, textStyles.accent, styles.table__cell)}>
            {contestSoloPrice.professionals.priceDiscounted}€
          </p>
          <p className={clsx(textStyles.p, textStyles.accent, styles.table__cell)}>
            {contestSoloPrice.professionals.priceNormal}€
          </p>
        </div>

        <div className={styles.table__row}>
          <div className={clsx(styles.table__cell, styles.table__cell_fullWidth)}>
            <h3 className={clsx(textStyles.h3)}>{t('competition.soloPass')}</h3>
            <p className={textStyles.p}>{t('competition.solosPassDescription')}</p>
          </div>
        </div>

        <div className={styles.table__row}>
          <p className={clsx(textStyles.p, styles.table__cell)}>{t('competition.soloPassKids')}</p>
          <p className={clsx(textStyles.p, textStyles.accent, styles.table__cell)}>
            {contestSoloPrice.soloPassKids.priceDiscounted}€
          </p>
          <p className={clsx(textStyles.p, textStyles.accent, styles.table__cell)}>
            {contestSoloPrice.soloPassKids.priceNormal}€
          </p>
        </div>

        <div className={styles.table__row}>
          <p className={clsx(textStyles.p, styles.table__cell)}>
            {t('competition.soloPassRisingStar')}
          </p>
          <p className={clsx(textStyles.p, textStyles.accent, styles.table__cell)}>
            {contestSoloPrice.soloPassRisingStar.priceDiscounted}€
          </p>
          <p className={clsx(textStyles.p, textStyles.accent, styles.table__cell)}>
            {contestSoloPrice.soloPassRisingStar.priceNormal}€
          </p>
        </div>

        <div className={styles.table__row}>
          <p className={clsx(textStyles.p, styles.table__cell)}>
            {t('competition.soloPassProfessionals')}
          </p>
          <p className={clsx(textStyles.p, textStyles.accent, styles.table__cell)}>
            {contestSoloPrice.soloPassProfessionals.priceDiscounted}€
          </p>
          <p className={clsx(textStyles.p, textStyles.accent, styles.table__cell)}>
            {contestSoloPrice.soloPassProfessionals.priceNormal}€
          </p>
        </div>

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
            {contestGroupPrice}€
          </p>
        </div>
      </div>

      {/* World show */}
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

  const onlineContent = <></>;

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

  return (
    <Layout title={t('pageTitle')}>
      <h1 className={textStyles.h1}>{t('pageTitle')}</h1>
      {switcher}
      <section className={styles.section}>
        {version === 'live' && liveContent}
        {version === 'online' && onlineContent}
        {paymentContent}
        {privacyPolicy}
      </section>
    </Layout>
  );
};

export default Price;
