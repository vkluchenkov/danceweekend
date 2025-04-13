import React, { useMemo, useEffect, useState } from 'react';
import useTranslation from 'next-translate/useTranslation';
import { useFormContext } from 'react-hook-form';
import clsx from 'clsx';
import Trans from 'next-translate/Trans';
import Link from 'next/link';

import textStyles from '@/styles/Text.module.css';
import styles from '@/styles/Registration.module.css';
import { SummaryStepProps, FormFields } from './types';
import { SupportedLangs } from '@/src/types';
import { FormInputCheckbox } from '@/src/ui-kit/input';
import { contestCategories } from '@/src/ulis/contestCategories';
// import { singleWsPrice } from '@/src/ulis/price';
import { defaultUrl } from '@/src/ulis/constants';

export const Summary: React.FC<SummaryStepProps> = ({
  fullPassPrice,
  soloPassPrice,
  total,
  setIsNextDisabled,
}) => {
  const { t, lang } = useTranslation('registration');
  const currentLang = lang as SupportedLangs;

  const methods = useFormContext<FormFields>();
  const { watch, control } = methods;

  const settings = watch('settings');
  const version = watch('version');
  const form = watch();

  const [isDev, setIsDev] = useState(false);

  useEffect(() => {
    setIsDev(!window.location.href.startsWith(defaultUrl));
  }, [setIsDev]);

  useEffect(() => {
    setIsNextDisabled(!form.rulesAccepted);
  }, [setIsNextDisabled, form]);

  const isPromo = useMemo((): boolean => {
    const livePromo = isDev
      ? settings?.price.promoPeriodDev.isLivePromo.toLowerCase()
      : settings?.price.promoPeriod.isLivePromo.toLowerCase();

    return livePromo === 'true' ? true : false;
  }, [settings, isDev]);

  // translations with HTML
  const acceptRules = (
    <Trans
      i18nKey='registration:form.summary.rulesCheckbox'
      components={[
        <Link href='/price' key={1} target='_blank' />,
        <Link href='/competition/rules' key={2} target='_blank' />,
      ]}
    />
  );

  // Personal
  const personal = useMemo(() => {
    const list = ['name', 'surname', 'stageName', 'age'];
    return list.map((i) => ({
      key: i,
      value: form[i as keyof FormFields],
    }));
  }, [form]);

  const personalData = personal.map((i) => {
    if (i.value)
      return (
        <li key={i.key}>
          {t(`form.personal.${i.key}`)}:{' '}
          <span className={textStyles.accent}>{i.value as string}</span>
        </li>
      );
  });

  // Years before
  const yearsBeforeData = useMemo(() => {
    const yearsSelected = form.yearsBefore2.filter((year) => year.selected);
    const yearsSelectedValues = yearsSelected.map((year) => year.year);

    const yearsElements = (
      <li>
        {t('form.personal.yearsBefore')}:{' '}
        <span className={textStyles.accent}>{yearsSelectedValues.join(', ')}</span>
      </li>
    );

    return yearsElements;
  }, [form, t]);

  // Contacts
  const contacts = useMemo(() => {
    const list = ['social', 'country', 'city', 'tel', 'email'];
    return list.map((i) => ({
      key: i,
      value: form[i as keyof FormFields],
    }));
  }, [form]);

  const contactsData = contacts.map((i) => {
    if (i.value)
      return (
        <li key={i.key}>
          {t(`form.personal.${i.key}`)}:{' '}
          <span className={textStyles.accent}>{i.value as string}</span>
        </li>
      );
  });

  // Workshops

  const isFullPass = form.isFullPass;
  const workshops = form.workshops.filter((ws) => ws.selected);

  const workshopsData = useMemo(() => {
    if (isFullPass) {
      return (
        <>
          <li>
            {t('form.workshops.fullPass')}:{' '}
            <span className={textStyles.accent}>{fullPassPrice}€</span>
          </li>

          <li>
            {t('form.workshops.discounts.title')}:{' '}
            <span className={textStyles.accent}>
              {t(`form.workshops.discounts.${form.fullPassDiscount}`)}
            </span>
          </li>

          {form.fullPassDiscount === 'group' && (
            <li>
              {t('form.workshops.discounts.groupName')}:{' '}
              <span className={textStyles.accent}>{form.fullPassGroupName}</span>
            </li>
          )}

          {form.fullPassDiscount != 'group' && form.fullPassDiscount != 'none' && (
            <li>
              {t('form.workshops.discounts.details')}:{' '}
              <span className={textStyles.accent}>{form.fullPassDiscountSource}</span>
            </li>
          )}
        </>
      );
    }
    if (workshops.length) {
      const wsList = workshops.map((ws) => {
        // const price = singleWsPrice[form.version];
        return (
          <li key={ws.id} className={styles.summary__group}>
            <span className={textStyles.accent}>{ws.translations[currentLang].title}</span>
            <br />
            {ws.translations[currentLang].description}
            <br />
            {/* <span className={textStyles.accent}>{price}€</span> */}
          </li>
        );
      });

      return (
        <>
          {/* <h3 className={clsx(textStyles.h3, textStyles.centered)}>{t('form.workshops.title')}</h3> */}
          <ul className={clsx(textStyles.list, textStyles.list_summary)}>{wsList}</ul>
        </>
      );
    }
  }, [fullPassPrice, t, form, currentLang, isFullPass, workshops]);

  // Contest solo
  const contestSoloData = useMemo(() => {
    const soloSelected = form.soloContest.filter((cat) => cat.selected);

    const stylesData = (
      <li>
        <ul
          className={clsx(textStyles.list, textStyles.list_summary, styles.summary__group)}
          translate='no'
        >
          <li>
            <h4 className={clsx(textStyles.h4)}>{t('form.contest.stylesTitle')}:</h4>
          </li>

          {soloSelected.map((cat) => (
            <li key={cat.id}>
              {cat.translations[currentLang].categoryTitle}
              {cat.price > 0 && (
                <>
                  : <span className={textStyles.accent}>{cat.price}€</span>
                </>
              )}
            </li>
          ))}
        </ul>
      </li>
    );

    if (form.isSoloContest) {
      return (
        <>
          <h3 className={clsx(textStyles.h3, textStyles.centered)}>
            {t('form.contest.soloTitle')}
          </h3>

          <ul className={clsx(textStyles.list, textStyles.list_summary)}>
            <li>
              {t('form.contest.ageGroups.title')}:{' '}
              <span className={textStyles.accent}>
                {t(`form.contest.ageGroups.${form.contestAgeGroup}`)}
              </span>
            </li>
            {form.contestLevel && (
              <li>
                {t('form.contest.levels.title')}:{' '}
                <span className={textStyles.accent}>
                  {t(`form.contest.levels.${form.contestLevel}`)}
                </span>
              </li>
            )}

            {form.isSoloPass && (
              <li>
                {t('form.contest.soloPassTitle')}:{' '}
                <span className={textStyles.accent}>{soloPassPrice}€</span>
              </li>
            )}

            {stylesData}
          </ul>
        </>
      );
    } else return <></>;
  }, [form, t, soloPassPrice, currentLang]);

  // Contest groups
  const contestGroupsData = useMemo(() => {
    const isGroups = form.groupContest.length > 0;

    if (isGroups)
      return (
        <>
          <h3 className={clsx(textStyles.h3, textStyles.centered)}>
            {t('form.contest.groups.title')}
          </h3>

          <ul className={clsx(textStyles.list, textStyles.list_summary)} translate='no'>
            {form.groupContest.map((group, index) => {
              // Category style translation
              const contestCategory = contestCategories.find(
                (cat) =>
                  cat.ageGroup === form.groupContest[index].ageGroup &&
                  (cat.isDuoCategory || cat.isGroupCategory)
              );
              const catStyle = contestCategory?.categories.find(
                (style) => style.translations.en.categoryTitle === group.style
              );

              return (
                <li key={group.name} className={styles.summary__group}>
                  <h4 className={clsx(textStyles.h4)}>
                    {t('form.contest.groups.group')}/{t('form.contest.groups.duo')} #{index + 1} :
                    <span className={textStyles.accent}> {group.price}€</span>
                  </h4>

                  <ul className={clsx(textStyles.list, textStyles.list_summary)}>
                    <li>
                      {t('form.contest.groups.groupOrDuo')}:{' '}
                      <span className={textStyles.accent}>
                        {t(`form.contest.groups.${group.type}`)}
                      </span>
                    </li>

                    <li>
                      {t('form.contest.groups.ageGroupTitle')}:{' '}
                      <span className={textStyles.accent}>
                        {t(`form.contest.ageGroups.${group.ageGroup}`)}
                      </span>
                    </li>

                    <li>
                      {t('form.contest.groups.style')}:{' '}
                      <span className={textStyles.accent}>
                        {catStyle?.translations[currentLang].categoryTitle}
                      </span>
                    </li>

                    <li>
                      {t('form.contest.groups.name')}:{' '}
                      <span className={textStyles.accent}>{group.name}</span>
                    </li>

                    {group.type === 'group' && (
                      <li>
                        {t('form.contest.groups.qty')}:{' '}
                        <span className={textStyles.accent}>{group.qty}</span>
                      </li>
                    )}
                  </ul>
                </li>
              );
            })}
          </ul>
        </>
      );
    else return <></>;
  }, [form, t, currentLang]);

  // WorldShow
  const worldShowData = useMemo(() => {
    if (form.isWorldShowSolo || form.isWorldShowGroup)
      return (
        <>
          <h3 className={clsx(textStyles.h3, textStyles.centered)}>{t('form.worldShow.title')}</h3>

          {form.isWorldShowSolo && (
            <p className={textStyles.p}>
              {t('form.worldShow.solo')}:{' '}
              {/* <span className={textStyles.accent}>{settings?.price.worldShow?.solo!}€</span> */}
            </p>
          )}

          {form.isWorldShowGroup && (
            <>
              <p className={textStyles.p} translate='no'>
                {t('form.summary.worldShowGroup')}:{' '}
                <span className={textStyles.accent}>{form.worldShowGroup?.price}€</span>
                <br />
                {t('form.contest.groups.name')}:{' '}
                <span className={textStyles.accent}>{form.worldShowGroup?.name}</span>
                <br />
                {t('form.contest.groups.qty')}:{' '}
                <span className={textStyles.accent}>{form.worldShowGroup?.qty}</span>
              </p>
            </>
          )}
        </>
      );
  }, [form, t]);

  return (
    <div className={styles.form}>
      <h2 className={textStyles.h2}>{t('form.summary.title')}</h2>

      <h3 className={clsx(textStyles.h3)}>
        {t('form.summary.versionTitle')}: <span className={textStyles.accent}>{form.version}</span>
      </h3>

      {/* Personal data */}
      <h3 className={clsx(textStyles.h3, textStyles.centered)}>
        {t('form.summary.personalTitle')}
      </h3>
      <ul className={clsx(textStyles.list, textStyles.list_summary)}>
        {personalData}
        {yearsBeforeData}
      </ul>

      {/* Contacts */}
      <h3 className={clsx(textStyles.h3, textStyles.centered)}>{t('form.personal.contacts')}</h3>
      <ul className={clsx(textStyles.list, textStyles.list_summary)}>{contactsData}</ul>

      {/* Workshops */}
      <h3 className={clsx(textStyles.h3, textStyles.centered)}>{t('form.workshops.title')}</h3>
      <ul className={clsx(textStyles.list, textStyles.list_summary)} translate='no'>
        {workshopsData}
      </ul>

      {/* Competition solo */}
      {contestSoloData}

      {/* Competition groups */}
      {contestGroupsData}

      {/* World show */}
      {worldShowData}

      {/* Finance options*/}
      <h3 className={clsx(textStyles.h3, textStyles.centered)}>{t('form.summary.money.title')}</h3>
      <h4 className={textStyles.h4}>
        {t('form.summary.money.total')}: <span className={textStyles.accent}>{total}€</span>
      </h4>
      {!isPromo &&
        form.isFullPass &&
        form.version === 'live' &&
        form.fullPassDiscount !== 'free' && (
          <>
            <p className={textStyles.p}>{t('form.summary.money.installmentsDetails')}</p>
            <FormInputCheckbox
              name='isInstallments'
              control={control}
              label={<p className={textStyles.p}>{t('form.summary.money.installments')}</p>}
            />
            {form.isInstallments && (
              <>
                <p className={textStyles.p}>
                  {t('form.summary.money.amountNow')}:{' '}
                  <span className={textStyles.accent}>{total / 2}€</span>
                  <br />
                  {t('form.summary.money.amountAfter')}:{' '}
                  <span className={textStyles.accent}>{total / 2}€</span>
                </p>
              </>
            )}
          </>
        )}

      {/* Rules */}
      <h3 className={clsx(textStyles.h3, textStyles.centered)}>{t('form.summary.lastThing')}</h3>
      <FormInputCheckbox
        name='rulesAccepted'
        control={control}
        label={<p className={textStyles.p}>{acceptRules}</p>}
      />
    </div>
  );
};
