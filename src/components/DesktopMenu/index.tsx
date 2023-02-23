import styles from './DesktopMenu.module.css';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { menu } from '../../ulis/menu';
import clsx from 'clsx';
import useTranslation from 'next-translate/useTranslation';
import { SupportedLangs } from '../../types/langs';

export const DesktopMenu: React.FC = () => {
  const { t, lang } = useTranslation();
  const router = useRouter();

  const currentLang = lang as SupportedLangs;

  const renderMenu = menu.map((item, index) => {
    const getSubItems = () => {
      if (item.subItems) {
        const list = item.subItems.map((subItem, index) => {
          return (
            <li key={subItem.link}>
              <Link href={subItem.link} legacyBehavior>
                <a
                  className={clsx(
                    styles.desktopMenu__subItem,
                    router.asPath.endsWith(item.link) && styles.desktopMenu__item_active
                  )}
                >
                  {subItem.translations[currentLang].title}
                </a>
              </Link>
            </li>
          );
        });

        return <ul className={styles.desktopMenu__subItems}>{list}</ul>;
      }
      return null;
    };

    return (
      <li key={index} className={styles.desktopMenu__itemWrapper}>
        <Link href={item.link} legacyBehavior>
          <a
            className={clsx(
              styles.desktopMenu__item,
              router.asPath.endsWith(item.link) && styles.desktopMenu__item_active
            )}
          >
            {item.translations[currentLang].title}
          </a>
        </Link>
        {getSubItems() ? getSubItems() : <></>}
      </li>
    );
  });

  return (
    <nav className={styles.desktopMenu}>
      <ul className={styles.desktopMenu__items}>
        <li>
          <Link legacyBehavior href='/'>
            <a
              className={clsx(
                styles.desktopMenu__item,
                router.route === '/' && styles.desktopMenu__item_active
              )}
            >
              {t('common:menuHome')}
            </a>
          </Link>
        </li>
        {renderMenu}
      </ul>
    </nav>
  );
};
