'use strict'

const path = require('path')
const { chalk, fs, logger } = require('@vuepress/shared-utils')

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
  // remove the import to default theme override
  const styleConfig = path.resolve(target, 'styles/config.styl')
  const content = await fs.readFile(styleConfig, 'utf-8')
  const transformed = content.split('\n').slice(0, -2).join('\n')
  await fs.writeFile(styleConfig, transformed)
  logger.success(`\nCopied default theme into ${chalk.cyan(target)}.\n`)
}
