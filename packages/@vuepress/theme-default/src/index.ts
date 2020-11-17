import type { Theme } from '@vuepress/core'
import type { ContainerPluginOptions } from '@vuepress/plugin-container/lib/types'
import { path } from '@vuepress/utils'
import { assignDefaultOptions, resolveContainerPluginOptions } from './node'
import type { DefaultThemeOptions } from './types'

const defaultTheme: Theme<DefaultThemeOptions> = (options) => {
  assignDefaultOptions(options)

  return {
    name: '@vuepress/theme-default',

    layouts: path.resolve(__dirname, './layouts'),

    clientAppEnhanceFiles: path.resolve(__dirname, './clientAppEnhance.js'),

    clientAppSetupFiles: path.resolve(__dirname, './clientAppSetup.js'),

    /**
     * Require the relative file path to generate edit link
     */
    extendsPageData: ({ filePathRelative }) => ({ filePathRelative }),

    plugins: [
      ['@vuepress/back-to-top'],
      ['@vuepress/nprogress'],
      [
        '@vuepress/container',
        resolveContainerPluginOptions(options.locales, 'tip'),
      ],
      [
        '@vuepress/container',
        resolveContainerPluginOptions(options.locales, 'warning'),
      ],
      [
        '@vuepress/container',
        resolveContainerPluginOptions(options.locales, 'danger'),
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
