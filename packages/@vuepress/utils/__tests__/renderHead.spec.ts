import { renderHead } from '@vuepress/utils'
import type { HeadConfig } from '@vuepress/shared'

const testCases: [HeadConfig, string][] = [
  [['title', {}, 'vuepress site title'], `<title>vuepress site title</title>`],
  [
    [
      'base',
      {
        target: '_blank',
        href: 'https://vuepress.vuejs.org/',
      },
    ],
    `<base target="_blank" href="https://vuepress.vuejs.org/">`,
  ],
  [
    [
      'link',
      {
        href: '/path/to.css',
        rel: 'stylesheet',
        type: 'text/css',
      },
    ],
    `<link href="/path/to.css" rel="stylesheet" type="text/css">`,
  ],
  [
    [
      'meta',
      {
        charset: 'utf-8',
      },
    ],
    `<meta charset="utf-8">`,
  ],
  [
    [
      'meta',
      {
        name: 'description',
        content: 'description content',
      },
    ],
    '<meta name="description" content="description content">',
  ],
  [
    ['style', {}, 'body: { color: red; }'],
    `<style>body: { color: red; }</style>`,
  ],
  [
    ['script', { src: '/path/to/module.js', type: 'module' }],
    `<script src="/path/to/module.js" type="module"></script>`,
  ],
  [
    ['script', { src: '/path/to/fallback.js', nomodule: true }],
    `<script src="/path/to/fallback.js" nomodule></script>`,
  ],
  [
    ['script', {}, `console.log('test')`],
    `<script>console.log('test')</script>`,
  ],
  [
    ['noscript', {}, `please enable javascript`],
    `<noscript>please enable javascript</noscript>`,
  ],
  [
    ['template', { id: 'template-id' }, `<div>foobar</div>`],
    `<template id="template-id"><div>foobar</div></template>`,
  ],
]

describe('utils > renderHead', () => {
  describe('should render head config correctly', () => {
    testCases.forEach(([source, expected]) => {
      it(expected, () => {
        expect(renderHead(source)).toBe(expected)
      })
    })
  })
})
