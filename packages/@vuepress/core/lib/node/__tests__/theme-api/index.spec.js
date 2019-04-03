jest.mock('vuepress-theme-mocked-parent')
jest.mock('vuepress-theme-mocked-child')

import ThemeAPI from '../../theme-api'
import { resolve } from 'path'

const theme = {
  path: resolve(process.cwd(), '__mocks__/vuepress-theme-mocked-child'),
  name: 'vuepress-theme-mocked-child',
  shortcut: 'child',
  entryFile: require('vuepress-theme-mocked-child')
}

const parent = {
  path: resolve(process.cwd(), '__mocks__/vuepress-theme-mocked-parent'),
  name: 'vuepress-theme-mocked-parent',
  shortcut: 'parent',
  entryFile: {}
}

describe('ThemeAPI', () => {
  test('extend', async () => {
    const themeAPI = new ThemeAPI(theme, parent)
    console.log(themeAPI.theme.entry)
  })
})
