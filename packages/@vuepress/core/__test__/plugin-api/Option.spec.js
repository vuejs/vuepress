import Option from '../../lib/plugin-api/Option'

describe('Option', () => {
  test('shoould option record the key', () => {
    const option = new Option('option')
    expect(option.key).toBe('option')
  })

  test('should \'tap\' work', () => {
    const option = new Option('option')
    option.tap('plugin-a', 'a')
    option.tap('plugin-b', 'b')
    expect(option.items).toEqual([
      { value: 'a', name: 'plugin-a' },
      { value: 'b', name: 'plugin-b' }
    ])
    expect(option.values).toEqual(['a', 'b'])
  })

  test('should \'tap\' resolve array value', () => {
    const option = new Option('option')
    option.tap('plugin-a', ['a-1', 'a-2'])
    option.tap('plugin-b', 'b')
    expect(option.items).toEqual([
      { value: 'a-1', name: 'plugin-a' },
      { value: 'a-2', name: 'plugin-a' },
      { value: 'b', name: 'plugin-b' }
    ])
    expect(option.values).toEqual(['a-1', 'a-2', 'b'])
  })

  test('should \'apply\' work', async () => {
    const option = new Option('option')
    const handler1 = jest.fn()
    const handler2 = jest.fn()

    option.tap('plugin-a', handler1)
    option.tap('plugin-b', handler2)

    await option.apply(1, 2)
    expect(handler1.mock.calls).toHaveLength(1)
    expect(handler2.mock.calls).toHaveLength(1)
    expect(handler1.mock.calls[0][0]).toBe(1)
    expect(handler1.mock.calls[0][1]).toBe(2)
    expect(handler2.mock.calls[0][0]).toBe(1)
    expect(handler2.mock.calls[0][1]).toBe(2)
  })

  test('should \'parallelApply\' work', async () => {
    const option = new Option('option')
    const handler1 = jest.fn()
    const handler2 = jest.fn()

    option.tap('plugin-a', handler1)
    option.tap('plugin-b', handler2)

    await option.parallelApply(1, 2)
    expect(handler1.mock.calls).toHaveLength(1)
    expect(handler2.mock.calls).toHaveLength(1)
    expect(handler1.mock.calls[0][0]).toBe(1)
    expect(handler1.mock.calls[0][1]).toBe(2)
    expect(handler2.mock.calls[0][0]).toBe(1)
    expect(handler2.mock.calls[0][1]).toBe(2)
  })
})

