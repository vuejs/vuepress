const path = require('upath')
const { createJestConfig } = require('@vuepress/test-utils')

module.exports = createJestConfig({
  rootDir: path.resolve(__dirname, '..'),
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
    '^@core/(.*)$': '<rootDir>/packages/@vuepress/core/$1',
    '^@theme/(.*)$': '<rootDir>/packages/@vuepress/theme-default/$1',
    '^@temp/(.*)$': '<rootDir>/.temp/$1',
    '^@internal/(.*)$': '<rootDir>/.temp/internal/$1',
    '^@transform/(.*)$': '<rootDir>/.temp/transform/$1'
  },
  modulePathIgnorePatterns: [
    '<rootDir>/packages/@vuepress/core/__test__/plugin-api/AsyncOption.spec.js'
  ]
})
