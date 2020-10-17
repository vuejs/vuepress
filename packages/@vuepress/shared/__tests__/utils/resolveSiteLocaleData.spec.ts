import { resolveSiteLocaleData } from '@vuepress/shared'
import type { SiteData } from '@vuepress/shared'

const createSiteData = ({
  base = '/',
  lang = '',
  title = '',
  description = '',
  head = [],
  locales = {},
  themeConfig = {},
}: Partial<SiteData>): SiteData => ({
  base,
  lang,
  title,
  description,
  head,
  locales,
  themeConfig,
})

describe('shared > resolveSiteLocaleData', () => {
  describe('should resolve site locale data correctly', () => {
    it('case 1', () => {
      const siteData = createSiteData({
        lang: 'root lang',
        title: 'root title',
        description: 'root description',
      })
      expect(resolveSiteLocaleData(siteData, '/')).toEqual(siteData)
      expect(resolveSiteLocaleData(siteData, '/foo/bar')).toEqual(siteData)
    })

    it('case 2', () => {
      const siteData = createSiteData({
        lang: 'root lang',
        title: 'root title',
        description: 'root description',
        locales: {
          '/en/': {
            lang: 'en-US',
            title: 'en title',
            description: 'en description',
          },
        },
      })
      expect(resolveSiteLocaleData(siteData, '/')).toEqual(siteData)
      expect(resolveSiteLocaleData(siteData, '/en/foo/bar')).toEqual({
        ...siteData,
        lang: 'en-US',
        title: 'en title',
        description: 'en description',
      })
    })

    it('case 3', () => {
      const siteData = createSiteData({
        lang: 'root lang',
        title: 'root title',
        description: 'root description',
        locales: {
          '/': {
            lang: 'en-US',
            title: 'en title',
            description: 'en description',
          },
          '/zh/': {
            lang: 'zh-CN',
            title: 'zh title',
            description: 'zh description',
          },
        },
      })
      expect(resolveSiteLocaleData(siteData, '/')).toEqual({
        ...siteData,
        lang: 'en-US',
        title: 'en title',
        description: 'en description',
      })
      expect(resolveSiteLocaleData(siteData, '/zh/foo/bar')).toEqual({
        ...siteData,
        lang: 'zh-CN',
        title: 'zh title',
        description: 'zh description',
      })
    })

    it('case 4', () => {
      const siteData = createSiteData({
        lang: 'root lang',
        title: 'root title',
        description: 'root description',
        locales: {
          '/': {
            lang: 'en-US',
            title: 'en title',
            description: 'en description',
          },
          '/zh/': {
            lang: 'zh-CN',
            title: 'zh title',
            description: 'zh description',
          },
          '/zh/TW/': {
            lang: 'zh-TW',
            title: 'zh-TW title',
            description: 'zh-TW description',
          },
        },
      })
      expect(resolveSiteLocaleData(siteData, '/')).toEqual({
        ...siteData,
        lang: 'en-US',
        title: 'en title',
        description: 'en description',
      })
      expect(resolveSiteLocaleData(siteData, '/zh/foo/bar')).toEqual({
        ...siteData,
        lang: 'zh-CN',
        title: 'zh title',
        description: 'zh description',
      })
      expect(resolveSiteLocaleData(siteData, '/zh/TW/foo/bar')).toEqual({
        ...siteData,
        lang: 'zh-TW',
        title: 'zh-TW title',
        description: 'zh-TW description',
      })
    })
  })

  describe('should resolve theme locale config correctly', () => {
    it('case 1', () => {
      const siteData = createSiteData({
        themeConfig: {
          msg: 'root msg',
        },
      })
      expect(resolveSiteLocaleData(siteData, '/')).toEqual(siteData)
      expect(resolveSiteLocaleData(siteData, '/foo/bar')).toEqual(siteData)
    })

    it('case 2', () => {
      const siteData = createSiteData({
        themeConfig: {
          msg: 'root msg',
          locales: {
            '/en/': {
              msg: 'en msg',
            },
          },
        },
      })
      expect(resolveSiteLocaleData(siteData, '/')).toEqual(siteData)
      expect(resolveSiteLocaleData(siteData, '/en/foo/bar')).toEqual({
        ...siteData,
        themeConfig: {
          ...siteData.themeConfig,
          msg: 'en msg',
        },
      })
    })

    it('case 3', () => {
      const siteData = createSiteData({
        themeConfig: {
          locales: {
            '/': {
              msg: 'en msg',
            },
            '/zh/': {
              msg: 'zh msg',
            },
          },
        },
      })
      expect(resolveSiteLocaleData(siteData, '/')).toEqual({
        ...siteData,
        themeConfig: {
          ...siteData.themeConfig,
          msg: 'en msg',
        },
      })
      expect(resolveSiteLocaleData(siteData, '/zh/foo/bar')).toEqual({
        ...siteData,
        themeConfig: {
          ...siteData.themeConfig,
          msg: 'zh msg',
        },
      })
    })

    it('case 4', () => {
      const siteData = createSiteData({
        themeConfig: {
          locales: {
            '/': {
              msg: 'en msg',
            },
            '/zh/': {
              msg: 'zh msg',
            },
            '/zh/TW/': {
              msg: 'zh-TW msg',
            },
          },
        },
      })
      expect(resolveSiteLocaleData(siteData, '/')).toEqual({
        ...siteData,
        themeConfig: {
          ...siteData.themeConfig,
          msg: 'en msg',
        },
      })
      expect(resolveSiteLocaleData(siteData, '/zh/foo/bar')).toEqual({
        ...siteData,
        themeConfig: {
          ...siteData.themeConfig,
          msg: 'zh msg',
        },
      })
      expect(resolveSiteLocaleData(siteData, '/zh/TW/foo/bar')).toEqual({
        ...siteData,
        themeConfig: {
          ...siteData.themeConfig,
          msg: 'zh-TW msg',
        },
      })
    })
  })
})
