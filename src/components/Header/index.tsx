import Image from 'next/image';
import styles from './header.module.css';
import logo from 'public/images/logo.png';
import { LangSwitcher } from '../LangSwitcher';
import { useState } from 'react';
import { MobileMenu } from '@/src/components/MobileMenu';
import Link from 'next/link';
import { DesktopMenu } from '../DesktopMenu';

export const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  return (
    <>
      <header className={styles.header}>
        <div className={styles.header__logoContainer}>
          <Link href='/'>
            <Image src={logo} alt='Dance Weekend in Warsaw logo' fill />
          </Link>
        </div>
        <LangSwitcher />
        <DesktopMenu />
        <button type='button' className={styles.header__menuButton} onClick={handleOpen} />
      </header>
      <MobileMenu isOpen={isOpen} onClose={handleClose} />
    </>
  );
};
