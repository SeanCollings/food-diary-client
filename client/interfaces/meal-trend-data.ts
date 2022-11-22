import { EMealType } from '@utils/interfaces';

export type TTimePeriod = 'week' | 'month';

export interface IMealTrendData {
  totalValues: number;
  legend: string[];
  data: { id: string; meals: number[] }[];
  totals: { [key in EMealType]: number };
}

export interface IMealTrendResponseBody extends Partial<IMealTrendData> {
  ok?: boolean;
}
