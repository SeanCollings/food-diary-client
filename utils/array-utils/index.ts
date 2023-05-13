/**
 * Creates an array of a length populated from `start` to `end`
 * @param start number
 * @param end number
 * @returns number[]
 */
export const getRange = (start: number, end: number) => {
  const length = end - start + 1;

  if (start > end || length < 0) {
    return [];
  }

  return Array.from({ length }, (_, index) => index + start);
};

/**
 * Converts an array of strings into an array of string arrays depending on
 * number of maxItems and maxItemsPerRow
 * i.e. ['1',2','3','4'] can become [['1','2'],['3','4']]
 * @param values string[]
 * @param maxItems number
 * @param maxItemsPerRow number
 * @returns string[][]
 */
export const getPaddedNestedArray = (
  values: string[],
  maxItems: number,
  maxItemsPerRow: number,
) => {
  const nestedArray: string[][] = [];
  let temp: string[] = [];
  let lastFullSet = 0;

  if (maxItemsPerRow === 0) {
    return [[]];
  }

  for (let i = 1; i < maxItems + 1; i++) {
    const lessThanMaxElements = maxItems < maxItemsPerRow;
    const fullRowElements = i % maxItemsPerRow === 0;
    const lastElement = maxItems > maxItemsPerRow && i === maxItems;

    if (lessThanMaxElements && i === 1) {
      nestedArray.push([
        ...values.slice(0, maxItems),
        ...Array(maxItemsPerRow - maxItems).fill(''),
      ]);
    } else if (fullRowElements) {
      temp = values.slice(i - maxItemsPerRow, i);
      nestedArray.push(temp);
      temp = [];
      lastFullSet = i;
    } else if (lastElement) {
      const length = Math.max(maxItemsPerRow - (maxItems - lastFullSet), 0);
      const totalValues = Math.min(length, values.length);

      nestedArray.push([
        ...values.slice(lastFullSet, maxItems),
        ...Array(totalValues).fill(''),
      ]);
    }
  }

  return nestedArray;
};
