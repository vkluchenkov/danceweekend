import useTranslation from 'next-translate/useTranslation';
import styles from './schedule.module.css';
import { schedule } from '@/src/ulis/schedule';

export const Schedule: React.FC = () => {
  const { t, lang } = useTranslation();

  const days = schedule.map((day, index) => {
    return (
      <li className={styles.day} key={'day' + index}>
        <h3 className={styles.day__title}>{lang === 'en' ? day.dayTitleEn : day.dayTitleRu}</h3>
        <ul className={styles.day__events}>
          {day.dayEvents.map((event, index) => (
            <li key={day.dayTitleEn + 'event' + index} className={styles.event}>
              <div className={styles.event__timeWrapper}>
                <p className={styles.event__time}>{event.start}</p>
                {event.end && <p className={styles.event__time}>{event.end}</p>}
              </div>
              <div className={styles.event__infoWrapper}>
                <h4 className={styles.event__title}>
                  {lang === 'en' ? event.titleEn : event.titleRu}
                </h4>
                {event.descriptionEn && (
                  <p className={styles.event__description}>
                    {lang === 'en' ? event.descriptionEn : event.descriptionRu}
                  </p>
                )}
              </div>
            </li>
          ))}
        </ul>
      </li>
    );
  });

  return (
    <>
      <h2 className={styles.schedule__title}>{t('common:schedule')}</h2>
      <ul className={styles.schedule__days}>{days}</ul>
    </>
  );
};
