import Image from 'next/image';
import styles from './header.module.css';
import logo from 'public/images/logo.png';
import { LangSwitcher } from '../LangSwitcher';
import { useState } from 'react';
import { MobileMenu } from '@/src/MobileMenu';

export const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  return (
    <>
      <header className={styles.header}>
        <div className={styles.header__logoContainer}>
          <Image src={logo} alt='Dance Weekend in Warsaw logo' fill />
        </div>
        <LangSwitcher />
        <button type='button' className={styles.header__menuButton} onClick={handleOpen} />
      </header>
      <MobileMenu isOpen={isOpen} onClose={handleClose} />
    </>
  );
};
