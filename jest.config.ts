import type { Config } from '@jest/types'

export default async (): Promise<Config.InitialOptions> => {
  return {
    setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
    preset: 'ts-jest',
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
