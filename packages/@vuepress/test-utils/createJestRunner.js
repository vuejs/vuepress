const execa = require('execa')
const rawArgs = process.argv.slice(2)

module.exports = function createJestRunner (jestArgs) {
  return async function () {
    console.log(`running jest with args: ${jestArgs.join(' ')}`)
    await execa('jest', [
      ...jestArgs,
      ...rawArgs
    ], {
      stdio: 'inherit'
    })
  }
}
