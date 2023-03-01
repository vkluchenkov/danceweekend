import styles from './DesktopMenu.module.css';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { menu } from '@/src/ulis/menu';
import clsx from 'clsx';
import useTranslation from 'next-translate/useTranslation';
import { SupportedLangs } from '@/src/types';

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
                    router.asPath.endsWith(subItem.link) && styles.desktopMenu__item_active
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

    const itemStyle = clsx(
      styles.desktopMenu__item,
      router.asPath.startsWith(item.link) && styles.desktopMenu__item_active
    );

    return (
      <li key={index} className={styles.desktopMenu__itemWrapper}>
        {getSubItems() ? (
          <>
            <p className={itemStyle}>{item.translations[currentLang].title}</p>
            {getSubItems()}
          </>
        ) : (
          <Link href={item.link} legacyBehavior>
            <a className={itemStyle}>{item.translations[currentLang].title}</a>
          </Link>
        )}
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
