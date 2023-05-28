import '@testing-library/jest-dom/extend-expect';

global.beforeAll(async () => {
  jest.spyOn(Date, 'now').mockImplementation(() => 1682632800000); // '2023-04-28'
});
