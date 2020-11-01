const { fs, path, chalk, logger } = require('@vuepress/shared-utils')

// Only empty the `.temp` directory at most once per run to avoid
// compilation errors caused by removed files.
// See: https://github.com/vuejs/vuepress/issues/2254#issuecomment-689457157
//
// Known issue: This can cause the `.temp` directory to grow while the server
// is running, but the impact is limited because the `.temp` directory will
// be cleared when restarting the server.
// See discussion in https://github.com/vuejs/vuepress/pull/2612
let alreadyEmptied = false

/**
 * Create a dynamic temp utility context that allow to lanuch
 * multiple apps with isolated context at the same time.
 * @param tempPath
 * @returns {{
 *  writeTemp: (function(file: string, content: string): string),
 *  tempPath: string
 * }}
 */

module.exports = function createTemp (tempPath) {
  if (!tempPath) {
    tempPath = path.resolve(__dirname, '../../.temp')
  } else {
    tempPath = path.resolve(tempPath)
  }

  if (!fs.existsSync(tempPath)) {
    fs.ensureDirSync(tempPath)
  } else if (!alreadyEmptied) {
    fs.emptyDirSync(tempPath)
    alreadyEmptied = true
  }

  logger.debug(`Temp directory: ${chalk.gray(tempPath)}`)
  const tempCache = new Map()

  async function writeTemp (file, content) {
    const destPath = path.join(tempPath, file)
    await fs.ensureDir(path.parse(destPath).dir)
    // cache write to avoid hitting the dist if it didn't change
    const cached = tempCache.get(file)
    if (cached !== content) {
      await fs.writeFile(destPath, content)
      tempCache.set(file, content)
    }
    return destPath
  }

  return { writeTemp, tempPath }
}
