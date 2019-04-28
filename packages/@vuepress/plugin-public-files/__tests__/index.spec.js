/**
 * @jest-environment node
 */

const { createApp } = require('@vuepress/core')
const { path: { resolve }, fs } = require('@vuepress/shared-utils')

function testForExistence (app, name, existence = true) {
  test(`${existence ? '' : 'in'}existence: ${name}`, () => {
    expect(fs.existsSync(resolve(app.outDir, name))).toBe(existence)
  })
}

describe('plugin-public-files: source folder', () => {
  const app = createApp({
    sourceDir: resolve(__dirname, 'docs-1')
  })

  beforeAll(async () => {
    await app.process()
    await app.build()
  }, 60000)

  testForExistence(app, 'foo.txt')
  testForExistence(app, 'baz.txt')
  testForExistence(app, 'bar/foo.txt')
  testForExistence(app, 'bar/baz.txt')
  testForExistence(app, 'index.html')
  testForExistence(app, 'readme.md', false)
  testForExistence(app, '.dotfile', false)
  testForExistence(app, '.dotfolder', false)
  testForExistence(app, 'bar/readme.md', false)
})

describe('plugin-public-files: assets folder', () => {
  const app = createApp({
    sourceDir: resolve(__dirname, 'docs-2')
  })

  beforeAll(async () => {
    await app.process()
    await app.build()
  }, 60000)

  testForExistence(app, 'foo.txt')
  testForExistence(app, 'assets/bar.png')
  testForExistence(app, 'assets/.dotfile')
  testForExistence(app, 'assets/.dotfolder/foo.txt')
  testForExistence(app, 'bar.png', false)
  testForExistence(app, 'baz.ignore', false)
  testForExistence(app, '.dotfile', false)
  testForExistence(app, '.dotfolder', false)
  testForExistence(app, 'assets/baz.ignore', false)
})
