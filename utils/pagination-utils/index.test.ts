import { getPaginationRange } from './get-pagination-range';

describe('pagination - utils', () => {
  describe('getPaginationRange', () => {
    it('should return range if bounds not met', () => {
      const result = getPaginationRange({
        currentPage: 1,
        itemsPerPage: 8,
        totalItems: 48,
        siblingCount: 1,
      });
      expect(result).toMatchInlineSnapshot(`
        [
          1,
          2,
          3,
          4,
          5,
          6,
        ]
      `);
    });

    it('should return range with dots shown to right of current page', () => {
      const result = getPaginationRange({
        currentPage: 2,
        itemsPerPage: 4,
        totalItems: 48,
        siblingCount: 1,
      });
      expect(result).toMatchInlineSnapshot(`
        [
          1,
          2,
          3,
          4,
          5,
          "dots",
          12,
        ]
      `);
    });

    it('should return range with dots shown to left of current page', () => {
      const result = getPaginationRange({
        currentPage: 9,
        itemsPerPage: 4,
        totalItems: 48,
        siblingCount: 1,
      });
      expect(result).toMatchInlineSnapshot(`
        [
          1,
          "dots",
          8,
          9,
          10,
          11,
          12,
        ]
      `);
    });

    it('should return range with dots shown left and right of current page', () => {
      const result = getPaginationRange({
        currentPage: 6,
        itemsPerPage: 4,
        totalItems: 48,
        siblingCount: 1,
      });
      expect(result).toMatchInlineSnapshot(`
        [
          1,
          "dots",
          5,
          6,
          7,
          "dots",
          12,
        ]
      `);
    });

    it('should cater for sibling count 2', () => {
      const result = getPaginationRange({
        currentPage: 6,
        itemsPerPage: 4,
        totalItems: 48,
        siblingCount: 2,
      });
      expect(result).toMatchInlineSnapshot(`
        [
          1,
          "dots",
          4,
          5,
          6,
          7,
          8,
          "dots",
          12,
        ]
      `);
    });

    it('should cater for sibling count 0', () => {
      const result = getPaginationRange({
        currentPage: 6,
        itemsPerPage: 4,
        totalItems: 48,
        siblingCount: 0,
      });
      expect(result).toMatchInlineSnapshot(`
        [
          1,
          "dots",
          6,
          "dots",
          12,
        ]
      `);
    });

    it('should cater for 0 items per page items', () => {
      const result = getPaginationRange({
        currentPage: 1,
        itemsPerPage: 0,
        totalItems: 100,
        siblingCount: 1,
      });
      expect(result).toMatchInlineSnapshot(`[]`);
    });
  });
});
