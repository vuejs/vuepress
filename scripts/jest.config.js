const path = require('path')
const createJestConfig = require('@vuepress/test-utils/createJestConfig')

module.exports = createJestConfig({
  rootDir: path.resolve(__dirname, '..'),
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
    '^@core/(.*)$': '<rootDir>/packages/@vuepress/core/$1'
  },
  globalSetup: '<rootDir>/packages/@vuepress/test-utils/prepare.js'
})
