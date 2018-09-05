const execa = require('execa')
const rawArgs = process.argv.slice(2)

module.exports = function createJestRunner (jestArgs) {
  return async function () {
    const args = [...jestArgs, ...rawArgs]
    console.log(`running jest with args: ${args.join(' ')}`)
    await execa('jest', args, {
      stdio: 'inherit'
    })
  }
}
