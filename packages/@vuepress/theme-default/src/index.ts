import type { Theme } from '@vuepress/core'
import type { ContainerPluginOptions } from '@vuepress/plugin-container'
import { path } from '@vuepress/utils'
import type { DefaultThemeOptions } from '../types'
import { resolveContainerPluginOptions } from './node'

const defaultTheme: Theme<DefaultThemeOptions> = ({ locales = {} }) => {
  return {
    name: '@vuepress/theme-default',

    layouts: path.resolve(__dirname, './layouts'),

    clientAppEnhanceFiles: path.resolve(__dirname, './clientAppEnhance.js'),

    plugins: [
      ['@vuepress/nprogress'],
      [
        '@vuepress/container',
        resolveContainerPluginOptions(locales, 'tip', {
          '/': {
            defaultInfo: 'TIP',
          },
          '/zh/': {
            defaultInfo: '提示',
          },
        }),
      ],
      [
        '@vuepress/container',
        resolveContainerPluginOptions(locales, 'warning', {
          '/': {
            defaultInfo: 'WARNING',
          },
          '/zh/': {
            defaultInfo: '注意',
          },
        }),
      ],
      [
        '@vuepress/container',
        resolveContainerPluginOptions(locales, 'danger', {
          '/': {
            defaultInfo: 'WARNING',
          },
          '/zh/': {
            defaultInfo: '警告',
          },
        }),
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
