import { path, fs } from '@vuepress/utils'
import { resolvePageFileContent } from '@vuepress/core'

describe('core > page > resolvePageFileContent', () => {
  it('should resolve file content correctly from file path', async () => {
    const filePath = path.resolve(__dirname, '../__fixtures__/pages/foo.md')
    const resolved = await resolvePageFileContent({ filePath, options: {} })

    const expected = (await fs.readFile(filePath)).toString()
    expect(resolved).toBe(expected)
  })

  it('should use content from page options', async () => {
    const content = 'foobar'
    const resolved = await resolvePageFileContent({
      filePath: null,
      options: { content },
    })
    expect(resolved).toBe(resolved)
  })

  it('should return empty string if nothing provided', async () => {
    const resolved = await resolvePageFileContent({
      filePath: null,
      options: {},
    })
    expect(resolved).toBe('')
  })

  it('should throw error if the file does not exist', async () => {
    try {
      await resolvePageFileContent({
        filePath: '404',
        options: {},
      })
    } catch (e) {
      expect(e).not.toBeUndefined()
    }
  })
})
