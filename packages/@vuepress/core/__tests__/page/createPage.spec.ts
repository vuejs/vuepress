import { createApp, createPage } from '@vuepress/core'
import { path } from '@vuepress/utils'

const source = path.resolve(__dirname, 'fake-source')
const app = createApp({
  source,
})

describe('core > page > createPage', () => {
  it('should create an empty page', async () => {
    const page = await createPage(app, {})
    expect(page.key).toBeTruthy()
    expect(page.path).toBe('')
    expect(page.pathInferred).toBeNull()
    expect(page.pathLocale).toBe('/')
    expect(page.filePath).toBeNull()
    expect(page.filePathRelative).toBeNull()
    expect(page.componentFilePath).toBe(app.dir.temp(`pages/${page.key}.vue`))
    expect(page.componentFilePathRelative).toBe(`pages/${page.key}.vue`)
    expect(page.componentFileContent).toBe(`<template> </template>`)
    expect(page.title).toBe('')
    expect(page.content).toBe('')
    expect(page.frontmatter).toEqual({})
    expect(page.excerpt).toBe('')
    expect(page.headers).toEqual([])
    expect(page.links).toEqual([])
    expect(page.slug).toBe('')
    expect(page.date).toBe('1970-01-01')
  })
})
