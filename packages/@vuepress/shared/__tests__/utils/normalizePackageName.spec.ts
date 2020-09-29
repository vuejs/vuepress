import { normalizePackageName } from '@vuepress/shared'

const vuepressPluginCases = [
  ['foo', 'vuepress-plugin-foo'],
  ['foo-bar', 'vuepress-plugin-foo-bar'],
  ['vuepress-plugin-foo', 'vuepress-plugin-foo'],
  ['vuepress-plugin-foo-bar', 'vuepress-plugin-foo-bar'],
  ['@vuepress/foo', '@vuepress/plugin-foo'],
  ['@vuepress/foo-bar', '@vuepress/plugin-foo-bar'],
  ['@vuepress/plugin-foo', '@vuepress/plugin-foo'],
  ['@vuepress/plugin-foo-bar', '@vuepress/plugin-foo-bar'],
  ['@foo/bar', '@foo/vuepress-plugin-bar'],
  ['@foo/bar-baz', '@foo/vuepress-plugin-bar-baz'],
  ['@foo/vuepress-plugin-bar', '@foo/vuepress-plugin-bar'],
  ['@foo/vuepress-plugin-bar-baz', '@foo/vuepress-plugin-bar-baz'],
]

const vuepressThemeCases = [
  ['foo', 'vuepress-theme-foo'],
  ['foo-bar', 'vuepress-theme-foo-bar'],
  ['vuepress-theme-foo', 'vuepress-theme-foo'],
  ['vuepress-theme-foo-bar', 'vuepress-theme-foo-bar'],
  ['@vuepress/foo', '@vuepress/theme-foo'],
  ['@vuepress/foo-bar', '@vuepress/theme-foo-bar'],
  ['@vuepress/theme-foo', '@vuepress/theme-foo'],
  ['@vuepress/theme-foo-bar', '@vuepress/theme-foo-bar'],
  ['@foo/bar', '@foo/vuepress-theme-bar'],
  ['@foo/bar-baz', '@foo/vuepress-theme-bar-baz'],
  ['@foo/vuepress-theme-bar', '@foo/vuepress-theme-bar'],
  ['@foo/vuepress-theme-bar-baz', '@foo/vuepress-theme-bar-baz'],
]

const markdownPluginCases = [
  ['foo', 'markdown-it-foo'],
  ['foo-bar', 'markdown-it-foo-bar'],
  ['@foo/bar', '@foo/markdown-it-bar'],
  ['@foo/bar-baz', '@foo/markdown-it-bar-baz'],
]

describe('shared > normalizePackageName', () => {
  describe('should normalize vuepress plugins correctly', () => {
    vuepressPluginCases.forEach(([source, expected]) => {
      it(`${source} => ${expected}`, () => {
        expect(normalizePackageName(source, 'vuepress', 'plugin')).toBe(
          expected
        )
      })
    })
  })

  describe('should normalize vuepress themes correctly', () => {
    vuepressThemeCases.forEach(([source, expected]) => {
      it(`${source} => ${expected}`, () => {
        expect(normalizePackageName(source, 'vuepress', 'theme')).toBe(expected)
      })
    })
  })

  describe('should normalize markdown-it plugins correctly', () => {
    markdownPluginCases.forEach(([source, expected]) => {
      it(`${source} => ${expected}`, () => {
        expect(normalizePackageName(source, 'markdown-it')).toBe(expected)
      })
    })
  })
})
