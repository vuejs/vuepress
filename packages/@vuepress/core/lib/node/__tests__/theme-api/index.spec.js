jest.mock('vuepress-theme-parent')
jest.mock('vuepress-theme-child')

import ThemeAPI from '../../theme-api'
import { resolve } from 'path'

const theme = {
  path: resolve(process.cwd(), '__mocks__/vuepress-theme-child'),
  name: 'vuepress-theme-child',
  shortcut: 'child',
  entryFile: require('vuepress-theme-child')
}

const parent = {
  path: resolve(process.cwd(), '__mocks__/vuepress-theme-parent'),
  name: 'vuepress-theme-parent',
  shortcut: 'parent',
  entryFile: {}
}

describe('ThemeAPI', () => {
  test('extend', async () => {
    const themeAPI = new ThemeAPI(theme, parent)
    console.log(themeAPI.theme.entry)
  })
  // loadTheme('vuepress-theme-child')
})
