import Option from '../../plugin-api/abstract/Option'

describe('Option', () => {
  test('key', () => {
    const option = new Option('option')
    expect(option.key).toBe('option')
  })

  test('add', () => {
    const option = new Option('option')
    option.add('plugin-a', 'a')
    option.add('plugin-b', 'b')

    expect(option.items).toEqual([
      { value: 'a', name: 'plugin-a' },
      { value: 'b', name: 'plugin-b' }
    ])

    expect(option.values).toEqual(['a', 'b'])
  })

  test('add - resolve array', () => {
    const option = new Option('option')
    option.add('plugin-a', ['a-1', 'a-2'])
    option.add('plugin-b', 'b')

    expect(option.items).toEqual([
      { value: 'a-1', name: 'plugin-a' },
      { value: 'a-2', name: 'plugin-a' },
      { value: 'b', name: 'plugin-b' }
    ])
  })

  test('delete', () => {
    const option = new Option('option')
    option.add('plugin-a', ['a-1', 'a-2'])
    option.add('plugin-b', 'b')

    option.delete('plugin-a')

    expect(option.items).toEqual([
      { value: 'b', name: 'plugin-b' }
    ])
  })

  test('clear', () => {
    const option = new Option('option')
    option.add('plugin-a', ['a-1', 'a-2'])

    option.clear()

    expect(option.items).toEqual([])
  })

  test('syncApply', () => {
    const option = new Option('option')
    const handler1 = jest.fn()
    const handler2 = jest.fn()

    option.add('plugin-a', handler1)
    option.add('plugin-b', handler2)

    option.syncApply('p1', 'p2')
    expect(handler1.mock.calls).toHaveLength(1)
    expect(handler2.mock.calls).toHaveLength(1)
    expect(handler1.mock.calls[0][0]).toBe('p1')
    expect(handler1.mock.calls[0][1]).toBe('p2')
    expect(handler2.mock.calls[0][0]).toBe('p1')
    expect(handler2.mock.calls[0][1]).toBe('p2')
  })

  test('appliedItems', () => {
    const option = new Option('option')
    const fn1 = () => 'fn1'
    const fn2 = () => 'fn2'
    const handler1 = jest.fn(fn1)
    const handler2 = jest.fn(fn2)

    option.add('plugin-a', handler1)
    option.add('plugin-b', handler2)

    option.syncApply(1, 2)

    expect(option.appliedItems).toEqual([
      { value: 'fn1', name: 'plugin-a' },
      { value: 'fn2', name: 'plugin-b' }
    ])
  })
})

