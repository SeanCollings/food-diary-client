export const validator = (input: string | number, minlength: number) =>
  input.toString().trim().length >= minlength;
