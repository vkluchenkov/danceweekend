import useTranslation from 'next-translate/useTranslation';
import styles from './schedule.module.css';
import { schedule } from '@/src/ulis/schedule';
import { useMemo } from 'react';
import { SupportedLangs } from '@/src/types';

export const Schedule: React.FC = () => {
  const { t, lang } = useTranslation();

  const days = useMemo(() => {
    return schedule.map((day, index) => {
      const currentLang = lang as SupportedLangs;
      const dayTitle = day.translations[currentLang].dayTitle;

      return (
        <li className={styles.day} key={'day' + index}>
          <h3 className={styles.day__title}>{dayTitle}</h3>
          <ul className={styles.day__events}>
            {day.dayEvents.map((event, index) => {
              const eventTitle = event.translations[currentLang].title;
              const eventDescription = event.translations[currentLang].description;

              return (
                <li key={dayTitle + 'event' + index} className={styles.event}>
                  <div className={styles.event__timeWrapper}>
                    <p className={styles.event__time}>{event.start}</p>
                    {event.end && <p className={styles.event__time}>{event.end}</p>}
                  </div>
                  <div className={styles.event__infoWrapper}>
                    <h4 className={styles.event__title}>{eventTitle}</h4>
                    {eventDescription && (
                      <p className={styles.event__description}>{eventDescription}</p>
                    )}
                  </div>
                </li>
              );
            })}
          </ul>
        </li>
      );
    });
  }, [lang]);

  return (
    <>
      <h2 className={styles.schedule__title}>{t('common:schedule')}</h2>
      <ul className={styles.schedule__days}>{days}</ul>
    </>
  );
};
