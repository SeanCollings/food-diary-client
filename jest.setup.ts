import '@testing-library/jest-dom/extend-expect';
import MockDate from 'mockdate';

global.beforeAll(async () => {
  MockDate.set('2023-04-28');
});

global.afterAll(() => {
  MockDate.reset();
});
