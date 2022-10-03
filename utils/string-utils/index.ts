export const trim = (value: string) => {
  return value?.trim();
};

/**
 * Replace text at the end with new text starting from the end and backwards with from.
 * @param text string
 * @param newText string
 * @param from number
 * @returns string
 */
export const replaceTextAtEnd = (
  text: string,
  newText: string,
  from: number
) => {
  if (!text?.length || !newText) {
    return '';
  }

  return text.slice(0, -from) + newText;
};
