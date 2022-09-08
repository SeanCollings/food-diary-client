export const validator = (value: string | number, maxLength: number) =>
  value.toString().trim().length <= maxLength;
