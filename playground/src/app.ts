import { createApp } from '@vuepress/core'
import type { App } from '@vuepress/core'
import { path } from '@vuepress/utils'

export const createVuepressApp = (): App =>
  createApp({
    title: 'title',
    description: 'description',
    head: [['meta', { from: 'site config' }]],

    locales: {
      '/': {
        lang: 'en-US',
        title: 'VuePress',
        description: 'Vue-powered Static Site Generator',
      },
      '/zh/': {
        lang: 'zh-CN',
        title: 'VuePress',
        description: 'Vue 驱动的静态网站生成器',
      },
    },

    base: '/',
    host: '0.0.0.0',
    port: 8080,
    debug: true,
    open: false,

    templateDev: require.resolve('@vuepress/client/templates/index.dev.html'),
    templateSSR: require.resolve('@vuepress/client/templates/index.ssr.html'),

    dirSource: path.resolve(__dirname, '../docs'),
    dirDest: path.resolve(__dirname, '../dist'),
    dirTemp: path.resolve(__dirname, '../.temp'),

    // Theme
    theme: '@vuepress/default',
    themeConfig: {},

    plugins: [[path.resolve(__dirname, 'test-plugin.js')]],

    shouldPrefetch: null,
    shouldPreload: null,
  })
