jest.mock('vuepress-plugin-a')
jest.mock('@org/vuepress-plugin-a')
jest.mock('@vuepress/plugin-a')

jest.mock('vuepress-theme-a')
jest.mock('@org/vuepress-theme-a')
jest.mock('@vuepress/theme-a')

import path from 'path'
import {
  resolveTheme,
  resolvePlugin,
  resolveScopePackage
} from '../lib/shortcutPackageResolver'

const MOCK_RELATIVE = '../../../../__mocks__'

function loadMockModule (name) {
  return require(`${MOCK_RELATIVE}/${name}`)
}

function resolveMockModule (name) {
  return path.resolve(__dirname, `${MOCK_RELATIVE}/${name}`)
}

test('should resolve scope packages correctly.', () => {
  const pkg1 = resolveScopePackage('@vuepress/plugin-a')
  expect(pkg1.org).toBe('vuepress')
  expect(pkg1.name).toBe('plugin-a')

  const pkg2 = resolveScopePackage('vuepress/plugin-a')
  expect(pkg2).toBe(null)

  const pkg3 = resolveScopePackage('vuepress-plugin-a')
  expect(pkg3).toBe(null)
})

describe('resolvePlugin', () => {
  test('shoould resolve local plugin as expected.', () => {
    const plugin1 = () => {}
    const plugin2 = {}
    expect(resolvePlugin(plugin1)).toEqual({
      name: 'plugin1',
      shortcut: 'plugin1',
      module: plugin1,
      isLocal: true
    })
    expect(resolvePlugin(plugin2)).toEqual({
      name: 'anonymous-1',
      shortcut: 'anonymous-1',
      module: plugin2,
      isLocal: true
    })
  })

  test('shoould resolve fullname usage correctly.', () => {
    let plugin = resolvePlugin('vuepress-plugin-a')
    expect(plugin.name).toBe('vuepress-plugin-a')
    expect(plugin.shortcut).toBe('a')
    expect(plugin.module).toBe(loadMockModule('vuepress-plugin-a'))

    plugin = resolvePlugin('@org/vuepress-plugin-a')
    expect(plugin.name).toBe('@org/vuepress-plugin-a')
    expect(plugin.shortcut).toBe('@org/a')
    expect(plugin.module).toBe(loadMockModule('@org/vuepress-plugin-a'))
  })

  test('shoould resolve shortcut usage correctly.', () => {
    // normal package
    let plugin = resolvePlugin('a')
    expect(plugin.name).toBe('vuepress-plugin-a')
    expect(plugin.shortcut).toBe('a')
    expect(plugin.module).toBe(loadMockModule('vuepress-plugin-a'))

    // scope packages
    plugin = resolvePlugin('@org/a')
    expect(plugin.name).toBe('@org/vuepress-plugin-a')
    expect(plugin.shortcut).toBe('@org/a')
    expect(plugin.module).toBe(loadMockModule('@org/vuepress-plugin-a'))

    // special case for @vuepress package
    plugin = resolvePlugin('@vuepress/a')
    expect(plugin.name).toBe('@vuepress/plugin-a')
    expect(plugin.shortcut).toBe('@vuepress/a')
    expect(plugin.module).toBe(loadMockModule('@vuepress/plugin-a'))
  })

  test('shoould return null when plugin cannot be resolved.', () => {
    expect(resolvePlugin('c')).toEqual({ name: 'c', shortcut: 'c', module: null, isLocal: false })
  })
})

describe('resolveTheme', () => {
  test('shoould resolve fullname usage correctly.', () => {
    let theme = resolveTheme('vuepress-theme-a')
    expect(theme.name).toBe('vuepress-theme-a')
    expect(theme.shortcut).toBe('a')
    expect(theme.module).toBe(resolveMockModule('vuepress-theme-a'))

    theme = resolveTheme('@org/vuepress-theme-a')
    expect(theme.name).toBe('@org/vuepress-theme-a')
    expect(theme.shortcut).toBe('@org/a')
    expect(theme.module).toBe(resolveMockModule('@org/vuepress-theme-a'))
  })

  test('shoould resolve shortcut usage correctly.', () => {
    // normal package
    let theme = resolveTheme('a')
    expect(theme.name).toBe('vuepress-theme-a')
    expect(theme.shortcut).toBe('a')
    expect(theme.module).toBe(resolveMockModule('vuepress-theme-a'))

    // scope packages
    theme = resolveTheme('@org/a')
    expect(theme.name).toBe('@org/vuepress-theme-a')
    expect(theme.shortcut).toBe('@org/a')
    expect(theme.module).toBe(resolveMockModule('@org/vuepress-theme-a'))

    // special case for @vuepress package
    theme = resolveTheme('@vuepress/a')
    expect(theme.name).toBe('@vuepress/theme-a')
    expect(theme.shortcut).toBe('@vuepress/a')
    expect(theme.module).toBe(resolveMockModule('@vuepress/theme-a'))
  })

  test('shoould return null when theme cannot be resolved.', () => {
    expect(resolveTheme('c')).toEqual({ name: 'c', shortcut: 'c', module: null, isLocal: false })
  })
})
