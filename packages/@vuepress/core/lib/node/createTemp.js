const { fs, path, chalk, logger } = require('@vuepress/shared-utils')

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
  } else {
    fs.emptyDirSync(tempPath)
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
