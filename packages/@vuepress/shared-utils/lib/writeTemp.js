const path = require('path')
const fs = require('fs-extra')

if (!process.env.VUEPRESS_TEMP_PATH) {
  process.env.VUEPRESS_TEMP_PATH = path.resolve(__dirname, '../.temp')
}

fs.ensureDirSync(process.env.VUEPRESS_TEMP_PATH)

const tempCache = new Map()

/**
 * A low-level temporary file processing utility
 * @param fileA
 * @param content
 * @returns {Promise<*|string>}
 */
async function writeTemp (file, content) {
  const destPath = path.join(process.env.VUEPRESS_TEMP_PATH, file)
  await fs.ensureDir(path.parse(destPath).dir)
  // cache write to avoid hitting the dist if it didn't change
  const cached = tempCache.get(file)
  if (cached !== content) {
    await fs.writeFile(destPath, content)
    tempCache.set(file, content)
  }
  return destPath
}

module.exports = writeTemp
