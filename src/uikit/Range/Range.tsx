import React from 'react';
import styles from './ramge.module.scss';

interface Props {
  name: string;
  value: number;
  minValue: number;
  maxValue: number;
  step: number;
  handleChange: (value: string) => void;
}

const Range = ({ name, value, minValue, maxValue, step, handleChange }: Props) => {
  return (
    <input
      name={name}
      type="range"
      min={minValue}
      max={maxValue}
      step={step}
      value={value}
      onChange={e => handleChange(e.target.value)}
      className={styles.range}
    />
  );
};

export default React.memo(Range);
