import Image from 'next/image';
import styles from './header.module.css';
import logo from 'public/images/logo.png';
import { LangSwitcher } from '../LangSwitcher';
import { MutableRefObject, useEffect, useRef, useState } from 'react';
import { MobileMenu } from '@/src/components/MobileMenu';
import Link from 'next/link';
import { DesktopMenu } from '../DesktopMenu';
import { Divider } from '@/src/ui-kit/Divider';

interface HeaderProps {
  isHome?: boolean;
  mainRef: MutableRefObject<HTMLDivElement | null>;
  mainHomeRef: MutableRefObject<HTMLDivElement | null>;
}

export const Header: React.FC<HeaderProps> = ({ isHome, mainRef, mainHomeRef }) => {
  const headerRef = useRef<HTMLDivElement | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  // Pass scroll on header to main
  useEffect(() => {
    const header = headerRef.current;

    const handleWheel = (e: WheelEvent) => {
      const mainEl = mainRef.current || mainHomeRef.current;
      if (mainEl) mainEl.scrollBy({ top: e.deltaY, left: 0, behavior: 'auto' });
    };

    if (header) {
      header.addEventListener('wheel', handleWheel);
      return () => header.removeEventListener('wheel', handleWheel);
    }
  }, [mainRef, mainHomeRef]);

  return (
    <>
      <header className={styles.header} ref={headerRef}>
        <div className={styles.header__logoContainer}>
          <Link href='/' className={styles.logo__link}>
            <Image src={logo} alt='Dance Weekend in Warsaw logo' fill />
          </Link>
        </div>
        <div className={styles.header__langSwitcher}>
          <LangSwitcher />
        </div>
        <DesktopMenu />
        <button type='button' className={styles.header__menuButton} onClick={handleOpen} />
        {!isHome && (
          <div className={styles.dividerWrapper}>
            <Divider />
          </div>
        )}
      </header>
      <MobileMenu isOpen={isOpen} onClose={handleClose} />
    </>
  );
};
