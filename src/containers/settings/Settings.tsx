import { IPercentData } from '@/containers/settings/types';
import { adjustData, changeDataPercent } from '@/containers/settings/utils';
import Button from '@/uikit/Button';
import Input from '@/uikit/Input';
import Range from '@/uikit/Range';
import debounce from 'lodash/debounce';
import React, { useCallback, useEffect, useState } from 'react';
import styles from './settings.module.scss';

const mock = [
  { name: 'Item 1', percent: 40 },
  { name: 'Item 2', percent: 30 },
  { name: 'Item 3', percent: 50 },
];

const Settings = () => {
  const [itemsCount, setItemsCount] = useState(1);
  const [data, setData] = useState<IPercentData[]>([]);

  // генерируем index для доступа к элементам
  // балансируем перед первой отрисовкой
  useEffect(() => {
    const dataWithIndex = mock.slice(0, itemsCount).map((item, index) => {
      return {
        ...item,
        index,
      };
    });
    const newData = adjustData(dataWithIndex);
    setData(newData);
  }, [itemsCount]);

  const handleAdjustPercent = useCallback(
    (value: string, targetIndex: number) => {
      const newData = changeDataPercent({ data, value: Number(value), targetIndex });
      const resultData = adjustData(newData, targetIndex);
      setData(resultData);
    },
    [data]
  );

  const debounceInputChange = useCallback(
    debounce((data: IPercentData[], targetIndex: number) => {
      const resultData = adjustData(data, targetIndex);
      setData(resultData);
    }, 200),
    []
  );

  const handleInputChange = useCallback(
    (value: string, targetIndex: number) => {
      if (Number(value) <= 100) {
        const newData = changeDataPercent({ data, value: Number(value), targetIndex });
        setData(newData);
        debounceInputChange(newData, targetIndex);
      }
    },
    [data, debounceInputChange]
  );

  return (
    <main className={styles.main}>
      <section className={styles.settings}>
        <div className={styles.buttons_group}>
          {[1, 2, 3].map(item => (
            <Button key={item} value={item} onClick={() => setItemsCount(item)} />
          ))}
        </div>
        <form className={styles.form}>
          {data.map(item => (
            <div key={item.name} className={styles.inputs}>
              <Range
                name={item.name}
                value={item.percent}
                maxValue={100}
                minValue={0}
                step={1}
                handleChange={(value: string) => handleAdjustPercent(value, item.index)}
              />
              <Input value={item.percent} handleChange={(value: string) => handleInputChange(value, item.index)} />
            </div>
          ))}
        </form>
        <div className={styles.result_group}>
          <span>Result:</span>
          {data.map(item => (
            <span key={item.name}>
              {item.name} : {item.percent} %
            </span>
          ))}
        </div>
      </section>
    </main>
  );
};

export default Settings;
