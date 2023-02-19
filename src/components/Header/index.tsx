import Image from 'next/image';
import styles from './header.module.css';
import logo from 'public/images/logo.png';
import { LangSwitcher } from '../LangSwitcher';

export const Header: React.FC = () => {
  return (
    <header className={styles.header}>
      <div className={styles.header__logoContainer}>
        <Image src={logo} alt='Dance Weekend in Warsaw logo' fill />
      </div>
      <LangSwitcher />
      <button type='button' className={styles.header__menuButton} />
    </header>
  );
};
