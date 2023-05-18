import { validateLengthMin } from '.';

describe('validation - min length', () => {
  it('should not have errors when greater than min length', () => {
    const validate = validateLengthMin(2);
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

  it('should have errors when less than min length', () => {
    const validate = validateLengthMin(12);
    const result = validate({
      errors: {},
      id: 'test_id',
      value: 'bad_input',
    });
    expect(result).toMatchInlineSnapshot(`
      {
        "errors": {
          "test_id": "Minimum length of 12",
        },
        "id": "test_id",
        "value": "bad_input",
      }
    `);
  });
});
