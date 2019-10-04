const Page = require('../../Page')
const App = require('../../App')

const {
  getMarkdown,
  getDocument,
  readFile
} = require('./util')

describe('Page', () => {
  let app
  let computed

  beforeAll(async () => {
    app = new App()
    await app.process()
    computed = new app.ClientComputedMixinConstructor()
  })

  test('pure route', async () => {
    const page = new Page({ path: '/' }, app)

    expect(page.path).toBe('/')
    expect(page.regularPath).toBe('/')

    await page.process({ computed })

    expect(page.path).toBe('/')
    expect(page.regularPath).toBe('/')
  })

  test('pure route - encodeURI', async () => {
    const path = '/尤/'
    const page = new Page({ path }, app)

    expect(page.path).toBe(encodeURI(path))
    expect(page.regularPath).toBe(encodeURI(path))
  })

  test('pure route - custom frontmatter', async () => {
    const frontmatter = { title: 'alpha' }
    const page = new Page({
      path: '/',
      frontmatter
    }, app)
    expect(page.frontmatter).toBe(frontmatter)
  })

  test('pure route - enhancers', async () => {
    const frontmatter = { title: 'alpha' }
    const page = new Page({
      path: '/',
      frontmatter
    }, app)

    expect(page.frontmatter.title).toBe('alpha')

    const enhancers = [
      {
        name: 'plugin-a',
        value: page => {
          page.frontmatter.title = 'beta'
        }
      }
    ]
    await page.process({ computed, enhancers })

    expect(page.frontmatter.title).toBe('beta')
  })

  test('markdown page - pointing to a markdown file', async () => {
    const { relative, filePath } = getDocument('README.md')
    const page = new Page({ filePath, relative }, app)

    expect(page._filePath).toBe(filePath)
    expect(page.regularPath).toBe('/')
    expect(page.path).toBe('/')
    expect(page.frontmatter).toEqual({})

    const markdown = getMarkdown()
    await page.process({ computed, markdown })

    expect(page.title).toBe('Home')
    const content = await readFile(filePath)
    expect(page._content).toBe(content)
    expect(page._strippedContent).toBe(content)
  })

  test('markdown page - pointing to a markdown file with frontmatter', async () => {
    const { relative, filePath } = getDocument('alpha.md')
    const page = new Page({ filePath, relative }, app)

    expect(page._filePath).toBe(filePath)
    expect(page.regularPath).toBe('/alpha.html')
    expect(page.path).toBe('/alpha.html')
    expect(page.frontmatter).toEqual({})

    const markdown = getMarkdown()
    await page.process({ computed, markdown })

    expect(page.title).toBe(page.frontmatter.title)
    expect(page._content.startsWith('---')).toBe(true)
    expect(page._strippedContent.startsWith('---')).toBe(false)
  })

  describe('enhance - ', () => {
    let page
    let enhancers

    beforeEach(() => {
      page = new Page({ path: '/' }, app)
      enhancers = [
        {
          pluginName: 'foo',
          value: jest.fn()
        },
        {
          pluginName: 'foo',
          value: jest.fn()
        }
      ]
      global.console.log = jest.fn()
    })

    test('should loop over sync enhancers', async () => {
      await page.enhance(enhancers)

      return enhancers.map(enhancer => expect(enhancer.value).toHaveBeenCalled())
    })

    test('should loop over sync and async enhancers', async () => {
      const mixedEnhancers = [...enhancers, {
        pluginName: 'blog',
        value: jest.fn().mockResolvedValue({})
      }]
      await page.enhance(mixedEnhancers)

      return mixedEnhancers.map(enhancer => expect(enhancer.value).toHaveBeenCalled())
    })

    test('should log when enhancing when failing', async () => {
      const error = { errorMessage: 'this is an error message' }
      expect.assertions(1)
      try {
        await page.enhance([{
          pluginName: 'error-plugin',
          value: jest.fn().mockRejectedValue(error)
        }])
      } catch (e) {
        expect(console.log).toHaveBeenCalledWith(error)
      }
    })
  })
})

