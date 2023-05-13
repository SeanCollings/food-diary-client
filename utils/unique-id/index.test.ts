import { getUniqueId } from '.';

describe('unique-id util', () => {
  beforeAll(() => {
    jest.spyOn(global.Math, 'random').mockReturnValue(0.123456789);
  });

  describe('getUniqueId', () => {
    it('should return unique id', () => {
      const result = getUniqueId();
      expect(result).toMatchInlineSnapshot(`"lgzo4hs04fzzzxjylrx"`);
    });
  });
});
