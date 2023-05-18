import { validateTimeInput } from '.';

describe('validation - timne-input', () => {
  it('should not have errors correct length', () => {
    const result = validateTimeInput({
      errors: {},
      id: 'test_id',
      value: '12:30',
    });
    expect(result).toMatchInlineSnapshot(`
      {
        "errors": {},
        "id": "test_id",
        "value": "12:30",
      }
    `);
  });

  it('should have errors for incorrect length', () => {
    const result = validateTimeInput({
      errors: {},
      id: 'test_id',
      value: 'bad:input',
    });
    expect(result).toMatchInlineSnapshot(`
      {
        "errors": {
          "test_id": "Time value is in wrong format",
        },
        "id": "test_id",
        "value": "bad:input",
      }
    `);
  });
});
