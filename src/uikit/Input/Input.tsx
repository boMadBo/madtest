import React from 'react';
import styles from './input.module.scss';

interface Props {
  value: number;
  handleChange: (value: string) => void;
}

const Input = ({ value, handleChange }: Props) => {
  return <input type="text" value={value} onChange={e => handleChange(e.target.value)} className={styles.input} />;
};

export default React.memo(Input);
