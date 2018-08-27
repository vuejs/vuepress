const defaultJestConfig = require('./jest/jest.config')

module.exports = function createJestConfig (override) {
  return Object.assign({}, defaultJestConfig, override)
}
