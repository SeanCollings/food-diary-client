export const validator = (value: string | number, maxLength: number) => {
  if (!value) {
    return true;
  }

  return value.toString().trim().length <= maxLength;
};
