import type { Config } from 'jest'

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    // Add any module aliases or paths you use in your project
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  setupFilesAfterEnv: ['@testing-library/jest-dom/extend-expect'],

  // collectCoverageFrom: [
  //   '**/*.{js,jsx}',
  //   '!**/node_modules/**',
  //   '!**/vendor/**',
  // ],
  // preset: 'ts-jest',
  // testEnvironment: 'jest-environment-jsdom',
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
