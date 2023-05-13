import { getPaddedNestedArray, getRange } from '.';

describe('array-utils', () => {
  describe('getRange', () => {
    it('should get range from start to end', () => {
      const result = getRange(5, 10);
      expect(result).toMatchInlineSnapshot(`
        [
          5,
          6,
          7,
          8,
          9,
          10,
        ]
      `);
    });

    it('should return empty array if start greater than end', () => {
      const result = getRange(10, 5);
      expect(result).toMatchInlineSnapshot(`[]`);
    });
  });

  describe('getPaddedNestedArray', () => {
    it('should convert string array to array of string arrays with max item influence', () => {
      const result = getPaddedNestedArray(['1', '2', '3'], 2, 2);
      expect(result).toMatchInlineSnapshot(`
        [
          [
            "1",
            "2",
          ],
        ]
      `);
    });

    it('should convert with 3 items per row and max 3 items', () => {
      const result = getPaddedNestedArray(['1', '2', '3'], 3, 3);
      expect(result).toMatchInlineSnapshot(`
        [
          [
            "1",
            "2",
            "3",
          ],
        ]
      `);
    });

    it('should convert with 1 items per row and max 3 items', () => {
      const result = getPaddedNestedArray(['1', '2', '3'], 3, 1);
      expect(result).toMatchInlineSnapshot(`
        [
          [
            "1",
          ],
          [
            "2",
          ],
          [
            "3",
          ],
        ]
      `);
    });

    it('should only use 1 item but max it to 5', () => {
      const result = getPaddedNestedArray(['1', '2', '3'], 1, 5);
      expect(result).toMatchInlineSnapshot(`
        [
          [
            "1",
            "",
            "",
            "",
            "",
          ],
        ]
      `);
    });

    it('should create empty arrays if not enough items', () => {
      const result = getPaddedNestedArray(
        ['1', '2', '3', '4', '5', '6'],
        10,
        2,
      );
      expect(result).toMatchInlineSnapshot(`
        [
          [
            "1",
            "2",
          ],
          [
            "3",
            "4",
          ],
          [
            "5",
            "6",
          ],
          [],
          [],
        ]
      `);
    });

    it('should cater for less than max items and items per row and max per row less than max items', () => {
      const result = getPaddedNestedArray(['1', '2', '3', '4', '5'], 12, 10);
      expect(result).toMatchInlineSnapshot(`
        [
          [
            "1",
            "2",
            "3",
            "4",
            "5",
          ],
          [
            "",
            "",
            "",
            "",
            "",
          ],
        ]
      `);
    });

    it('should cater for max-items-per-row of 0', () => {
      const result = getPaddedNestedArray(['1', '2', '3', '4', '5'], 1, 0);
      expect(result).toMatchInlineSnapshot(`
        [
          [],
        ]
      `);
    });
  });
});
