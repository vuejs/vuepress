const { resolve } = require('path')
const { readdirSync } = require('fs')

const packagesDir = 'packages/@vuepress'
const packages = readdirSync(resolve(__dirname, packagesDir), {
  withFileTypes: true,
})
  .filter((item) => item.isDirectory())
  .map(({ name }) => name)

module.exports = {
  rootDir: resolve(__dirname),
  testEnvironment: 'node',
  preset: 'ts-jest',
  globals: {
    'ts-jest': {
      tsConfig: '<rootDir>/tsconfig.json',
    },
  },
  moduleNameMapper: {
    [`^@vuepress/(${packages.join('|')})$`]: `<rootDir>/${packagesDir}/$1/src`,
    // TODO: map temp files in client unit tests
    [`^@internal/(.*)$`]: `<rootDir>/packages/@vuepress/client/.temp/internal/$1`,
  },
  testMatch: ['<rootDir>/packages/**/__tests__/**/*.spec.ts'],
  testPathIgnorePatterns: ['/node_modules/', '/__fixtures__/'],
  snapshotSerializers: [require.resolve('jest-serializer-vue')],

  // coverage config
  collectCoverageFrom: [
    '<rootDir>/packages/**/src/**/*.ts',
    // TODO: map temp files in client unit tests
    '!<rootDir>/packages/@vuepress/client/**/*',
    '!<rootDir>/packages/docs/**/*',
    '!**/*.d.ts',
  ],
  coverageDirectory: 'coverage',
}
