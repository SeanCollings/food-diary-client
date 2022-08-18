export interface IDayNumber {
  day: number;
  otherMonthDay?: boolean;
}

export const isDayNumberTypeGuard = (
  day: string | IDayNumber
): day is IDayNumber => {
  return (day as IDayNumber).day !== undefined;
};
