import { runSingleValidation, runValidations } from '.';
import { validateLengthMax } from './input-length-max';
import { validateNonEmpty } from './non-empty';

describe('Validation - index', () => {
  describe('runValidations', () => {
    it('should validate multiple validators', () => {
      const result = runValidations([
        {
          id: 'id_1',
          value: 'correct string',
          validators: [validateLengthMax(15), validateNonEmpty],
        },
        {
          id: 'id_2',
          value: 'too long',
          validators: [validateLengthMax(2), validateNonEmpty],
        },
        {
          id: 'id_3',
          value: '',
          validators: [validateNonEmpty],
        },
      ]);

      expect(result).toMatchInlineSnapshot(`
        {
          "id_2": "Maximum length of 2 characters",
          "id_3": "Value may not be empty",
        }
      `);
    });
  });

  describe('runSingleValidation', () => {
    it('should valdiate to valid input', () => {
      const result = runSingleValidation({
        id: 'test_id',
        errors: { current: 'errors' },
        value: 'test string',
        validators: [validateLengthMax(15), validateNonEmpty],
      });

      expect(result).toMatchInlineSnapshot(`
        {
          "current": "errors",
        }
      `);
    });

    it('should valdiate to invalid input', () => {
      const result = runSingleValidation({
        id: 'test_id',
        errors: { current: 'errors' },
        value: '',
        validators: [validateLengthMax(15), validateNonEmpty],
      });

      expect(result).toMatchInlineSnapshot(`
        {
          "current": "errors",
          "test_id": "Value may not be empty",
        }
      `);
    });

    it('should not valdiate if shouldValidate is false', () => {
      const result = runSingleValidation({
        id: 'test_id',
        value: '',
        validators: [validateLengthMax(15), validateNonEmpty],
        shouldValidate: false,
      } as any);

      expect(result).toMatchInlineSnapshot(`{}`);
    });
  });
});
