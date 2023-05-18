import { validateLengthMax } from '.';

describe('validation - max length', () => {
  it('should not have errors when less than max length', () => {
    const validate = validateLengthMax(12);
    const result = validate({
      errors: {},
      id: 'test_id',
      value: 'test',
    });
    expect(result).toMatchInlineSnapshot(`
      {
        "errors": {},
        "id": "test_id",
        "value": "test",
      }
    `);
  });

  it('should have errors if greater than max length', () => {
    const validate = validateLengthMax(2);
    const result = validate({
      errors: {},
      id: 'test_id',
      value: 'bad_input',
    });
    expect(result).toMatchInlineSnapshot(`
      {
        "errors": {
          "test_id": "Maximum length of 2 characters",
        },
        "id": "test_id",
        "value": "bad_input",
      }
    `);
  });
});
