import type { Config } from '@jest/types'

export default async (): Promise<Config.InitialOptions> => {
  return {
    setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
    // preset: '@testing-library/react',
    testEnvironment: 'jsdom',
    testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.(js?|jsx?|ts?|tsx?)$',
    testPathIgnorePatterns: [
      '<rootDir>/scripts/test.js',
      'node_modules/(?!' +
        [
          '@react-native',
          'react-native',
          'react-native-vector-icons',
          'react-native-vector-icons/FontAwesome',
          'react-native-vector-icons/Ionicons',
        ].join('|') +
        ')',
    ],
    clearMocks: true,
  }
}

// module.exports = {
//   collectCoverage: true,
//   collectCoverageFrom: [
//     'src/**/*.{js,jsx,ts,tsx}',
//     '!src/index.{js,jsx,ts,tsx}',
//     '!src/i18n.ts',
//     '!src/metrics.ts',
//     '!src/**/*.d.ts',
//     '!src/types/*.tsx',
//     '!src/**/queries.ts',
//     '!src/**/mutations.ts',
//     '!src/apollo/**',
//     '!src/**/slices/**',
//     '!src/app/store.ts',
//     '!src/flags/**',
//     '!src/assets/**',
//     '!src/util/**',
//   ],
//   coverageReporters: ['text', 'html', 'cobertura', 'json-summary'],
//   coverageThreshold: {
//     global: {
//       lines: 80,
//       statements: 80,
//       functions: 80,
//       branches: 70,
//     },
//   },
//   globals: {
//     SERVER_MODE: 'test',
//   },
//   moduleNameMapper: {
//     '^src/(.*)$': '<rootDir>/src/$1',
//     'react-i18next': '<rootDir>/__mocks__/react-i18next.ts',
//   },
//   setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
//   transform: {
//     '\\.[jt]sx?$': 'babel-jest',
//     '\\.(s?css|jpe?g|png|gif|eot|otf|webp|svg|ttf|woff2?|mp[34]|webm|wav|m4a|aac|oga)$':
//       'jest-transform-stub',
//   },
//   transformIgnorePatterns: [
//     // Enable babel transforms for these specific packages. They ship code as es
//     // modules only, and must be transpiled in order to run on Node.
//     'node_modules/(?!(@amzn/katal-components|@amzn/katal-react|@babel/runtime/helpers/esm|lit-element|lit-html)/)',
//   ],
//   detectOpenHandles: true,
// }
