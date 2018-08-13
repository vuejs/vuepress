// TODO change to ES6 import
// https://github.com/facebook/jest/issues/6835

const Tapable = require('../../lib/plugin-api/core/Tapable')

describe('Tapable', () => {
  test('shoould tapable record the key', () => {
    const tapable = new Tapable('option')
    expect(tapable.key).toBe('option')
  })

  test('should \'tap\' work', () => {
    const tapable = new Tapable('option')
    tapable.tap('plugin-a', 'a')
    tapable.tap('plugin-b', 'b')
    expect(tapable.items).toEqual([
      { value: 'a', name: 'plugin-a' },
      { value: 'b', name: 'plugin-b' }
    ])
    expect(tapable.values).toEqual(['a', 'b'])
  })

  test('should \'tap\' resolve array value', () => {
    const tapable = new Tapable('option')
    tapable.tap('plugin-a', ['a-1', 'a-2'])
    tapable.tap('plugin-b', 'b')
    expect(tapable.items).toEqual([
      { value: 'a-1', name: 'plugin-a' },
      { value: 'a-2', name: 'plugin-a' },
      { value: 'b', name: 'plugin-b' }
    ])
    expect(tapable.values).toEqual(['a-1', 'a-2', 'b'])
  })

  test('should \'run\' work', async () => {
    const tapable = new Tapable('option')
    const handler1 = jest.fn()
    const handler2 = jest.fn()

    tapable.tap('plugin-a', handler1)
    tapable.tap('plugin-b', handler2)

    await tapable.run(1, 2)
    expect(handler1.mock.calls).toHaveLength(1)
    expect(handler2.mock.calls).toHaveLength(1)
    expect(handler1.mock.calls[0][0]).toBe(1)
    expect(handler1.mock.calls[0][1]).toBe(2)
    expect(handler2.mock.calls[0][0]).toBe(1)
    expect(handler2.mock.calls[0][1]).toBe(2)
  })

  test('should \'parallelRun\' work', async () => {
    const tapable = new Tapable('option')
    const handler1 = jest.fn()
    const handler2 = jest.fn()

    tapable.tap('plugin-a', handler1)
    tapable.tap('plugin-b', handler2)

    await tapable.parallelRun(1, 2)
    expect(handler1.mock.calls).toHaveLength(1)
    expect(handler2.mock.calls).toHaveLength(1)
    expect(handler1.mock.calls[0][0]).toBe(1)
    expect(handler1.mock.calls[0][1]).toBe(2)
    expect(handler2.mock.calls[0][0]).toBe(1)
    expect(handler2.mock.calls[0][1]).toBe(2)
  })
})

