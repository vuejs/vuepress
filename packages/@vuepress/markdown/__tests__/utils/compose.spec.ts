import { compose } from '@vuepress/markdown'

describe('markdown > utils > compose', () => {
  it('should compose zero function', () => {
    const composedFunc = compose()

    const result = composedFunc('foo')

    expect(result).toBe('foo')
  })

  it('should compose single function', () => {
    const funcA = jest.fn(() => 'bar')
    const composedFunc = compose(funcA)

    const result = composedFunc('foo')

    expect(funcA).toBeCalledWith('foo')
    expect(result).toBe('bar')
  })

  it('should compose multiple functions', () => {
    const funcA = jest.fn(() => 'bar')
    const funcB = jest.fn(() => 'foobar')
    const composedFunc = compose(funcA, funcB)

    const result = composedFunc('foo')

    expect(funcA).toBeCalledWith('foo')
    expect(funcB).toBeCalledWith('bar')
    expect(result).toBe('foobar')
  })
})
