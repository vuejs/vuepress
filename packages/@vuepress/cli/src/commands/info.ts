import * as envinfo from 'envinfo'
import { ora } from '@vuepress/utils'

export const info = async (): Promise<void> => {
  const spinner = ora()
  spinner.start('Collecting Environment Info')

  const result = await envinfo.run(
    {
      System: ['OS', 'CPU', 'Memory', 'Shell'],
      Binaries: ['Node', 'Yarn', 'npm'],
      Utilities: ['Git'],
      Browsers: ['Chrome', 'Edge', 'Firefox', 'Safari'],
      npmPackages: [
        '@vuepress/bundler-webpack',
        '@vuepress/cli',
        '@vuepress/client',
        '@vuepress/core',
        '@vuepress/markdown',
        '@vuepress/plugin-active-header-links',
        '@vuepress/plugin-back-to-top',
        '@vuepress/plugin-container',
        '@vuepress/plugin-debug',
        '@vuepress/plugin-docsearch',
        '@vuepress/plugin-git',
        '@vuepress/plugin-google-analytics',
        '@vuepress/plugin-medium-zoom',
        '@vuepress/plugin-nprogress',
        '@vuepress/plugin-palette-stylus',
        '@vuepress/plugin-pwa',
        '@vuepress/plugin-pwa-popup',
        '@vuepress/shared',
        '@vuepress/theme-default',
        '@vuepress/theme-vue',
        '@vuepress/utils',
        'vuepress',
        'vue',
        'vue-router',
        'vue-loader',
      ],
    },
    {
      showNotFound: true,
      duplicates: true,
      fullTree: true,
    }
  )
  spinner.stop()

  console.info(result)
}
