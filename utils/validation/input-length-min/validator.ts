export const validator = (value: string | number, minlength: number) =>
  value.toString().trim().length >= minlength;
