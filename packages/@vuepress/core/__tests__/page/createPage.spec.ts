import { createApp, createPage } from '@vuepress/core'
import { path } from '@vuepress/utils'

const source = path.resolve(__dirname, 'fake-source')
const app = createApp({
  source,
})

describe('core > page > createPage', () => {
  it('should throw an error', async () => {
    const consoleError = console.error
    console.error = jest.fn()

    await expect(createPage(app, {})).rejects.toThrow()
    expect(console.error).toHaveBeenCalled()

    console.error = consoleError
  })

  it('should create an empty page', async () => {
    const page = await createPage(app, {
      path: '/',
    })
    expect(page.key).toBeTruthy()
    expect(page.path).toBe('/')
    expect(page.pathInferred).toBeNull()
    expect(page.pathLocale).toBe('/')
    expect(page.filePath).toBeNull()
    expect(page.filePathRelative).toBeNull()
    expect(page.htmlFilePath).toBe(app.dir.dest(`index.html`))
    expect(page.htmlFilePathRelative).toBe(`index.html`)
    expect(page.componentFilePath).toBe(
      app.dir.temp(`pages/${page.htmlFilePathRelative}.vue`)
    )
    expect(page.componentFilePathRelative).toBe(
      `pages/${page.htmlFilePathRelative}.vue`
    )
    expect(page.componentFileContent).toBe(`<template></template>`)
    expect(page.componentFileChunkName).toBe(page.key)
    expect(page.dataFilePath).toBe(
      app.dir.temp(`internal/pageData/${page.key}.js`)
    )
    expect(page.dataFilePathRelative).toBe(`internal/pageData/${page.key}.js`)
    expect(page.dataFileChunkName).toBe(page.key)
    expect(page.title).toBe('')
    expect(page.content).toBe('')
    expect(page.frontmatter).toEqual({})
    expect(page.excerpt).toBe('')
    expect(page.headers).toEqual([])
    expect(page.links).toEqual([])
    expect(page.slug).toBe('')
    expect(page.date).toBe('0000-00-00')
  })
})
