const { resolve } = require('path')
const { readdirSync } = require('fs')

const packagesDir = 'packages/@vuepress'
const packages = readdirSync(resolve(__dirname, packagesDir), {
  withFileTypes: true,
})
  .filter((item) => item.isDirectory())
  .map(({ name }) => name)

const commonPackages = packages.filter(
  (item) => !item.startsWith('plugin-') && !item.startsWith('theme-')
)
const pluginAndThemePackages = packages.filter(
  (item) => item.startsWith('plugin-') || item.startsWith('theme-')
)

module.exports = {
  rootDir: resolve(__dirname),
  testEnvironment: 'node',
  preset: 'ts-jest',
  globals: {
    'ts-jest': {
      tsconfig: '<rootDir>/tsconfig.json',
    },
    '__VERSION__': '',
    '__DEV__': false,
    '__SSR__': false,
  },
  moduleNameMapper: {
    [`^@vuepress/(${commonPackages.join(
      '|'
    )})$`]: `<rootDir>/${packagesDir}/$1/src`,
    [`^@vuepress/(${pluginAndThemePackages.join(
      '|'
    )})$`]: `<rootDir>/${packagesDir}/$1/src/node`,
    '^@internal/(.*)$': `<rootDir>/packages/@vuepress/client/__tests__/__fixtures__/$1`,
    '.+\\.(css|styl|less|sass|scss)$':
      '<rootDir>/packages/@vuepress/client/__tests__/__fixtures__/styleMock',
  },
  testMatch: ['<rootDir>/packages/**/__tests__/**/*.spec.ts'],
  testPathIgnorePatterns: [
    '/node_modules/',
    '/__fixtures__/',
    '@vuepress/client',
  ],
  snapshotSerializers: [require.resolve('jest-serializer-vue')],

  // coverage config
  collectCoverageFrom: [
    '<rootDir>/packages/**/src/**/*.ts',
    '!<rootDir>/packages/@vuepress/client/**/*',
    '!<rootDir>/packages/@vuepress/*/src/client/**/*',
    '!**/*.d.ts',
  ],
  coverageDirectory: 'coverage',
}
