import nextJest from 'next/jest.js';

const createJestConfig = nextJest({
  dir: './',
});

/** @type {import('jest').Config} */
const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],

  testEnvironment: 'jest-environment-jsdom',
  coverageDirectory: './coverage',
  collectCoverageFrom: [
    'client/**/*.{js,jsx,ts,tsx}',
    'components/**/*.{js,jsx,ts,tsx}',
    'hooks/**/*.{js,jsx,ts,tsx}',
    'server/**/*.{js,jsx,ts,tsx}',
    'store/**/*.{js,jsx,ts,tsx}',
    'utils/**/*.{js,jsx,ts,tsx}',
    'lib/**/*.{js,jsx,ts,tsx}',
    'pages/**/*.{js,jsx,ts,tsx}',
    '!pages/**/*nextauth*.ts',
    '!utils/**/food-emojis.ts',
    '!**/*constants*.ts',
    '!tests/**/*',
  ],
  moduleNameMapper: {
    '^@components/(.*)$': '<rootDir>/components/$1',
    '^@utils/(.*)$': '<rootDir>/utils/$1',
    '^@public/(.*)$': '<rootDir>/public/$1',
    '^@hooks/(.*)$': '<rootDir>/hooks/$1',
    '^@store/(.*)$': '<rootDir>/store/$1',
    '^@client/(.*)$': '<rootDir>/client/$1',
    '^@lib/(.*)$': '<rootDir>/lib/$1',
    '^@server/(.*)$': '<rootDir>/server/$1',
  },
  globalSetup: './global-setup.ts',
  modulePathIgnorePatterns: ['<rootDir>/tests/'],
  coverageThreshold: {
    global: {
      statements: 46,
      branches: 40,
      functions: 47,
      lines: 43,
    },
  },
};

export default createJestConfig(customJestConfig);
