import { resolveUserConfigTs } from '@vuepress/cli'
import { path } from '@vuepress/utils'

describe('cli > config > resolveUserConfigTs', () => {
  it('should resolve .vuepress/config.ts correctly', async () => {
    const result = await resolveUserConfigTs(
      path.resolve(__dirname, '../__fixtures__/config/ts')
    )

    expect(result).toEqual({
      description: 'hello from .vuepress/config.ts',
    })
  })
})
