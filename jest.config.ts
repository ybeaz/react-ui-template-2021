import type { Config } from 'jest'

const config: Config = {
  preset: 'ts-jest',
  // preset: 'ts-jest/presets/js-with-ts',
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    // Add any module aliases or paths you use in your project
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
    'node_modules/variables/.+\\.(j|t)sx?$': 'ts-jest',
  },
  // testEnvironment: 'node',
  transformIgnorePatterns: ['node_modules/(?!nanoid/.*)'],
  setupFilesAfterEnv: ['@testing-library/jest-dom/extend-expect'],
  globals: {
    'ts-jest': {
      tsconfig: '<rootDir>/tsconfig.json',
    },
  },
}

export default config

// export default {
//   verbose: true,
//   testURL: 'http://127.0.0.1/',
//   moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx'],
//   transform: {
//     '^.+\\.jsx?$': 'babel-jest',
//     '^.+\\.tsx?$': 'ts-jest',
//   },
//   moduleNameMapper: {
//     '^@/(.*)$': '<rootDir>/src/$1',
//   },
//   testMatch: ['<rootDir>/**/(*.)test.(js|jsx|ts|tsx)'],
//   globals: {
//     'ts-jest': {
//       babel: true,
//       tsConfig: 'tsconfig.json',
//     },
//   },
// }
