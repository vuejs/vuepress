const util = require('util')
const exec = util.promisify(require('child_process').exec)
const fs = require('fs')

const shouldDownloadTheme = (prompt, result) => prompt.id === 'theme' && result.theme !== undefined

const fileExists = fileName => {
  try {
    if (fs.existsSync(fileName)) {
      return true
    }
  } catch (err) {
    console.error(err)
  }
  return false
}

const downloadTheme = async (themeName, api) => {
  const packageManager = fileExists('yarn.lock', api) ? 'yarn' : 'npm'
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
