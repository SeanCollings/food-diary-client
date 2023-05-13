import { createGuid, getClassNames, replaceTextAtEnd, trim } from '.';

jest.mock('uuid', () => ({ v4: jest.fn().mockReturnValue('mock_guid') }));

describe('string-utils', () => {
  describe('trim', () => {
    it('should trim a string', () => {
      const result = trim('     test    ');
      expect(result).toEqual('test');
    });
  });

  describe('replaceTextAtEnd', () => {
    it('should replace text at the end with new text starting from the end and backwards with from', () => {
      const result = replaceTextAtEnd('old text', 'something else now', 4);
      expect(result).toMatchInlineSnapshot(`"old something else now"`);
    });

    it('should return empty string if no input text', () => {
      const result = replaceTextAtEnd(null as any, 'new text', 4);
      expect(result).toEqual('');
    });
  });

  describe('createGuid', () => {
    it('should return a uuid', () => {
      const result = createGuid();
      expect(result).toMatchInlineSnapshot(`"mock_guid"`);
    });
  });

  describe('getClassNames', () => {
    it('should return classNames string if true value', () => {
      const result = getClassNames({
        first_name: true,
        second_name: false,
        third_name: true,
        forth_name: false,
        fifth_name: true,
      });
      expect(result).toMatchInlineSnapshot(`"first_name third_name fifth_name"`);
    });

    it('should empty string if no className is true', () => {
      const result = getClassNames({
        first_name: false,
        second_name: false,
        third_name: false,
        forth_name: false,
        fifth_name: false,
      });
      expect(result).toMatchInlineSnapshot(`""`);
    });
  });
});
