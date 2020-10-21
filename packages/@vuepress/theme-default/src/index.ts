import type { Theme } from '@vuepress/core'
import type { ContainerPluginOptions } from '@vuepress/plugin-container'
import { path } from '@vuepress/utils'
import type { DefaultThemeOptions } from '../types'

const defaultTheme: Theme<DefaultThemeOptions> = () => {
  return {
    name: '@vuepress/theme-default',

    layouts: path.resolve(__dirname, '../layouts'),

    clientAppEnhanceFiles: path.resolve(__dirname, './clientAppEnhance.js'),

    plugins: [
      ['@vuepress/nprogress'],
      [
        '@vuepress/container',
        {
          type: 'tip',
          locales: {
            '/': {
              defaultInfo: 'TIP',
            },
            '/zh/': {
              defaultInfo: '提示',
            },
          },
        } as ContainerPluginOptions,
      ],
      [
        '@vuepress/container',
        {
          type: 'warning',
          locales: {
            '/': {
              defaultInfo: 'WARNING',
            },
            '/zh/': {
              defaultInfo: '注意',
            },
          },
        } as ContainerPluginOptions,
      ],
      [
        '@vuepress/container',
        {
          type: 'danger',
          locales: {
            '/': {
              defaultInfo: 'WARNING',
            },
            '/zh/': {
              defaultInfo: '警告',
            },
          },
        } as ContainerPluginOptions,
      ],
      [
        '@vuepress/container',
        {
          type: 'details',
          before: (info) =>
            `<details class="custom-block details">${
              info ? `<summary>${info}</summary>` : ''
            }\n`,
          after: () => '</details>\n',
        } as ContainerPluginOptions,
      ],
    ],
  }
}

export = defaultTheme
