'use strict'

const { path, chalk, fs, logger } = require('@vuepress/shared-utils')

module.exports = async (dir) => {
  try {
    require.resolve('@vuepress/theme-default')
  } catch (err) {
    console.log(chalk.red(`\n[vuepress] cannot find '@vuepress/theme-default'\n`))
    process.exit(1)
  }
  const source = require.resolve('@vuepress/theme-default')
  const target = path.resolve(dir, '.vuepress/theme')
  await fs.copy(source, target)
  logger.success(`\nCopied default theme into ${chalk.cyan(target)}.\n`)
}
