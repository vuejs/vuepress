import { Theme } from '@vuepress/core'
import { path } from '@vuepress/utils'

const theme: Theme = {
  name: '@vuepress/theme-default',

  layouts: path.resolve(__dirname, '../layouts'),

  clientAppEnhanceFiles: path.resolve(__dirname, './clientAppEnhance.js'),
}

export = theme
