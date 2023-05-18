import { validateEmoji } from '.';

describe('validation - emoji', () => {
  it('should not have errors for emoji', () => {
    const result = validateEmoji({
      errors: {},
      id: 'test_id',
      value: '🍉',
    });
    expect(result).toMatchInlineSnapshot(`
      {
        "errors": {},
        "id": "test_id",
        "value": "🍉",
      }
    `);
  });

  it('should have errors for invalid emoji', () => {
    const result = validateEmoji({
      errors: {},
      id: 'test_id',
      value: 'bad_input',
    });
    expect(result).toMatchInlineSnapshot(`
      {
        "errors": {
          "test_id": "Non-valid emoji found",
        },
        "id": "test_id",
        "value": "bad_input",
      }
    `);
  });
});
