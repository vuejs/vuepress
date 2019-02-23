// https://github.com/facebook/jest/tree/master/packages/babel-jest
// TODO remove 'babel-core@^7.0.0-0' when babel-jest can work with '@babel/core'

const path = require('path')

module.exports = {
  rootDir: path.resolve(__dirname, '..'),
  verbose: true,
  testURL: 'http://localhost/',
  moduleFileExtensions: [
    'js',
    'vue',
    'ts',
    'json'
  ],
  testRegex: '(/__test__/.*|(\\.|/)(test|spec))\\.(ts|js)?$',
  testPathIgnorePatterns: [
    'test.js',
    path.resolve(__dirname, '../test')
  ],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1'
  },
  transform: {
    '^.+\\.js$': '<rootDir>/node_modules/babel-jest',
    '.*\\.(vue)$': '<rootDir>/node_modules/vue-jest',
    '^.+\\.ts?$': '<rootDir>/node_modules/ts-jest'
  },
  snapshotSerializers: [
    '<rootDir>/node_modules/jest-serializer-vue'
  ]
}
