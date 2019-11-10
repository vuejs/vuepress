const fs = require('fs')
const util = require('util')
const exec = util.promisify(require('child_process').exec)
const has = require('lodash/has')
const { getPackageJson } = require('./utils')

/**
 * Check if theme is already in package.json
 *
 * @param {string} theme
 */
const shouldDownloadTheme = async themeName => {
  const packageJson = await getPackageJson()
  const isThemeAlreadyDownloaded = has(packageJson, `devDependencies.${themeName}`)
  || has(packageJson, `dependencies.${themeName}`)

  return !isThemeAlreadyDownloaded
}

/**
 * Download theme with npm or yarn
 *
 * @param {string} themeName
 * @param {Object} api
 */
const downloadTheme = async (themeName, api) => {
  const packageManager = fs.existsSync('yarn.lock') ? 'yarn' : 'npm'
  const option = packageManager === 'yarn' ? 'add' : 'i'
  const command = `${packageManager} ${option} ${themeName} -D`

  api.setProgress({
    status: `Installing theme: ${themeName}`,
    info: `Running '${command}'`
  })

  try {
    await exec(command)
  } catch (err) {
    console.error(err)
  }

  api.removeProgress()
}

module.exports = {
  shouldDownloadTheme,
  downloadTheme
}
