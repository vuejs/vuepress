import { createBaseApp, createHookQueue, createPage } from '@vuepress/core'
import type { HooksName } from '@vuepress/core'
import { path } from '@vuepress/utils'

const app = createBaseApp({
  source: path.resolve(__dirname, 'fake-source'),
  theme: path.resolve(__dirname, '../__fixtures__/themes/empty.js'),
})

describe('core > pluginApi > createHookQueue', () => {
  describe('common', () => {
    const hookNames: HooksName[] = [
      'onInitialized',
      'onPrepared',
      'onWatched',
      'onGenerated',
      'extendsMarkdown',
      'extendsPageOptions',
      'extendsPageData',
      'clientAppEnhanceFiles',
      'clientAppRootComponentFiles',
      'clientAppSetupFiles',
      'alias',
      'define',
    ]

    hookNames.forEach((hookName) => {
      const hook = createHookQueue(hookName)

      it('should have correct name', () => {
        expect(hook.name).toEqual(hookName)
      })

      it('should throw error from the first item', async () => {
        const consoleError = console.error
        console.error = jest.fn()

        const err1 = new Error('err1')
        const err2 = new Error('err2')
        const func1 = jest.fn(() => {
          throw err1
        })
        const func2 = jest.fn(() => {
          throw err2
        })
        hook.add({
          pluginName: 'test1',
          hook: func1,
        })
        hook.add({
          pluginName: 'test2',
          hook: func2,
        })
        await expect(hook.process(app)).rejects.toThrowError(err1)
        expect(console.error).toHaveBeenCalled()

        expect(func1).toHaveBeenCalledTimes(1)
        expect(func1).toHaveBeenCalledWith(app)
        expect(func2).toHaveBeenCalledTimes(0)

        console.error = consoleError
      })
    })
  })

  describe('lifecycle hooks', () => {
    const hookNames: HooksName[] = [
      'onInitialized',
      'onPrepared',
      'onWatched',
      'onGenerated',
    ]

    hookNames.forEach((hookName) =>
      it(`${hookName}`, async () => {
        const hook = createHookQueue(hookName)
        const func1 = jest.fn()
        const func2 = jest.fn()
        hook.add({
          pluginName: 'test1',
          hook: func1,
        })
        hook.add({
          pluginName: 'test2',
          hook: func2,
        })
        await hook.process(app)

        expect(func1).toHaveBeenCalledTimes(1)
        expect(func1).toHaveBeenCalledWith(app)
        expect(func2).toHaveBeenCalledTimes(1)
        expect(func2).toHaveBeenCalledWith(app)
      })
    )
  })

  describe('page hooks', () => {
    it(`extendsPageOptions`, async () => {
      const hookName = 'extendsPageOptions'

      const hook = createHookQueue(hookName)
      const func1 = jest.fn(() => ({ content: 'foo' }))
      const func2 = jest.fn(() => ({ content: 'bar' }))
      hook.add({
        pluginName: 'test1',
        hook: func1,
      })
      hook.add({
        pluginName: 'test2',
        hook: func2,
      })
      const result = await hook.process('foo.md', app)

      expect(func1).toHaveBeenCalledTimes(1)
      expect(func1).toHaveBeenCalledWith('foo.md', app)
      expect(func2).toHaveBeenCalledTimes(1)
      expect(func2).toHaveBeenCalledWith('foo.md', app)
      expect(result).toEqual([{ content: 'foo' }, { content: 'bar' }])
    })

    it(`extendsPageData`, async () => {
      const hookName = 'extendsPageData'

      const hook = createHookQueue(hookName)
      const page = await createPage(app, { path: '/' })
      const func1 = jest.fn(() => ({ foo: 'foo' }))
      const func2 = jest.fn(() => ({ bar: 'bar' }))
      hook.add({
        pluginName: 'test1',
        hook: func1,
      })
      hook.add({
        pluginName: 'test2',
        hook: func2,
      })
      const result = await hook.process(page, app)

      expect(func1).toHaveBeenCalledTimes(1)
      expect(func1).toHaveBeenCalledWith(page, app)
      expect(func2).toHaveBeenCalledTimes(1)
      expect(func2).toHaveBeenCalledWith(page, app)
      expect(result).toEqual([{ foo: 'foo' }, { bar: 'bar' }])
    })
  })

  describe('markdown hooks', () => {
    it(`extendsMarkdown`, async () => {
      const hookName = 'extendsMarkdown'

      const hook = createHookQueue(hookName)
      const func1 = jest.fn()
      const func2 = jest.fn()
      hook.add({
        pluginName: 'test1',
        hook: func1,
      })
      hook.add({
        pluginName: 'test2',
        hook: func2,
      })
      await hook.process(app.markdown, app)

      expect(func1).toHaveBeenCalledTimes(1)
      expect(func1).toHaveBeenCalledWith(app.markdown, app)
      expect(func2).toHaveBeenCalledTimes(1)
      expect(func2).toHaveBeenCalledWith(app.markdown, app)
    })
  })

  describe('client files hooks', () => {
    const hookNames: HooksName[] = [
      'clientAppEnhanceFiles',
      'clientAppRootComponentFiles',
      'clientAppSetupFiles',
    ]
    const file1 = path.resolve(
      __dirname,
      '../__fixtures__/clientFiles/clientAppEnhance.ts'
    )
    const file2 = path.resolve(
      __dirname,
      '../__fixtures__/clientFiles/clientAppSetup.ts'
    )

    hookNames.forEach((hookName) =>
      it(`${hookName}`, async () => {
        const hook = createHookQueue(hookName)
        const func1 = jest.fn(() => [file1])
        const func2 = jest.fn(() => [file2])
        hook.add({
          pluginName: 'test1',
          hook: func1,
        })
        hook.add({
          pluginName: 'test2',
          hook: func2,
        })
        const result = await hook.process(app)

        expect(func1).toHaveBeenCalledTimes(1)
        expect(func1).toHaveBeenCalledWith(app)
        expect(func2).toHaveBeenCalledTimes(1)
        expect(func2).toHaveBeenCalledWith(app)
        expect(result).toEqual([[file1], [file2]])
      })
    )
  })

  describe('bundler hooks', () => {
    const hookNames: HooksName[] = ['alias', 'define']

    hookNames.forEach((hookName) =>
      it(`${hookName}`, async () => {
        const hook = createHookQueue(hookName)
        const func1 = jest.fn(() => ({ foo: 'foo' }))
        const func2 = jest.fn(() => ({ bar: 'bar' }))
        hook.add({
          pluginName: 'test1',
          hook: func1,
        })
        hook.add({
          pluginName: 'test2',
          hook: func2,
        })
        const result = await hook.process(app)

        expect(func1).toHaveBeenCalledTimes(1)
        expect(func1).toHaveBeenCalledWith(app)
        expect(func2).toHaveBeenCalledTimes(1)
        expect(func2).toHaveBeenCalledWith(app)
        expect(result).toEqual([{ foo: 'foo' }, { bar: 'bar' }])
      })
    )
  })
})
