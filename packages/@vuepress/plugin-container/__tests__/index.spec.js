const { createApp } = require('@vuepress/core')
const { getFragments } = require('@vuepress/test-utils')
import containerPlugin from '..'

describe('containers', async () => {
  let app

  beforeAll(async () => {
    app = createApp()
    app.options.siteConfig = {
      plugins: [
        [containerPlugin, { type: 'tip' }],
        [containerPlugin, { type: 'warning' }],
        [containerPlugin, { type: 'danger' }],
        [containerPlugin, {
          type: 'slot',
          before: info => `<template slot="${info}">`,
          after: '</template>'
        }],
        [containerPlugin, {
          type: 'v-pre',
          before: '<div v-pre>',
          after: '</div>'
        }]
      ]
    }
    return app.process()
  })

  getFragments(__dirname).forEach(({ name, content: input }) => {
    test(name, () => {
      const { html } = app.markdown.render(input)
      expect(html).toMatchSnapshot()
    })
  })
})
