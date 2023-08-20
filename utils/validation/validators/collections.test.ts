import {
  addMealOptionsValidators,
  excerciseValidators,
  loginFormValidators,
} from './collections';

describe('validators - collections', () => {
  describe('loginFormValidators', () => {
    it('should return all login form validators', () => {
      expect(loginFormValidators).toMatchInlineSnapshot(`
        {
          "email": [Function],
          "name": [Function],
          "password": [Function],
        }
      `);
    });

    it('should return email validator', () => {
      const result = loginFormValidators.email({ value: 'test@test.com' });
      expect(result.id).toEqual('email');
      expect(result.validators.length).toEqual(4);
    });

    it('should return name validator', () => {
      const result = loginFormValidators.name({ value: 'Mock Name' });
      expect(result.id).toEqual('name');
      expect(result.validators.length).toEqual(2);
    });

    it('should return password validator', () => {
      const result = loginFormValidators.password({ value: 'password' });
      expect(result.id).toEqual('password');
      expect(result.validators.length).toEqual(2);
    });
  });

  describe('excerciseValidators', () => {
    it('should return all excercise validators', () => {
      expect(excerciseValidators).toMatchInlineSnapshot(`
        {
          "details": [Function],
          "time": [Function],
        }
      `);
    });

    it('should return details validator', () => {
      const result = excerciseValidators.details({ value: 'Mock details' });
      expect(result.id).toEqual('details');
      expect(result.validators.length).toEqual(1);
    });

    it('should return time validator', () => {
      const result = excerciseValidators.time({ value: '00:15' });
      expect(result.id).toEqual('time');
      expect(result.validators.length).toEqual(1);
    });
  });

  describe('addMealOptionsValidators', () => {
    it('should return all add meal option validators', () => {
      expect(addMealOptionsValidators).toMatchInlineSnapshot(`
        {
          "description": [Function],
          "emojiPicker": [Function],
          "food": [Function],
          "quantity": [Function],
          "servingSize": [Function],
        }
      `);
    });

    it('should return description validator', () => {
      const result = addMealOptionsValidators.description({
        value: 'Mock description',
      });
      expect(result.id).toEqual('description');
      expect(result.validators.length).toEqual(1);
    });

    it('should return emojiPicker validator', () => {
      const result = addMealOptionsValidators.emojiPicker({
        value: 'Mock emoji picker',
      });
      expect(result.id).toEqual('emojiPicker');
      expect(result.validators.length).toEqual(1);
    });

    it('should return food validator', () => {
      const result = addMealOptionsValidators.food({
        value: 'Mock food',
      });
      expect(result.id).toEqual('food');
      expect(result.validators.length).toEqual(2);
    });

    it('should return servingSize validator', () => {
      const result = addMealOptionsValidators.servingSize({
        value: 'Mock serving size',
      });
      expect(result.id).toEqual('servingSize');
      expect(result.validators.length).toEqual(1);
    });

    it('should return quantity validator', () => {
      const result = addMealOptionsValidators.quantity({
        value: 'Mock quantity',
      });
      expect(result.id).toEqual('quantity');
      expect(result.validators.length).toEqual(1);
    });
  });
});
