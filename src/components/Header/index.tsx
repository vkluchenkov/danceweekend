import Image from 'next/image';
import styles from './header.module.css';
import logo from 'public/images/logo.png';

export const Header: React.FC = () => {
  return (
    <header className={styles.header}>
      <div className={styles.header__logoContainer}>
        <Image src={logo} alt='Dance Weekend in Warsaw logo' fill />
      </div>

      <button type='button' className={styles.header__menuButton} />
    </header>
  );
};
