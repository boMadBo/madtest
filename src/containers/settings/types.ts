export interface IPercentData {
  name: string;
  percent: number;
  index: number;
}

export interface IUpdateDataValues {
  data: IPercentData[];
  targetIndex: number;
  value: number;
  isDifference?: boolean;
}
