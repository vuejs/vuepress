const Page = require('../../lib/prepare/Page')
const {
  getComputed,
  getMarkdown,
  getDocument,
  readFile
} = require('./util')

describe('Page', () => {
  test('pure route', async () => {
    const page = new Page({ path: '/' })

    expect(page.path).toBe('/')
    expect(page.regularPath).toBe('/')

    const computed = getComputed()
    await page.process({ computed })

    expect(page.path).toBe('/')
    expect(page.regularPath).toBe('/')
  })

  test('pure route - encodeURI', async () => {
    const path = '/尤/'
    const page = new Page({ path })

    expect(page.path).toBe(encodeURI(path))
    expect(page.regularPath).toBe(encodeURI(path))
  })

  test('pure route - custom frontmatter', async () => {
    const frontmatter = { title: 'alpha' }
    const page = new Page({
      path: '/',
      frontmatter
    })
    expect(page.frontmatter).toBe(frontmatter)
  })

  test('pure route - enhancers', async () => {
    const frontmatter = { title: 'alpha' }
    const page = new Page({
      path: '/',
      frontmatter
    })

    expect(page.frontmatter.title).toBe('alpha')

    const computed = getComputed()
    const enhancers = [
      {
        name: 'plugin-a',
        value: page => { page.frontmatter.title = 'beta' }
      }
    ]
    await page.process({ computed, enhancers })

    expect(page.frontmatter.title).toBe('beta')
  })

  test('markdown page - pointing to a markdown file', async () => {
    const { relative, filePath } = getDocument('README.md')
    const page = new Page({ filePath, relative })

    expect(page._filePath).toBe(filePath)
    expect(page.regularPath).toBe('/')
    expect(page.path).toBe('/')
    expect(page.frontmatter).toEqual({})

    const computed = getComputed()
    const markdown = getMarkdown()
    await page.process({ computed, markdown })

    expect(page.title).toBe('Home')
    const content = await readFile(filePath)
    expect(page._content).toBe(content)
    expect(page._strippedContent).toBe(content)
  })

  test('markdown page - pointing to a markdown file with frontmatter', async () => {
    const { relative, filePath } = getDocument('alpha.md')
    const page = new Page({ filePath, relative })

    expect(page._filePath).toBe(filePath)
    expect(page.regularPath).toBe('/alpha.html')
    expect(page.path).toBe('/alpha.html')
    expect(page.frontmatter).toEqual({})

    const computed = getComputed()
    const markdown = getMarkdown()
    await page.process({ computed, markdown })

    expect(page.title).toBe(page.frontmatter.title)
    expect(page._content.startsWith('---')).toBe(true)
    expect(page._strippedContent.startsWith('---')).toBe(false)
  })
})

