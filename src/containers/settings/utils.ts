import { IPercentData, IUpdateDataValues } from '@/containers/settings/types';

export const changeDataPercent = ({ data, targetIndex, value, isDifference }: IUpdateDataValues): IPercentData[] => {
  const newData = [...data];

  newData[targetIndex] = {
    ...newData[targetIndex],
    percent: isDifference ? newData[targetIndex].percent - value : value,
  };
  return newData;
};

export const adjustData = (data: IPercentData[], targetIndex?: number): IPercentData[] => {
  let updatedData = [...data];

  if (data.length > 1) {
    let difference = data.reduce((acc, current) => acc + current.percent, -100);

    while (difference !== 0) {
      let sortedData = [...updatedData];

      if (targetIndex !== undefined) {
        sortedData = sortedData.filter(item => item.index !== targetIndex);
      }

      sortedData.sort((a, b) => b.percent - a.percent);
      const sign = Math.sign(difference);
      const itemToChange = sortedData.at(sign === 1 ? 0 : -1);

      if (itemToChange) {
        updatedData = changeDataPercent({
          data: updatedData,
          targetIndex: itemToChange.index,
          value: sign,
          isDifference: true,
        });
        difference -= sign;
      }
    }
  }

  return updatedData;
};
