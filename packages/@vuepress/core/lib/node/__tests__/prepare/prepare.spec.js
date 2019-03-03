const { fs, path } = require('@vuepress/shared-utils')
const prepare = require('../../lib/prepare')

const docsBaseDir = path.resolve(__dirname, 'fixtures')
const docsModeNames = fs.readdirSync(docsBaseDir)
const docsModes = docsModeNames.map(name => {
  const docsPath = path.resolve(docsBaseDir, name)
  const docsTempPath = path.resolve(docsPath, '.vuepress/.temp')
  return { name, docsPath, docsTempPath }
})

describe('prepare', () => {
  test('should not throw error', async () => {
    await Promise.all(docsModes.map(async ({ name, docsPath, docsTempPath }) => {
      await fs.ensureDir(docsTempPath)
      const context = await prepare(docsPath, { theme: '@vuepress/default', temp: docsTempPath })
      expect(context.sourceDir).toBe(docsPath)
    }))
  })
})
