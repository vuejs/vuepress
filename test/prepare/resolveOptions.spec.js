import path from 'path'
import resolveOptions from '@/prepare/resolveOptions.js'

const DEFAULT_THEME_PATH = path.resolve(__dirname, '../../lib/default-theme')
const DEFAULT_THEME_LAYOUT_PATH = path.resolve(DEFAULT_THEME_PATH, 'Layout.vue')
const DEFAULT_THEME_NOT_FOOUND_PATH = path.resolve(DEFAULT_THEME_PATH, 'NotFound.vue')

describe('prepare - resolveOptions', () => {
  test('single file docs without config.', async () => {
    const { docsDir } = getDocsPaths('docs-simple')
    const options = await resolveOptions(docsDir)
    const {
      siteConfig,
      siteData,
      sourceDir,
      outDir,
      publicPath,
      pageFiles,
      pagesData,
      themePath,
      themeLayoutPath,
      themeNotFoundPath,
      themeEnhanceAppPath,
      useDefaultTheme,
      isAlgoliaSearch,
      markdown
    } = options
    expect(siteConfig).toEqual({})
    expect(siteData).toEqual({
      title: '',
      description: '',
      base: '/',
      pages: pagesData,
      themeConfig: {},
      locales: undefined
    })
    expect(sourceDir).toBe(docsDir)
    expect(outDir).toBe(path.resolve(docsDir, '.vuepress/dist'))
    expect(publicPath).toBe('/')
    expect(pageFiles).toHaveLength(1)
    expect(pageFiles[0]).toBe('README.md')
    expect(themePath).toBe(DEFAULT_THEME_PATH)
    expect(themeLayoutPath).toBe(DEFAULT_THEME_LAYOUT_PATH)
    expect(themeNotFoundPath).toBe(DEFAULT_THEME_NOT_FOOUND_PATH)
    expect(themeEnhanceAppPath).toBe(null)
    expect(useDefaultTheme).toBe(true)
    expect(isAlgoliaSearch).toBe(false)
    expect(typeof markdown).toBe('object')
  })

  test('single file docs with config', async () => {
    const { docsDir, configPath } = getDocsPaths('docs-simple-config')
    const options = await resolveOptions(docsDir)
    const {
      siteConfig,
      outDir,
      publicPath
    } = options
    expect(siteConfig).toEqual(require(configPath))
    expect(siteConfig.base).toBe('vuepress')
    expect(siteConfig.dest).toBe('vuepress')
    expect(outDir).toBe(path.resolve('vuepress'))
    expect(publicPath).toBe('vuepress')
  })

  test('simple docs with custom theme', async () => {
    const paths = getDocsPaths('docs-custom-theme')
    const options = await resolveOptions(paths.docsDir)
    const {
      themePath,
      themeLayoutPath,
      themeNotFoundPath,
      useDefaultTheme
    } = options
    expect(useDefaultTheme).toBe(false)
    expect(themePath).toBe(paths.themePath)
    expect(themeLayoutPath).toBe(paths.themeLayoutPath)
    expect(themeNotFoundPath).toBe(DEFAULT_THEME_NOT_FOOUND_PATH) // fallbacks to default theme's NotFound component.
  })
})

function getDocsPaths (name) {
  const docsDir = path.join(__dirname, `fixtures/${name}`)
  const configPath = path.join(docsDir, '.vuepress/config.js')
  const themePath = path.join(docsDir, '.vuepress/theme')
  const themeLayoutPath = path.join(themePath, 'Layout.vue')
  const themeNotFoundPath = path.join(themePath, 'NotFound.vue')
  return {
    docsDir,
    configPath,
    themePath,
    themeLayoutPath,
    themeNotFoundPath
  }
}
