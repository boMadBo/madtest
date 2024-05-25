import React from 'react';
import styles from './button.module.scss';

interface Props {
  value: number;
  onClick: () => void;
}

const Button = ({ value, onClick }: Props) => {
  return (
    <button onClick={onClick} className={styles.button}>
      {value}
    </button>
  );
};

export default React.memo(Button);
