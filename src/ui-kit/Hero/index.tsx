import Image, { StaticImageData } from 'next/image';
import styles from './Hero.module.css';

interface HeroProps {
  name: string;
  title: string;
  image: StaticImageData;
}

export const Hero: React.FC<HeroProps> = ({ name, title, image }) => {
  return (
    <article className={styles.hero}>
      <div className={styles.hero__imageWrapper}>
        <Image src={image} fill alt={name} />
      </div>
      <div className={styles.hero__textWrapper}>
        <h2 className={styles.hero__name}>{name}</h2>
        <p className={styles.hero__title}>{title}</p>
      </div>
    </article>
  );
};
