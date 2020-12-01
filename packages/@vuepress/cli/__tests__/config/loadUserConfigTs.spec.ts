import { loadUserConfigTs } from '@vuepress/cli'
import { path } from '@vuepress/utils'

describe('cli > config > loadUserConfigTs', () => {
  it('should load ts config file correctly', async () => {
    const result = await loadUserConfigTs(
      path.resolve(__dirname, '../__fixtures__/config/ts/.vuepress/config.ts')
    )

    expect(result).toEqual({
      description: 'hello from .vuepress/config.ts',
    })
  })
})
