export interface IDayNumber {
  day: number;
  otherMonthDay?: boolean;
}

export const isDayNumberTypeGuard = (
  day: string | IDayNumber
): day is IDayNumber => {
  return (day as IDayNumber).day !== undefined;
};

export const isNumber = (value: unknown): value is Number => {
  return typeof value === 'number';
};
