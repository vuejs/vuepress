/**
 * @jest-environment node
 */

const { createApp } = require('@vuepress/core')
const { path: { resolve }, fs } = require('@vuepress/shared-utils')

describe('plugin-public-files: source dir', () => {
  const app = createApp({
    sourceDir: resolve(__dirname, 'docs-1')
  })

  beforeAll(async () => {
    await app.process()
    await app.build()
  }, 60000)

  function testForExistence (name, existence = true) {
    test(`${existence ? '' : 'in'}existence: ${name}`, () => {
      expect(fs.existsSync(resolve(app.outDir, name))).toBe(existence)
    })
  }

  testForExistence('foo.txt')
  testForExistence('baz.txt')
  testForExistence('bar/foo.txt')
  testForExistence('bar/baz.txt')
  testForExistence('index.html')
  testForExistence('readme.md', false)
  testForExistence('.dotfile', false)
  testForExistence('.dotfolder', false)
})
