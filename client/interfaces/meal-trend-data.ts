import { EMealType } from '@utils/interfaces';

export type TTimePeriod = 'week' | 'month';

export interface IMealTrendData {
  totalValues: number;
  legend: string[];
  mealsPerDay: { id: string; meals: number[] }[];
  mealTotals: { [key in EMealType]: number };
}

export interface IMealTrendResponseBody extends Partial<IMealTrendData> {
  ok?: boolean;
  message?: string;
}
