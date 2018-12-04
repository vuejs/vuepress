module.exports = function checkEnv () {
  const { chalk } = require('@vuepress/shared-utils')
  const semver = require('semver')

  try {
    require.resolve('@vuepress/core')
  } catch (err) {
    console.log(chalk.red(
      `\n[vuepress] @vuepress/cli ` +
      `requires @vuepress/core to be installed.\n`
    ))
    process.exit(1)
  }

  const pkg = require('@vuepress/core/package.json')
  const requiredVersion = pkg.engines.node

  if (!semver.satisfies(process.version, requiredVersion)) {
    console.log(chalk.red(
      `\n[vuepress] minimum Node version not met:` +
      `\nYou are using Node ${process.version}, but VuePress ` +
      `requires Node ${requiredVersion}.\nPlease upgrade your Node version.\n`
    ))
    process.exit(1)
  }
}
