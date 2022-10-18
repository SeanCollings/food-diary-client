import { IWellnessTrendData } from '@client/interfaces/wellness-trend-data';

export const wellnessTrendMockdata: IWellnessTrendData = {
  type: 'week',
  legend: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
  data: [
    { water: 5, tea_coffee: 2, alcohol: 0 },
    { water: 4, tea_coffee: 1, alcohol: 0 },
    { water: 6, tea_coffee: 2, alcohol: 0 },
    { water: 3, tea_coffee: 2, alcohol: 1 },
    { water: 2, tea_coffee: 1, alcohol: 0 },
    { water: 7, tea_coffee: 1, alcohol: 3 },
    { water: 5, tea_coffee: 2, alcohol: 8 },
  ],
  highestValue: 8,
};
