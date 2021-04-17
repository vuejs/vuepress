import { createApp, normalizeReturnObjectHook } from '@vuepress/core'
import type { ReturnObjectHook } from '@vuepress/core'
import { path } from '@vuepress/utils'

const source = path.resolve(__dirname, 'fake-source')
const app = createApp({
  source,
})

describe('core > pluginApi > normalizeReturnObjectHook', () => {
  it('should keep function as is', () => {
    const rawHook: ReturnObjectHook['exposed'] = jest.fn((app) => ({
      foo: 'bar',
    }))
    const normalizedHook = normalizeReturnObjectHook(rawHook)
    expect(normalizedHook(app)).toEqual({ foo: 'bar' })
    expect(rawHook).toHaveBeenCalledTimes(1)
    expect(rawHook).toHaveBeenCalledWith(app)
  })

  it('should wrap object with a function', () => {
    const rawHook: ReturnObjectHook['exposed'] = {
      foo: 'bar',
    }
    const normalizedHook = normalizeReturnObjectHook(rawHook)
    expect(normalizedHook(app)).toEqual({ foo: 'bar' })
  })
})
