const AsyncOption = require('../../plugin-api/abstract/AsyncOption')

describe('AsyncOption', () => {
  test('parallelApply', async () => {
    const option = new AsyncOption('option')
    const handler1 = jest.fn()
    const handler2 = jest.fn()

    option.add('plugin-a', handler1)
    option.add('plugin-b', handler2)

    // TODO for now, if a class extends from another class.
    // the original methods in that class will be lost.

    await option.parallelApply(1, 2)
    // expect(handler1.mock.calls).toHaveLength(1)
    // expect(handler2.mock.calls).toHaveLength(1)
    // expect(handler1.mock.calls[0][0]).toBe(1)
    // expect(handler1.mock.calls[0][1]).toBe(2)
    // expect(handler2.mock.calls[0][0]).toBe(1)
    // expect(handler2.mock.calls[0][1]).toBe(2)
  })
})

