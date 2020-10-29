const minimist = require('minimist')
const { createJestRunner } = require('@vuepress/test-utils')
const { createApp } = require('@vuepress/core')

const rawArgs = process.argv.slice(2)
const args = minimist(rawArgs)

let regex
const debug = !!args['inspect-brk']

if (args.p || args.package) {
  const packages = (args.p || args.package).split(',').join('|')
  regex = `.*@vuepress/(${packages}|plugin-(${packages}))/.*\\.spec\\.(js|ts)$`
  const i = rawArgs.indexOf('-p')
  rawArgs.splice(i, 2)
}

const jestRunner = createJestRunner([
  '--config', 'scripts/jest.config.js',
  '--runInBand',
  ...(regex ? [regex] : [])
], debug)

// ensure the basic temp files were generated
createApp({
  temp: '.temp'
})
  .process()
  .then(() => jestRunner())
  .catch(err => {
    console.error(err)
    process.exit(1)
  })
