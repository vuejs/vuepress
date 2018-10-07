'use strict'

const { path, chalk, fs, logger } = require('@vuepress/shared-utils')

function filter (src) {
  const exclude = [
    /theme-default\/node_modules/,
    /README\.md$/
  ]
  return exclude.reduce((prev, ex) => prev && !src.match(ex), true)
}

module.exports = async (dir) => {
  try {
    require.resolve('@vuepress/theme-default')
  } catch (err) {
    console.log(chalk.red(`\n[vuepress] cannot find '@vuepress/theme-default'\n`))
    process.exit(1)
  }
  const source = require.resolve('@vuepress/theme-default').replace(/index\.js$/, '')
  const target = path.resolve(dir, '.vuepress/theme')
  await fs.copy(source, target, { filter })
  logger.success(`\nCopied default theme into ${chalk.cyan(target)}.\n`)
}
