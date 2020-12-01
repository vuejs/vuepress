import { loadUserConfigJs } from '@vuepress/cli'
import { path } from '@vuepress/utils'

describe('cli > config > loadUserConfigJs', () => {
  it('should load js config file correctly', async () => {
    const result = await loadUserConfigJs(
      path.resolve(__dirname, '../__fixtures__/config/js/.vuepress/config.js')
    )

    expect(result).toEqual({
      description: 'hello from .vuepress/config.js',
    })
  })
})
