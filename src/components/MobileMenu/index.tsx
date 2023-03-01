import { MobileMenuProps } from './types';
import styles from './MobileMenu.module.css';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { menu } from '@/src/ulis/menu';
import { useEffect } from 'react';
import clsx from 'clsx';
import useTranslation from 'next-translate/useTranslation';
import { SupportedLangs } from '@/src/types';

export const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose }) => {
  const { t, lang } = useTranslation();
  const router = useRouter();

  const handleClose = () => onClose();

  // Blocking body scroll when menu visible
  useEffect(() => {
    if (isOpen) document.body.classList.add('no-scroll');
    return () => document.body.classList.remove('no-scroll');
  }, [isOpen]);

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
                    styles.mobileMenu__subItem,
                    router.asPath.endsWith(subItem.link) && styles.mobileMenu__item_active
                  )}
                  onClick={handleClose}
                >
                  {subItem.translations[currentLang].title}
                </a>
              </Link>
            </li>
          );
        });

        return <ul className={styles.mobileMenu__subItems}>{list}</ul>;
      }
      return null;
    };
    const itemStyle = clsx(
      styles.mobileMenu__item,
      router.asPath.startsWith(item.link) && styles.mobileMenu__item_active
    );

    return (
      <li key={index} className={styles.mobileMenu__itemWrapper}>
        {getSubItems() ? (
          <>
            <p className={itemStyle}>{item.translations[currentLang].title}</p>
            {getSubItems()}
          </>
        ) : (
          <Link href={item.link} legacyBehavior>
            <a className={itemStyle} onClick={handleClose}>
              {item.translations[currentLang].title}
            </a>
          </Link>
        )}
      </li>
    );
  });

  return (
    <nav className={isOpen ? `${styles.mobileMenu} ${styles.mobileMenu_open}` : styles.mobileMenu}>
      <ul className={styles.mobileMenu__items}>
        <li>
          <Link legacyBehavior href='/'>
            <a
              className={clsx(
                styles.mobileMenu__item,
                router.route === '/' && styles.mobileMenu__item_active
              )}
              onClick={handleClose}
            >
              {t('common:menuHome')}
            </a>
          </Link>
        </li>
        {renderMenu}
      </ul>
      <button type='button' className={styles.mobileMenu__close} onClick={handleClose}></button>
    </nav>
  );
};
