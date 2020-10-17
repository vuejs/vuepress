import { resolveLocaleConfigItem } from '@vuepress/shared'
import type { LocaleConfig, LocaleConfigItem } from '@vuepress/shared'

const locales: LocaleConfig = {
  '/': {
    lang: 'en-US',
  },
  '/foo/': {
    lang: 'foo',
  },
  '/foo/bar/': {
    lang: 'foo-bar',
  },
  '/foo-baz/': {
    lang: 'foo-baz',
  },
}

const testCases: [string, LocaleConfigItem][] = [
  ['/', locales['/']],
  ['/foo/', locales['/foo/']],
  ['/foo/foo/', locales['/foo/']],
  ['/foo/bar/', locales['/foo/bar/']],
  ['/foo/bar/baz', locales['/foo/bar/']],
  ['/foo-baz/', locales['/foo-baz/']],
  ['/foo-baz/foobar', locales['/foo-baz/']],
]

describe('shared > resolveLocaleConfigItem', () => {
  describe('should resolve locale config item correctly', () => {
    testCases.forEach(([routePath, expected]) => {
      it(routePath, () => {
        expect(resolveLocaleConfigItem(locales, routePath)).toEqual(expected)
      })
    })
  })
})
