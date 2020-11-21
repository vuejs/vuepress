import type { Theme } from '@vuepress/core'
import type { ActiveHeaderLinksPluginOptions } from '@vuepress/plugin-active-header-links'
import type { ContainerPluginOptions } from '@vuepress/plugin-container'
import GitPlugin from '@vuepress/plugin-git'
import type { GitPluginOptions } from '@vuepress/plugin-git'
import { path } from '@vuepress/utils'
import { assignDefaultOptions, resolveContainerPluginOptions } from './node'
import type { DefaultThemeOptions } from './types'

export * from './node'
export * from './types'

export const defaultTheme: Theme<DefaultThemeOptions> = (options) => {
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
      // ===================
      // built-in plugins
      // ===================

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

      // ===================
      // plugins that can be switched off
      // ===================

      [
        '@vuepress/active-header-links',
        options.themePlugins?.activeHeaderLinks === false
          ? false
          : ({
              headerLinkSelector: '.sidebar-link',
              headerAnchorSelector: '.header-anchor',
            } as ActiveHeaderLinksPluginOptions),
      ],
      ['@vuepress/back-to-top', options.themePlugins?.backToTop !== false],
      [
        GitPlugin,
        options.themePlugins?.git === false
          ? false
          : ({
              updatedTime: options.lastUpdated !== false,
              contributors: options.contributors !== false,
            } as GitPluginOptions),
      ],
      ['@vuepress/nprogress', options.themePlugins?.nprogress !== false],
    ],
  }
}

export default defaultTheme
