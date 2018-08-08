const tc = require('turbocolor')
const logger = require('../util/logger')

module.exports = class DevLogPlugin {
  constructor (options) {
    this.options = options
  }

  apply (compiler) {
    let isFirst = true
    compiler.hooks.done.tap('vuepress-log', stats => {
      clearScreen()

      const { displayHost, port, publicPath } = this.options
      const time = new Date().toTimeString().match(/^[\d:]+/)[0]

      logger.success(`\n${tc.gray(`[${time}]`)} Build ${tc.italic(stats.hash.slice(0, 6))} finished in ${stats.endTime - stats.startTime} ms!`)
      if (isFirst) {
        isFirst = false
        console.log(`\n${tc.gray('>')} VuePress dev server listening at ${tc.cyan(`http://${displayHost}:${port}${publicPath}`)}`)
      }
    })
    compiler.hooks.invalid.tap('vuepress-log', clearScreen)
  }
}

function clearScreen () {
  process.stdout.write('\x1Bc')
}
