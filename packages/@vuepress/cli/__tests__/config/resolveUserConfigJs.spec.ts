import { resolveUserConfigJs } from '@vuepress/cli'
import { path } from '@vuepress/utils'

describe('cli > config > resolveUserConfigJs', () => {
  it('should resolve .vuepress/config.js correctly', async () => {
    const result = await resolveUserConfigJs(
      path.resolve(__dirname, '../__fixtures__/config/js')
    )

    expect(result).toEqual({
      description: 'hello from .vuepress/config.js',
    })
  })
})
