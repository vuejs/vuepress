import { logger } from '@vuepress/utils'

const methods = [
  ['info', 'log'],
  ['tip', 'log'],
  ['success', 'log'],
  ['warn', 'warn'],
  ['error', 'error'],
]

describe('utils > logger', () => {
  methods.forEach(([method, innerMethod]) => {
    it(method, () => {
      const stored = console[innerMethod]
      console[innerMethod] = jest.fn()

      logger[method]('foo')
      expect(console[innerMethod]).toHaveBeenCalledWith(
        expect.any(String),
        'foo'
      )

      console[innerMethod] = stored
    })
  })

  it('creteError', () => {
    const stored = console.error
    console.error = jest.fn()

    expect(logger.createError()).toBeInstanceOf(Error)
    expect(console.error).toHaveBeenCalled()

    console.error = stored
  })
})
