import {
  emailAddressValidators,
  emojiValidators,
  maxLengthInputValidators,
  nonEmptyInputValidators,
  notEmptyValidator,
  passwordValidators,
  textAreaValidators,
  timeInputValidators,
} from '.';
import { runSingleValidation, runValidations } from '..';

const TEXT_LENGTH_100 =
  '1234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890';

describe('Validators', () => {
  describe('emailAddressValidators', () => {
    it('should return all validator permutations', () => {
      const defaultValidator = { validators: emailAddressValidators };

      const result = runValidations([
        {
          ...defaultValidator,
          id: 'valid',
          value: 'test@email.com',
        },
        {
          ...defaultValidator,
          id: 'email_format',
          value: '@gmail.com',
        },
        {
          ...defaultValidator,
          id: 'non_empty',
          value: '',
        },
        {
          ...defaultValidator,
          id: 'min_length',
          value: 't@t.c',
        },
        {
          ...defaultValidator,
          id: 'max_length',
          value:
            '12345678901234567890123456789012345678901234567890123456789012345678901234567890@12345678901234567.com',
        },
      ]);
      expect(result).toMatchInlineSnapshot(`
        {
          "email_format": "Incorrect email address format",
          "max_length": "Maximum length of 100 characters",
          "min_length": "Incorrect email address format",
          "non_empty": "Value may not be empty",
        }
      `);
    });
  });

  describe('passwordValidators', () => {
    it('should return all validator permutations', () => {
      const defaultValidator = { validators: passwordValidators };

      const result = runValidations([
        {
          ...defaultValidator,
          id: 'valid',
          value: 'password',
        },
        {
          ...defaultValidator,
          id: 'min_length',
          value: 'test',
        },
        {
          ...defaultValidator,
          id: 'max_length',
          value: `${TEXT_LENGTH_100}1`,
        },
      ]);

      expect(result).toMatchInlineSnapshot(`
        {
          "max_length": "Maximum length of 100 characters",
          "min_length": "Minimum length of 8",
        }
      `);
    });
  });

  describe('nonEmptyInputValidators', () => {
    it('should return all validator permutations', () => {
      const defaultValidator = { validators: nonEmptyInputValidators };

      const result = runValidations([
        {
          ...defaultValidator,
          id: 'valid',
          value: 'text',
        },
        {
          ...defaultValidator,
          id: 'empty',
          value: '',
        },
        {
          ...defaultValidator,
          id: 'max_length',
          value: `${TEXT_LENGTH_100}1`,
        },
      ]);

      expect(result).toMatchInlineSnapshot(`
        {
          "empty": "Value may not be empty",
          "max_length": "Maximum length of 100 characters",
        }
      `);
    });
  });

  describe('maxLengthInputValidators', () => {
    it('should return all validator permutations', () => {
      const defaultValidator = { validators: maxLengthInputValidators };

      const result = runValidations([
        {
          ...defaultValidator,
          id: 'valid',
          value: 'text that is short',
        },
        {
          ...defaultValidator,
          id: 'valid',
          value: '',
        },
        {
          ...defaultValidator,
          id: 'max_length',
          value: `${TEXT_LENGTH_100}1`,
        },
      ]);

      expect(result).toMatchInlineSnapshot(`
        {
          "max_length": "Maximum length of 100 characters",
        }
      `);
    });
  });

  describe('notEmptyValidator', () => {
    it('should return all validator permutations', () => {
      const defaultValidator = { validators: notEmptyValidator };

      const result = runValidations([
        {
          ...defaultValidator,
          id: 'valid',
          value: 'text',
        },
        {
          ...defaultValidator,
          id: 'empty',
          value: '',
        },
      ]);

      expect(result).toMatchInlineSnapshot(`
        {
          "empty": "Value may not be empty",
        }
      `);
    });
  });

  describe('textAreaValidators', () => {
    it('should return all validator permutations', () => {
      const defaultValidator = { validators: textAreaValidators };

      const result = runValidations([
        {
          ...defaultValidator,
          id: 'valid',
          value: 'text that is shoty',
        },
        {
          ...defaultValidator,
          id: 'valid',
          value: '',
        },
        {
          ...defaultValidator,
          id: 'max_length',
          value: `${TEXT_LENGTH_100}${TEXT_LENGTH_100}${TEXT_LENGTH_100}`,
        },
      ]);

      expect(result).toMatchInlineSnapshot(`
        {
          "max_length": "Maximum length of 256 characters",
        }
      `);
    });
  });

  describe('timeInputValidators', () => {
    it('should return all validator permutations', () => {
      const defaultValidator = { validators: timeInputValidators };

      const result = runValidations([
        {
          ...defaultValidator,
          id: 'valid',
          value: '12:30',
        },
        {
          ...defaultValidator,
          id: 'incorrect_time',
          value: 'bad:time',
        },
      ]);

      expect(result).toMatchInlineSnapshot(`
        {
          "incorrect_time": "Time value is in wrong format",
        }
      `);
    });
  });

  describe('emojiValidators', () => {
    it('should return all validator permutations', () => {
      const defaultValidator = { validators: emojiValidators };

      const result = runValidations([
        {
          ...defaultValidator,
          id: 'valid',
          value: '🍉',
        },
        {
          ...defaultValidator,
          id: 'bad_emoji',
          value: 'emoji',
        },
      ]);

      expect(result).toMatchInlineSnapshot(`
        {
          "bad_emoji": "Non-valid emoji found",
        }
      `);
    });
  });
});
