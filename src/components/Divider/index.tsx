import clsx from 'clsx';
import styles from './divider.module.css';

interface DividerProps {
  inverted?: boolean;
}

export const Divider: React.FC<DividerProps> = ({ inverted }) => {
  return <div className={clsx(styles.divider, inverted && styles.divider_inverted)}></div>;
};
