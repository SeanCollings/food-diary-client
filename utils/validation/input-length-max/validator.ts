export const validator = (input: string | number, maxLength: number) =>
  input.toString().trim().length <= maxLength;
