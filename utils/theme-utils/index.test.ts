import { THEME_LIGHT_1 } from '@utils/constants/theme.constants';
import { ThemeColor } from '@utils/interfaces';
import { getThemeColoursFromMealId, getThemeVarColor } from '.';

describe('theme-utils', () => {
  describe('getThemeColoursFromMealId', () => {
    it('should get default theme', () => {
      const result = getThemeColoursFromMealId();
      expect(result).toMatchInlineSnapshot(`"primary"`);
    });

    it('should get breakfast theme', () => {
      const result = getThemeColoursFromMealId('breakfast');
      expect(result).toMatchInlineSnapshot(`"secondary"`);
    });

    it('should get lunch theme', () => {
      const result = getThemeColoursFromMealId('lunch');
      expect(result).toMatchInlineSnapshot(`"primary"`);
    });

    it('should get dinner theme', () => {
      const result = getThemeColoursFromMealId('dinner');
      expect(result).toMatchInlineSnapshot(`"tertiary"`);
    });

    it('should get snack themes', () => {
      const result1 = getThemeColoursFromMealId('snack_1');
      const result2 = getThemeColoursFromMealId('snack_2');
      expect(result1).toMatchInlineSnapshot(`"quaternary"`);
      expect(result2).toMatchInlineSnapshot(`"quaternary"`);
    });
  });

  describe('toThemeString', () => {
    it('should build theme string for THEME_LIGHT_1', () => {
      const result = THEME_LIGHT_1.toThemeString();
      expect(result).toMatchInlineSnapshot(
        `"--text:#232323;--text__40:#23232366;--success:#007e50;--error:#bb0202;--bg-primary:#f4f4f4;--bg-secondary:#FFFFFF;--bg-secondary__60:#FFFFFF99;--bg-tertiary:#FFFFFF;--th-quaternary:#BDB9B9;--th-quaternary__80:#BDB9B9cc;--th-quaternary__50:#BDB9B980;--th-quaternary__40:#BDB9B966;--th-quaternary__20:#BDB9B933;--th-primary:#56988C;--th-primary__80:#56988Ccc;--th-primary__40:#56988C66;--th-secondary:#E08644;--th-secondary__80:#E08644cc;--th-secondary__40:#E0864466;--th-tertiary: #E0A944;--th-tertiary__80:#E0A944cc;--th-tertiary__40:#E0A94466;"`,
      );
    });
  });

  describe('getThemeVarColor', () => {
    it.each<ThemeColor | undefined>([
      'primary',
      'secondary',
      'tertiary',
      'quaternary',
      'background_primary',
      'background_secondary',
      'background_tertiary',
      undefined,
    ])('should return theme for type %s', (type) => {
      expect(getThemeVarColor(type)).toMatchSnapshot();
    });
  });
});
