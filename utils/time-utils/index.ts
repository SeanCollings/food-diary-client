const MAX_HOURS = 23;
const MAX_MINUTES = 59;

/**
 * Converts time format from `12:15` to `[12,15]`
 * @param value string
 * @returns string[]
 */
export const getSplitTime = (value: string) => {
  const [hours, minutes] = value.split(':');
  return [hours ?? '00', minutes ?? '00'];
};

/**
 * Converts hour and minutes to format `12:15`
 * @param hours string
 * @param minutes string
 * @returns string
 */
export const formatFinalTime = (hours: string, minutes: string) => {
  let formattedHours = hours;
  let formattedMinutes = minutes;

  if (!formattedHours) {
    formattedHours = '00';
  }
  if (!formattedMinutes) {
    formattedMinutes = '00';
  }

  return `${formattedHours}:${formattedMinutes}`;
};

/**
 * Front pads a number if provider padder value or 0
 * @param number string | number
 * @param pad number
 * @returns string
 */
export const frontPadNumber = (number: string | number, padder = 0) => {
  let updatedNumber = number.toString();

  if (updatedNumber.length === 1) {
    updatedNumber = `${padder}${updatedNumber}`;
  }

  return updatedNumber;
};

/**
 * Formats minutes with hours so that output is with correct time range.
 * Max hour and max minute is set.
 *
 * @param hours string
 * @param minutes string
 * @returns string[]
 */
export const getFormatMinutesWithHours = (hours: string, minutes: string) => {
  let updatedHours = hours;
  let updatedMinutes = minutes;

  if (+updatedMinutes > MAX_MINUTES) {
    if (+updatedHours === MAX_HOURS) {
      updatedMinutes = MAX_MINUTES.toString();
    } else {
      updatedMinutes = `${+updatedMinutes - 60}`;
      updatedHours = `${+updatedHours + 1}`;
    }
  }
  if (+updatedHours > MAX_HOURS) {
    updatedHours = MAX_HOURS.toString();
  }

  return [frontPadNumber(updatedHours), frontPadNumber(updatedMinutes)];
};
