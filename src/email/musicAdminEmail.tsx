import {
  Mjml,
  MjmlHead,
  MjmlBody,
  MjmlSection,
  MjmlColumn,
  MjmlFont,
  MjmlAttributes,
  MjmlAll,
  MjmlClass,
  MjmlText,
} from '@faire/mjml-react';
import { Translate } from 'next-translate';
import { defaultUrl } from '../ulis/constants';
import { renderReactToMjml } from './renderReactToMjml';
import { FormFields } from '../types/music.types';

interface musicAdminEmailProps {
  form: FormFields;
  t: Translate;
  subj: string;
}

const url = process.env.DEPLOY_URL || defaultUrl;

export const musicAdminEmail = (props: musicAdminEmailProps) => {
  const { form, t, subj } = props;

  const accentColor = '#eec571!important';

  const musicForm = [
    'email',
    'name',
    'surname',
    'type',
    'event',
    'groupName',
    'ageGroup',
    'level',
    'category',
    'audioLength',
  ].map((i) => ({
    key: i,
    value: form[i as keyof FormFields],
  }));

  const musicData = musicForm.map((i) => {
    const value = i.value as string;
    if (!i.value) return <></>;
    if (i.key === 'email')
      return (
        <li key={i.key}>
          {t(`form.${i.key}`)}:{' '}
          <a
            href={`mailto:${value.trim()}`}
            target='_blank'
            rel='noreferrer'
            style={{ color: accentColor }}
          >
            {value.trim()}
          </a>
        </li>
      );
    if (i.key === 'type')
      return (
        <li key={i.key}>
          Type: <span style={{ color: accentColor }}>{t(`form.${value.trim()}`)}</span>
        </li>
      );
    if (i.key === 'event')
      return (
        <li key={i.key}>
          Event: <span style={{ color: accentColor }}>{t(`form.${value.trim()}`)}</span>
        </li>
      );
    if (i.key === 'ageGroup')
      return (
        <li key={i.key}>
          Age group:{' '}
          <span style={{ color: accentColor }}>{t(`form.ageGroups.${value.trim()}`)}</span>
        </li>
      );
    if (i.key === 'level')
      return (
        <li key={i.key}>
          Level: <span style={{ color: accentColor }}>{t(`form.levels.${value.trim()}`)}</span>
        </li>
      );
    if (i.key === 'category')
      return (
        <li key={i.key}>
          Style: <span style={{ color: accentColor }}>{value.trim()}</span>
        </li>
      );
    if (i.key === 'audioLength')
      return (
        <li key={i.key}>
          {t('email.audioLength')}:{' '}
          <span style={{ color: accentColor }}>{Math.round(value as unknown as number)}</span>
        </li>
      );

    return (
      <li key={i.key}>
        {t(`form.${i.key}`)}: <span style={{ color: accentColor }}>{value}</span>
      </li>
    );
  });

  return renderReactToMjml(
    <Mjml>
      <MjmlHead>
        <MjmlFont
          name='Montserrat'
          href='https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600'
        />
        <MjmlAttributes>
          <MjmlAll
            font-family='Montserrat, Helvetica, Arial, sans-serif'
            font-weight='400'
            color='white'
          />

          {/* Classes */}
          <MjmlClass name='accent' color={accentColor} />
          <MjmlClass name='divider' border-width='1px' padding='25px 0 25px' border-color='white' />
          <MjmlClass
            name='h1'
            font-size='24px'
            line-height='1.2'
            font-weight='600'
            align='center'
          />
          <MjmlClass
            name='h2'
            font-size='21px'
            line-height='1.2'
            font-weight='500'
            align='center'
          />
          <MjmlClass
            name='h3'
            font-size='18px'
            line-height='1.2'
            font-weight='500'
            align='center'
          />
          <MjmlClass name='margin' margin='0 0 -15px' />
          <MjmlClass name='h4' font-size='18px' line-height='1.2' font-weight='600' padding='0' />
          <MjmlClass
            name='text'
            font-size='16px'
            line-height='1.2'
            font-weight='400'
            padding='10px 0 5px'
          />
          <MjmlClass
            name='copyright'
            font-size='14px'
            align='center'
            line-height='1.2'
            font-weight='400'
            padding='0'
          />
        </MjmlAttributes>
      </MjmlHead>

      {/* Body */}
      <MjmlBody background-color='#000'>
        {/* Divider */}
        <MjmlSection padding='10px' />

        {/* Header image */}
        <MjmlSection
          background-url={`${url}/images/email-header1.jpg`}
          background-size='cover'
          background-repeat='no-repeat'
          border-radius='15px'
          padding-bottom='190px'
        ></MjmlSection>

        {/* Divider */}
        <MjmlSection padding='10px' />

        {/* Main section */}
        <MjmlSection background-color='#231d2f' padding='20px 30px 30px' border-radius='15px'>
          <MjmlColumn>
            {/* Title */}
            <MjmlText mj-class='h1 accent'>{subj}</MjmlText>

            {/* Order title */}
            <MjmlText mj-class='h2'>{t('email.subtitle')}:</MjmlText>

            {/* Payment data*/}
            <MjmlText mj-class='text'>
              <ul style={{ listStyle: 'none', padding: 0, lineHeight: 1.5 }}>{musicData}</ul>
            </MjmlText>
          </MjmlColumn>
        </MjmlSection>

        {/* Divider */}
        <MjmlSection padding='10px' />

        {/* Footer */}
        <MjmlSection background-color='#231d2f' padding='20px 10px' border-radius='15px'>
          <MjmlColumn>
            <MjmlText mj-class='copyright'>{t('email.copyright')}</MjmlText>
          </MjmlColumn>
        </MjmlSection>
        {/* Divider */}
        <MjmlSection padding='10px' />
      </MjmlBody>
    </Mjml>
  );
};
