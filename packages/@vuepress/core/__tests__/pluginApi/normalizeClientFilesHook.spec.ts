import { createBaseApp, normalizeClientFilesHook } from '@vuepress/core'
import type { ClientFilesHook } from '@vuepress/core'
import { path } from '@vuepress/utils'

const app = createBaseApp({
  source: path.resolve(__dirname, 'fake-source'),
  theme: path.resolve(__dirname, '../__fixtures__/themes/empty.js'),
})
const clientFile = path.resolve(
  __dirname,
  '../__fixtures__/clientFiles/clientAppSetup.ts'
)
const clientFileNonExistent = path.resolve(
  __dirname,
  '../__fixtures__/clientFiles/non-existent.ts'
)
const clientFiles = [
  path.resolve(__dirname, '../__fixtures__/clientFiles/clientAppSetup.ts'),
  path.resolve(__dirname, '../__fixtures__/clientFiles/clientAppEnhance.ts'),
]
const clientFilesNonExistent = [clientFile, clientFileNonExistent]

describe('core > pluginApi > normalizeClientFilesHook', () => {
  describe('should keep function as is', () => {
    it('return value is string', async () => {
      const rawHook: ClientFilesHook['exposed'] = jest.fn((app) => clientFile)
      const normalizedHook = normalizeClientFilesHook(rawHook)
      expect(await normalizedHook(app)).toEqual([clientFile])
      expect(rawHook).toHaveBeenCalledTimes(1)
      expect(rawHook).toHaveBeenCalledWith(app)
    })

    it('return value is string array', async () => {
      const rawHook: ClientFilesHook['exposed'] = jest.fn((app) => clientFiles)
      const normalizedHook = normalizeClientFilesHook(rawHook)
      expect(await normalizedHook(app)).toEqual(clientFiles)
      expect(rawHook).toHaveBeenCalledTimes(1)
      expect(rawHook).toHaveBeenCalledWith(app)
    })

    it('should throw an error if file does not exist', async () => {
      const consoleError = console.error
      console.error = jest.fn()

      const rawHook: ClientFilesHook['exposed'] = clientFileNonExistent
      const normalizedHook = normalizeClientFilesHook(rawHook)
      await expect(normalizedHook(app)).rejects.toThrow()
      expect(console.error).toHaveBeenCalled()

      console.error = consoleError
    })
  })

  describe('should wrap raw value with a function', () => {
    it('value is string', async () => {
      const rawHook: ClientFilesHook['exposed'] = clientFile
      const normalizedHook = normalizeClientFilesHook(rawHook)
      expect(await normalizedHook(app)).toEqual([clientFile])
    })

    it('value is string array', async () => {
      const rawHook: ClientFilesHook['exposed'] = clientFiles
      const normalizedHook = normalizeClientFilesHook(rawHook)
      expect(await normalizedHook(app)).toEqual(clientFiles)
    })

    it('should throw an error if file does not exist', async () => {
      const consoleError = console.error
      console.error = jest.fn()

      const rawHook: ClientFilesHook['exposed'] = clientFilesNonExistent
      const normalizedHook = normalizeClientFilesHook(rawHook)
      await expect(normalizedHook(app)).rejects.toThrow()
      expect(console.error).toHaveBeenCalled()

      console.error = consoleError
    })
  })
})
