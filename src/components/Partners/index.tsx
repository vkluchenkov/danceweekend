import styles from './partners.module.css';
import useTranslation from 'next-translate/useTranslation';
import Image from 'next/image';
import Link from 'next/link';

interface PartnersList {
  image: string;
  description: string;
  url: string;
  width: number;
  height: number;
}
const partnersList: PartnersList[] = [
  {
    image: '/images/partners/BTV.png',
    description: 'Bellystream.TV logo',
    url: 'https://bellystream.tv',
    width: 250,
    height: 40,
  },
  {
    image: '/images/partners/championship.svg',
    description: 'Open Bellydance Chamionship of Poland logo',
    url: 'https://championship.dance',
    width: 128,
    height: 110,
  },
  {
    image: '/images/partners/Aliah.png',
    description: 'Aliah logo',
    url: 'https://aliah.dance',
    width: 250,
    height: 70,
  },
  {
    image: '/images/partners/cpk.png',
    description: 'Centrum Promocji Kultury w Dzielnicy Praga-Południe m. st. Warszawy',
    url: 'https://cpk.art.pl',
    width: 63,
    height: 100,
  },
];

export const Partners: React.FC = () => {
  const { t, lang } = useTranslation();

  const partnersMap = partnersList.map((p) => {
    return (
      <li className={styles.partner} key={p.description}>
        <Link className={styles.imageWrapper} href={p.url} target='_blank'>
          {/* <div className={styles.image}> */}
          <Image
            src={p.image}
            alt={p.description}
            width={p.width}
            height={p.height}
            // fill
            style={{ objectFit: 'contain', objectPosition: 'center' }}
            className={styles.image}
          />
          {/* </div> */}
        </Link>
      </li>
    );
  });

  return (
    <>
      <ul className={styles.partners}>{partnersMap}</ul>
    </>
  );
};
