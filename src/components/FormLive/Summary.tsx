import React, { useMemo } from 'react';
import useTranslation from 'next-translate/useTranslation';
import { useFormContext } from 'react-hook-form';
import textStyles from '@/styles/Text.module.css';
import styles from '@/styles/Registration.module.css';
import { Button } from '@mui/material';
import { SummaryStepProps, FormFields } from './types';
import clsx from 'clsx';
import { SupportedLangs } from '@/src/types';
import { worldShowPrice } from '@/src/ulis/price';
import { FormInputCheckbox } from '@/src/ui-kit/input';

export const Summary: React.FC<SummaryStepProps> = ({
  onStepSubmit,
  fullPassPrice,
  soloPassPrice,
  currentPricePeriod,
  total,
}) => {
  const { t, lang } = useTranslation('registration');
  const currentLang = lang as SupportedLangs;

  const methods = useFormContext<FormFields>();
  const {
    watch,
    trigger,
    control,
    formState: { errors },
  } = methods;

  const form = watch();

  // Personal
  const personal = [
    {
      key: 'name',
      value: form.name,
    },
    {
      key: 'surname',
      value: form.surname,
    },
    {
      key: 'stageName',
      value: form.stageName,
    },
    {
      key: 'age',
      value: form.age,
    },
  ];

  const personalData = personal.map((i) => {
    if (!i.value) return <></>;
    return (
      <li key={i.key}>
        {t(`form.personal.${i.key}`)}: <span className={textStyles.accent}>{i.value}</span>
      </li>
    );
  });

  // Contacts
  const contacts = [
    {
      key: 'social',
      value: form.social,
    },
    {
      key: 'country',
      value: form.country,
    },
    {
      key: 'city',
      value: form.city,
    },
    {
      key: 'tel',
      value: form.tel,
    },
  ];

  const contactsData = contacts.map((i) => {
    if (!i.value) return <></>;
    return (
      <li key={i.key}>
        {t(`form.personal.${i.key}`)}: <span className={textStyles.accent}>{i.value}</span>
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
    return workshops.map((ws) => {
      const price = currentPricePeriod?.price.live[`${ws.teachersPriceGroup!}Price`];
      return (
        <li key={ws.id} className={styles.summary__group}>
          <span className={textStyles.accent}>{ws.translations[currentLang].title}</span>
          <br />
          {ws.translations[currentLang].description}
          <br />
          <span className={textStyles.accent}>{price}€</span>
        </li>
      );
    });
  }, [fullPassPrice, isFullPass, t, workshops, currentLang, currentPricePeriod, form]);

  // Contest solo
  const contestSoloData = useMemo(() => {
    const soloSelected = form.soloContest.filter((cat) => cat.selected);

    const stylesData = (
      <li>
        <ul className={clsx(textStyles.list, textStyles.list_summary, styles.summary__group)}>
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

            <li>
              {t('form.contest.levels.title')}:{' '}
              <span className={textStyles.accent}>
                {t(`form.contest.levels.${form.contestLevel}`)}
              </span>
            </li>

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

          <ul className={clsx(textStyles.list, textStyles.list_summary)}>
            {form.groupContest.map((group, index) => {
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
                      {t('form.contest.groups.style')}:{' '}
                      <span className={textStyles.accent}>{group.style}</span>
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
  }, [form, t]);

  // WorldShow
  const worldShowData = useMemo(() => {
    const soloPrice = isFullPass
      ? worldShowPrice.soloPriceDicounted
      : worldShowPrice.soloPriceNormal;

    if (form.isWorldShowSolo || form.isWorldShowGroup)
      return (
        <>
          <h3 className={clsx(textStyles.h3, textStyles.centered)}>{t('form.worldShow.title')}</h3>

          {form.isWorldShowSolo && (
            <p className={textStyles.p}>
              {t('form.worldShow.solo')}: <span className={textStyles.accent}>{soloPrice}€</span>
            </p>
          )}

          {form.isWorldShowGroup && (
            <>
              <p className={textStyles.p}>
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
  }, [form, t, isFullPass]);

  return (
    <div className={styles.form}>
      <h2 className={textStyles.h2}>{t('form.summary.title')}</h2>

      {/* Personal data */}
      <h3 className={clsx(textStyles.h3, textStyles.centered)}>
        {t('form.summary.personalTitle')}
      </h3>
      <ul className={clsx(textStyles.list, textStyles.list_summary)}>{personalData}</ul>

      {/* Contacts */}
      <h3 className={clsx(textStyles.h3, textStyles.centered)}>{t('form.personal.contacts')}</h3>
      <ul className={clsx(textStyles.list, textStyles.list_summary)}>{contactsData}</ul>

      {/* Workshops */}
      <h3 className={clsx(textStyles.h3, textStyles.centered)}>{t('form.workshops.title')}</h3>
      <ul className={clsx(textStyles.list, textStyles.list_summary)}>{workshopsData}</ul>

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

      {/* Rules */}
      <h3 className={clsx(textStyles.h3, textStyles.centered)}>{t('form.summary.lastThing')}</h3>
      <FormInputCheckbox
        name='rulesAccepted'
        control={control}
        label={<p className={textStyles.p}>{t('form.summary.rulesCheckbox')}</p>}
      />

      <div className={styles.naviWrapper}>
        <Button
          type='button'
          variant='outlined'
          size='large'
          disableElevation
          fullWidth
          onClick={() => onStepSubmit('prev')}
        >
          {t('form.common.prev')}
        </Button>
        <Button
          type='button'
          variant='outlined'
          size='large'
          disableElevation
          fullWidth
          onClick={async () => {
            const isValid = await trigger();
            if (isValid) onStepSubmit('next');
          }}
        >
          {t('form.common.next')}
        </Button>
      </div>
    </div>
  );
};
