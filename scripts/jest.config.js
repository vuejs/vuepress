const { path } = require('@vuepress/shared-utils')
const createJestConfig = require('@vuepress/test-utils/createJestConfig')

module.exports = createJestConfig({
  rootDir: path.resolve(__dirname, '..'),
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
    '^@core/(.*)$': '<rootDir>/packages/@vuepress/core/$1'
  },
  modulePathIgnorePatterns: [
    '<rootDir>/packages/@vuepress/core/__test__/prepare/prepare.spec.js',
    '<rootDir>/packages/@vuepress/core/__test__/plugin-api/AsyncOption.spec.js'
  ]
})
