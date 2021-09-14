module.exports = {
  roots: ['<rootDir>/src'],
  collectCoverageFrom: ['<rootDir>/src/**/*.ts', '!**/server/**', '!**/index.ts', '!**/errors/**',  '!**/tests.mocks/**', '!<rootDir>/src/**/**-factory.ts'],
  coverageDirectory: 'coverage',
  coverageProvider: 'babel',
  testEnvironment: 'node',
  preset: '@shelf/jest-mongodb',
  transform: {
    '.+\\.ts$': 'ts-jest'
  },
  moduleNameMapper: {
  '@/(.*)': '<rootDir>/src/$1',
  "@genres/(.*)": "<rootDir>/src/core/components/genres/$1"
  }
}
