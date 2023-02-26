import clsx from 'clsx';
import styles from './Switcher.module.css';

interface SwitcherProps {
  option1: {
    value: string;
    label: string;
  };
  option2: {
    value: string;
    label: string;
  };
  onClick: (value: string) => void;
  value: string;
}

export const Switcher: React.FC<SwitcherProps> = ({ option1, option2, onClick, value }) => {
  return (
    <div className={styles.switcher}>
      <button
        className={clsx(styles.option, value === option1.value && styles.optionActive)}
        onClick={() => onClick(option1.value)}
      >
        {option1.label}
      </button>
      <button
        className={clsx(styles.option, value === option2.value && styles.optionActive)}
        onClick={() => onClick(option2.value)}
      >
        {option2.label}
      </button>
    </div>
  );
};
