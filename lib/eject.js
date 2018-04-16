const fs = require('fs-extra')
const path = require('path')
const chalk = require('chalk')

module.exports = async (dir) => {
  const source = path.resolve(__dirname, 'default-theme')
  const target = path.resolve(dir, '.vuepress/theme')
  await fs.copy(source, target)
  // remove the import to default theme override
  const styleConfig = path.resolve(target, 'styles/config.styl')
  const content = await fs.readFile(styleConfig, 'utf-8')
  const transformed = content.split('\n').slice(0, -2).join('\n')
  await fs.writeFile(styleConfig, transformed)
  console.log(`Copied default theme into ${chalk.cyan(target)}.`)
}
