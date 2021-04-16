import { normalizePluginConfig } from '@vuepress/core'
import type {
  PluginConfig,
  PluginConfigNormalized,
  PluginObject,
  PluginFunction,
} from '@vuepress/core'

const pluginObject: PluginObject = {
  name: 'plugin-object',
}

const pluginFunction: PluginFunction = () => ({
  name: 'plugin-function',
})

const testCases: [PluginConfig, PluginConfigNormalized][] = [
  // array config
  [['foo'], ['foo', true]],
  [
    ['foo', true],
    ['foo', true],
  ],
  [
    ['foo', false],
    ['foo', false],
  ],
  [
    ['foo', {}],
    ['foo', {}],
  ],
  [
    ['foo', { bar: 'bar' }],
    ['foo', { bar: 'bar' }],
  ],
  [[pluginObject], [pluginObject, true]],
  [
    [pluginObject, true],
    [pluginObject, true],
  ],
  [
    [pluginObject, false],
    [pluginObject, false],
  ],
  [
    [pluginObject, {}],
    [pluginObject, {}],
  ],
  [
    [pluginObject, { bar: 'bar' }],
    [pluginObject, { bar: 'bar' }],
  ],
  [[pluginFunction], [pluginFunction, true]],
  [
    [pluginFunction, true],
    [pluginFunction, true],
  ],
  [
    [pluginFunction, false],
    [pluginFunction, false],
  ],
  [
    [pluginFunction, {}],
    [pluginFunction, {}],
  ],
  [
    [pluginFunction, { bar: 'bar' }],
    [pluginFunction, { bar: 'bar' }],
  ],

  // non-array config
  ['foo', ['foo', true]],
  [pluginObject, [pluginObject, true]],
  [pluginFunction, [pluginFunction, true]],
]

describe('core > app > normalizePluginConfig', () => {
  describe('should normalize plugin config correctly', () => {
    testCases.forEach(([source, expected], i) =>
      it(`case ${i}`, () => {
        expect(normalizePluginConfig(source)).toEqual(expected)
      })
    )
  })
})
