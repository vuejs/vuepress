const { fs, path } = require('@vuepress/shared-utils')
const App = require('../../App')

const docsBaseDir = path.resolve(__dirname, 'fixtures')
const docsModeNames = fs.readdirSync(docsBaseDir)
const docsModes = docsModeNames.map(name => {
  const docsPath = path.resolve(docsBaseDir, name)
  const docsTempPath = path.resolve(docsPath, '.vuepress/.temp')
  return { name, docsPath, docsTempPath }
})

describe('App', () => {
  test('should not throw error', async () => {
    await Promise.all(docsModes.map(async ({ name, docsPath, docsTempPath }) => {
      await fs.ensureDir(docsTempPath)
      const app = new App({
        sourceDir: docsPath,
        theme: '@vuepress/default',
        emp: docsTempPath
      })
      await app.process()
      expect(app.sourceDir).toBe(docsPath)
    }))
  })
})
