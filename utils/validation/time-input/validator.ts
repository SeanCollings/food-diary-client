import { getSplitTime } from '@utils/time-utils';

export const validator = (value: string) => {
  if (!value || !value.includes(':')) {
    return false;
  }

  const [hours, minutes] = value.split(':');

  return (
    !!hours.length &&
    !!minutes.length &&
    !isNaN(Number(hours)) &&
    !isNaN(Number(minutes))
  );
};
