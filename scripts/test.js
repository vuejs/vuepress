const minimist = require('minimist')
const createJestRunner = require('@vuepress/test-utils/createJestRunner')

const rawArgs = process.argv.slice(2)
const args = minimist(rawArgs)

let regex
if (args.p) {
  const packages = (args.p || args.package).split(',').join('|')
  regex = `.*@vuepress/(${packages}|plugin-(${packages}))/.*\\.spec\\.js$`
  const i = rawArgs.indexOf('-p')
  rawArgs.splice(i, 2)
}

const jestRunner = createJestRunner(
  [
    '--config', 'scripts/jest.config.js',
    '--runInBand',
    ...(regex ? [regex] : [])
  ])

;(jestRunner)().catch(err => {
  console.error(err)
  process.exit(1)
})

