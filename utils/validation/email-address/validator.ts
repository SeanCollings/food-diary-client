import { trim } from '@utils/string-utils';

export const validator = (input: string) => {
  const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return regex.test(trim(input));
};
