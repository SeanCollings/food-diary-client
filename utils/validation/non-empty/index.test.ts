import { validateNonEmpty } from '.';

describe('validation - non-empty', () => {
  it('should not have errors if there is input', () => {
    const result = validateNonEmpty({
      errors: {},
      id: 'test_id',
      value: 'non_empty',
    });
    expect(result).toMatchInlineSnapshot(`
      {
        "errors": {},
        "id": "test_id",
        "value": "non_empty",
      }
    `);
  });

  it('should have errors if empty input', () => {
    const result = validateNonEmpty({
      errors: {},
      id: 'test_id',
      value: '',
    });
    expect(result).toMatchInlineSnapshot(`
      {
        "errors": {
          "test_id": "Value may not be empty",
        },
        "id": "test_id",
        "value": "",
      }
    `);
  });
});
