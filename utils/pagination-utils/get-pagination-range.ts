import { getRange } from '@utils/array-utils';

export const DOTS = 'dots';
const MIN_PAGES_NUMBER = 5;
const FIRST_PAGE_INDEX = 1;

interface IPaginitaionRangeProps {
  currentPage: number;
  totalItems: number;
  itemsPerPage: number;
  siblingCount: number;
}
export const getPaginationRange = ({
  currentPage,
  siblingCount,
  totalItems,
  itemsPerPage,
}: IPaginitaionRangeProps): (number | typeof DOTS)[] => {
  if (itemsPerPage === 0) {
    return [];
  }

  const totalPageCount = Math.ceil(totalItems / itemsPerPage);
  const totalPageNumbers = siblingCount + MIN_PAGES_NUMBER;

  if (totalPageNumbers >= totalPageCount) {
    return getRange(1, totalPageCount);
  }

  const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
  const rightSiblingIndex = Math.min(
    currentPage + siblingCount,
    totalPageCount,
  );

  const shouldShowLeftDots = leftSiblingIndex > 2;
  const shouldShowRightDots = rightSiblingIndex < totalPageCount - 2;

  const lastPageIndex = totalPageCount;

  if (!shouldShowLeftDots && shouldShowRightDots) {
    const leftItemCount = 3 + 2 * siblingCount;
    const leftRange = getRange(1, leftItemCount);

    return [...leftRange, DOTS, totalPageCount];
  }

  if (shouldShowLeftDots && !shouldShowRightDots) {
    const rightItemCount = 3 + 2 * siblingCount;
    const rightRange = getRange(
      totalPageCount - rightItemCount + 1,
      totalPageCount,
    );
    return [FIRST_PAGE_INDEX, DOTS, ...rightRange];
  }

  const middleRange = getRange(leftSiblingIndex, rightSiblingIndex);

  return [FIRST_PAGE_INDEX, DOTS, ...middleRange, DOTS, lastPageIndex];
};
