import { path, fs } from '@vuepress/utils'
import { resolveFileContent } from '@vuepress/core'

describe('core > page > resolveFileContent', () => {
  it('should resolve file content correctly from file path', async () => {
    const filePath = path.resolve(__dirname, '../../__fixtures__/foo.md')
    const resolved = await resolveFileContent({}, filePath)

    const expected = (await fs.readFile(filePath)).toString()
    expect(resolved).toBe(expected)
  })

  it('should use content from page options', async () => {
    const content = 'foobar'
    const resolved = await resolveFileContent({ content }, null)
    expect(resolved).toBe(resolved)
  })

  it('should return empty string if nothing provided', async () => {
    const resolved = await resolveFileContent({}, null)
    expect(resolved).toBe('')
  })

  it('should throw error if the file does not exist', async () => {
    try {
      await resolveFileContent({}, '404')
    } catch (e) {
      expect(e).not.toBeUndefined()
    }
  })
})
