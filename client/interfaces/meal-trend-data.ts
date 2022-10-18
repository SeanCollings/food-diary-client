import { EMealType } from '@utils/interfaces';

export interface IMealTrendData {
  type: 'week' | 'month';
  totalValues: number;
  legend: string[];
  data: { id: string; meals: (0 | 1)[] }[];
  totals: { [key in EMealType]: number };
}
