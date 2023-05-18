import { validateEmailAddress } from '.';

describe('validation - email-address', () => {
  it('should not have errors for valid email', () => {
    const result = validateEmailAddress({
      errors: {},
      id: 'test_id',
      value: 'test@email.com',
    });
    expect(result).toMatchInlineSnapshot(`
      {
        "errors": {},
        "id": "test_id",
        "value": "test@email.com",
      }
    `);
  });

  it('should have errors for invalid email', () => {
    const result = validateEmailAddress({
      errors: {},
      id: 'test_id',
      value: 'bad_input',
    });
    expect(result).toMatchInlineSnapshot(`
      {
        "errors": {
          "test_id": "Incorrect email address format",
        },
        "id": "test_id",
        "value": "bad_input",
      }
    `);
  });
});
