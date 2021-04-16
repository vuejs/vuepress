import { path } from '@vuepress/utils'
import { createApp, createAppPages } from '@vuepress/core'

describe('core > app > createAppPages', () => {
  it('should create two pages with default 404 page', async () => {
    const app = createApp({
      source: path.resolve(__dirname, '../__fixtures__/pages'),
    })

    const pages = await createAppPages(app)
    const fooPage = pages.find((page) => page.path === '/foo.html')
    const barPage = pages.find((page) => page.path === '/bar.html')
    const notFoundPage = pages.find((page) => page.path === '/404.html')

    expect(pages).toHaveLength(3)
    expect(fooPage?.filePathRelative).toEqual('foo.md')
    expect(barPage?.filePathRelative).toEqual('bar.md')
    expect(notFoundPage?.filePathRelative).toBeNull()
    expect(notFoundPage?.frontmatter.layout).toEqual('404')
  })

  it('should create two pages with default 404 page', async () => {
    const app = createApp({
      source: path.resolve(__dirname, '../__fixtures__/pages-with-404'),
    })

    const pages = await createAppPages(app)
    const fooPage = pages.find((page) => page.path === '/foo.html')
    const barPage = pages.find((page) => page.path === '/bar.html')
    const notFoundPage = pages.find((page) => page.path === '/404.html')

    expect(pages).toHaveLength(3)
    expect(fooPage?.filePathRelative).toEqual('foo.md')
    expect(barPage?.filePathRelative).toEqual('bar.md')
    expect(notFoundPage?.filePathRelative).toEqual('404.md')
  })

  it('should process extendsPageOptions hook correctly', async () => {
    const app = createApp({
      source: path.resolve(__dirname, '../__fixtures__/pages-with-404'),
    })

    app.use({
      name: 'foo',
      extendsPageOptions: () => ({ frontmatter: { foo: 'bar' } }),
    })
    app.pluginApi.registerHooks()

    const pages = await createAppPages(app)

    pages.forEach((page) => {
      expect(page.frontmatter.foo).toBe('bar')
    })
  })
})
